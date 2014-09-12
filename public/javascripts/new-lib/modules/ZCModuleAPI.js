//if [MODULES] then
ZC.aLoadedModules.push('api');
//endif
/* add the API */
zingchart.exec_html5_data = function(sId, sCall, oParams) {
	var mValue;
	//if DEFAULT then
	if (document.getElementById('zc-fullscreen')) {
		sId = 'zc-fullscreen';
	}
	//endif
	oParams = oParams || {};
	if (typeof(oParams) == 'string') {
		oParams = JSON.parse(oParams);
	}
	var oLoader = zingchart.getLoader(sId);
	var bUpdate = !(oParams['update'] != null && !ZC._b_(oParams['update']));
	var bHistory = (oParams['history'] != null && ZC._b_(oParams['history']));
	var bSmart = (typeof(oParams['smart']) != 'undefined' && ZC._b_(oParams['smart']));

	if (oLoader != null) {
		/* if no dedicated event available, call an event with same name */
		var aIgnore = ['addplot', 'removeplot', 'modify', 'modifyplot', 'setnodevalue', 'addnode', 'removenode', 'setdata'];
		if (ZC._indexof_(aIgnore, sCall) == -1) {
			var oInfo = oLoader._api_loader_info_();
			oInfo['params'] = oParams;
			ZC.ZCUtils._trigger_event_(sCall, oLoader, oInfo);
		}

		switch (sCall) {
			/* experimental */
			//if [WEBSTORAGE] then
			case 'loadstorage':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph) {
					if (ZC.webstorage && ZC._b_(oGraph.oRefresh['storage'])) {
						for (var k in sessionStorage) {
							if (k.indexOf('zingchart.scale.') == 0) {
								var sScaleName = k.replace('zingchart.scale.', '').replace(oGraph.sId + '.', '');
								oGraph.oData[sScaleName]['values'] = ZC.ZCUtils.storage.array(k, true);
							}
							if (k.indexOf('zingchart.plot.') == 0) {
								var iPlotIndex = ZC._i_(k.replace('zingchart.plot.', '').replace(oGraph.sId + '.', '').replace('plot', ''));
								oGraph.oData['series'][iPlotIndex]['values'] = ZC.ZCUtils.storage.array(k, true);
							}
						}
						oGraph.parse();
						oGraph.clear(true);
						oGraph.paint(true, true);
					}
				}
				break;
			//endif
			case 'clearscroll':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (!oGraph) {
					return null;
				}
				if (oGraph.oScrollX && oGraph.oScrollX.zc_scroll_mouseup) {
					oGraph.oScrollX.zc_scroll_mouseup();
					oGraph.oScrollX.unbind();
				}
				if (oGraph.oScrollY && oGraph.oScrollY.zc_scroll_mouseup) {
					oGraph.oScrollY.zc_scroll_mouseup();
					oGraph.oScrollY.unbind();
				}
				break;
			/* bubble specific */
			case 'getbubblesize':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot) {
						return oPlot.getSize(oParams['value'] || 1);
					}
				}
				return null;
				break;
			/*
			case 'getscaleinfo':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (!oGraph) {
					return null;
				}
				var oScale = oGraph.getScaleByName(oParams['name'] || '');
				if (!oScale) {
					return null;
				}
				return {
					indexbycoord : oScale.getIndexByCoord(oParams['value']),
					valuebycoord : oScale.getValueByCoord(oParams['value']),
					coordbyindex : oScale.getCoordByIndex(oParams['value']),
					coordbyvalue : oScale.getCoordByValue(oParams['value'])
				};
				break;
			*/
			case 'getobjectinfo':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (!oGraph) {
					return null;
				}
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
					backgroundColor2 : 'sBackgroundColor2'
				};
				switch (oParams['object']) {
					case 'graph':
						var oInfo = {};
						for (var k in oAttrs) {
							oInfo[k] = oGraph[oAttrs[k]];
						}
						return oInfo;
						break;
					case 'plotarea':
						var oInfo = {};
						for (var k in oAttrs) {
							oInfo[k] = oGraph.oPlotArea[oAttrs[k]];
						}
						return oInfo;
						break;
					case 'scale':
						var oScale = oGraph.getScaleByName(oParams['name'] || '');
						if (!oScale) {
							return null;
						}
						var oInfo = {};
						for (var k in oAttrs) {
							oInfo[k] = oScale[oAttrs[k]];
						}
						ZC._cp_({
							minValue : oScale.fMin,
							maxValue : oScale.fMax,
							step : oScale.fStep,
							stepSize : oScale.iStepSize,
							values : oScale.aValues
						}, oInfo);
						return oInfo;
						break;
					case 'plot':
						var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
						if (!oPlot) {
							return null;
						}
						var oInfo = {};
						for (var k in oAttrs) {
							oInfo[k] = oPlot[oAttrs[k]];
						}
						ZC._cp_({
							id : oPlot.sId,
							index : oPlot.iIndex,
							type : oPlot.sType,
							text : oPlot.sText,
							values : oPlot.aValues,
							scales : oPlot.aScales,
							stacked : oPlot.bStacked,
							stackType : oPlot.sStackType,
							stack : oPlot.iStack,
							xdata : oPlot.oXData
						}, oInfo);
						return oInfo;
						break;
					case 'node':
						var oNode, oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
						if (oPlot) {
							var iNodeIndex = (oParams['nodeindex']!=null)?ZC._i_(oParams['nodeindex']):0;
							if (!oPlot.aPlotNodes[iNodeIndex]) {
								return null;
							}
							var oNode = oPlot.getNode(iNodeIndex);
							var oInfo = {};
							for (var k in oAttrs) {
								if (ZC._indexof_(['x', 'y', 'width', 'height'], k) != -1) {
									oInfo[k] = oNode[oAttrs[k]];
								} else {
									oInfo[k] = oNode.oStyle[oAttrs[k]];
								}
							}
							ZC._cp_({
								plotindex : oPlot.iIndex,
								index : oNode.iIndex,
								size : oNode.iSize,
								value : oNode.fValue,
								keyvalue : oNode.fKeyValue
							}, oInfo);
							if (oPlot.sType.indexOf('pie') != -1) {
								ZC._cp_({
									angleStart : oNode.iPieAngleStart,
									angleEnd : oNode.iPieAngleEnd
								}, oInfo);								
							}
							/* xdata */
							if (oPlot.oXData) {
								var oXData = {};
								for (var k in oPlot.oXData) {
									oXData[k] = oPlot.oXData[k][iNodeIndex];
								}
								oInfo.xdata = oXData;
							}
							return oInfo;
						}
						return null;
						break;
				}
				break;
			case 'getxyinfo':
				var aInfo = [];
				var iX = oParams['x'], iY = oParams['y'];
				for (var g=0;g<oLoader.aGraphs.length;g++) {
					var oGraph = oLoader.aGraphs[g];
					for (var p=0;p<oGraph.oPlotSet.aPlots.length;p++) {
						var oPlot = oGraph.oPlotSet.aPlots[p];
						var oScaleKey = oGraph.getScaleByName(oPlot.getScales('k')[0]);
						var oScaleVal = oGraph.getScaleByName(oPlot.getScales('v')[0]);
						if (oScaleKey && oScaleVal) {
							var iScaleIndex = oScaleKey.getIndexByCoord(oScaleKey.bInversed?iY:iX);
							var fScalePos = oScaleKey.getIndexByCoord(oScaleKey.bInversed?iY:iX, null, true);
							aInfo.push({
								infotype : 'key-scale',
								xydistance : ZC._a_(iX-oScaleKey.getCoordByIndex(iScaleIndex)),
								graphid : oGraph.sId,
								plotidx : oPlot.iIndex,
								scalename : oScaleKey.sName,
								scaleidx : iScaleIndex,
								scalepos : fScalePos,
								scaletext : (oScaleKey.aLabels[iScaleIndex] || ''),
								scalevalue : oScaleKey.aValues[iScaleIndex],
								scalenumvalue : oScaleKey.getValueByCoord(oScaleKey.bInversed?iY:iX)
							});

							var fScaleVal = oScaleVal.getValueByCoord(oScaleVal.bInversed?iX:iY, true);
							aInfo.push({
								infotype : 'value-scale',
								xydistance : ZC._a_(oScaleVal.bInversed?iX:iY-oScaleVal.getCoordByValue(fScaleVal)),
								graphid : oGraph.sId,
								plotidx : oPlot.iIndex,
								scalename : oScaleVal.sName,
								scalevalue : fScaleVal
							});

							var iDiff = ZC.MAX;
							var oNode_ = null, oNode;
							for (var n=0,nLen=oPlot.aPlotNodes.length;n<nLen;n++) {
								if ((oNode=oPlot.aPlotNodes[n]) != null) {
									switch (oGraph.oSettings['layout']) {
										case 'xy':
											if (ZC._indexof_(['scatter','bubble'], oGraph.sType) != -1) {
												if ((mValue=Math.sqrt((oNode.iX-iX)*(oNode.iX-iX)+(oNode.iY-iY)*(oNode.iY-iY))) < iDiff) {
													oNode_ = {
														infotype : 'node',
														xydistance : iDiff,
														graphid : oGraph.sId,
														plotidx : oPlot.iIndex,
														nodeidx : oNode.iIndex,
														nodevalue : oNode.fValue,
														nodekeyvalue : (oNode.fKeyValue==null)?oScaleKey.aValues[oNode.iIndex]:oNode.fKeyValue
													};
													iDiff = mValue;
												}
											} else {
												if ((mValue=ZC._a_(oNode.iX-iX)) < iDiff) {
													oNode_ = {
														infotype : 'node',
														xydistance : iDiff,
														graphid : oGraph.sId,
														plotidx : oPlot.iIndex,
														nodeidx : oNode.iIndex,
														nodevalue : oNode.fValue,
														nodekeyvalue : (oNode.fKeyValue==null)?oScaleKey.aValues[oNode.iIndex]:oNode.fKeyValue
													};
													iDiff = mValue;
												}
											}
											break;
										case 'yx':
											if ((mValue=ZC._a_(oNode.iY-iY)) < iDiff) {
												oNode_ = {
													infotype : 'node',
													xydistance : iDiff,
													graphid : oGraph.sId,
													plotidx : oPlot.iIndex,
													nodeidx : oNode.iIndex,
													nodevalue : oNode.fValue,
													nodekeyvalue : (oNode.fKeyValue==null)?oScaleKey.aValues[oNode.iIndex]:oNode.fKeyValue
												};
												iDiff = mValue;
											}
											break;
										case '':
											var aCXY = oNode.getCXY();
											if ((mValue=Math.sqrt((aCXY[0]-iX)*(aCXY[0]-iX)+(aCXY[1]-iY)*(aCXY[1]-iY))) < iDiff) {
												oNode_ = {
													infotype : 'node',
													xydistance : iDiff,
													graphid : oGraph.sId,
													plotidx : oPlot.iIndex,
													nodeidx : oNode.iIndex,
													nodevalue : oNode.fValue,
													nodekeyvalue : (oNode.fKeyValue==null)?oScaleKey.aValues[oNode.iIndex]:oNode.fKeyValue
												};
												iDiff = mValue;
											}
											break;
									}
								}
							}
							if (oNode_) {
								aInfo.push(oNode_);
							}
						}
					}
				}
				return aInfo;
				break;
			case 'update':
				if (oParams['graphid'] != null) {
					var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
					if (oGraph != null) {
						oLoader.loadResources(function() {
							oGraph.repaint(bSmart, bSmart);
						});
					} else {
						oLoader.repaint();
					}
				} else {
					oLoader.repaint();
				}
				break;
			case 'setcharttype':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					oLoader.oData['graphset'][oGraph.iIndex]['type'] = oGraph.oData['type'] = oGraph.sType = oParams['type'];
					if (bUpdate) {
						oLoader.repaint();
					}
				}
				break;
			case 'addgraph':
				oLoader.oData['graphset'].push(oParams['data'] || {});
				if (bUpdate) {
					oLoader.repaint();
				}			
				break;
			case 'addplot':
				zingchart.SKIP.CSV = true;
				var oData = {};
				/* compat with flash plotdata */
				var sKey = oParams['plotdata']?'plotdata':'data';
				if (oParams[sKey] != null) {
					if (typeof(oParams[sKey]) == 'object') {
						ZC._cp_(oParams[sKey], oData);
					} else {
						oData = JSON.parse(oParams[sKey]);
					}
				}
				ZC._todash_(oData);
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					var iPlotIndex = oPlot?oPlot.iIndex:0;
					var oData_ = [];
					if (oGraph.oData['series'] == null) {
						oGraph.oData['series'] = [];
					}
					if (oGraph.oData['series'].length > 0) {
						for (var i=0;i<oGraph.oData['series'].length;i++) {
							oData_.push(oGraph.oData['series'][i]);
							if (i == iPlotIndex) {
								oData_.push(oData);
							}
						}
					} else {
						oData_.push(oData);
					}
					ZC.ZCUtils._trigger_event_('plot_add', oLoader, {
						id : oLoader.sId,
						graphid : oGraph.sId,
						plotindex : iPlotIndex,
						data : oData
					});
					oLoader.oData['graphset'][oGraph.iIndex]['series'] = oGraph.oData['series'] = oData_;
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					if (bUpdate) {
						oLoader.loadResources(function() {
							oGraph.repaint(bSmart, bSmart);
						});
					}
				}
				break;
			case 'removeplot':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot) {
						oGraph.oData['series'].splice(oPlot.iIndex, 1);
						oLoader.oData['graphset'][oGraph.iIndex]['series'] = oGraph.oData['series'];
						oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));

						ZC.ZCUtils._trigger_event_('plot_remove', oLoader, {
							id : oLoader.sId,
							graphid : oGraph.sId,
							plotindex : oPlot.iIndex
						});

						if (bUpdate) {
							oLoader.loadResources(function() {
								oGraph.repaint(bSmart, bSmart);
							});
						}
					}
				}
				break;
			case 'modify':
				zingchart.SKIP.CSV = true;
				var oData = {};
				if (oParams['data'] != null) {
					if (typeof(oParams['data']) == 'object') {
						ZC._cp_(oParams['data'], oData);
					} else {
						oData = JSON.parse(oParams['data']);
					}
				}
				ZC._todash_(oData);
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					if (oParams['object'] != null && oGraph.oData[oParams['object']] != null) {
						switch (oParams['object']) {
							case 'title':
								ZC._cp_(oData, oGraph.oData['title']);
								break;
							case 'plotset':
							case 'series':
								ZC._cp_(oData, oGraph.oData['series']);
								break;
							case 'plotarea':
								ZC._cp_(oData, oGraph.oData['plotarea']);
								break;
							case 'legend':
								ZC._cp_(oData, oGraph.oData['legend']);
								break;
							case 'plot':
								ZC._cp_(oData, oGraph.oData['plot']);
								break;
						}
					} else {
						ZC._cp_(oData, oGraph.oData);
					}
					oLoader.oData['graphset'][oGraph.iIndex] = oGraph.oData;
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					ZC.ZCUtils._trigger_event_('modify', oLoader, {
						id : oLoader.sId, 
						graphid : oGraph.sId, 
						data : oData, 
						object : oParams['object']
					});
					if (bUpdate) {
						oLoader.loadResources(function() {
							oGraph.repaint(bSmart, bSmart);
						});
					}
				}
				break;
			case 'modifyplot':
				zingchart.SKIP.CSV = true;
				var oData = {};
				/* compat with flash plotdata */
				var sKey = oParams['plotdata']?'plotdata':'data';
				if (oParams[sKey] != null) {
					if (typeof(oParams[sKey]) == 'object') {
						ZC._cp_(oParams[sKey], oData);
					} else {
						oData = JSON.parse(oParams[sKey]);
					}
				}
				ZC._todash_(oData);
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot) {
						/* inject series if missing */
						if (oLoader.oData['graphset'][oGraph.iIndex]['series'] == null) {
							oLoader.oData['graphset'][oGraph.iIndex]['series'] = [];
						}
						ZC._cp_(oData, oGraph.oData['series'][oPlot.iIndex]);
						oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex] = oGraph.oData['series'][oPlot.iIndex];
						oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));

						ZC.ZCUtils._trigger_event_('plot_modify', oLoader, {
							id : oLoader.sId,
							graphid : oGraph.sId,
							plotindex : oPlot.iIndex,
							data : oData
						});

						if (bUpdate) {
							oLoader.loadResources(function() {
								oGraph.repaint(bSmart, bSmart);
							});
						}
					}
				}
				break;
			case 'setnodevalue':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot) {
						var iNodeIndex = 0;
						if (oParams['nodeindex'] != null) {
							iNodeIndex = ZC._i_(oParams['nodeindex']);
						}
						var mValue = 0;
						if (oParams['value'] != null) {
							mValue = oParams['value'];
						}
						ZC.ZCUtils._trigger_event_('node_set', oLoader, {
							id : oLoader.sId,
							graphid : oGraph.sId,
							plotindex : oPlot.iIndex,
							nodeindex : iNodeIndex,
							key : iNodeIndex,
							value : mValue,
							text : mValue
						});
						oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex]['values'][iNodeIndex] = oGraph.oData['series'][oPlot.iIndex]['values'][iNodeIndex] = mValue;
						oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
						if (bUpdate) {
							oGraph.repaint(bSmart, bSmart);
						}
					}
				}
				break;
			case 'setscalevalues':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var sScale = oParams['scale'] || 'scale-x';
					for (var j=0,jLen=oGraph.aScales.length;j<jLen;j++) {
						if (sScale == oGraph.aScales[j].sName) {
							if (oGraph.oData[sScale] != null) {
								oGraph.oData[sScale]['values'] = oParams['values'];
								oLoader.oData['graphset'][oGraph.iIndex][sScale] =  oLoader.oData['graphset'][oGraph.iIndex][sScale] || {};
								oLoader.oData['graphset'][oGraph.iIndex][sScale]['values'] = oParams['values'];
							}
						}
					}
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					if (bUpdate) {
						oGraph.repaint(bSmart, bSmart);
					}
				}
				break;
			case 'addscalevalue':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var sScale = oParams['scale'] || 'scale-x';
					for (var j=0,jLen=oGraph.aScales.length;j<jLen;j++) {
						if (sScale == oGraph.aScales[j].sName) {
							if (oGraph.oData[sScale] != null && oGraph.oData[sScale]['values'] != null) {
								var iNodeIndex = (oParams['nodeindex']==null)?oGraph.oData[sScale]['values'].length:ZC._i_(oParams['nodeindex']);
								var aScaleValues = oGraph.oData[sScale]['values'];
								aScaleValues.push(null);
								for (var i=aScaleValues.length-1;i>iNodeIndex;i--) {
									aScaleValues[i] = aScaleValues[i-1];
								}
								aScaleValues[iNodeIndex] = oParams['value'] || '';
								oLoader.oData['graphset'][oGraph.iIndex][sScale]['values'] = aScaleValues;
							}
						}
					}
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					if (bUpdate) {
						oGraph.repaint(bSmart, bSmart);
					}
				}
				break;
			case 'removescalevalue':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var sScale = oParams['scale'] || 'scale-x';
					for (var j=0,jLen=oGraph.aScales.length;j<jLen;j++) {
						if (sScale == oGraph.aScales[j].sName) {
							if (oGraph.oData[sScale] != null && oGraph.oData[sScale]['values'] != null) {
								var iNodeIndex = (oParams['nodeindex']==null)?oGraph.oData[sScale]['values'].length-1:ZC._i_(oParams['nodeindex']);
								var aScaleValues = oGraph.oData[sScale]['values'];
								aScaleValues.splice(iNodeIndex, 1);
								oLoader.oData['graphset'][oGraph.iIndex][sScale]['values'] = aScaleValues;
							}
						}
					}
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					if (bUpdate) {
						oGraph.repaint(bSmart, bSmart);
					}
				}
				break;
			case 'addnode':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				var bKeyValue = (oParams['value'] instanceof Array);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot) {
						var aPlotValues = oGraph.oData['series'][oPlot.iIndex]['values'];
						var iNodeIndex = (oParams['nodeindex']==null)?aPlotValues.length:oParams['nodeindex'];

						if (bKeyValue && oParams['nodeindex'] != null) {
							aPlotValues.push([oParams['nodeindex'], oParams['value'][1] || 0]);
						} else {
							aPlotValues.push(null);

							var iNodes = aPlotValues.length;
							iNodeIndex = ZC._max_(0, ZC._min_(iNodeIndex, iNodes));
							for (var i=iNodes-1;i>iNodeIndex;i--) {
								aPlotValues[i] = aPlotValues[i-1];
							}
							aPlotValues[iNodeIndex] = oParams['value'];
						}

						if (!bKeyValue) {
							/* lookup for scale (of type key) values */
							for (var j=0,jLen=oGraph.aScales.length;j<jLen;j++) {
								var sScale = oGraph.aScales[j].sName;
								if (oGraph.aScales[j].sType == 'k' && oParams[sScale+'-value'] != null) {
									if (oGraph.oData[sScale] != null && oGraph.oData[sScale]['values'] != null) {
										var aScaleValues = oGraph.oData[sScale]['values'];
										aScaleValues.push(null);
										for (var i=aScaleValues.length-1;i>iNodeIndex;i--) {
											aScaleValues[i] = aScaleValues[i-1];
										}
										aScaleValues[iNodeIndex] = oParams[sScale+'-value'];
										oLoader.oData['graphset'][oGraph.iIndex][sScale]['values'] = aScaleValues;
									}
								}
							}
						}
						ZC.ZCUtils._trigger_event_('node_add', oLoader, {
							id : oLoader.sId,
							graphid : oGraph.sId,
							plotindex : oPlot.iIndex,
							nodeindex : iNodeIndex,
							key : iNodeIndex,
							value : oParams['value'],
							text : oParams['value']
						});
						oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex]['values'] = oGraph.oData['series'][oPlot.iIndex]['values'];
						oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
						if (bUpdate) {
							oGraph.repaint(bSmart, bSmart);
						}
					}
				}
				break;
			case 'removenode':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot) {
						var aPlotValues = oGraph.oData['series'][oPlot.iIndex]['values'];
						var iNodeIndex = (oParams['nodeindex']==null)?(oPlot.aPlotNodes.length-1):ZC._i_(oParams['nodeindex']);
						if (ZC._btw_(iNodeIndex, 0, oPlot.aPlotNodes.length-1)) {
							aPlotValues.splice(iNodeIndex, 1);

							/* lookup for scale (of type key) values */
							for (var j=0,jLen=oGraph.aScales.length;j<jLen;j++) {
								var sScale = oGraph.aScales[j].sName;
								if (oGraph.aScales[j].sType == 'k' && oParams[sScale] != null && ZC._b_(oParams[sScale])) {
									if (oGraph.oData[sScale] != null && oGraph.oData[sScale]['values'] != null) {
										var aScaleValues = oGraph.oData[sScale]['values'];
										aScaleValues.splice(iNodeIndex, 1);
										oLoader.oData['graphset'][oGraph.iIndex][sScale]['values'] = aScaleValues;
									}
								}
							}

							ZC.ZCUtils._trigger_event_('node_remove', oLoader, {
								id : oLoader.sId,
								graphid : oGraph.sId,
								plotindex : oPlot.iIndex,
								nodeindex : iNodeIndex,
								key : iNodeIndex,
								value : oPlot.aPlotNodes[iNodeIndex].fValue,
								text : oPlot.aPlotNodes[iNodeIndex].fValue
							});

							oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex]['values'] = oGraph.oData['series'][oPlot.iIndex]['values'];
							oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
							if (bUpdate) {
								oGraph.repaint(bSmart, bSmart);
							}
						}
					}
				}
				break;
			case 'setdata':
				var oData = {};
				if (oParams['data'] != null) {
					if (typeof(oParams['data']) == 'object') {
						ZC._cp_(oParams['data'], oData);
					} else {
						try {
							oData = JSON.parse(oParams['data']);
						} catch (oError) {
							oLoader._api_error_(oError, 'JSON parser');
							return false;
						}
					}
				}
				ZC._todash_(oData);
				if (oParams['preservezoom'] == null) {
					oLoader.oAttributes['preservezoom'] = false;
				}
				var oGraph = null;
				if (oParams['graphid'] != null) {
					var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				}
				ZC.ZCUtils._trigger_event_('setdata', oLoader, {
					id : oLoader.sId, 
					graphid : (oGraph==null?null:oGraph.sId), 
					data : oData
				});
				if (oGraph != null) {
					oLoader.oData['graphset'][oGraph.iIndex] = oGraph.oData = oData;					
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					if (bUpdate) {
						if (bHistory) {
							oLoader.iHistory++;
						}
						oLoader.loadResources(function() {
							oLoader.parse(oGraph.sId);
							oLoader.aGraphs[oGraph.iIndex].paint();
						});
					}
				} else {
					oLoader.oData = oData;
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					oLoader.lookupShapes(oLoader.oData);
					if (bUpdate) {
						if (bHistory) {
							oLoader.iHistory++;
						}
						oLoader.repaint();
					}
				}
				break;
			case 'getseriesdata':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					if (oParams['plotindex'] != null || oParams['plotid'] != null) {
						var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid'], 0);
						return oPlot?oGraph.oData['series'][oPlot.iIndex]:null;
					} else {
						return oGraph.oData['series'];
					}
				}
				return null;
				break;
			case 'setseriesdata':
			case 'appendseriesdata':
				zingchart.SKIP.CSV = true;
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					if (oParams['plotindex'] != null || oParams['plotid'] != null) {
						var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid'], 0);
						if (sCall == 'setseriesdata') {
							var oData = {};
						} else {
							if (oGraph.oData['series'] && oGraph.oData['series'][oPlot.iIndex]) {
								var oData = oGraph.oData['series'][oPlot.iIndex];
							} else {
								var oData = {};
							}
						}
					} else {
						if (sCall == 'setseriesdata') {
							var oData = [];
						} else {
							var oData = oGraph.oData['series'] || [];
						}
					}
					if (oParams['data'] != null) {
						if (typeof(oParams['data']) == 'object') {
							ZC._cp_(oParams['data'], oData);
						} else {
							ZC._cp_(JSON.parse(oParams['data']), oData);
						}
					}
					ZC._todash_(oData);
					if (oParams['plotindex'] != null || oParams['plotid'] != null) {
						var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid'], 0);
						oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex] = oGraph.oData['series'][oPlot.iIndex] = oData;
					} else {
						oLoader.oData['graphset'][oGraph.iIndex]['series'] = oGraph.oData['series'] = oData;
					}
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					if (bUpdate) {
						oLoader.loadResources(function() {
							oGraph.repaint(bSmart, bSmart);
						});
					}
				}
				break;
			case 'getseriesvalues':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					if (oParams['plotindex'] != null || oParams['plotid'] != null) {
						var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid'], 0);
						return oPlot?(oGraph.oData['series'][oPlot.iIndex]['values'] || []):[];
					} else {
						var aValues = [];
						for (var i=0,iLen=oGraph.oPlotSet.aPlots.length;i<iLen;i++) {
							aValues.push(oGraph.oData['series'][i]['values'] || []);
						}
						return aValues;
					}
				}
				return null;
				break;
			case 'setseriesvalues':
			case 'appendseriesvalues':
				zingchart.SKIP.CSV = true;
				var aValues = [];
				if (oParams['values'] != null) {
					if (typeof(oParams['values']) == 'object') {
						aValues = oParams['values'];
					} else {
						aValues = JSON.parse(oParams['values']);
					}
				}
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					if (oParams['plotindex'] != null || oParams['plotid'] != null) {
						aValues = [aValues];
					}
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid'], 0);
					for (var i=0,iLen=aValues.length;i<iLen;i++) {
						if (oGraph.oPlotSet.aPlots[oPlot.iIndex+i] != null) {
							if (sCall == 'setseriesvalues') {
								oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex+i]['values'] = oGraph.oData['series'][oPlot.iIndex+i]['values'] = aValues[i];
							} else {
								var aValues_ = oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex+i]['values'];
								var bKeys = (aValues[i].length > 0) && (aValues[i][0].length > 1);
								var bIgnoreDuplicates = true;
								if ((mValue=oParams['ignoreduplicates']) != null) {
									bIgnoreDuplicates = ZC._b_(mValue);
								}
								if (bKeys) {
									var iLen_ = aValues_.length;
									for (var v=0,vLen=aValues[i].length;v<vLen;v++) {
										var bDuplicate = false;
										for (var v_=iLen_-1;v_>=0;v_--) {
											if (aValues[i][v][0] > aValues_[v_][0]) {
												aValues_.push(aValues[i][v]);
												bDuplicate = true;
												break;
											} else if (aValues[i][v][0] == aValues_[v_][0]) {
												bDuplicate = true;
												break;
											}
										}
										if (!bDuplicate || !bIgnoreDuplicates) {
											aValues_.push(aValues[i][v]);
										}
									}
								} else {
									for (var v=0,vLen=aValues[i].length;v<vLen;v++) {
										aValues_.push(aValues[i][v]);
									}
								}
								oLoader.oData['graphset'][oGraph.iIndex]['series'][oPlot.iIndex+i]['values'] = oGraph.oData['series'][oPlot.iIndex+i]['values'] = aValues_;
							}
						}
					}
					oLoader.oAttributes['json'] = ZC._trim_(JSON.stringify(oLoader.oData));
					if (bUpdate) {
						oGraph.repaint(bSmart, bSmart);
					}
				}
				break;
			case 'togglelegend':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					if (oGraph.oLegend) {
						var bVisibility = true;
						if (typeof(oGraph.oLegend.oData['visible']) != 'undefined' && !oGraph.oLegend.oData['visible']) {
							bVisibility = false;
						}
						oGraph.oLegend.oData['visible'] = !bVisibility;
						oGraph.oLegend.clear(false);
						oGraph.oLegend.parse();
						oGraph.oLegend.paint();
					}
				}
				break;
			case 'toggledimension':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					oLoader._api_2d3d_toggle_(oGraph.sId);
				}
				break;
			case 'getdata':
				return JSON.parse(oLoader.oAttributes['json']);
				break;
			case 'getgraphlength':
				return oLoader.aGraphs.length;
				break;
			case 'getplotlength':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					return oGraph.oPlotSet.aPlots.length;
				}
				return null;
				break;
			case 'getnodelength':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot != null) {
						return oPlot.aPlotNodes.length;
					}
				}
				return null;
				break;
			case 'getnodevalue':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot != null) {
						if (oParams['nodeindex'] != null) {
							if ((oPlotNode=oPlot.aPlotNodes[ZC._i_(oParams['nodeindex'])])) {
								return oPlotNode.fValue;
							} else {
								return null;
							}
						}
					}
				}
				return null;
				break;
			case 'getplotvalues':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					var oPlot = oGraph._api_getplot_(oParams['plotindex'], oParams['plotid']);
					if (oPlot != null) {
						var aValues = [];
						for (var i=0,iLen=oPlot.aPlotNodes.length;i<iLen;i++) {
							aValues.push(oPlot.aPlotNodes[i].fValue);
						}
						return aValues;
					}
				}
				return null;
				break;
		}
	}
	return null;
};