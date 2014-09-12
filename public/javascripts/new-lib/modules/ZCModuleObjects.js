//if [MODULES] then
ZC.aLoadedModules.push('objects');
//endif
ZC.ZCGraph.prototype.parseObjects = function() {
	ZC._ts_begin_('parseObjects');
	var self = this, mValue;

	self.initObjectsLayers();

	self.aLabels = [];
	self.aShapes = [];
	self.aArrows = [];
	self.aImages = [];
	self.aObjects = [];
	var oDefaults = self.oParent.oDefaults;
	var sGraphType = '(' + self.sType + ')';

	//if [LABELS] then
	var aLabels;
	if ((aLabels=self.oData['labels']) != null) {
		for (var i=0,iLen=aLabels.length;i<iLen;i++) {
			var sId = aLabels[i]['id'] || i;

			var bReuse = false, bSkipParse = false;
			if (self.oAttributes['objects.updates']) {
				if (ZC._indexof_(self.oAttributes['objects.updates'], sId) == -1) {
					bReuse = true;
					bSkipParse = true;
				}
			}

			if (aLabels[i]['tween']) {
				bReuse = true;
			}

			var oLabel = zingchart.pool.getInstance('ZCTextBox', self, self.sId + '-label-' + sId, bReuse);
			if (!bSkipParse) {
				oDefaults.load(oLabel.oData, sGraphType + '.label');
				oLabel.append(aLabels[i]);

				if ((mValue=oLabel.oData['parent']) != null) {
					/* lookup parsed labels */
					for (var j=0;j<self.aLabels.length;j++) {
						if (self.aLabels[j].sObjectId == mValue) {
							oLabel.oAttributes['p-x'] = self.aLabels[j].iX;
							oLabel.oAttributes['p-y'] = self.aLabels[j].iY;
							oLabel.oAttributes['p-width'] = self.aLabels[j].iWidth;
							oLabel.oAttributes['p-height'] = self.aLabels[j].iHeight;
							break;
						}
					}
				}

				oLabel.sObjectId = sId;
				oLabel.sId = self.sId + '-label-' + sId;
				oLabel.sDOMClass = self.sId + '-label zc-label';

				if ((mValue=aLabels[i]['hook']) != null) {
					oLabel.oAttributes['hook'] = mValue;
				}
				oLabel.parseText = function(sText) {
					/* just a quick peek for % to avoid token parsing */
					if (!sText || (new String(sText)).indexOf('%') == -1) {
						return sText;
					}
					sText = new String(sText);
					var aTokens = [], oRE;
					aTokens.push(['%id', self.oParent.sId]);
					aTokens.push(['%graphid', self.sId.replace(self.oParent.sId+'-graph-', '')]);
					var oUpdate = self.oAttributes['update'];
					for (var sToken in oUpdate) {
						aTokens.push(['%' + sToken, oUpdate[sToken]]);
					}
					aTokens.sort(ZC._token_sort_);
					for (var i=0,iLen=aTokens.length;i<iLen;i++) {
						oRE = new RegExp(aTokens[i][0], 'g');
						sText = sText.replace(oRE, aTokens[i][1]);
					}
					var sValue = oLabel.oData['default-value'] || ' ';
					oRE = new RegExp('(%plot\-([0-9]+?)\-value(\-*)([0-9]*?))|(%plot\-value\-([0-9]+?))|(%plot\-value)', 'g');
					sText = sText.replace(oRE, sValue);

					oRE = new RegExp('\\((.+?)\\)\\(([0-9]*)\\)\\(([0-9]*)\\)');
					var aMatches, sText_, oNode, oPlot;
					while (aMatches = oRE.exec(sText)) {
						if (aMatches[1] == '%node-value') {
							sText_ = '';
							var iPlotIndex = 0;
							var iNodeIndex = 0;
							if ((mValue=aMatches[2]) != '') {
								iPlotIndex = ZC._i_(mValue);
							}
							if ((mValue=aMatches[3]) != '') {
								iNodeIndex = ZC._i_(mValue);
							}
							if ((oPlot=self.oPlotSet.aPlots[iPlotIndex]) != null) {
								oNode = oPlot.getNode(iNodeIndex, 3);
								if (oNode != null) {
									sText_ = oNode.parseText(aMatches[1]);
								}
							}
							sText = sText.replace(aMatches[0], sText_);
						}
					}
					return sText;
				};
				oLabel.parse();

				if (aLabels[i]['3d']) {
					var oPoint3D = new ZC.ZCPoint3D(self, oLabel.iX, oLabel.iY, ZC._i_(aLabels[i]['z'] || '0'));
					oLabel.iX = oPoint3D.aXY[0];
					oLabel.iY = oPoint3D.aXY[1];
				}

			}

			self.aLabels.push(oLabel);
			self.aObjects.push({type : 'label', index : i, zindex : oLabel.iZIndex});
		}
	}
	//endif
	//if [ARROWS] then
	var aArrows;
	if ((aArrows=self.oData['arrows']) != null) {
		for (var i=0,iLen=aArrows.length;i<iLen;i++) {
			var oArrow = new ZC.ZCArrow(self);
			oDefaults.load(oArrow.oData, sGraphType + '.arrow');
			oArrow.append(aArrows[i]);
			var sId = aArrows[i]['id'] || i;
			oArrow.sId = self.sId + '-arrow-' + sId;
			oArrow.parse();
			self.aArrows.push(oArrow);
			self.aObjects.push({type : 'arrow', index : i, zindex : oArrow.iZIndex});
		}
	}
	//endif
	//if [SHAPES] then
	var aShapes;
	var idx = 0;
	if ((aShapes=self.oData['shapes']) != null) {
		for (var i=0,iLen=aShapes.length;i<iLen;i++) {
			if (aShapes[i]['type'] != null && aShapes[i]['type'].indexOf('zingchart.') == 0) {
				continue;
			}
			var sId = aShapes[i]['id'] || i;

			var bSkipParse = (zingchart.pool[self.sId + '-shape-' + sId] != null && zingchart.SKIP.PARSE3D);

			var bReuse = false;
			if (self.oAttributes['objects.updates']) {
				if (ZC._indexof_(self.oAttributes['objects.updates'], sId) == -1) {
					bReuse = true;
					bSkipParse = true;
				}
			}

			if (aShapes[i]['tween']) {
				bReuse = true;
			}

			if (aShapes[i]['3d']) {
				if (aShapes[i]['type'] == 'rect' || aShapes[i]['type'] == 'rectangle') {
					var oGraphShape = zingchart.pool.getInstance('ZCBox', self, self.sId + '-shape-' + sId, true);
				} else {
					var oGraphShape = zingchart.pool.getInstance('ZCShape', self, self.sId + '-shape-' + sId, true);
				}
				oGraphShape.oData = aShapes[i];
				if (aShapes[i]['type'] != 'poly') {
					bSkipParse = false;
				}
			} else {
				if (aShapes[i]['label'] != null) {
					var oGraphShape = zingchart.pool.getInstance('ZCGraphShape', self, self.sId + '-shape-' + sId, bReuse);
					oGraphShape.oShapeData = aShapes[i];
				} else {
					if (aShapes[i]['type'] == 'rect' || aShapes[i]['type'] == 'rectangle') {
						var oGraphShape = zingchart.pool.getInstance('ZCBox', self, self.sId + '-shape-' + sId, bReuse);
					} else {
						var oGraphShape = zingchart.pool.getInstance('ZCShape', self, self.sId + '-shape-' + sId, bReuse);
					}
					oGraphShape.oData = aShapes[i];
				}
				if (!bReuse) {
					bSkipParse = false;
				}
			}

			if (!bSkipParse) {
				oGraphShape.sObjectId = sId;
				oGraphShape.sId = self.sId + '-shape-' + sId;
				oGraphShape.bCache = true;
				oGraphShape.parse();
			}
			if (aShapes[i]['3d']) {
				if (aShapes[i]['type'] == 'poly') {
					var oFace = ZC.ZCMath3D._create_3d_facet_(oGraphShape, self, aShapes[i]['points'], false);
					self.oEngine3D.add(oFace);
					self.aShapes.push(null);
				} else {
					if (oGraphShape.aPoints.length > 0) {
						var aPoints = [];
						for (var p=0,pLen=oGraphShape.aPoints.length;p<pLen;p++) {
							var oPoint = new ZC.ZCPoint3D(self, oGraphShape.aPoints[p][0], oGraphShape.aPoints[p][1], ZC._i_(oGraphShape.aPoints[p][2] || aShapes[i]['z'] || '0'));
							aPoints.push(oPoint.aXY);
						}
						oGraphShape.aPoints = aPoints;
					} else {
						var oPoint = new ZC.ZCPoint3D(self, oGraphShape.iX, oGraphShape.iY, ZC._i_(aShapes[i]['z'] || '0'));
						oGraphShape.iX = ZC._i_(oPoint.aXY[0]);
						oGraphShape.iY = ZC._i_(oPoint.aXY[1]);
					}
					self.aShapes.push(oGraphShape);
					self.aObjects.push({type : 'shape', index : idx, zindex : oGraphShape.iZIndex, z3d : oPoint.iZ_});
					oGraphShape.oAttributes['3dtx'] = true;
				}
				oGraphShape.oAttributes['3d'] = true;
			} else {
				self.aShapes.push(oGraphShape);
				if (oGraphShape instanceof ZC.ZCGraphShape) {
					self.aObjects.push({type : 'shape', index : idx, zindex : oGraphShape.oShape.iZIndex});
				} else {
					self.aObjects.push({type : 'shape', index : idx, zindex : oGraphShape.iZIndex});
				}
			}
			idx++;
		}
	}
	//endif
	//if [IMAGES] then
	var aImages;
	if ((aImages=self.oData['images']) != null) {
		for (var i=0,iLen=aImages.length;i<iLen;i++) {
			var oImage = new ZC.ZCBox(self);
			var sSrc = aImages[i]['src'];
			oImage.append({
				'background-repeat' : 'no-repeat',
				'background-image' : sSrc,
				width : ZC.cache.data[sSrc].width,
				height : ZC.cache.data[sSrc].height
			});
			oImage.append(aImages[i]);
			var sId = aImages[i]['id'] || i;
			oImage.sObjectId = sId;
			oImage.sId = self.sId + '-image-' + sId;
			oImage.iIndex = i;
			oImage.parse();
			self.aImages.push(oImage);
			self.aObjects.push({type : 'image', index : i, zindex : oImage.iZIndex});
		}
	}
	//endif

	self.oAttributes['objects.updates'] = null;

	/* sort by 3dz */
	self.aObjects = self.aObjects.sort(function(a, b) {
		if (a.z3d != null && b.z3d != null) {
			if (a.z3d - b.z3d > 0) {
				return 1;
			} else {
				return -1;
			}
		} else {
			return 0;
		}
	});

	/* sort by z-index */
	self.aObjects = self.aObjects.sort(function(a, b) {
		/* HACK: thank you chrome for the strange sort... */
		if (a.zindex - b.zindex == 0) {
			return a.index - b.index;
		} else {
			return a.zindex - b.zindex;
		}
	});
		
	ZC._ts_end_('parseObjects');
};
ZC.ZCGraph.prototype.clearObjects = function(bDynamic, bAll) {
	//if DEFAULT then
	if (typeof(bDynamic) == 'undefined') { bDynamic = false; }
	if (typeof(bAll) == 'undefined') { bAll = false; }
	var self = this, oLayerC;
	var aLayers = [
		self.sId + '-objects-bottom-sh-c',
		self.sId + '-objects-bottom-c',
		self.sId + '-objects-top-sh-c',
		self.sId + '-objects-top-c',
		self.sId + '-objects-maps-sh-c',
		self.sId + '-objects-maps-c',
		self.sId + '-objects-front-c',
		self.sId + '-objects-print-c'
	];
	for (var i=0;i<aLayers.length;i++) {
		if ((oLayerC = ZC._id_(aLayers[i])) != null) {
			ZC.ZCHtmlUtils._clear_(oLayerC, self.oLoader.sOutput, self.iX, self.iY, self.iWidth, self.iHeight, self.sId);
		}	
	}
	/* in case we need to just move labels, don't remove the items */
	if (self.oParent.sOutput != 'canvas' || zingchart.CANVASTEXT || !ZC.objmove) {
		ZC.ZCQuery('.' + self.sId + '-label').remove();
		ZC.ZCQuery('.' + self.sId + '-shape-label').remove();
		ZC.ZCQuery('.' + self.sId + '-arrow-label').remove();
	}	
	if (!bDynamic) {
		//if [HTMLAREA] then
		ZC.ZCQuery('.' + self.sId + '-label-area').each(function() {
			var aMatches = (new RegExp('scale_(x|y|k|v)-item_([0-9]+)')).exec(this.id);
			if (bAll || (!aMatches || !aMatches.length)) {
				ZC.ZCHtmlUtils._remove_(this.id);
			}
		});
		ZC.ZCQuery('.' + self.sId + '-shape-area').remove();
		ZC.ZCQuery('.' + self.sId + '-arrow-area').remove();
		//endif
		//if [PIXMAP] then
		ZC.ZCPixMap.queryByCls(self.sId + '-label-area', function() {
			if (bAll || (this.id.indexOf('scale_') == -1 && this.id.indexOf('item_') == -1)) {
				ZC.ZCPixMap.removeById(this.id);
			}
		});
		ZC.ZCPixMap.removeByCls(self.sId + '-shape-area');
		ZC.ZCPixMap.removeByCls(self.sId + '-arrow-area');
		//endif
	}
	if (self.oParent.sOutput == 'svg') {
		/* remove clip tags */
		ZC.ZCQuery('#' + self.oParent.sId + '-svg').children().each(function() {
			var sCPId = self.sId + '-label-';
			if (this.tagName.toLowerCase() == 'clippath' && this.id.substring(0, sCPId.length) == sCPId) {
				ZC.ZCHtmlUtils._remove_(this.id);
			}
		});
	}
	//endif
};
ZC.ZCGraph.prototype.unbindObjects = function() {
	//if DEFAULT then
	var self = this;
	//if [LABELS] then
	ZC.ZCQuery('.' + self.sId + '-label-area')
		.die('mousedown mouseover touchstart', self.zc_label_mouseover)
		.die('mouseup mouseout touchend', self.zc_label_mouseout)
		.die('mousemove touchmove', self.zc_label_mousemove)
		.die('click', self.zc_label_click);
	//endif
	//if [SHAPES] then
	ZC.ZCQuery('.' + self.sId + '-shape-area')
		.die('mousedown mouseover touchstart', self.zc_shape_mouseover)
		.die('mouseup mouseout touchend', self.zc_shape_mouseout)
		.die('mousemove touchmove', self.zc_shape_mousemove)
		.die('click', self.zc_shape_click);
	//endif
	//endif
};
ZC.ZCGraph.prototype.detectDynamicObjects = function() {
	var self = this;
	self.bDynamicObjects = false;
	/* check if there are dynamic objects, look for %node-value, %plot-value or just plain dynamic attr */
	var aLabels, aShapes;
	if ((aLabels=self.oData['labels']) != null) {
		for (var i=0,iLen=aLabels.length;i<iLen;i++) {
			var sText = new String(aLabels[i]['text'] || '');
			if (sText.indexOf('%node-') != -1 || sText.indexOf('%plot-') != -1 || ZC._b_(aLabels[i]['dynamic'])) {
				self.bDynamicObjects = true;
				break;
			}
		}
	}
	if ((aShapes=self.oData['shapes']) != null) {
		for (var i=0,iLen=aShapes.length;i<iLen;i++) {
			if (ZC._b_(aShapes[i]['dynamic'])) {
				self.bDynamicObjects = true;
				break;
			}
		}
	}
};
ZC.ZCGraph.prototype.repaintObjects = function(bDynamic) {
	//if DEFAULT,NODEJS then
	var self = this;
	var bProcessRepaint = true;
	if (bDynamic && !self.bDynamicObjects) {
		bProcessRepaint = false;
	}
	if (bProcessRepaint) {
		self.clearObjects(bDynamic);
		self.parseObjects();
		self.paintObjects(bDynamic);
	}
	//endif
};
ZC.ZCGraph.prototype.paintObjects = function(bDynamic) {
	ZC._ts_begin_('paintObjects');
	if (typeof(bDynamic) == 'undefined') { bDynamic = false; }
	var self = this, mValue;
	var aHtml = [];
	//if [ARROWS] then
	function _paint_arrow_(i) {
		var oArrow = self.aArrows[i];
		if (oArrow.bVisible) {
			//if DEFAULT then
			oArrow.oCanvas = oArrow.oCanvasSh = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-' + (oArrow.iZIndex<0?'bottom':'top') + '-c');
			//endif
			//if NODEJS,SILKJS,RHINO then
			oArrow.oCanvas = oArrow.oCanvasSh = self.oParent.oCanvas;
			//endif
			oArrow.paint();
			//if [HTMLAREA] then
			if (ZC._id_(self.oParent.sId + '-map')) {
				var aAreaInfo = oArrow.oShape.getAreaInfo();
				aHtml.push(ZC.ZCHtmlUtils._area_start_(aAreaInfo[0], oArrow.oShape.sUrl, oArrow.oShape.sCursor) + 'class="' + self.sId + '-arrow-area zc-arrow-area' + '" id="' + oArrow.oShape.sId + '-area" coords="' + aAreaInfo[1] + '" />');
			}
			//endif
		}
	}
	//endif
	//if [SHAPES] then
	function _paint_shape_(i) {
		if (!self.aShapes[i]) {
			return;
		}
		var oGraphShape = self.aShapes[i];
		var oShape_ = (oGraphShape instanceof ZC.ZCGraphShape)?oGraphShape.oShape:oGraphShape;
		/*var oShape_ = (oGraphShape.oAttributes['3d'])?oGraphShape:oGraphShape.oShape;*/

		if (oShape_.bVisible) {
			if (!oGraphShape.oAttributes['3d'] || oGraphShape.oAttributes['3dtx']) {
				//if DEFAULT then
				oGraphShape.oCanvas = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-' + (oShape_.iZIndex<0?'bottom':'top') + '-c');
				oGraphShape.oCanvasSh = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-' + (oShape_.iZIndex<0?'bottom':'top') + '-sh-c');
				//if [MAPS] then
				if (oShape_.oData['map-item']) {
					oGraphShape.oCanvas = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-maps-c');
					oGraphShape.oCanvasSh = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-maps-sh-c');
				}
				//endif
				//endif
				//if NODEJS,SILKJS,RHINO then
				oGraphShape.oCanvas = self.oParent.oCanvas;
				oGraphShape.oCanvasSh = self.oParent.oCanvasPlotSetSh;
				//endif
				oGraphShape.bIsTop = false;
				oGraphShape.oAttributes['print-canvas'] = self.sId + '-objects-print-c';
				oGraphShape.paint();
			}
			//if DEFAULT then
			if (!oGraphShape.bFlat && !self.bObjectsTweening && zingchart.OBJECTMODE == 'normal') {
				var aAreaInfo = oShape_.getAreaInfo();
				//if [HTMLAREA] then
				if (ZC._id_(self.oParent.sId + '-map')) {
				//endif
				//if [PIXMAP] then
				if (ZC._id_(self.oParent.sId + '-pixmap')) {
				//endif
				//if [HTMLAREA,PIXMAP] then
					for (var j=1,jLen=aAreaInfo.length;j<jLen;j++) {
						if (aAreaInfo[j] != '') {
				//endif
							//if [HTMLAREA] then
							var sDataMap = (oShape_.oData['map-item'])?' data-map="1"':'';
							aHtml.push(ZC.ZCHtmlUtils._area_start_(aAreaInfo[0], oShape_.sUrl, oShape_.sCursor) + 'class="' + self.sId + '-shape-area zc-shape-area' + '" id="' + oShape_.sId + '-area' + (j>1?('--'+j):'') + '" coords="' + aAreaInfo[j] + '" data-z-sort="' + oShape_.iZSort + '"' + sDataMap + ' />');
							//endif
							//if [PIXMAP] then
							switch (aAreaInfo[0]) {
								case 'circle':
									var aCoords = aAreaInfo[1].split(',');
									ZC.ZCPixMap.add({
										type : 'c',
										group : 'shape',
										cls : self.sId + '-shape-area zc-shape-area',
										id : oShape_.sId + '-area' + (j>1?('--'+j):''),
										x : aCoords[0],
										y : aCoords[1],
										r : aCoords[2],
										z : oShape_.iZSort
									});
									break;
								case 'poly':
									ZC.ZCPixMap.add({
										type : 'p',
										group : 'shape',
										cls : self.sId + '-shape-area zc-shape-area',
										id : oShape_.sId + '-area' + (j>1?('--'+j):''),
										points : ZC.ZCPixMap.coordsToPoints(aAreaInfo[j]),
										z : oShape_.iZSort
									});
									break;
							}
							//endif
				//if [HTMLAREA,PIXMAP] then
						}
					}
				}
				//endif
			}
			//endif
		}
	}
	//endif
	//if [IMAGES] then
	function _paint_image_(i) {
		var oImage = self.aImages[i];
		if (oImage.bVisible) {
			//if DEFAULT then
			oImage.oCanvas = oImage.oCanvasSh = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-' + (oImage.iZIndex<0?'bottom':'top') + '-c');
			//endif
			//if NODEJS,SILKJS,RHINO then
			oImage.oCanvas = oImage.oCanvasSh = self.oParent.oCanvas;
			//endif
			oImage.paint();
		}
	}
	//endif
	//if [LABELS] then
	function _paint_label_(i) {
		var oLabel = self.aLabels[i];
		if (oLabel.bVisible) {
			if ((mValue=oLabel.oAttributes['hook']) != null) {
				var aHook = self.getHookXY(mValue);
				if (aHook[0] != -1) {
					oLabel.iX = aHook[0];
				}
				if (aHook[1] != -1) {
					oLabel.iY = aHook[1];
				}
				if (aHook[2] != null && !oLabel.oData['anchor']) {
					if (aHook[2]['center'] != null && aHook[2]['center']) {
						oLabel.iX -= oLabel.iWidth/2;
						oLabel.iY -= oLabel.iHeight/2;
					}
				}
				if (oLabel.oData['anchor']) {
					oLabel.setAnchor();
				}
			}

			oLabel.iX = ZC._i_(oLabel.iX);
			oLabel.iY = ZC._i_(oLabel.iY);

			//if DEFAULT then
			oLabel.oDOMParent = ZC._id_(self.oParent.sId + '-text');
			oLabel.oCanvas = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-' + (oLabel.iZIndex<0?'bottom':'top') + '-c');
			oLabel.oCanvasSh = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-objects-' + (oLabel.iZIndex<0?'bottom':'top') + '-sh-c');
			//endif
			//if NODEJS,SILKJS,RHINO then
			oLabel.oCanvas = self.oParent.oCanvas;
			oLabel.oCanvasSh = self.oParent.oCanvasPlotSetSh;
			//endif

			var sLimit = '';
			if ((mValue=oLabel.oData['limit']) != null) {
				if (mValue == 'x') {
					sLimit = 'x';
				} else if (mValue == 'y') {
					sLimit = 'y';
				} else if (mValue == 'xy') {
					sLimit = 'xy';
				}
			}

			if (
				(sLimit == '')
				||
				(sLimit == 'x' && ZC._btw_(oLabel.iX - oLabel.iOffsetX, self.oPlotArea.iX - oLabel.iWidth/2 - 2, self.oPlotArea.iX + self.oPlotArea.iWidth - oLabel.iWidth/2 + 2))
				||
				(sLimit == 'y' && ZC._btw_(oLabel.iY - oLabel.iOffsetY, self.oPlotArea.iY - oLabel.iHeight/2 - 2, self.oPlotArea.iY + self.oPlotArea.iHeight - oLabel.iHeight/2 + 2))
				||
				(sLimit == 'xy' && ZC._btw_(oLabel.iX + oLabel.iOffsetX, self.oPlotArea.iX - oLabel.iWidth/2 - 2, self.oPlotArea.iX + self.oPlotArea.iWidth - oLabel.iWidth/2 + 2) && ZC._btw_(oLabel.iY + oLabel.iOffsetY, self.oPlotArea.iY - oLabel.iHeight/2 - 2, self.oPlotArea.iY + self.oPlotArea.iHeight - oLabel.iHeight/2 + 2))
			) {
				oLabel.bIsTop = false;
				oLabel.paint();
				oLabel.paintPrintVersion(ZC._id_(self.sId + '-objects-print-c'));
				//if DEFAULT then
				if (!oLabel.bFlat && !self.bObjectsTweening && zingchart.OBJECTMODE == 'normal')  {
					//if [HTMLAREA] then
					if (ZC._id_(self.oParent.sId + '-map')) {
						aHtml.push(ZC.ZCUtils._box_area_(self.sId, oLabel));
					}
					//endif
					//if [PIXMAP] then
					if (ZC._id_(self.oParent.sId + '-pixmap')) {
						ZC.ZCUtils._box_area_(self.sId, oLabel);
					}
					//endif
				}
				//endif
			}
		}
	}
	//endif

	for (var i=0,iLen=self.aObjects.length;i<iLen;i++) {
		var ii = self.aObjects[i].index;
		switch (self.aObjects[i].type) {
			case 'arrow':
				_paint_arrow_(ii);
				break;
			case 'shape':
				_paint_shape_(ii);
				break;
			case 'image':
				_paint_image_(ii);
				break;
			case 'label':
				_paint_label_(ii);
				break;
		}
	}

	//if [HTMLAREA] then
	if (!bDynamic && zingchart.OBJECTMODE == 'normal') {
		if (aHtml.length > 0 && ZC._id_(self.oParent.sId + '-map')) {
			if (self.bSortObjects) {
				aHtml.sort(function(a, b) {
					if (a.indexOf('data-map') != -1 && b.indexOf('data-map') != -1) {
						return (ZC.ZCUtils._area_score_(a) > ZC.ZCUtils._area_score_(b))?-1:1;
					} else {
						return (ZC.ZCUtils._area_score_(a) > ZC.ZCUtils._area_score_(b))?1:-1;
					}
				});
			}
			ZC._id_(self.oParent.sId + '-map').innerHTML += aHtml.join('');
		}
	}
	//endif
	ZC.ZCUtils._trigger_event_('objectsready', self.oParent, self._api_graph_info_());
	ZC._ts_end_('paintObjects');
};
ZC.ZCGraph.prototype.showObjectsLayer = function(sType, iIdx, sLayer) {
	//if DEFAULT then
	var self = this;
	sLayer = sLayer || 'hover';
	switch (sType) {
		case 'shape':
			var si = self.aShapes[iIdx];
			/*var oShape_ = (si.oAttributes['3d'])?si:si.oShape;*/
			var oShape_ = (si instanceof ZC.ZCGraphShape)?si.oShape:si;

			if (oShape_.oData[sLayer + '-state'] != null) {
				if (oShape_.sShape == 'rectangle') {
					var oShape = new ZC.ZCBox(self);
				} else {
					var oShape = new ZC.ZCShape(self);
				}
				oShape.append(oShape_.oData);
				oShape.append(oShape_.oData[sLayer + '-state']);
				var sId = si['id'] || iIdx;
				oShape.sObjectId = sId + '-' + sLayer;
				oShape.sId = self.sId + '-shape-' + sId + '-' + sLayer;
				oShape.parse();

				if (si.oAttributes['3d']) {
					oShape.aPoints = oShape_.aPoints;
					oShape.iX = si.iX;
					oShape.iY = si.iY;
				}
				if (oShape.bVisible) {
					oShape.oCanvas = oShape.oCanvasSh = ZC._id_(self.sId + '-objects-hover-c');
					//if [MAPS] then
					if (oShape.oData['map-item']) {
						oShape.oCanvas = oShape.oCanvasSh = ZC._id_(self.sId + '-objects-maps-hover-c');
					}
					//endif
					
					if (oShape.oData['map-item'] && zingchart.maps.LITE && self.oParent.sOutput != 'canvas') {
						if (self.oParent.sOutput == 'svg') {
							var oSVGPath = ZC.ZCQuery('#'+self.sId+'-shape-'+oShape.sObjectId+'-gshape-path');
							self.oAttributes['map-shape-info'] = {
								'fill' : oSVGPath.attr('fill'),
								'stroke' : oSVGPath.attr('stroke'),
								'stroke-width' : oSVGPath.attr('stroke-width')
							};
							if (oShape.sShape == 'poly') {
								oSVGPath.attr('fill', oShape.sBackgroundColor1);
								oSVGPath.attr('stroke-width', oShape.iBorderWidth);
								oSVGPath.attr('stroke', oShape.sBorderColor);
							} else if (oShape.sShape == 'line') {
								oSVGPath.attr('stroke-width', oShape.iLineWidth);
								oSVGPath.attr('stroke', oShape.sLineColor);
							}
						} else if (self.oParent.sOutput == 'vml') {
							var oVMLShape = ZC._id_(self.sId+'-shape-'+oShape.sObjectId+'-gshape-path');
							var oVMLStroke = ZC.ZCQuery(oVMLShape.childNodes[1]);
							var oVMLFill = ZC.ZCQuery(oVMLShape.childNodes[2]);
							self.oAttributes['map-shape-info'] = {
								fill : (''+oVMLFill.attr('color')),
								stroke : (''+oVMLStroke.attr('color')),
								'stroke-width' : (''+oVMLStroke.attr('weight'))
							};
							if (oShape.sShape == 'poly') {
								oVMLFill.attr('color', oShape.sBackgroundColor1);
								oVMLStroke.attr('weight', oShape.iBorderWidth);
								oVMLStroke.attr('color', oShape.sBorderColor);
							} else if (oShape.sShape == 'line') {
								oVMLStroke.attr('weight', oShape.iLineWidth);
								oVMLStroke.attr('color', oShape.sLineColor);
							}
						}
					} else {
						oShape.paint();
						if (self.oParent.sOutput == 'canvas' && zingchart.CANVASTEXT) {
							if (si.oLabel) {
								si.oLabel.oCanvas = si.oLabel.oCanvasSh = ZC._id_(self.sId + '-objects-hover-c');
								si.oLabel.paint();
							}
						}
					}
				}
			}
			break;
		case 'label':
			var li = self.aLabels[iIdx];
			if (li && li.oData[sLayer + '-state'] != null) {
				/*var oLabel = new ZC.ZCTextBox(self);*/
				var oLabel = zingchart.pool.getInstance('ZCTextBox', self, self.sId + '-label-' + sLayer);
				oLabel.append(li.oData);
				oLabel.append(li.oData[sLayer + '-state']);
				var sId = li['id'] || iIdx;
				oLabel.sObjectId = sId + '-' + sLayer;
				oLabel.sId = self.sId + '-label-' + sId + '-' + sLayer;
				oLabel.sDOMClass = self.sId + '-label ' + self.sId + '-label-' + sLayer + ' zc-label zc-label-' + sLayer;
				oLabel.oDOMParent = ZC._id_(self.oParent.sId + '-text');
				oLabel.parse();
				if (oLabel.bVisible) {
					oLabel.iX = li.iX;
					oLabel.iY = li.iY;
					oLabel.iWidth = li.iWidth;
					oLabel.iHeight = li.iHeight;
					oLabel.oCanvas = oLabel.oCanvasSh = ZC._id_(self.sId + '-objects-hover-c');
					/* !!! */
					if (ZC._id_(self.sId + '-label-' + sId)) {
						ZC._id_(self.sId + '-label-' + sId).style.display = 'none';
					}
					oLabel.paint();
				}
			}
			break;
	}
	//endif
};
ZC.ZCGraph.prototype.bindObjects = function() {
	//if DEFAULT then
	var self = this;
	//if [SHAPES] then
	function _shape_info_(ev) {
		var sTargetId = ev.targetid || ev.target.id;
		var sObjectId = sTargetId.replace(/\-\-\d+/g, '').replace(self.sId + '-shape-', '').replace('-gshape-area', '').replace('-area', '');
		var iShapeIdx = -1, oShape = null;
		for (var i=0,iLen=self.aShapes.length;i<iLen;i++) {
			if (self.aShapes[i]) {
				if (self.aShapes[i].sObjectId == sObjectId) {
					iShapeIdx = i;
					/*oShape = (self.aShapes[i].oAttributes['3d'])?self.aShapes[i]:self.aShapes[i].oShape;*/
					oShape = (self.aShapes[i] instanceof ZC.ZCGraphShape)?self.aShapes[i].oShape:self.aShapes[i];
					break;
				}
			}
		}
		if (!oShape && ev.target.getAttribute('data-lowlevel')) {
			return {
				shapeid : ev.target.id,
				lowlevel : true,
				ev : ev
			};
		}

		return (iShapeIdx==-1)?null:{
			/* backwards compat */
			shapeid : sObjectId, 
			shapeindex : iShapeIdx, 
			shape : {
				id : sObjectId, 
				index : iShapeIdx,
				cls : oShape.sClass, 
				x : oShape.iX, 
				y : oShape.iY, 
				type : oShape.sShape,
				mapItem : oShape.oData['map-item'],
				points : oShape.aPoints,
				width : oShape.iWidth, 
				height : oShape.iHeight,
				size : oShape.iSize,
				size2 : oShape.iSize2,
				angle : oShape.iAngle,
				zIndex : oShape.iZIndex
			},
			ev : ev
		};
	};
	self.zc_shape_mouseover = function(ev) {
		if (ZC.mobile) {
			ZC.move = false;
			self.oLoader.hideCM();
			ev.preventDefault();
			self.oParent.trackTouchHold(ev);
		}
		if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
			self.oParent.oTooltip.onmouseover(ev);
		}
		var sEvent = ZC.mobile?'mousedown':(ev.xtype || ev.type);
		var oInfo = _shape_info_(ev);
		if (!oInfo.lowlevel) {
			self.showObjectsLayer('shape', oInfo['shapeindex']);
		}
		self._api_shape_event_(sEvent, oInfo);
	};
	self.zc_shape_mouseout = function(ev) {
		if (ZC.mobile) {
			if (!self.oLoader.bCM && !ZC.move) {
				zingchart.zc_click(ev);
				self.zc_shape_click(ev);
			}
			self.oParent.zc_loader_kill_touchhold(ev);
		}
		if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
			self.oParent.oTooltip.onmouseout(ev);
		}
		if (!ZC.mobile) {
			self.hideLayer();
		}
		var sEvent = ZC.mobile?'mouseup':(ev.xtype || ev.type);
		var oInfo = _shape_info_(ev);
		
		if (oInfo.shape && oInfo.shape.mapItem && zingchart.maps.LITE && self.oParent.sOutput != 'canvas') {
			if (self.oParent.sOutput == 'svg') {
				var oSVGPath = ZC.ZCQuery('#'+self.sId+'-shape-'+oInfo.shape.id+'-gshape-path');
				if (oInfo.shape.type == 'poly') {
					oSVGPath.attr('fill', self.oAttributes['map-shape-info']['fill']);
				}
				oSVGPath.attr('stroke', self.oAttributes['map-shape-info']['stroke']);
				oSVGPath.attr('stroke-width', self.oAttributes['map-shape-info']['stroke-width']);
			} else if (self.oParent.sOutput == 'vml') {
				var oVMLShape = ZC._id_(self.sId+'-shape-'+oInfo.shape.id+'-gshape-path');
				var oVMLStroke = oVMLShape.childNodes[1];
				var oVMLFill = oVMLShape.childNodes[2];
				if (oInfo.shape.type == 'poly') {
					var oMapShapeInfo = self.oAttributes['map-shape-info'];
					ZC.ZCHtmlUtils._attr_(oVMLFill, {
						color : self.oAttributes['map-shape-info']['fill']
					});
				}
				ZC.ZCHtmlUtils._attr_(oVMLStroke, {
					weight : self.oAttributes['map-shape-info']['stroke-width'],
					color : self.oAttributes['map-shape-info']['stroke']
				});
			}
		}
		
		self._api_shape_event_(sEvent, oInfo);
	};
	self.zc_shape_mousemove = function(ev) {
		if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
			self.oParent.oTooltip.onmousemove(ev);
		}
		var oInfo = _shape_info_(ev);
		self._api_shape_event_('mousemove', oInfo);
	};
	self.zc_shape_click = function(ev) {
		var oInfo = _shape_info_(ev);
		self._api_shape_event_('click', oInfo);
		var oShape = self.aShapes[oInfo['shapeindex']].oShape;
		if (oShape && oShape.sUrl && oShape.sUrl != 'NULL') {
			if (oShape.sUrl instanceof Array) {
				for (var u=0;u<oShape.sUrl.length;u++) {
					if (oShape.sTarget[u] != null) {
						self._onclick_(ev, oShape.sUrl[u], oShape.sTarget[u]);
					}
				}
			} else {
				self._onclick_(ev, oShape.sUrl, oShape.sTarget);
			}
		}
	};
	ZC.ZCQuery('.' + self.sId + '-shape-area')
		.live('mousedown mouseover touchstart', self.zc_shape_mouseover)
		.live('mouseup mouseout touchend', self.zc_shape_mouseout)
		.live('mousemove touchmove', self.zc_shape_mousemove);
	if (!ZC.mobile) {
		ZC.ZCQuery('.' + self.sId + '-shape-area')
			.live('click', self.zc_shape_click);
	}
	//endif
	//if [LABELS] then
	function _label_info_(ev) {
		var sTargetId = ev.targetid || ev.target.id;
		if (sTargetId.indexOf('-scale') != -1 && sTargetId.indexOf('-item') != -1) {
			/* scale item */
			var sObjectId = sTargetId.replace(self.sId + '-', '').replace('-area', '');
			var aTokens = sObjectId.split('-');
			var aItemTokens = aTokens[1].split('_');
			var iItemIdx = 0;
			if (aItemTokens.length == 2) {
				iItemIdx = ZC._i_(aItemTokens[1]);
			} else if (aItemTokens.length == 3) {
				iItemIdx = ZC._i_(aItemTokens[2]);
			}
			var sScaleName = aTokens[0].replace(/_/g, '-');
			var oScale = self.getScaleByName(sScaleName);

			var sText = oScale.aLabels[iItemIdx] || oScale.aValues[iItemIdx];
			return {
				/* backwards compat */
				type : 'scale-item',
				labelid : 'si_' + aTokens[1].replace('item_', ''), 
				labelindex : iItemIdx,
				scale : sScaleName,
				text : sText, 
				label : {
					id : 'si_' + aTokens[1].replace('item_', ''), 
					index : iItemIdx, 
					text : sText
				},
				ev : ev
			};
		} else if (sTargetId.indexOf('-value-box-') != -1) {
			var sObjectId = sTargetId.replace(self.sId + '-plotset-plot-', '').replace('-value-box-area', '');
			var aTokens = sObjectId.split('-node-');
			var oNode = self.oPlotSet.aPlots[ZC._i_(aTokens[0])].getNode(ZC._i_(aTokens[1]));
			return !oNode?null:{
				/* backwards compat */
				type : 'value-box',
				labelid : 'vb_' + aTokens.join('_'), 
				plotindex : ZC._i_(aTokens[0]), 
				nodeindex : ZC._i_(aTokens[1]), 
				text : oNode.fValue, 
				label : {
					id : 'vb_' + aTokens.join('_'), 
					text : oNode.fValue
				},
				ev : ev
			};
		} else {
			var sObjectId = sTargetId.replace(self.sId + '-label-', '').replace('-area', '');
			var iLabelIdx = -1, oLabel = null;
			for (var i=0,iLen=self.aLabels.length;i<iLen;i++) {
				if (self.aLabels[i].sObjectId == sObjectId) {
					iLabelIdx = i;
					oLabel = self.aLabels[i];
					break;
				}
			}
			var sText = self.aLabels[iLabelIdx].sText;
			return (iLabelIdx==-1)?null:{
				/* backwards compat */
				type : 'label',
				labelid : sObjectId, 
				labelindex : iLabelIdx, 
				text : sText, 
				label : {
					id : sObjectId, 
					index : iLabelIdx, 
					cls : oLabel.sClass,
					x : oLabel.iX,
					y : oLabel.iY,
					width : oLabel.iWidth,
					height : oLabel.iHeight,
					text : sText
				},
				ev : ev
			};
		}
	};
	self.zc_label_mouseover = function(ev) {
		if (ZC.mobile) {
			ZC.move = false;
			self.oLoader.hideCM();
			ev.preventDefault();
			self.oParent.trackTouchHold(ev);
		}
		if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
			self.oParent.oTooltip.onmouseover(ev);
		}
		var oInfo = _label_info_(ev);
		var sEvent = ZC.mobile?'mousedown':(ev.xtype || ev.type);
		self.showObjectsLayer('label', oInfo['labelindex']);
		self._api_label_event_(sEvent, oInfo);
	};
	self.zc_label_mouseout = function(ev) {
		if (ZC.mobile) {
			if (!self.oLoader.bCM && !ZC.move) {
				zingchart.zc_click(ev);
				self.zc_label_click(ev);
			}
			self.oParent.zc_loader_kill_touchhold(ev);
		}
		if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
			self.oParent.oTooltip.onmouseout(ev);
		}
		if (!ZC.mobile) {
			self.hideLayer();
		}
		var oInfo = _label_info_(ev);
		var sEvent = ZC.mobile?'mouseup':(ev.xtype || ev.type);
		if (ZC._id_(self.sId + '-label-' + oInfo.label.id)) {
			ZC._id_(self.sId + '-label-' + oInfo.label.id).style.display = 'block';
		}
		self._api_label_event_(sEvent, oInfo);
	};
	self.zc_label_mousemove = function(ev) {
		if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
			self.oParent.oTooltip.onmousemove(ev);
		}
		var oInfo = _label_info_(ev);
		self._api_label_event_('mousemove', oInfo);
	};
	self.zc_label_click = function(ev) {
		var oInfo = _label_info_(ev);
		self._api_label_event_('click', oInfo);
		var oLabel = self.aLabels[oInfo['labelindex']];
		if (oLabel && oLabel.sUrl && oLabel.sUrl != 'NULL') {
			if (oLabel.sUrl instanceof Array) {
				for (var u=0;u<oLabel.sUrl.length;u++) {
					if (oLabel.sTarget[u] != null) {
						sUrl[u] = sUrl[u].replace('%id', self.oParent.sId);
						sUrl[u] = sUrl[u].replace('%graphid', self.sId.replace(self.oParent.sId+'-graph-', ''));
						self._onclick_(ev, oLabel.sUrl[u], oLabel.sTarget[u]);
					}
				}
			} else {
				oLabel.sUrl = oLabel.sUrl.replace('%id', self.oParent.sId);
				oLabel.sUrl = oLabel.sUrl.replace('%graphid', self.sId.replace(self.oParent.sId+'-graph-', ''));
				self._onclick_(ev, oLabel.sUrl, oLabel.sTarget);
			}
		}
	};
	ZC.ZCQuery('.' + self.sId + '-label-area')
		.live('mousedown mouseover touchstart', self.zc_label_mouseover)
		.live('mouseup mouseout touchend', self.zc_label_mouseout)
		.live('mousemove touchmove', self.zc_label_mousemove);
	if (!ZC.mobile) {
		ZC.ZCQuery('.' + self.sId + '-label-area')
			.live('click', self.zc_label_click);
	}
	//endif
	//endif
};
ZC.ZCGraph.prototype._api_label_event_ = function(sEvent, oParams) {
	//if DEFAULT then
	var self = this;
	ZC._cp_(self._api_graph_info_(), oParams);
	oParams.ev = ZC.ZCQuery._event_(oParams.ev);
	ZC.ZCUtils._trigger_event_('label_' + sEvent, self.oParent, oParams);
	//endif
};
ZC.ZCGraph.prototype._api_shape_event_ = function(sEvent, oParams) {
	//if DEFAULT then
	var self = this;
	ZC._cp_(self._api_graph_info_(), oParams);
	oParams.ev = ZC.ZCQuery._event_(oParams.ev);
	ZC.ZCUtils._trigger_event_('shape_' + sEvent, self.oParent, oParams);
	//endif
};
ZC.ZCGraph.prototype.getHookXY = function(oHook) {
	var self = this, mValue;

	if (typeof(oHook) == 'string') {
		var oHook_ = {};
		var aTmp = oHook.split(':');
		if (aTmp.length == 2) {
			oHook_['type'] = aTmp[0];
			aTmp = aTmp[1].split(/\s|,|;/);
			for (var i=0,iLen=aTmp.length;i<iLen;i++) {
				var aKV = aTmp[i].split('=');
				oHook_[aKV[0]] = aKV[1];
			}
		}
		oHook = oHook_;
	}
	var aXY = [-1, -1];
	if (oHook['x'] != null) {
		aXY[0] = ZC._i_(oHook['x']);
	}
	if (oHook['y'] != null) {
		aXY[1] = ZC._i_(oHook['y']);
	}
	switch (oHook['type']) {
		case 'scale':
			var sScaleName = '';
			var iScaleIndex = -1;
			var fScaleValue = null;
			if ((mValue=oHook['name']) != null) {
				sScaleName = mValue;
			}
			if ((mValue=oHook['index']) != null) {
				iScaleIndex = ZC._i_(mValue);
			}
			if ((mValue=oHook['value']) != null) {
				fScaleValue = ZC._i_(mValue);
			}
			var oScale = null, iX, iY;
			if (sScaleName == '') {
				sScaleName = 'scale-x';
			}
			oScale = self.getScaleByName(sScaleName);
			if (oScale != null) {
				if (fScaleValue != null) {
					iX = oScale.getCoordByValue(fScaleValue);
				} else if (iScaleIndex != -1) {
					iX = oScale.getCoordByValue(oScale.aValues[iScaleIndex]);
				}
				iY = oScale.iY;
				if (oScale.iIndex == 1) {
					iY += oScale.iHeight;
				}
			}
			aXY = [iX, iY, {center:true}];
			break;
		case 'node':
			var iPlotIndex = -1;
			var iNodeIndex = -1;
			var fNodeValue = null;
			var fNodeKeyValue = null;
			if ((mValue=oHook['plot']) != null) {
				iPlotIndex = ZC._i_(mValue);
			}
			if ((mValue=oHook['index']) != null) {
				iNodeIndex = ZC._i_(mValue);
			}
			if ((mValue=oHook['value']) != null) {
				fNodeValue = mValue;
			}
			if ((mValue=oHook['keyvalue']) != null) {
				fNodeKeyValue = mValue;
			}
			var oPlot = null, oNode = null;
			if (iPlotIndex == -1) {
				iPlotIndex = 0;
			}

			if ((oPlot=self.oPlotSet.aPlots[iPlotIndex]) != null) {
				if (iNodeIndex != -1 && oPlot.aPlotNodes[iNodeIndex] != null) {
					oNode = oPlot.getNode(iNodeIndex, 3);
				} else if (fNodeValue != null || fNodeKeyValue != null) {
					for (var j=0,jLen=oPlot.aPlotNodes.length;j<jLen;j++) {
						if (oPlot.aPlotNodes[j] != null) {
							if (oPlot.aPlotNodes[j].fValue == fNodeValue) {
								oNode = oPlot.getNode(j, 3);
							}
							if (oPlot.aPlotNodes[j].fKeyValue != null && oPlot.aPlotNodes[j].fKeyValue == fNodeKeyValue) {
								oNode = oPlot.getNode(j, 3);
							}
						}
					}
				}
				if (oNode != null) {
					oNode.setup();
					aXY = oNode.getHookXY(oHook);
				}
			}
			break;
	}
	if ((mValue=oHook['offset-x']) != null) {
		aXY[0] += ZC._i_(mValue);
	}
	if ((mValue=oHook['offset-y']) != null) {
		aXY[1] += ZC._i_(mValue);
	}
	return aXY;
};
/* add the API */
zingchart.exec_html5_objects = function(sId, sCall, oParams) {
	//if DEFAULT,NODEJS then
	//if DEFAULT then
	if (document.getElementById('zc-fullscreen')) {
		sId = 'zc-fullscreen';
	}
	//endif
	oParams = oParams || {};
	if (typeof(oParams) == 'string') {
		oParams = JSON.parse(oParams);
	}
	var bUpdate = !(oParams['update'] != null && !ZC._b_(oParams['update']));

	//if [DEBUG] then
	if (bUpdate) {
		if (typeof(ZC.EXEC['api.objects.updates']) == 'undefined') {
			ZC.EXEC['api.objects.updates'] = 0;
		}
		ZC.EXEC['api.objects.updates']++;
	}
	//endif

	var bDynamic = oParams['dynamic']?ZC._b_(oParams['dynamic']):false;
	var oLoader = zingchart.getLoader(sId);
	if (oLoader != null) {
		switch (sCall) {
			case 'addobject':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph && oParams['data']) {
					var bSet = (oParams['data'] instanceof Array);
					var oData = bSet?[]:{};
					ZC._cp_(oParams['data'], oData);
					var sType = oParams['type'] || 'label';
					if (bSet) {
						for (var i=0,iLen=oData.length;i<iLen;i++) {
							var sType = oParams['type'] || oData[i]['objtype'] || 'label';
							if (!oGraph.oData[sType + 's']) {
								oGraph.oData[sType + 's'] = [];
							}
							oGraph.oData[sType + 's'].push(oData[i]);
						}
					} else {
						if (!oGraph.oData[sType + 's']) {
							oGraph.oData[sType + 's'] = [];
						}
						oGraph.oData[sType + 's'].push(oData);
					}
					if (bUpdate) {
						oGraph.detectDynamicObjects();
						oGraph.repaintObjects(bDynamic);
					}
				}
				break;
			case 'removeobject':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oParams['class']) { oParams['cls'] = oParams['class']; } 
				if (oGraph && (oParams['id'] || oParams['cls'])) {
					oGraph.hideLayer();
					var sType = oParams['type'] || 'label';
					var aObjects = oGraph.oData[sType + 's'] || [];
					if (oParams['id']) {
						var aIds = (typeof(oParams['id']) == 'string')?[oParams['id']]:oParams['id'];
					} else {
						var aIds = [];
					}
					if (oParams['cls']) {
						var aCls = (typeof(oParams['cls']) == 'string')?[oParams['cls']]:oParams['cls'];
					} else {
						var aCls = [];
					}
					var bFound = false;
					var aRemove = [];
					for (var i=aObjects.length-1;i>=0;i--) {
						if (
							(aObjects[i]['id'] != null && ZC._indexof_(aIds, aObjects[i]['id']) != -1)
							||
							(aObjects[i]['cls'] != null && ZC._indexof_(aCls, aObjects[i]['cls']) != -1)
						) {
							if (aObjects[i]['id'] != null) {
								aRemove.push(aObjects[i]['id']);
							}
							aObjects.splice(i, 1);
							bFound = true;
						}
					}
					for (var i=0;i<aRemove.length;i++) {
						/* delete possible gradients */
						ZC.ZCHtmlUtils._remove_([
							oGraph.sId + '-label-' + aRemove[i] + '-gradient', 
							oGraph.sId + '-label-' + aRemove[i] + '-top-gradient', 
							oGraph.sId + '-shape-' + aRemove[i] + '-gradient', 
							oGraph.sId + '-shape-' + aRemove[i] + '-top-gradient',
							oGraph.sId + '-shape-' + aRemove[i] + '-gshape-gradient', 
							oGraph.sId + '-shape-' + aRemove[i] + '-gshape-top-gradient'
						]);
					}
					if (bFound && bUpdate) {
						oGraph.detectDynamicObjects();
						oGraph.repaintObjects(bDynamic);
					}
				}
				break;
			case 'updateobject':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph && oParams['data']) {
					oGraph.oAttributes['objects.updates'] = [];
					var sType = oParams['type'] || 'label';
					var aObjects = oGraph.oData[sType + 's'];
					var bSet = (oParams['data'] instanceof Array);
					var oData = bSet?[]:{};
					ZC._cp_(oParams['data'], oData);

					var bFound = false;

					function _update_(oData, oObject) {
						oGraph.oAttributes['objects.updates'].push(oData['id']);
						ZC._cp_(oData, oObject);
						if (oData['animation'] != null) {
							var oGraphObject = null;
							/* for animation we need to reference the object from the collections instead of the raw data */
							if (sType == 'label') {
								for (var i=0,iLen=oGraph.aLabels.length;i<iLen;i++) {
									if (oGraph.aLabels[i].sObjectId == oData['id']) {
										oGraphObject = oGraph.aLabels[i];
										break;
									}
								}
							} else if (sType == 'shape') {
								for (var i=0,iLen=oGraph.aShapes.length;i<iLen;i++) {
									if (oGraph.aShapes[i].sObjectId == oData['id']) {
										oGraphObject = oGraph.aShapes[i].oShape;
										break;
									}
								}
							}
							var oTM = oGraph.oTweenManager;
							var oAnimationData = {};
							ZC._cp_(oData, oAnimationData);

							/* fix x, y and points */
							if (oAnimationData['x'] != null) {
								oAnimationData['x'] += oGraph.iX;
							}
							if (oAnimationData['y'] != null) {
								oAnimationData['y'] += oGraph.iY;
							}
							if (oAnimationData['points'] != null) {
								for (var i=0,iLen=oAnimationData['points'].length;i<iLen;i++) {
									if (oAnimationData['points'][i] != null) {
										oAnimationData['points'][i][0] += oGraph.iX;
										oAnimationData['points'][i][1] += oGraph.iY;
										if (oAnimationData['points'][i][2] != null) {
											oAnimationData['points'][i][2] += oGraph.iX;
										}
										if (oAnimationData['points'][i][3] != null) {
											oAnimationData['points'][i][3] += oGraph.iY;
										}
									}
								}
							}

							oAnimationData['animation'] = null;
							var oTween = new ZC.ZCTween(
								oGraphObject,
								oAnimationData,
								ZC._i_(oData['animation']['speed'] || '300'),
								ZC._i_(oData['animation']['delay'] || '0'),
								ZC.ZCTween.aMethods[ZC._i_(oData['animation']['method'] || '0')],
								function() {
									if (oData['animation']['end'] != null) {
										oData['animation']['end'].call();
									}
								}
							);
							oGraph.bObjectsTweening = true;
							window.setTimeout(function() {
								oTM.add(oTween);
							}, 33);
						}
						bFound = true;
					}

					if (bSet) {
						/* if mixing animation updates with no-animation updates, a call to parseObjects is required since tweening just calls paintObjects */
						var bYes = false, bNo = false;
						for (var i=0,iLen=oData.length;i<iLen;i++) {
							if (oData[i]['objtype'] != null) {
								aObjects = oGraph.oData[oData[i]['objtype'] + 's'];
							}
							if (aObjects) {
								for (var j=0,jLen=aObjects.length;j<jLen;j++) {
									if (oData[i]['id'] != null && aObjects[j]['id'] != null && aObjects[j]['id'] == oData[i]['id']) {
										_update_(oData[i], aObjects[j]);
									}
								}
							}
							if (oData[i]['animation'] != null) {
								bYes = true;
							} else {
								bNo = true;
							}
							if (bNo && bYes) {
								oGraph.parseObjects();
							}
						}
					} else {
						var sId = oData['id'] || oParams['id'];
						for (var j=0,jLen=aObjects.length;j<jLen;j++) {
							if (aObjects[j]['id'] != null && sId != null && aObjects[j]['id'] == sId) {
								oData['id'] = sId;
								_update_(oData, aObjects[j]);
							}
						}
					}
					if (bFound && (bUpdate || !oGraph.bObjectsTweening)) {
						if (!oGraph.bObjectsTweening) {
							oGraph.detectDynamicObjects();
							oGraph.repaintObjects(bDynamic);
						}
					}
				}
				break;
			case 'repaintobjects':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph) {
					oGraph.detectDynamicObjects();
					oGraph.repaintObjects(bDynamic);
				}
				break;
			case 'getobjectsbyclass':
				if (oParams['class']) { oParams['cls'] = oParams['class']; } 
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				var aIds = [];
				if (oGraph && oParams['cls']) {
					var sType = oParams['type'] || 'label';
					var aObjects = oGraph.oData[sType + 's'] || [];
					var aClass = (oParams['cls'] instanceof Array)?oParams['cls']:[oParams['cls']];
					for (var i=0,iLen=aObjects.length;i<iLen;i++) {
						if (ZC._indexof_(aClass, aObjects[i]['cls']) != -1 && aObjects[i]['id'] != null) {
							aIds.push(aObjects[i]['id']);
						}
					}
				}
				return aIds;
				break;
			case 'getobjectinfo':
				var oAttrs = {
					x : 'iX',
					y : 'iY',
					width : 'iWidth',
					height : 'iHeight',
					color : 'sColor',
					lineColor : 'sLineColor',
					lineWidth : 'iLineWidth',
					borderColor : 'sBorderColor',
					borderWidth : 'iBorderWidth',
					backgroundColor1 : 'sBackgroundColor1',
					backgroundColor2 : 'sBackgroundColor2',
					size : 'iSize',
					type : 'sShape',
					text : 'sText',
					fontSize : 'iFontSize'
				};
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				var sType = oParams['type'] || 'label';
				var sId = oParams['id'] || '';
				if (oGraph && sId != '') {
					var aCollection = [];
					if (sType == 'label') {
						aCollection = oGraph.aLabels;
					} else if (sType == 'shape') {
						aCollection = oGraph.aShapes;
					}
					var oObject = null;
					for (var i=0,iLen=aCollection.length;i<iLen;i++) {
						if (aCollection[i].sObjectId == sId) {
							oObject = aCollection[i];
						}
					}
					if (oObject) {
						var oInfo = {};
						if (sType == 'shape') {
							if (oObject.oLabel) {
								oInfo['label'] = {};
								for (var k in oAttrs) {
									oInfo['label'][k] = oObject.oLabel[oAttrs[k]];
								}
							}
							oObject = oObject.oShape;
						}
						for (var k in oAttrs) {
							oInfo[k] = oObject[oAttrs[k]];
						}
						return oInfo;
					}
				}
				return null;
				break;
			case 'setobjectsmode':
				zingchart.OBJECTMODE = 'normal';
				if (oParams['mode'] && oParams['mode'] == 'flat') {
					zingchart.OBJECTMODE = 'flat';
				}
				break;
			case 'settweenmode':
				ZC.objmove = false;
				if (oParams['mode'] && oParams['mode'] == 'position') {
					ZC.objmove = true;
				}
				break;
		}
	}
	//endif
	return null;
};