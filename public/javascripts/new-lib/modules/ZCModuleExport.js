ZC.ZCModuleExport = {};
//if [MODULES] then
ZC.aLoadedModules.push('export');
//endif
ZC.ZCUtils._create_image_data_ = function(mCanvas, iWidth, iHeight, sFormat) {
	//if DEFAULT then
	//if [CANVAS] then
	sFormat = sFormat || 'png';
	if (sFormat == 'jpg') { sFormat = 'jpeg'; }
	var oCanvas = document.createElement('canvas');
	oCanvas.width = iWidth;
	oCanvas.height = iHeight;
	oCanvas.style.width = iWidth + 'px';
	oCanvas.style.height = iHeight + 'px';
	var oCtx = oCanvas.getContext('2d');
	if (!(mCanvas instanceof Array)) {
		mCanvas = [mCanvas];
	}
	for (var c=0,cLen=mCanvas.length;c<cLen;c++) {
		if (mCanvas[c].className.indexOf('zc-no-print') == -1) {
			oCtx.drawImage(mCanvas[c], 0, 0, mCanvas[c].width, mCanvas[c].height, 0, 0, iWidth, iHeight);
		}
	}
	var sImageData = oCanvas.toDataURL('image/' + sFormat);
	return sImageData;
	//endif
	//endif
};
ZC.ZCUtils._save_as_image_ = function(mCanvas, iWidth, iHeight, sFormat, bMakeImage) {
	//if DEFAULT then
	//if [CANVAS] then
	if (bMakeImage == null) { bMakeImage = false; }
	var sImageData = ZC.ZCUtils._create_image_data_(mCanvas, iWidth, iHeight, sFormat);
	if (bMakeImage) {
		var oImage = document.createElement('img');
		oImage.src = sImageData;
		return oImage;
	} else {
		sImageData = sImageData.replace('image/' + sFormat, 'image/octet-stream');
		document.location.href = sImageData;
	}
	//endif
	//endif
};
ZC.ZCLoader.prototype._api_print_ = function() {
    //if DEFAULT then
	var self = this;
	var aDisplay = [];
	if (self.bPrints) {
		return;
	}
	self.bPrints = true;
	var aChildNodes = document.body.childNodes;
	var sBodyCssBgColor = ZC.ZCQuery(document.body).css('background-color');
	var sBodyCssBgImage = ZC.ZCQuery(document.body).css('background-image');
	ZC.ZCQuery(document.body).css('background-color', '#fff').css('background-image', 'none');
	for (var i=0,l=aChildNodes.length;i<l;i++) {
		if (aChildNodes[i].nodeType == 1) {
			aDisplay[i] = aChildNodes[i].style.display;
			aChildNodes[i].style.display = 'none';
		}
	}
	document.body.appendChild(ZC._id_(self.sId + '-top'));
	window.setTimeout(function() {
		window.print();
		window.setTimeout(function() {
			ZC.ZCQuery(document.body).css('background-color', sBodyCssBgColor).css('background-image', sBodyCssBgImage);
			ZC._id_(self.sId).appendChild(ZC._id_(self.sId + '-top'));
			for (var i=0,l=aChildNodes.length;i<l;i++) {
				if (aChildNodes[i].nodeType == 1) {
					aChildNodes[i].style.display = aDisplay[i];
				}
			}
			self.bPrints = false;
		}, 1000);
	}, 50);
    //endif
};
ZC.ZCLoader.prototype._api_view_as_image_ = function(sFormat, oOptions, bSilent, oCallback) {
	//if DEFAULT then
	var self = this;
	oOptions = oOptions || {};
	if (typeof(bSilent) == 'undefined') { bSilent = false; }
	if (ZC._id_(self.sId + '-viewimage') != null) {
		return;
	}
	sFormat = sFormat || 'png';
	bDownload = oOptions['download'];

	/* clear guide if svg */
	ZC.ZCHtmlUtils._clear_(ZC._id_(self.sId + '-guide-c'), self.sOutput, 0, 0, self.iWidth, self.iHeight);
	ZC.ZCQuery('.zc-guide-label').remove();

	var bClose = ((self.sOutput == 'canvas' || zingchart.AJAXEXPORT) && sFormat != 'pdf' && sFormat != 'svg');

	if (bClose && !bSilent && !bDownload) {
		var oViewImage = ZC.ZCHtmlUtils._div_({
			cls : 'zc-abs zc-viewimage zc-style',
			id : self.sId + '-viewimage',
			p : ZC._id_(self.sId + '-top'),
			/*wh : (self.iWidth-10) + '/' + (self.iHeight-10)*/
			wh : self.iWidth + '/' + self.iHeight
		});
		var oViewImageClose = ZC.ZCHtmlUtils._div_({
			id : self.sId + '-viewimage-close',
			p : oViewImage,
			tl : 5 + '/' + (self.iWidth-15),
			html : ZC.ZCLabels['viewimage-close']
		});
	}

	if (self.sOutput == 'canvas' && sFormat != 'pdf' && sFormat != 'svg') {
		var oCanvas = document.createElement('canvas');
		oCanvas.width = self.iWidth;
		oCanvas.height = self.iHeight;
		for (var g=0,gLen=self.aGraphs.length;g<gLen;g++) {
			for (var l=0,lLen=self.aGraphs[g].aLabels.length;l<lLen;l++) {
				self.aGraphs[g].aLabels[l].paintPrintVersion(oCanvas);
			}
		}

		var aCanvas = [];
		ZC.ZCQuery('#' + self.sId + ' canvas').each(function() {
			if (ZC._indexof_([self.sId + '-guide-c', self.sId + '-trigger-c'], this.id) == -1) {
				aCanvas.push(this);
			}
		});
		aCanvas.push(oCanvas);
		var oImage = ZC.ZCUtils._save_as_image_(aCanvas, self.iWidth, self.iHeight, sFormat, true);
		oImage.id = self.sId + '-print-' + sFormat;
		oViewImage.appendChild(oImage);

	} else {

		if (!bSilent) {
			self._api_disable_(ZC.ZCLabels['export-wait']);
		}

		function _post_() {

			var oFields = {
				svg : sSvg,
				w : self.iWidth,
				h : self.iHeight,
				t : sFormat
			};
			ZC._cp_(oOptions, oFields);

			if (zingchart.AJAXEXPORT && sFormat != 'pdf' && sFormat != 'svg' && !bDownload) {
				var sData = 'base64=1&';
				for (var p in oFields) {
					sData += p + '=' + encodeURIComponent(oFields[p]) + '&';
				}
				ZC.ZCQuery.ajax({
					type : 'post',
					url : zingchart.EXPORTURL,
					data : sData,
					success : function(sResponse, sStatus, oXhr) {
						self._api_enable_();
						if (bSilent) {
							if (oCallback) {
								oCallback(sResponse, sStatus, oXhr);
							}
						} else {
							var oImage = document.createElement('img');
							oImage.src = sResponse;
							oImage.id = self.sId + '-print-' + sFormat;
							oViewImage.appendChild(oImage);
						}
					}
				});
			} else {

				if (ZC._id_(self.sId + '-export')) {
					ZC.ZCHtmlUtils._remove_(self.sId + '-export');
				}

				var oExport = ZC.ZCHtmlUtils._div_({
					cls : 'zc-abs zc-style',
					id : self.sId + '-export',
					p : ZC._id_(self.sId + '-top'),
					display : 'none'
				});

				if (oFields['uid'] != null && oFields['page'] != null) {
					var oDoc = ZC.ZCHtmlUtils._iframe_(ZC._id_(self.sId + '-export'));
				} else {
					var oDoc = document;
				}
				var oForm = oDoc.createElement('FORM');
				oForm.action = zingchart.EXPORTURL;
				oForm.method = 'post';
				oForm.enctype = 'multipart/form-data';
				if (oFields['uid'] != null && oFields['page'] != null) {
					oDoc.body.appendChild(oForm);
				} else {
					oExport.appendChild(oForm);
				}
				oForm.style.display = 'none';
				for (var p in oFields) {
					var oInput = oDoc.createElement('INPUT');
					oInput.type = 'hidden';
					oInput.name = p;
					oInput.value = oFields[p];
					oForm.appendChild(oInput);
				}
				oForm.submit();
				oForm = null;

				if (oFields['uid'] != null && oFields['page'] != null) {
					window.setTimeout(function() {
						ZC.ZCQuery('#' + self.sId + '-export').remove();
					}, 60000);
				}

				window.setTimeout(function() {
					/*ZC.ZCQuery('#' + self.sId + '-export').remove();*/
					self._api_enable_();
				}, 1000);
			}
		};

		var sSvg = ZC._id_(self.sId + '-top').innerHTML;

		if (self.sOutput == 'vml' || (self.sOutput == 'canvas' && (sFormat == 'pdf' || sFormat == 'svg'))) {

			var oDiv = document.createElement('div');
			var sExpSvgId = 'zc-export-svg-' + self.sId;
			oDiv.id = sExpSvgId;
			oDiv.style.display = 'none';
			document.body.appendChild(oDiv);

			zingchart.render({
				id : sExpSvgId,
				output : '!svg',
				imggen : true,
				width : self.iWidth,
				height : self.iHeight,
				data : self.oAttributes['json'],
				defaults : self.oDefaultsObj,
				theme : self.sTheme,
				hideprogresslogo : true,
				events : {
					load : function() {
						window.setTimeout(function() {
							var oExpLoader = zingchart.getLoader(sExpSvgId);
							if (oExpLoader.oAttributes['dynamic-objects']) {
								var iTick = window.setInterval(function() {
									if (oExpLoader.oAttributes['dynamic-objects'] == 'ready') {
										window.clearInterval(iTick);
										sSvg = ZC._id_(sExpSvgId+'-top').innerHTML;
										zingchart.exec(sExpSvgId, 'destroy');
										_post_();
									}
								}, 100);
							} else {
								sSvg = ZC._id_(sExpSvgId+'-top').innerHTML;
								zingchart.exec(sExpSvgId, 'destroy');
								_post_();
							}
						}, 100);
					}
				}
			});

		} else if (self.sOutput == 'svg') {
			_post_();
		}

	}

	if (bClose && !bSilent) {
		ZC.ZCQuery(oViewImageClose).css('cursor', 'pointer').css('left', (self.iWidth - 15 - ZC.ZCQuery(oViewImageClose).width()) + 'px');
		ZC.ZCQuery(oViewImageClose).bind('click', function() {
			ZC.ZCQuery(oViewImage).remove();
		});
	}
	//endif
};
ZC.ZCLoader.prototype._api_getimagedata_ = function(sFormat) {
	//if DEFAULT then
	//if [CANVAS] then
	var self = this;
	sFormat = sFormat || 'png';
	var aCanvas = [];
	ZC.ZCQuery('#' + self.sId + ' canvas').each(function() {
		if (ZC._indexof_([self.sId + '-guide-c', self.sId + '-tooltip-c'], this.id) == -1) {
			aCanvas.push(this);
		}
	});
	return ZC.ZCUtils._create_image_data_(aCanvas, self.iWidth, self.iHeight, sFormat);
	//endif
	//endif
};
/* add the API */
zingchart.exec_html5_export = function(sId, sCall, oParams) {
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
		switch (sCall) {
			case 'getimagedata':
				if (oLoader.sOutput != 'canvas' && !zingchart.AJAXEXPORT) {
					return -1;
				}
				var sFormat = 'png', mValue;
				if ((mValue=oParams['format']) != null) {
					sFormat = mValue;
				}
				if ((mValue=oParams['filetype']) != null) {
					sFormat = mValue;
				}
				if (sFormat == 'jpg') { sFormat = 'jpeg'; }
				if (oLoader.sOutput == 'canvas') {
					return oLoader._api_getimagedata_(sFormat);
				} else {
					oLoader._api_view_as_image_(sFormat, {}, true, oParams['callback']);
				}
				break;
			case 'exportimage':
			case 'saveasimage':
				if (!oParams['download']) {
					if (oLoader.sOutput != 'canvas' && !zingchart.AJAXEXPORT) {
						return -1;
					}
				}
				var sFormat = 'png', mValue, oOptions = {};
				if ((mValue=oParams['options']) != null) {
					oOptions = mValue;
				}
				if ((mValue=oParams['uid']) != null) {
					oOptions['uid'] = mValue;
				}
				if ((mValue=oParams['page']) != null) {
					oOptions['page'] = mValue;
				}
				if ((mValue=oParams['format']) != null) {
					sFormat = mValue;
				}
				if ((mValue=oParams['filetype']) != null) {
					sFormat = mValue;
				}
				var sUrl = oLoader.oAttributes['exportimageurl'] || '';
				if ((mValue=oParams['url']) != null) {
					sUrl = mValue;
				}
				var oCallback = null;
				if ((mValue=oParams['callback']) != null) {
					oCallback = mValue;
				}
				if (sFormat == 'jpg') { sFormat = 'jpeg'; }

				if (oParams['download'] && (oLoader.sOutput != 'canvas' || sFormat == 'pdf')) {
					oOptions['download'] = true;
					oLoader._api_view_as_image_(sFormat, oOptions);
					return;
				}

				function _export_(sImageData) {
					ZC.ZCQuery.ajax({
						type : 'post',
						url : sUrl,
						data : sImageData,
						success : function(sResponse, sStatus, oXhr) {
							if (oCallback) {
								oCallback(sResponse, sStatus, oXhr);
							}
						}
					});
				};

				if (sUrl != '') {
					if (oLoader.sOutput == 'canvas') {
						return _export_(oLoader._api_getimagedata_(sFormat));
					} else {
						oLoader._api_view_as_image_(sFormat, oOptions, true, function(sImageData) {
							return _export_(sImageData);
						});
					}
				}
				break;
			case 'exportdata':
				var mValue;
				var sUrl = oLoader.oAttributes['exportdataurl'] || '';
				if ((mValue=oParams['url']) != null) {
					sUrl = mValue;
				}
				var sCsv = '';
				for (var g=0,gLen=oLoader.aGraphs.length;g<gLen;g++) {
					sCsv += ',';
					var oGraph = oLoader.aGraphs[g], aPlots = oGraph.oPlotSet.aPlots;
					for (var p=0,pLen=aPlots.length;p<pLen;p++) {
						sCsv += '"' + aPlots[p].sText.replace('"', '\"') + '",';
					}
					sCsv = sCsv.substr(0, sCsv.length-1);
					sCsv += "\n";
					var oScaleX = oGraph.getScales('k')[0];
					for (var j=0,jLen=oScaleX.aValues.length;j<jLen;j++) {
						sCsv += oScaleX.aValues[j] + ',';
						for (i=0,iLen=aPlots.length;i<iLen;i++) {
							var oNode = aPlots[i].getNode(j);
							if (oNode) {
								sCsv += oNode.sValue;
							}
							sCsv += ',';
							/*
							if ((mValue=aPlots[i].aPlotNodes[j]) != null) {
								sCsv += mValue.sValue + ',';
							}
							*/
						}
						sCsv = sCsv.substr(0, sCsv.length-1);
						sCsv += "\n";
					}
					if (gLen > 1 && g < gLen-1) {
						sCsv += "\n$\n\n";
					}
				}
				if (sUrl != '') {
					var oCallback = null;
					if ((mValue=oParams['callback']) != null) {
						oCallback = mValue;
					}
					ZC.ZCQuery.ajax({
						type : 'post',
						url : sUrl,
						data : sCsv,
						success : function(sResponse, sStatus, oXhr) {
							if (oCallback) {
								oCallback(sResponse, sStatus, oXhr);
							}
						}
					});
				} else {
					return sCsv;
				}
				break;
		}
	}
	//endif
	return null;
};
