//if [MODULES] then
ZC.aLoadedModules.push('selection');
//endif
//if [SELECTION] then
ZC.ZCUtils._format_selection_ = function(mValue) {
	var oSelection = {}, aSelection = [];
	if (typeof(mValue) == 'object') {
		aSelection = mValue;
	} else {
		aSelection = JSON.parse(mValue);
	}
	for (var p=0,pLen=aSelection.length;p<pLen;p++) {
		if ((mValue=aSelection[p]) != null) {
			oSelection['p'+p] = {};
			var aNodeIndex = [];
			if (typeof(mValue) == 'object') {
				aNodeIndex = mValue;
			} else {
				if (typeof(mValue) == 'string' && /\d+\-\d+/.test(mValue)) {
					var aInfo = mValue.split('-');
					if (aInfo.length == 2) {
						aNodeIndex = [];
						for (var i=ZC._i_(aInfo[0]);i<=ZC._i_(aInfo[1]);i++) {
							aNodeIndex.push(i);
						}
					}
				} else {
					aNodeIndex = [mValue];
				}
			}
			for (var n=0,nLen=aNodeIndex.length;n<nLen;n++) {
				oSelection['p'+p]['n'+aNodeIndex[n]] = true;
			}
		}
	}
	return oSelection;
};
ZC.ZCGraph.prototype.parseSelection = function() {
	var self = this, mValue;
	if ((mValue=self.oData['selection']) != null) {
		self.oSelection = ZC.ZCUtils._format_selection_(mValue);
		self.oData['selection'] = null;
	}
};
/* add the API */
zingchart.exec_html5_selection = function(sId, sCall, oParams) {
	var mValue;
	if (document.getElementById('zc-fullscreen')) {
		sId = 'zc-fullscreen';
	}
	oParams = oParams || {};
	if (typeof(oParams) == 'string') {
		oParams = JSON.parse(oParams);
	}
	var oLoader = zingchart.getLoader(sId);
	if (oLoader != null) {
		switch (sCall) {
			case 'clearselection':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					oGraph.oSelection = {};
					for (var p=0,pLen=oGraph.oPlotSet.aPlots.length;p<pLen;p++) {
						oGraph.aSelection[p] = false;
					}
					oGraph.bDisableAnimation = true;
					oGraph.repaint(true, true);
				}
				break;
			case 'getselection':
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					/* convert from p&n format to array format */
					var aSelection = [];
					for (var p=0,pLen=oGraph.oPlotSet.aPlots.length;p<pLen;p++) {
						aSelection[p] = null;
						if (oGraph.oSelection['p'+p] != null) {
							var aNodeIndex = [];
							for (var n in oGraph.oSelection['p'+p]) {
								if (oGraph.oSelection['p'+p].hasOwnProperty(n) && oGraph.oSelection['p'+p][n]) {
									aNodeIndex.push(ZC._i_(n.replace('n', '')));
								}
							}
							aSelection[p] = aNodeIndex;
						}
					}
					return aSelection;
				}
				return {};
				break;
			case 'setselection':
				var oSelection = {}, aSelection = [], mValue;
				if ((mValue=oParams['selection']) != null) {
					oSelection = ZC.ZCUtils._format_selection_(mValue);
				}
				var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
				if (oGraph != null) {
					oGraph.oSelection = oSelection;
					oGraph.bDisableAnimation = true;
					oGraph.repaint(true, true);
				}
				break;
			case 'select':
			case 'deselect':
				var aGraphs = [];
				function _select_(oParams_) {
					var bToggle = false;
					if ((mValue=oParams_['toggle']) != null) {
						bToggle = ZC._b_(mValue);
					}
					var oGraph = oLoader._api_getgraphbyid_(oParams_['graphid']);
					if (oGraph != null) {
						for (var p=0,pLen=oGraph.oPlotSet.aPlots.length;p<pLen;p++) {
							oGraph.aSelection[p] = false;
						}
						var aPlotIndex = null, aNodeIndex = null;
						if ((mValue=oParams_['plotindex']) != null) {
							if (typeof(mValue) == 'object') {
								aPlotIndex = mValue;
							} else {
								if (typeof(mValue) == 'string' && /\d+\-\d+/.test(mValue)) {
									var aInfo = mValue.split('-');
									if (aInfo.length == 2) {
										aPlotIndex = [];
										for (var i=ZC._i_(aInfo[0]);i<=ZC._i_(aInfo[1]);i++) {
											aPlotIndex.push(i);
										}
									}
								} else {
									aPlotIndex = [mValue];
								}
							}
						}
						if ((mValue=oParams_['nodeindex']) != null) {
							if (typeof(mValue) == 'object') {
								aNodeIndex = mValue;
							} else {
								if (typeof(mValue) == 'string' && /\d+\-\d+/.test(mValue)) {
									var aInfo = mValue.split('-');
									if (aInfo.length == 2) {
										aNodeIndex = [];
										for (var i=ZC._i_(aInfo[0]);i<=ZC._i_(aInfo[1]);i++) {
											aNodeIndex.push(i);
										}
									}
								} else {
									aNodeIndex = [mValue];
								}
							}
						}
						if (aPlotIndex == null) {
							aPlotIndex = [];
							for (var p=0,pLen=oGraph.oPlotSet.aPlots.length;p<pLen;p++) {
								aPlotIndex.push(p);
							}
						}
						for (var p=0,pLen=aPlotIndex.length;p<pLen;p++) {
							var pp = aPlotIndex[p];
							if (oGraph.oPlotSet.aPlots[pp] != null) {
								if (oGraph.oSelection['p'+pp] == null) {
									oGraph.oSelection['p'+pp] = {};
								}
								if (aNodeIndex == null) {
									for (var n=0,nLen=oGraph.oPlotSet.aPlots[pp].aPlotNodes.length;n<nLen;n++) {
										if (sCall == 'select') {
											if (!bToggle) {
												oGraph.oSelection['p'+pp]['n'+n] = true;
											} else {
												if (oGraph.oSelection['p'+pp]['n'+n]) {
													delete oGraph.oSelection['p'+pp]['n'+n];
												} else {
													oGraph.oSelection['p'+pp]['n'+n] = true;
												}
											}
										} else if (sCall == 'deselect') {
											delete oGraph.oSelection['p'+pp]['n'+n];
										}
									}
								} else {
									for (var n=0,nLen=aNodeIndex.length;n<nLen;n++) {
										if (sCall == 'select') {
											if (!bToggle) {
												oGraph.oSelection['p'+pp]['n'+aNodeIndex[n]] = true;
											} else {
												if (oGraph.oSelection['p'+pp]['n'+aNodeIndex[n]]) {
													delete oGraph.oSelection['p'+pp]['n'+aNodeIndex[n]];
												} else {
													oGraph.oSelection['p'+pp]['n'+aNodeIndex[n]] = true;
												}
											}
										} else if (sCall == 'deselect') {
											delete oGraph.oSelection['p'+pp]['n'+aNodeIndex[n]];
										}
									}
								}
							}
						}

						if (ZC._indexof_(aGraphs, oGraph) == -1) {
							aGraphs.push(oGraph);
						}
					}
				}
				if (oParams instanceof Array) {
					for (var i=0;i<oParams.length;i++) {
						_select_(oParams[i]);
					}
				} else {
					_select_(oParams);
				}
				for (var i=0;i<aGraphs.length;i++) {
					aGraphs[i].bDisableAnimation = true;
					aGraphs[i].repaint(true, true);
				}
				break;
		}
	}
	return null;
};
//endif