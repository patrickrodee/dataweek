//if [MODULES] then
ZC.aLoadedModules.push('zoom');
//endif
ZC.ZCLoader.prototype._api_zoomin_ = function(oParams) {
	//if DEFAULT then
	var self = this;
	oParams = oParams || {};
	oParams['action'] = 'zoomin';
	if (oParams['graphid'] != null) {
		var oGraph = self.findGraph(oParams['graphid']);
	} else {
		var oGraph = self.aGraphs[0];
	}
	if (oGraph != null) {
		for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
			var oScaleX = oGraph.getScales('k')[i];
			var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
			if (oScaleX.bZooming && (oParams['zoomx'+sScaleIdx]==null || oParams['zoomx'+sScaleIdx])) {
				oParams['zoomx'+sScaleIdx] = true;
				var iDiffIndex = oScaleX.iMaxIndex-oScaleX.iMinIndex;
				var iMinIndex_ = oScaleX.iMinIndex + (iDiffIndex<2?0:ZC._i_(iDiffIndex/4));
				var iMaxIndex_ = oScaleX.iMaxIndex - (iDiffIndex<2?0:ZC._i_(iDiffIndex/4));
				if (iMinIndex_ < iMaxIndex_) {
					oParams['xmin'+sScaleIdx] = iMinIndex_;
					oParams['xmax'+sScaleIdx] = iMaxIndex_;
				}
			}
		}
		for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
			var oScaleY = oGraph.getScales('v')[i];
			var sScaleIdx = (oScaleY.iIndex==1)?'':('-'+oScaleY.iIndex);
			if (oScaleY.bZooming && (oParams['zoomy'+sScaleIdx]==null || oParams['zoomy'+sScaleIdx])) {
				oParams['zoomy'+sScaleIdx] = true;
				var fDiff = oScaleY.fMax-oScaleY.fMin;
				var fMin_ = oScaleY.fMin+ZC._f_(fDiff/4);
				var fMax_ = oScaleY.fMax-ZC._f_(fDiff/4);
				if (fMin_ < fMax_) {
					oParams['ymin'+sScaleIdx] = fMin_;
					oParams['ymax'+sScaleIdx] = fMax_;
				}
			}
		}
		self._api_zoomto_(oParams);
	}
	//endif
};
ZC.ZCLoader.prototype._api_zoomout_ = function(oParams) {
	//if DEFAULT then
	var self = this;
	oParams = oParams || {};
	oParams['action'] = 'zoomout';
	oParams['previewscale'] = true;

	if (oParams['graphid'] != null) {
		var oGraph = self.findGraph(oParams['graphid']);
	} else {
		var oGraph = self.aGraphs[0];
	}
	if (oGraph != null) {
		for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
			var oScaleX = oGraph.getScales('k')[i];
			var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
			if (oScaleX.bZooming && (oParams['zoomx'+sScaleIdx]==null || oParams['zoomx'+sScaleIdx])) {
				oParams['zoomx'+sScaleIdx] = true;
				if (oGraph.oPreview && oGraph.oPreview.bAsync) {
					/* find indexes for the preview handlers */
					var iMinIndex = ZC._i_(oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'].length*oGraph.oPreview.iXLeft/oGraph.oPreview.oViewport.iWidth);
					var iMaxIndex = ZC._i_(oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'].length*oGraph.oPreview.iXRight/oGraph.oPreview.oViewport.iWidth);
					var iDiffIndex = ZC._max_(2, iMaxIndex-iMinIndex);
					var iMinIndex_ = ZC._max_(0, iMinIndex-ZC._i_(iDiffIndex/2));
					var iMaxIndex_ = ZC._min_(oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'].length-1, iMaxIndex+ZC._i_(iDiffIndex/2));
					if (iMinIndex_ < iMaxIndex_) {
						oParams['xmin'+sScaleIdx] = iMinIndex_;
						oParams['xmax'+sScaleIdx] = iMaxIndex_;
					}
				} else {
					var iDiffIndex = ZC._max_(2, oScaleX.iMaxIndex-oScaleX.iMinIndex);
					var iMinIndex_ = ZC._max_(oScaleX.iMinIndex_, oScaleX.iMinIndex-ZC._i_(iDiffIndex/2));
					var iMaxIndex_ = ZC._min_(oScaleX.iMaxIndex_, oScaleX.iMaxIndex+ZC._i_(iDiffIndex/2));
					if (iMinIndex_ < iMaxIndex_) {
						oParams['xmin'+sScaleIdx] = iMinIndex_;
						oParams['xmax'+sScaleIdx] = iMaxIndex_;
					}
				}
			}
		}
		for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
			var oScaleY = oGraph.getScales('v')[i];
			var sScaleIdx = (oScaleY.iIndex==1)?'':('-'+oScaleY.iIndex);
			if (oScaleY.bZooming && (oParams['zoomy'+sScaleIdx]==null || oParams['zoomy'+sScaleIdx])) {
				oParams['zoomy'+sScaleIdx] = true;
				var fDiff = oScaleY.fMax-oScaleY.fMin;
				var fMin_ = ZC._max_(oScaleY.fMin_, oScaleY.fMin-ZC._f_(fDiff/2));
				var fMax_ = ZC._min_(oScaleY.fMax_, oScaleY.fMax+ZC._f_(fDiff/2));
				if (fMin_ < fMax_) {
					oParams['ymin'+sScaleIdx] = fMin_;
					oParams['ymax'+sScaleIdx] = fMax_;
				}
			}
		}
		self._api_zoomto_(oParams);
	}
	//endif
};
ZC.ZCLoader.prototype._api_viewall_ = function(oParams) {
	//if DEFAULT then
	var self = this;
	oParams = oParams || {};
	if (oParams['graphid'] != null) {
		var oGraph = self.findGraph(oParams['graphid']);
	} else {
		var oGraph = self.aGraphs[0];
	}
	oParams['action'] = 'viewall';
	for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
		var oScale = oGraph.getScales('k')[i];
		var sScaleIdx = (oScale.iIndex==1)?'':('-'+oScale.iIndex);
		oParams['zoomx'+sScaleIdx] = true;
		oParams['xmin'+sScaleIdx] = null;
		oParams['xmax'+sScaleIdx] = null;
		if (oGraph.oPreview && oGraph.oPreview.bAsync) {
			var aValues = oGraph.oPreview.oScaleInfo[oScale.sName]['values'];
			oParams['kmin'+sScaleIdx+'-async'] = aValues[0];
			oParams['kmax'+sScaleIdx+'-async'] = aValues[aValues.length-1];
		}
	}
	for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
		var oScale = oGraph.getScales('v')[i];
		var sScaleIdx = (oScale.iIndex==1)?'':('-'+oScale.iIndex);
		oParams['zoomy'+sScaleIdx] = true;
		oParams['ymin'+sScaleIdx] = null;
		oParams['ymax'+sScaleIdx] = null;
	}
	self._api_zoomto_(oParams);
	//endif
};
ZC.ZCLoader.prototype._api_zoomto_ = function(oParams) {
	//if DEFAULT then
	var self = this, mValue;

	oParams = oParams || {};
	oParams['id'] = self.sId;

	if (oParams['graphid'] != null) {
		var oGraph = self.findGraph(oParams['graphid']);
	} else {
		var oGraph = self.aGraphs[0];
	}
	if (oGraph != null) {

		if (typeof(oParams['scroll']) == 'undefined') {
			/* clear scroll layers */
			ZC.ZCHtmlUtils._clear_(ZC._id_(oGraph.sId + '-scroll-x-c'), oGraph.oParent.sOutput, oGraph.iX, oGraph.iY, oGraph.iWidth, oGraph.iHeight);
			ZC.ZCHtmlUtils._clear_(ZC._id_(oGraph.sId + '-scroll-y-c'), oGraph.oParent.sOutput, oGraph.iX, oGraph.iY, oGraph.iWidth, oGraph.iHeight);
		}

		if (oGraph.oPreview) {
			oGraph.oPreview.bInit = false;
		}

		var oPreserveZoom = {};

		for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
			var oScaleX = oGraph.getScales('k')[i];
			var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
			if (oParams['kmin'+sScaleIdx] != null && oParams['kmax'+sScaleIdx] != null) {
				var bMin = false, bMax = false;
				for (var i=0,iLen=oScaleX.aValues.length;i<iLen;i++) {
					if (oParams['kmin'+sScaleIdx] <= oScaleX.aValues[i] && !bMin) {
						oParams['xmin'+sScaleIdx] = i;
						bMin = true;
					}
					if (oParams['kmax'+sScaleIdx] <= oScaleX.aValues[i] && !bMax) {
						oParams['xmax'+sScaleIdx] = i;
						bMax = true;
					}
					if (bMin && bMax) {
						break;
					}
				}
				if (!bMin) {
					oParams['xmin'+sScaleIdx] = 0;
				}
				if (!bMax) {
					oParams['xmax'+sScaleIdx] = oScaleX.aValues.length - 1;
				}
				oParams['zoomx'+sScaleIdx] = true;
			} else {
				var aValues = (oGraph.oPreview && oGraph.oPreview.bAsync && oParams['previewscale'])?oGraph.oPreview.oScaleInfo[oScaleX.sName]['values']:oScaleX.aValues;
				if ((mValue=aValues[oParams['xmin'+sScaleIdx]]) != null) {
					oParams['kmin'+sScaleIdx] = mValue;
				}
				if ((mValue=aValues[oParams['xmax'+sScaleIdx]]) != null) {
					oParams['kmax'+sScaleIdx] = mValue;
				}
			}
		}

		var bContinue = ZC.ZCUtils._trigger_event_('zoom', oGraph.oParent, oParams, true);

		/* ignore if it comes from an async preview */
		if (oParams.async) {
			return;
		} else {
			if (oGraph.oPreview && oGraph.oPreview.bAsync) {
				var aValues = oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'];
				/* approximate positions based on scale info */
				var iScaleMin = ZC._min_a_(aValues), iScaleMax = ZC._max_a_(aValues);
				if (oParams['kmin'] != null && typeof(oParams['kmin']) != 'undefined') {
					var iXMin = ZC._i_(oGraph.oPreview.oViewport.iWidth * (oParams['kmin']-iScaleMin)/(iScaleMax-iScaleMin));
					iXMin = ZC._max_(iXMin, 0);
				} else {
					iXMin = 0;
				}
				if (oParams['kmax'] != null && typeof(oParams['kmax']) != 'undefined') {
					var iXMax = ZC._i_(oGraph.oPreview.oViewport.iWidth * (oParams['kmax']-iScaleMin)/(iScaleMax-iScaleMin));
					iXMax = ZC._min_(iXMax, oGraph.oPreview.oViewport.iWidth);
				} else {
					iXMax = oGraph.oPreview.oViewport.iWidth;
				}
				/*
				if (iXMin == iXMax) {
					iXMin -= 0.1;
					iXMax += 0.1;
				}
				*/
				oGraph.oPreview.update(iXMin, iXMax, oGraph.oPreview.iYTop, oGraph.oPreview.iYBottom);
			}
		}

		if (bContinue || typeof(bContinue) == 'undefined') {
			for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
				var oScaleX = oGraph.getScales('k')[i];
				var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
				if (oParams['zoomx'+sScaleIdx]) {
					oScaleX.zoomTo(oParams['xmin'+sScaleIdx], oParams['xmax'+sScaleIdx]);
					oPreserveZoom['xmin'+sScaleIdx] = oParams['xmin'+sScaleIdx];
					oPreserveZoom['xmax'+sScaleIdx] = oParams['xmax'+sScaleIdx];
				}
			}

			for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
				var oScaleY = oGraph.getScales('v')[i];
				var sScaleIdx = (oScaleY.iIndex==1)?'':('-'+oScaleY.iIndex);
				if (oParams['zoomy'+sScaleIdx] && oScaleY != null) {
					oScaleY.zoomTo(oParams['ymin'+sScaleIdx], oParams['ymax'+sScaleIdx]);
					oPreserveZoom['ymin'+sScaleIdx] = oParams['ymin'+sScaleIdx];
					oPreserveZoom['ymax'+sScaleIdx] = oParams['ymax'+sScaleIdx];
				}
			}

			self.oZoom.parse();

			if (self.oZoom.bPreserveZoom) {
				self.oAttributes['graph' + oGraph.iIndex + '.zoom'] = oPreserveZoom;
			}
			if (oGraph.oPreview != null && !oParams['preview']) {
				oGraph.oPreview.update(oParams['xmin'], oParams['xmax'], oParams['ymin'], oParams['ymax'], true);
			}

			oGraph.clear(true);
			
			if (oScaleY && oScaleY.bAutoFit) {
				var fMinValue = ZC.MAX;
				var fMaxValue = -ZC.MAX;
				for (var p=0,pLen=oGraph.oPlotSet.aPlots.length;p<pLen;p++) {
					if (oGraph.oPlotSet.aPlots[p].bVisible && ZC._indexof_(oGraph.oPlotSet.aPlots[p].aScales, oScaleY.sName) != -1) {
						if (oScaleX.bKeyValues) {
							for (var i=0,iLen=oGraph.oPlotSet.aPlots[p].aPlotNodes.length;i<iLen;i++) {
								if ((oPlotNode=oGraph.oPlotSet.aPlots[p].aPlotNodes[i])) {
									if (ZC._btw_(oPlotNode.fKeyValue, oScaleX.aValues[oScaleX.iMinIndex], oScaleX.aValues[oScaleX.iMaxIndex])) {
										fMinValue = ZC._min_(fMinValue, oPlotNode.fAbsoluteValue);
										fMaxValue = ZC._max_(fMaxValue, oPlotNode.fAbsoluteValue);
										for (var e=0,eLen=oPlotNode.aExtraValues.length;e<eLen;e++) {
											fMinValue = ZC._min_(fMinValue, oPlotNode.aExtraValues[e]);
											fMaxValue = ZC._max_(fMaxValue, oPlotNode.aExtraValues[e]);
										}
									}
								}
							}
						} else {
							for (var i=oScaleX.iMinIndex;i<=oScaleX.iMaxIndex;i++) {
								if ((oPlotNode=oGraph.oPlotSet.aPlots[p].aPlotNodes[i])) {
									fMinValue = ZC._min_(fMinValue, oPlotNode.fAbsoluteValue);
									fMaxValue = ZC._max_(fMaxValue, oPlotNode.fAbsoluteValue);
									for (var e=0,eLen=oPlotNode.aExtraValues.length;e<eLen;e++) {
										fMinValue = ZC._min_(fMinValue, oPlotNode.aExtraValues[e]);
										fMaxValue = ZC._max_(fMaxValue, oPlotNode.aExtraValues[e]);
									}
								}
							}
						}
					}
				}
				oScaleY.setupRange(fMinValue, fMaxValue, true);
				oScaleY.setupStepSize();
			}
			var bZoomTo = ZC._b_(oParams['zoomto']);
			oGraph.oAttributes['skip-preview'] = true;

			var aDir = ['top', 'right', 'bottom', 'left'];
			for (var i=0;i<aDir.length;i++) {
				if (oGraph.oAttributes['plotarea.d-margin-' + aDir[i]]) {
					oGraph.oData['plotarea']['margin-' + aDir[i]] = 'dynamic';
					oGraph.oAttributes['plotarea.d-margin'] = oGraph.oAttributes['plotarea.d-margin-' + aDir[i]] = true;
				}
			}
			oGraph.setupDynamicPlotArea();

			oGraph.paint(!bZoomTo);
			self.oZoom.oGraph = null;
		}
	}
	//endif
};
/* add the API */
zingchart.exec_html5_zoom = function(sId, sCall, oParams) {
	if (document.getElementById('zc-fullscreen')) {
		sId = 'zc-fullscreen';
	}
	oParams = oParams || {};
	if (typeof(oParams) == 'string') {
		oParams = JSON.parse(oParams);
	}
	var oLoader = zingchart.getLoader(sId);
	if (oParams['preservezoom'] != null) {
		oLoader.oAttributes['preservezoom'] = ZC._b_(oParams['preservezoom']);
	}
	if (oLoader != null) {
		switch (sCall) {
			case 'getzoom':
				var oInfo = {}; 
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph) {
					for (var i=0,iLen=oGraph.aScales.length;i<iLen;i++) {
						var oScale = oGraph.aScales[i];
						if (oScale.sType == 'k') {
							oInfo[oScale.sName] = {
								xmin : oScale.iMinIndex,
								xmax : oScale.iMaxIndex,
								vmin : oScale.aValues[oScale.iMinIndex],
								vmax : oScale.aValues[oScale.iMaxIndex]
							};
						} else {
							oInfo[oScale.sName] = {
								ymin : oScale.fMin,
								ymax : oScale.fMax,
								vmin : oScale.aValues[oScale.iMinIndex],
								vmax : oScale.aValues[oScale.iMaxIndex]
							};
						}
					}
				}
				return oInfo;
				break;
			case 'zoomin':
				oLoader._api_zoomin_(oParams);
				break;
			case 'zoomout':
				oLoader._api_zoomout_(oParams);
				break;
			case 'zoomto':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oParams['xall'] != null && oParams['xall']) {
					for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
						var oScaleX = oGraph.getScales('k')[i];
						var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
						oParams['xmin'+sScaleIdx] = oParams['xmin'] || null;
						oParams['xmax'+sScaleIdx] = oParams['xmax'] || null;
						oParams['kmin'+sScaleIdx] = oParams['kmin'] || null;
						oParams['kmax'+sScaleIdx] = oParams['kmax'] || null;
					}
				}
				for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
					var oScaleX = oGraph.getScales('k')[i];
					var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
					if (oParams['xmin'+sScaleIdx] != null || oParams['xmax'+sScaleIdx] != null || oParams['kmin'+sScaleIdx] != null || oParams['kmax'+sScaleIdx] != null) {
						oParams['zoomx'+sScaleIdx] = true;
					}
				}
				if (oParams['yall'] != null && oParams['yall']) {
					for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
						var oScaleY = oGraph.getScales('v')[i];
						var sScaleIdx = (oScaleY.iIndex==1)?'':('-'+oScaleY.iIndex);
						oParams['ymin'+sScaleIdx] = oParams['ymin'] || null;
						oParams['ymax'+sScaleIdx] = oParams['ymax'] || null;
					}
				}
				for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
					var oScaleY = oGraph.getScales('v')[i];
					var sScaleIdx = (oScaleY.iIndex==1)?'':('-'+oScaleY.iIndex);
					if (oParams['ymin'+sScaleIdx] != null || oParams['ymax'+sScaleIdx] != null) {
						oParams['zoomy'+sScaleIdx] = true;
					}
				}
				oLoader._api_zoomto_(oParams);
				break;
			case 'zoomtovalues':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oParams['xall'] != null && oParams['xall']) {
					for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
						var oScaleX = oGraph.getScales('k')[i];
						var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
						oParams['xmin'+sScaleIdx] = oParams['xmin'] || null;
						oParams['xmax'+sScaleIdx] = oParams['xmax'] || null;
					}
				}
				for (var i=0,iLen=oGraph.getScales('k').length;i<iLen;i++) {
					var oScaleX = oGraph.getScales('k')[i];
					var sScaleIdx = (oScaleX.iIndex==1)?'':('-'+oScaleX.iIndex);
					if (oParams['xmin'+sScaleIdx] != null || oParams['xmax'+sScaleIdx] != null) {
						
						if (oGraph.oPreview && oGraph.oPreview.bAsync) {
							oParams['previewscale'] = true;
							oParams['kmin'+sScaleIdx+'-async'] = oParams['xmin'+sScaleIdx];
							oParams['xmin'+sScaleIdx] = ZC._closest_a_(oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'], oParams['xmin'+sScaleIdx]);
						} else {
							if ((xmin=ZC._indexof_(oScaleX.aValues, oParams['xmin'+sScaleIdx])) != -1) {
								oParams['xmin'+sScaleIdx] = xmin;
							}
						}

						if (oGraph.oPreview && oGraph.oPreview.bAsync) {
							oParams['previewscale'] = true;
							oParams['kmax'+sScaleIdx+'-async'] = oParams['xmax'+sScaleIdx];
							oParams['xmax'+sScaleIdx] = ZC._closest_a_(oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'], oParams['xmax'+sScaleIdx]);
						} else {
							if ((xmax=ZC._indexof_(oScaleX.aValues, oParams['xmax'+sScaleIdx])) != -1) {
								oParams['xmax'+sScaleIdx] = xmax;
							}
						}

						/*
						if ((xmin=ZC._indexof_(oScaleX.aValues, oParams['xmin'+sScaleIdx])) != -1) {
							oParams['xmin'+sScaleIdx] = xmin;
						} else {
							if (oGraph.oPreview && oGraph.oPreview.bAsync) {
								oParams['previewscale'] = true;
								oParams['kmin'+sScaleIdx+'-async'] = oParams['xmin'+sScaleIdx];
								oParams['xmin'+sScaleIdx] = ZC._closest_a_(oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'], oParams['xmin'+sScaleIdx]);
							} else {
								oParams['xmin'+sScaleIdx] = 0;
							}
						}
						if ((xmax=ZC._indexof_(oScaleX.aValues, oParams['xmax'+sScaleIdx])) != -1) {
							oParams['xmax'+sScaleIdx] = xmax;
						} else {
							if (oGraph.oPreview && oGraph.oPreview.bAsync) {
								oParams['previewscale'] = true;
								oParams['kmax'+sScaleIdx+'-async'] = oParams['xmax'+sScaleIdx];
								oParams['xmax'+sScaleIdx] = ZC._closest_a_(oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'], oParams['xmax'+sScaleIdx]);
							} else {
								oParams['xmax'+sScaleIdx] = oScaleX.aValues.length-1;
							}
						}
						*/

						/*
						var iMaxScaleIndex = (oGraph.oPreview && oGraph.oPreview.bAsync)?oGraph.oPreview.oScaleInfo[oScaleX.sName]['values'].length:oScaleX.aValues.length;
						if (oParams['xmin'] == oParams['xmax']) {
							if (oParams['xmax'] + 1 <= iMaxScaleIndex)
							oParams['xmax'] += 1;
						} else if (oParams['xmin'] - 1 >= 0) {
							oParams['xmin'] -= 1;
						}
						*/
						oParams['zoomx'+sScaleIdx] = true;
					}
				}
				if (oParams['yall'] != null && oParams['yall']) {
					for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
						var oScaleY = oGraph.getScales('v')[i];
						var sScaleIdx = (oScaleY.iIndex==1)?'':('-'+oScaleY.iIndex);
						oParams['ymin'+sScaleIdx] = oParams['ymin'] || null;
						oParams['ymax'+sScaleIdx] = oParams['ymax'] || null;
					}
				}
				for (var i=0,iLen=oGraph.getScales('v').length;i<iLen;i++) {
					var oScaleY = oGraph.getScales('v')[i];
					var sScaleIdx = (oScaleY.iIndex==1)?'':('-'+oScaleY.iIndex);
					if (oParams['ymin'+sScaleIdx] != null || oParams['ymax'+sScaleIdx] != null) {
						oParams['zoomy'+sScaleIdx] = true;
					}
				}
				oLoader._api_zoomto_(oParams);
				break;
			case 'viewall':
				oLoader._api_viewall_(oParams);
				break;
		}
	}
	return null;
};