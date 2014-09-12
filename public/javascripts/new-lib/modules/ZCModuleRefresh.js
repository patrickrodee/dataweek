//if [MODULES] then
ZC.aLoadedModules.push('refresh');
//endif
ZC.ZCGraph.prototype.getScalesMaxElements = function() {
	//if DEFAULT then
	var self = this;
	var iMaxElements = 0;
	for (var i=0,iLen=self.aScales.length;i<iLen;i++) {
		if (self.aScales[i].sType == 'k') {
			iMaxElements = ZC._max_(iMaxElements, self.oData[self.aScales[i].sName]['values'].length);
		}
	}
	for (var i=0,iLen=self.oPlotSet.aPlots.length;i<iLen;i++) {
		if (self.oData['series'][i] != null) {
			iMaxElements = ZC._max_(iMaxElements, self.oData['series'][i]['values'].length);
		}
	}
	return iMaxElements;
	//endif
};
ZC.ZCGraph.prototype.syncScalesOnFeed = function() {
	//if DEFAULT then
	var self = this;
	var iMaxElements = self.getScalesMaxElements();
	for (var i=0,iLen=self.aScales.length;i<iLen;i++) {
		if (self.aScales[i].sType == 'k') {
			if (self.aScales[i].bInversed) {
				var iMaxStepSize = (self.aScales[i].iHeight - self.aScales[i].iOffsetStart - self.aScales[i].iOffsetEnd)/ZC._i_(self.oRefresh['max-ticks']);
				self.aScales[i].iOffsetData = ZC._max_(0, self.aScales[i].iHeight - iMaxElements*iMaxStepSize);
			} else {
				var iMaxStepSize = (self.aScales[i].iWidth - self.aScales[i].iOffsetStart - self.aScales[i].iOffsetEnd)/ZC._i_(self.oRefresh['max-ticks']);
				self.aScales[i].iOffsetData = ZC._max_(0, self.aScales[i].iWidth - iMaxElements*iMaxStepSize);
			}
			if (ZC._b_(self.oRefresh['adjust-scale'])) {
				self.aScales[i].iOffsetData = 0;
			}
			self.aScales[i].iOffsetStart = self.aScales[i].iOffsetStart_ + self.aScales[i].iOffsetData;
			self.aScales[i].iMinIndex = ZC._max_(0, self.aScales[i].iMaxIndex-self.oRefresh['max-ticks']+1);
			self.aScales[i].setupStepSize();
		}
	}
	//endif
};
ZC.ZCGraph.prototype.processRefresh = function() {
	//if DEFAULT then
	var self = this, mValue;
	if (self.oRefresh != null) {
		var iTimeout = ZC._i_(self.oRefresh['interval']);
		iTimeout = (iTimeout>=50)?iTimeout:1000*iTimeout;

		if (self.oRefresh['type'] == 'full') {
			if (self.oRefresh['transport'] == 'http') {
				window.setTimeout(function() {
					self.oParent.showProgress(self);
					ZC._delay_(function() {
						self.oParent.load(self.sId, self.sUrlData);
					});
				}, iTimeout);
			} else if (self.oRefresh['transport'] == 'websockets' && ZC.websockets) {
				if (!self.oLoader.oSockets[self.sId]) {
					var ws = new WebSocket(self.oRefresh['url'], 'zingchart');
					ws.onopen = function() {
						ws.send('zingchart.' + self.oRefresh['type']);
						ws.send('zingchart.' + self.oRefresh['method']);
						ws.send('zingchart.getdata');
					};
					ws.onmessage = function(evt) {
						if (self.sStage != 'ready') {
							return;
						}
						self.oParent.showProgress(self);
						self.sStage = 'full';
						ZC._delay_(function() {
							zingchart.exec(self.oParent.sId, 'setdata', {graphid : self.sId, data : evt.data, softclear : true});
						});
					};
					self.oLoader.oSockets[self.sId] = ws;
				} else {
					if (self.oRefresh['method'] == 'pull') {
						window.setTimeout(function() {
							self.oLoader.oSockets[self.sId].send('zingchart.getdata');
						}, iTimeout);
					}
				}
			}

		} else if (self.oRefresh['type'] == 'feed' && self.oRefresh['url'] != null) {

			if (self.oRefresh['curtain'] != null) {
				var aKeyScales = self.getScales('k');
				if (aKeyScales.length > 0) {
					ZC.ZCHtmlUtils._remove_(self.sId + '-curtain-t');
					if (aKeyScales[0].iOffsetData > 0) {
						var oCurtain = new ZC.ZCTextBox(self);
						self.oParent.oDefaults.load(oCurtain.oData, '(' + self.sType + ').refresh.curtain');
						oCurtain.append(self.oRefresh['curtain']);
						oCurtain.parse();
						if (oCurtain.bVisible) {
							oCurtain.sId = self.sId + '-curtain-t';
							oCurtain.oDOMParent = ZC._id_(self.oParent.sId + '-text-top');
							if (aKeyScales[0].bInversed) {
								oCurtain.iX = self.oPlotArea.iX;
								oCurtain.iY = (aKeyScales[0].bMirrored)?self.oPlotArea.iY:(self.oPlotArea.iY + self.oPlotArea.iHeight - aKeyScales[0].iOffsetData);
								oCurtain.iWidth = self.oPlotArea.iWidth;
								oCurtain.iHeight = aKeyScales[0].iOffsetData;
							} else {
								oCurtain.iX = (aKeyScales[0].bMirrored)?(self.oPlotArea.iX + self.oPlotArea.iWidth - aKeyScales[0].iOffsetData):self.oPlotArea.iX;
								oCurtain.iY = self.oPlotArea.iY;
								oCurtain.iWidth = aKeyScales[0].iOffsetData;
								oCurtain.iHeight = self.oPlotArea.iHeight;
							}
							oCurtain.oCanvas = oCurtain.oCanvasSh = ZC._id_(self.sId + '-scales-ml-0-c');
							oCurtain.paint();
						}
					}
				}
			}

			var iResetTimeout = ZC._i_(self.oRefresh['reset-timeout']);
			var iStopTimeout = ZC._i_(self.oRefresh['stop-timeout']);
			var bStorage = ZC._b_(self.oRefresh['storage']);
			var iStorageSize = ZC._i_(self.oRefresh['storage-size']);

			function _push_data_(sResponse) {
				var mResponse = eval('(' + sResponse + ')');
				var aResponse = (mResponse instanceof Array)?mResponse:[mResponse];
				for (var r=0,rLen=aResponse.length;r<rLen;r++) {
					var oResponse = aResponse[r];
					for (var i=0,iLen=self.aScales.length;i<iLen;i++) {
						if (self.aScales[i].sType == 'k') {
							var sName = self.aScales[i].sName;
							if (oResponse[sName] != null && self.oData[sName] != null) {
								if (self.oData[sName]['values'] == null) {
									self.oData[sName]['values'] = [];
								}
								self.oData[sName]['values'].push(oResponse[sName]);
								if (self.oData[sName]['values'].length > iResetTimeout || self.aFeedStatus[1] == 1) {
									self.oData[sName]['values'] = [];
								}
								if (ZC.webstorage && bStorage) {
									ZC.ZCUtils.storage.push('zingchart.scale.' + self.sId + '.' + sName, (new String(oResponse[sName])));
								}
							}
						}
					}
					for (var i=0,iLen=self.oPlotSet.aPlots.length;i<iLen;i++) {
						if (self.oData['series'][i] != null) {
							var mData = null;
							if ((mValue=oResponse['plot-'+i]) != null) {
								mData = mValue;
							} else if ((mValue=oResponse['plot'+i]) != null) {
								mData = mValue;
							}
							self.oData['series'][i]['values'].push(mData);
							if (ZC.webstorage && bStorage) {
								mValue = oResponse['plot'+i];
								if (typeof(mValue) == 'object') {
									mValue = mValue.join('###');
								}
								ZC.ZCUtils.storage.push('zingchart.plot.' + self.sId + '.plot' + i, (new String(mValue)));
							}
							if (self.oData['series'][i]['values'].length > iResetTimeout || self.aFeedStatus[1] == 1) {
								self.oData['series'][i]['values'] = [];
							}
						}
					}
					var iMaxElements = self.getScalesMaxElements();
				}
				if (self.sStage != 'ready') {
					return;
				}
				if (self.aFeedStatus[1] == 1) {
					self.aFeedStatus[1] = 0;
				}
				if (iMaxElements <= iStopTimeout || iStopTimeout == 0) {
					self.sStage = 'feed';
					ZC._delay_(function() {
						if (ZC._id_(self.oParent.sId+'-main')) {
							self.parse();
							self.clear(true);
							self.syncScalesOnFeed();
							self.paint(true, true);
						}
					});
				}
			}

			if (self.oRefresh['transport'] == 'http') {
				window.setTimeout(function() {
					if (self.aFeedStatus[0] == 1) {
						self.oParent.showProgress(self);
						var sData = [
							self.oParent.sCacheControl=='query-string'?('zcrandom='+Math.random()):'',
							zingchart.ZCOUTPUT?('zcoutput=' + self.oLoader.sOutput):''
						].join('&');
						ZC.ZCQuery.ajax({
							type : 'GET',
							url : self.oRefresh['url'],
							beforeSend : function(oXhr) {
								if (!self.oParent.oXhrCache['data'] && self.oParent.sCacheControl == 'http-headers') {
									oXhr.setRequestHeader('If-Modified-Since', 'Thu,[~]01 Jan 1970 00:00:00 GMT');
								}
							},
							data : sData,
							dataType : 'text',
							error : function(oXhr, sStatus, oError) {
							},
							success : function(sResponse, sStatus, oXhr) {
								_push_data_(sResponse);
							}
						});
					}
				}, iTimeout);
			} else if (self.oRefresh['transport'] == 'websockets' && ZC.websockets) {
				if (!self.oLoader.oSockets[self.sId]) {
					var ws = new WebSocket(self.oRefresh['url'], 'zingchart');
					ws.onopen = function() {
						ws.send('zingchart.' + self.oRefresh['type']);
						ws.send('zingchart.' + self.oRefresh['method']);
						ws.send('zingchart.startfeed');
						if (self.oRefresh['method'] == 'pull') {
							ws.send('zingchart.getdata');
						}
					};
					ws.onmessage = function(evt) {
						if (self.aFeedStatus[0] == 1) {
							_push_data_(evt.data);
						}
					};
					self.oLoader.oSockets[self.sId] = ws;
				} else {
					if (self.oRefresh['method'] == 'pull') {
						window.setTimeout(function() {
							self.oLoader.oSockets[self.sId].send('zingchart.getdata');
						}, iTimeout);
					}
				}
			}
		}
	}
	//endif
};

/* add the API */
zingchart.exec_html5_feed = function(sId, sCall, oParams) {
	//if DEFAULT then
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
		var oGraph = oLoader._api_getgraphbyid_(oParams['graphid']);
		switch (sCall) {
			case 'clearfeed':
				oGraph.aFeedStatus[1] = 1;
				break;
			case 'getinterval':
				return oGraph.oRefresh['interval'];
				break;
			case 'setinterval':
				oGraph.oData['refresh'] = oGraph.oData['refresh'] || {};
				oGraph.oData['refresh']['interval'] = oParams['interval'] || 1;
				break;
			case 'stopfeed':
				oGraph.aFeedStatus[0] = 0;
				if ((mValue=oLoader.oSockets[oGraph.sId]) != null) {
					mValue.send('zingchart.stopfeed');
				}
				break;
			case 'startfeed':
				oGraph.aFeedStatus[0] = 1;
				if ((mValue=oLoader.oSockets[oGraph.sId]) != null) {
					mValue.send('zingchart.startfeed');
				}
				ZC._delay_(function() {
					oGraph.parse();
					oGraph.clear(true);
					oGraph.syncScalesOnFeed();
					oGraph.paint(true, true);
				});
				break;
		}
	}
	//endif
	return null;
};
