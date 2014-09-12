//if DEFAULT,NODEJS,SILKJS,RHINO then
/* if zingchart is included just patch it with canvas functions */
if (typeof(zingchart) == 'undefined') {
	zingchart = {
		bNoFlash : true
	};
};
zingchart.clipart = {};
zingchart.widgets = {};
zingchart.plugins = {};

zingchart.pool = {};
zingchart.pool.getInstance = function(sType, oParent, sId, bReuse) {
	var oInstance;
	if (zingchart.pool[sId] != null) {
		oInstance = zingchart.pool[sId];
		oInstance._POOL_ = true;
		ZC.SKIPOBJCOUNT = true;
		if (!bReuse) {
			oInstance.init(oParent);
			oInstance.sId = sId;
		}
		ZC.SKIPOBJCOUNT = false;
	} else {
		switch (sType) {
			case 'ZCTextBox':
				oInstance = new ZC.ZCTextBox(oParent);
				break;
			case 'ZCBox':
				oInstance = new ZC.ZCBox(oParent);
				break;
			case 'ZCShape':
				oInstance = new ZC.ZCShape(oParent);
				break;
			case 'ZCGraphShape':
				oInstance = new ZC.ZCGraphShape(oParent);
				break;
			case 'ZCStyle':
				oInstance = new ZC.ZCStyle(oParent);
				break;
			/*
			case 'ZCLinePlot':
				oInstance = new ZC.ZCLinePlot(oParent);
				break;
			*/
		}
		oInstance.sId = sId;
		//if DEFAULT then
		zingchart.pool[sId] = oInstance;
		//endif
	}
	return oInstance;
};

/*
zingchart.whchk = {};
*/
zingchart.i18n = {};
zingchart.THEMES = {};
zingchart.V3D = 2;
zingchart.QUOTEDVALUES = false;
zingchart.EDITSOURCE = 1;
zingchart.MODULESDIR = './modules/';
zingchart.MODULESDEP = {
	line : 'xy',
	line3d : '3d,line',
	area : 'xy',
	area3d : '3d,area',
	vbar : 'xy',
	vbar3d : '3d,vbar',
	hbar : 'yx',
	hbar3d : '3d,hbar',
	scatter : 'xy',
	bubble : 'xy',
	pie : 'r',
	pie3d : '3d,pie',
	nestedpie : 'r',
	gauge : 'r',
	vbullet : 'vbar',
	hbullet : 'hbar',
	vfunnel : 'xy',
	hfunnel : 'yx',
	piano : 'xy',
	radar : 'r',
	range : 'xy',
	stock : 'xy,vbar',
	venn : 'r'
};
zingchart.SKIP = {
	EVENT : false,
	ANIMATION : false,
	LEGEND : false,
	CSV : false,
	PARSE3D : false
};
//if NODEJS,SILKJS,RHINO then
zingchart.TMPFOLDER = '/tmp/';
zingchart.CANVASTEXT = 1;
zingchart.DEV = {
	SORTTOKENS : 1,
	PLOTSTATS : 1,
	TRUELOG : 0,
	RESOURCES : 1,
	KEEPSOURCE : 1
};
//endif
//if DEFAULT then
zingchart.DEV = {
	DOMFRAGMENTS : 1,
	SORTTOKENS : 1,
	PLOTSTATS : 1,
	TRUELOG : 0,
	RESOURCES : 1,
	KEEPSOURCE : 1
};
/*zingchart.HTMLTEXT = 1;*/
zingchart.CANVASTEXT = 0;
zingchart.ZINDEX = 1;
zingchart.CMZINDEX = 0;
zingchart.FSZINDEX = 9999;
zingchart.ZCOUTPUT = 0;
zingchart.ASYNC = 0;
zingchart.SORTTRACKERS = 0;
zingchart.TIMEOUT = 10;
zingchart.USERCSS = {};
zingchart.OBJECTMODE = 'normal';
zingchart.SYNTAX = 'mixed';
zingchart.EXPORTURL = ((document.location.protocol=='file:')?'http:':document.location.protocol) + '//export.zingchart.com/';
zingchart.AJAXEXPORT = false;

/* !!! */
/*
zingchart.EXPORTURL = 'http://192.168.1.16/batik/';
zingchart.AJAXEXPORT = true;
*/

zingchart.TOUCHZOOM = 'normal'; /* normal | pinch */
//endif
//if NODEJS then
zingchart.MODULESDIR = './modules-nodejs/';
//endif

zingchart.FASTWIDTH = false;
zingchart.FONTSIZE = 11;
//if DEFAULT then
zingchart.FONTFAMILY = 'Lucida Sans Unicode,Lucida Grande,Verdana,Arial,sans-serif';
//endif
//if NODEJS,SILKJS,RHINO then
zingchart.FONTFAMILY = 'Lucida Sans Unicode';
//endif

//if DEFAULT then
if (ZC.mobile) {
	zingchart.FONTFAMILY = 'Helvetica,Verdana,Arial,sans-serif';
}
//endif

//if DEFAULT,NODEJS,SILKJS,RHINO then
zingchart.loadModules = function(sModules, oCallback) {
	var aModules = (new String(sModules)).split(',');
	for (var i=0,iLen=aModules.length;i<iLen;i++) {
		var sModule = ZC._trim_(aModules[i]);
		if (ZC._indexof_(['bar','bar3d','funnel','bullet'], sModule) != -1) {
			sModule = 'v' + sModule;
		}
		/* check dependencies */
		var mValue = zingchart.MODULESDEP[sModule];
		if (mValue != null && typeof(mValue) != 'undefined') {
			zingchart.loadModules(mValue);
		}
		if (ZC._indexof_(ZC.aModules, sModule) == -1) {
			ZC.aModules.push(sModule);
		}
	}
	if (oCallback) {
		/* load scripts immediately */
		zingchart.loadScripts(null, ZC.aModules, oCallback);
	}
};
zingchart.loadScripts = function(oLoader, aScripts, oCallback) {
	if (aScripts.length == 0) {
		oCallback();
	} else {
		//if DEFAULT then
		var oHead = document.getElementsByTagName('head')[0];
		if (!oHead) {
			oCallback();
			return;
		}
		var iSLoaded = 0;
		function _script_() {
			var sSrc, bLoad = true;
			if (zingchart.pendingLoad(aScripts[iSLoaded])) {
				sSrc = zingchart.MODULESDIR + 'zingchart-html5-' + aScripts[iSLoaded] + '-min.js';
			} else {
				bLoad = false;
			}
			function _script_loaded_() {
				iSLoaded++;
				if (iSLoaded == aScripts.length) {
					oCallback();
				} else {
					_script_();
				}
			}
			if (bLoad) {
				ZC.ZCUtils._load_script_(oLoader, sSrc, _script_loaded_);
			} else {
				_script_loaded_();
			}
		}
		_script_();
		//endif
		//if NODEJS then
		for (var i=0;i<aScripts.length;i++) {
			require(zingchart.MODULESDIR + 'zingchart-nodejs-' + aScripts[i] + '-min');
		}
		oCallback();
		//endif
		//if SILKJS then
		for (var i=0;i<aScripts.length;i++) {
			require(zingchart.MODULESDIR + 'zingchart-silkjs-' + aScripts[i] + '-min');
		}
		oCallback();
		//endif
		//if RHINO then
		oCallback();
		//endif
	}
};
zingchart.pendingLoad = function(sModule) {
	return (ZC._indexof_(ZC.aModules, sModule) != -1 && ZC._indexof_(ZC.aLoadedModules, sModule) == -1);
};
//endif

//if DEFAULT then
zingchart.aImages = [];
if (!ZC.ie67) {
	(function() {
		for (var sKey in ZC.IMAGES) {
			if (ZC.IMAGES.hasOwnProperty(sKey)) {
				zingchart.aImages[sKey] = new Image();
				zingchart.aImages[sKey].src = ZC.IMAGES[sKey];
			}
		}
	})();
}
/*
SENCHA BUG, blank image needs to be preloaded
*/
if (typeof(Ext) != 'undefined') {
	zingchart.aImages['zc.blank'] = new Image();
	zingchart.aImages['zc.blank'].src = ZC.BLANK;
}
//endif

//if DEFAULT then
zingchart.exec = function(sId, sCall, oParams) {
	if (zingchart.exec_flash) {
		return zingchart.exec_flash(sId, sCall, oParams);
	}
	return null;
};

zingchart.render_gw = function(oParams) {
	var sDataUrl = oParams['dataurl'] || '';
	var sData = '', mValue;
	var oDataObj = null;
	if ((mValue=oParams['data']) != null) {
		if (typeof(mValue) == 'string') {
			sData = mValue;
		} else {
			oDataObj = mValue;
		}
	}
	var oResponse = null;
	if (sDataUrl != '') {
		ZC.ZCQuery.ajax({
			type : 'GET',
			url : sDataUrl,
			/*dataType : 'text',*/
			async : false,
			data : (zingchart.ZCOUTPUT?'zcoutput=userdef':''),
			error : function(oXhr, sStatus, oError) {
				return false;
			},
			success : function(sResponse, sStatus, oXhr) {
				function _f_(oResponse) {
					ZC.cache.data['data-' + sDataUrl] = sResponse;
					oParams['output'] = 'auto';
					ZC._cp_(oResponse['render'], oParams);
				}
				try {
					oResponse = JSON.parse(sResponse);
					_f_(oResponse);
				} catch (oError) {
					try {
						oResponse = eval('(' + sResponse + ')');
						_f_(oResponse);
					} catch (oError) {
						return false;
					}
				}
			}
		});
	} else {
		if (sData != '') {
			try {
				oResponse = JSON.parse(sData);
			} catch (oError) {
				return false;
			}
		} else if (oDataObj != null) {
			oResponse = oDataObj;
		}
		if (oParams['output'] == null) {
			oParams['output'] = 'auto';
		}
		ZC._cp_(oResponse['render'], oParams);
	}
	return zingchart.render(oParams);
};
//endif
zingchart.bVmlReady = null;
zingchart.render = function(oParams, bUserDefinedOutput) {
	//if DEFAULT then
	if (bUserDefinedOutput == null) {
		bUserDefinedOutput = false;
	}
	if (bUserDefinedOutput) {
		return zingchart.render_gw(oParams);
	}
	if (typeof(ZC.canvas) == 'undefined' || ZC.canvas == null) {
		ZC.compat();
	}

	var sOutput = oParams['output'] || 'auto';
	if (sOutput == 'html5') { sOutput = 'auto'; }
	if (ZC.mobile && sOutput == 'auto') { sOutput = 'svg'; }
	var bForce = false;
	if (sOutput.substring(0, 1) == '!') {
		bForce = true;
		sOutput = sOutput.substring(1);
	}
	if (!bForce) {
		if (
			(sOutput == 'auto')
			||
			(sOutput == 'canvas' && !ZC.canvas)
			||
			(sOutput == 'svg' && !ZC.svg)
			||
			(sOutput == 'vml' && !ZC.vml)
			||
			(sOutput == 'flash' && !ZC.flash)
		) {
			if (ZC.svg) {
				sOutput = 'svg';
			} else if (ZC.canvas) {
				sOutput = 'canvas';
			} else if (ZC.vml) {
				sOutput = 'vml';
			} else if (ZC.flash) {
				sOutput = 'flash';
			}
		}
	}
	if (sOutput == 'vml' && zingchart.bVmlReady == null) {
		zingchart.bVmlReady = false;
	}
	if (sOutput == 'flash') {
		zingchart.render_flash(oParams);
	} else {
		return zingchart.render_html5(oParams, sOutput);
	}
	//endif
	//if NODEJS,SILKJS,RHINO then
	return zingchart.render_html5(oParams, 'canvas');
	//endif
};
//if DEFAULT then
if (document.attachEvent) {
	if (document.readyState == 'complete') {
		zingchart.bVmlReady = true;
	} else {
		document.attachEvent('onreadystatechange', function() { if (document.readyState == 'complete') { zingchart.bVmlReady = true; } });
	}
}
//endif
zingchart.setlabel = function(sLabel, sText) {
	ZC.ZCLabels[sLabel] = sText;
};
zingchart.aLoaders = [];
//if DEFAULT then
zingchart.iIMG = 0;
zingchart.iIMGLoaded = 0;
zingchart.bIMGInit = false;
zingchart.bVMLInit = false;
zingchart.bCSSInit = false;
zingchart.bEventsInit = false;
zingchart.css = null;

zingchart.zc_get_loader_by_event = function(ev) {
	if (!ev.target.id) { return; }
	var oLoader = null;
	for (var l=0,lLen=zingchart.aLoaders.length;l<lLen;l++) {
		if (ev.target.id.substr(0, zingchart.aLoaders[l].sId.length+1) == (zingchart.aLoaders[l].sId + '-')) {
			oLoader = zingchart.aLoaders[l];
		}
	}
	return oLoader;
};

/* setup global events */
if (typeof(zingchart.zc_mouseevent) == 'undefined') {
	zingchart.zc_mouseevent = function(ev) {
		if (window.ZC) {
			window.ZC.aPageXY = [ev.pageX, ev.pageY];
			var oLoader = zingchart.zc_get_loader_by_event(ev);
			if (oLoader) {
				if (!zingchart.SKIP.EVENT) {
					if (ev.type == 'touchstart' && oLoader.aGraphs) {
						/* clear all graph layers */
						for (var g=0;g<oLoader.aGraphs.length;g++) {
							oLoader.aGraphs[g].hideLayer();
						}
					}
					ZC.ZCUtils._trigger_event_(ev.type, oLoader, zingchart.getMouseInfo(ev, oLoader));
				}
				zingchart.SKIP.EVENT = false;
			}
		}
	};
	ZC.ZCQuery(document)
		.bind(ZC.ZCHtmlUtils._event_('mousemove'), zingchart.zc_mouseevent)
		.bind(ZC.ZCHtmlUtils._event_('mousedown'), zingchart.zc_mouseevent)
		.bind(ZC.ZCHtmlUtils._event_('mouseup'), zingchart.zc_mouseevent);
}

zingchart.getMouseInfo = function(ev, oLoader) {
	var aPageXY = ZC.ZCHtmlUtils._pagexy_(ev);
	var oGraph = oLoader.detectGraph(aPageXY[0], aPageXY[1]);
	var oContainer = ZC.ZCQuery('#' + oLoader.sId + '-top');
	var iX_ = aPageXY[0] - oContainer.offset().left;
	var iY_ = aPageXY[1] - oContainer.offset().top;
	var sTarget = 'none';
	if (/(.*)\-plotset\-plot\-(\d+)\-node\-(\d+)(.*)/.test(ev.target.id)) {
		sTarget = 'node';
	}
	if (/(.*)\-legend\-item\-(\d+)\-area/.test(ev.target.id)) {
		sTarget = 'legend-item';
	}
	if (/(.*)\-legend\-marker\-(\d+)\-area/.test(ev.target.id)) {
		sTarget = 'legend-marker';
	}
	if (/(.*)\-menu\-item\-(.*)/.test(ev.target.id)) {
		sTarget = 'menu-item';
	}
	if (/(.*)\-preview\-handler\-x(.*)/.test(ev.target.id)) {
		sTarget = 'preview';
	}
	if (/(.*)\-shape\-(.*?)\-area/.test(ev.target.id)) {
		sTarget = 'shape';
	}
	if (/(.*)\-label\-(.*?)\-area/.test(ev.target.id)) {
		sTarget = 'label';
	}
	return {
		id : oLoader.sId,
		ev : ZC.ZCQuery._event_(ev),
		targetid : ev.target.id,
		graphid : oGraph?oGraph.sId:null,
		target : sTarget,
		x : iX_,
		y : iY_,
		plotarea : oGraph?(iX_ >= oGraph.oPlotArea.iX && iX_ <= oGraph.oPlotArea.iX+oGraph.oPlotArea.iWidth && iY_ >= oGraph.oPlotArea.iY && iY_ <= oGraph.oPlotArea.iY+oGraph.oPlotArea.iHeight):false,
		touch : ZC.mobile
	};
};

if (typeof(zingchart.zc_click) == 'undefined') {
	zingchart.zc_click = function(ev) {
		for (var l=0,lLen=zingchart.aLoaders.length;l<lLen;l++) {
			zingchart.aLoaders[l].hideCM();
		}
		if (ZC.mobile && ZC.move) {
			ZC.move = false;
			return;
		}
		if (!ZC.mobile && ev.which > 1) {
			return;
		}
		var oLoader = zingchart.zc_get_loader_by_event(ev);
		if (oLoader) {
			if (!zingchart.SKIP.EVENT) {
				ZC.ZCUtils._trigger_event_((ev.type=='dblclick')?'dblclick':'click', oLoader, zingchart.getMouseInfo(ev, oLoader));
			}
			zingchart.SKIP.EVENT = false;
			if (ev.target.id != (oLoader.sId + '-menu-area')) {
				oLoader.hideCM();
			} else {
				zingchart.zc_contextmenu(ev);
			}
		}
	};
	
	if (ZC.mobile) {
		ZC.ZCQuery(document).bind('touchmove', function(ev) {
			ZC.move = true;
		});
		ZC.ZCQuery(document).bind('touchend', function(ev) {
			ZC.move = false;
		});
	} else {
		ZC.ZCQuery(document).bind('click', zingchart.zc_click);
		ZC.ZCQuery(document).bind('dblclick', zingchart.zc_click);
	}
	
}

if (typeof(zingchart.zc_check_touch) == 'undefined') {
	zingchart.zc_check_touch = function(ev) {
		if (ev.touches.length > 0) {
			ZC.TOUCHEVENTS = true;
		}
	};
	ZC.ZCQuery(document).bind('touchstart', zingchart.zc_check_touch);
}

if (typeof(zingchart.zc_contextmenu) == 'undefined') {
	zingchart.zc_contextmenu = function(ev, sLoaderId) {

		if (ev && ev.target.tagName.toUpperCase() != 'IMG' && ev.target.tagName.toUpperCase() != 'AREA' && ev.target.className.indexOf('zc-scroll') == -1) {
			return;
		}

		var oLoader = (sLoaderId==null)?zingchart.zc_get_loader_by_event(ev):zingchart.getLoader(sLoaderId);
		if (oLoader) {
			if (ZC._indexof_(oLoader.aFlags, 'skip_context_menu') != -1) {
				return false;
			}

			if (sLoaderId == null) {
				var aPageXY = ZC.ZCHtmlUtils._pagexy_(ev);
				var oGraph = oLoader.detectGraph(aPageXY[0], aPageXY[1]);
			} else {
				var oGraph = oLoader.aGraphs[0];
			}

			if (!oGraph) {
				return false;
			}

			oLoader.buildContextMenu(oGraph?oGraph.iIndex:-1, ev);

			var iZIndex = -1;
			if (zingchart.CMZINDEX != 0) {
				iZIndex = zingchart.CMZINDEX;
			} else {
				var oLayer = ZC._id_(oLoader.sId);
				while (iZIndex == -1 && oLayer.parentNode != null) {
					iZIndex = ZC._i_(ZC.ZCQuery(oLayer).css('zIndex'));
					if (iZIndex == 'auto' || iZIndex == '' || iZIndex == null) {
						iZIndex = -1;
					}
					oLayer = oLayer.parentNode;
				}
			}
			if (!iZIndex || iZIndex == -1 || iZIndex == null) {
				iZIndex = 1;
			}
			var oMenu = ZC.ZCQuery('#' + oLoader.sId + '-menu');
			oMenu.css('zIndex', zingchart.ZINDEX + iZIndex + 1);
			if (sLoaderId == null) {
				if (ev.target.id == (oLoader.sId + '-print-png') || ev.target.id == (oLoader.sId + '-print-jpeg')) {
					return true;
				} else {
					ev.preventDefault();
				}
			}
			if (!ZC._id_(oLoader.sId + '-menu')) {
				return false;
			}
			var oContainer = ZC.ZCQuery('#' + oLoader.sId + '-top');
			if (sLoaderId == null) {						
				var iX_ = aPageXY[0] - oContainer.offset().left;
				var iY_ = aPageXY[1] - oContainer.offset().top;
			} else {
				var iX_ = oLoader.iWidth/2;
				var iY_ = oLoader.iHeight/2;				
			}
			var oInfo = {
				id : oLoader.sId,
				graphid : oGraph?oGraph.sId:null,
				targetid : (ev?ev.target.id:''),
				x : iX_,
				y : iY_,
				touch : ZC.mobile
			};
			ZC.ZCUtils._trigger_event_('contextmenu', oLoader, oInfo);

			var iX_ = oContainer.offset().left;
			var iY_ = oContainer.offset().top;
			var iWidth_ = oContainer.width();
			var iHeight_ = oContainer.height();
			if (sLoaderId == null) {
				var aPageXY = ZC.ZCHtmlUtils._pagexy_(ev);
				var iPageX = aPageXY[0] || ZC.aPageXY[0];
				var iPageY = aPageXY[1] || ZC.aPageXY[1];
			} else {
				var iPageX = iX_ + oLoader.iWidth/2;
				var iPageY = iY_ + 5;
			}
			/* toggle menu items if necessary */
			var bHistoryGroup = false;
			oLoader.toggleMenuItem('goback', false);
			if (oLoader.iHistory > 0) {
				oLoader.toggleMenuItem('goback', true);
				bHistoryGroup = true;
			}
			oLoader.toggleMenuItem('goforward', false);
			if (oLoader.iHistory < oLoader.aHistory.length-1) {
				oLoader.toggleMenuItem('goforward', true);
				bHistoryGroup = true;
			}
			oLoader.toggleMenuItem('history', bHistoryGroup, true);
			/* end toggle */
			if (iPageX >= iX_ && iPageX <= iX_ + iWidth_ && iPageY >= iY_ && iPageY <= iY_ + iHeight_) {
				ZC.ZCQuery('.zc-menu').each(function() {
					if (this.id != (oLoader.sId + '-menu')) {
						oLoader.hideCM();
					}
				});
				oLoader.aRClickXY = [iPageX, iPageY, (sLoaderId == null)?ev.target.id:sLoaderId];

				oMenu.css('opacity', 0).show();
				var iMenuWidth = ZC._i_(oMenu.css('width')), iMenuHeight = ZC._i_(oMenu.css('height'));
				oMenu.css('opacity', 1).hide();

				var iLeft, iTop;
				if (sLoaderId == null && ev.target.id == oLoader.sId + '-menu-area') {
					ZC._id_(oLoader.sId + '-menu').style.paddingTop = 0;
					var oMenuArea = ZC.ZCQuery('#' + oLoader.sId + '-menu-area');
					var aMenuAreaCoords = oMenuArea.attr('coords').split(',');
					var iAreaHeight = ZC._i_(aMenuAreaCoords[3]) - ZC._i_(aMenuAreaCoords[1]);
					ZC._id_(oLoader.sId + '-menu').style.backgroundPosition = ((ZC._i_(aMenuAreaCoords[0]) > oLoader.iWidth/2)?'100% 0% !important':'0% 0% !important');
					iLeft = iX_ + ((ZC._i_(aMenuAreaCoords[0]) > oLoader.iWidth/2)?(ZC._i_(aMenuAreaCoords[2]) - iMenuWidth):ZC._i_(aMenuAreaCoords[0]));
					iTop = iY_ + ((ZC._i_(aMenuAreaCoords[1]) > oLoader.iHeight/1.25)?(ZC._i_(aMenuAreaCoords[3]) - iMenuHeight - iAreaHeight):(ZC._i_(aMenuAreaCoords[3])));
				} else {
					/*ZC._id_(oLoader.sId + '-menu').style.paddingTop = '10px';*/
					ZC._id_(oLoader.sId + '-menu').style.backgroundPosition = '50% 0% !important';
					iLeft = oLoader.aRClickXY[0] - iMenuWidth/2;
					iTop = oLoader.aRClickXY[1];
					if (iMenuHeight > oLoader.iHeight) {
						iTop = iY_;
					} else {
						if (iTop - iY_ + iMenuHeight > oLoader.iHeight) {
							iTop = ZC._max_(iTop - iMenuHeight, oLoader.iHeight - iMenuHeight);
						}
					}
					if (iLeft < iX_) {
						iLeft = ZC._max_(iLeft, iX_);
					}
					if (iLeft + iMenuWidth > iX_ + oLoader.iWidth) {
						iLeft = ZC._min_(iX_ + oLoader.iWidth - iMenuWidth/2, iLeft - iMenuWidth/2);
					}
				}
				oMenu.css('left', ZC._max_(1, iLeft) + 'px').css('top', ZC._max_(1, iTop) + 'px').show();
				oLoader.bCM = true;
				return false;
			}
		}
	};
	ZC.ZCQuery(document).bind('contextmenu', zingchart.zc_contextmenu);
};

zingchart.addCssRule = function(sSelector, sRule) {
	if (zingchart.css) {
		if (zingchart.css.addRule) {
			return zingchart.css.addRule(sSelector, sRule);
		} else {
			return zingchart.css.insertRule(sSelector + '{' + sRule + '}', 0);
		}
	}
};

zingchart.wh = function(oContainer, sWidth, sHeight) {
	if (sWidth == 'auto') {
		sWidth = '100%';
	}
	if (sHeight == 'auto') {
		sHeight = '100%';
	}
	var iWidth, iHeight;
	if (new String(sWidth).indexOf('%') != -1) {
		iWidth = oContainer.width()*parseInt(sWidth, 10)/100;
	} else {
		iWidth = parseInt(sWidth, 10);
	}
	if (new String(sHeight).indexOf('%') != -1) {
		iHeight = oContainer.height()*parseInt(sHeight, 10)/100;
	} else {
		iHeight = parseInt(sHeight, 10);
	}
	return [iWidth, iHeight];
};
//endif

/* new event system */
zingchart.EVENTSMAP = {};
zingchart.bind = function(sId, sEvent, oFn) {
	//if DEFAULT,NODEJS then
	sId = sId || 'zingchart-global';
	if (!zingchart.EVENTSMAP[sId]) {
		zingchart.EVENTSMAP[sId] = {};
	}
	if (!zingchart.EVENTSMAP[sId][sEvent]) {
		zingchart.EVENTSMAP[sId][sEvent] = [{fn : oFn}];
	} else {
		zingchart.EVENTSMAP[sId][sEvent].push({fn : oFn});
	}
	//endif
};
zingchart.unbind = function(sId, sEvent, oFn) {
	//if DEFAULT,NODEJS then
	sId = sId || 'zingchart-global';
	if (zingchart.EVENTSMAP[sId] && zingchart.EVENTSMAP[sId][sEvent]) {
		if (!oFn) {
			zingchart.EVENTSMAP[sId][sEvent] = null;
		} else {
			for (var i=0,iLen=zingchart.EVENTSMAP[sId][sEvent].length;i<iLen;i++) {
				if (zingchart.EVENTSMAP[sId][sEvent][i].fn == oFn) {
					zingchart.EVENTSMAP[sId][sEvent].splice(i, 1);
					break;
				}
			}
		}
	}
	//endif
};
zingchart.callEvent = function(sId, sEvent, aArgs, oValue) {
	//if DEFAULT,NODEJS then
	sId = sId || 'zingchart-global';
	if (zingchart.EVENTSMAP[sId] && zingchart.EVENTSMAP[sId][sEvent]) {
		for (var i=0,iLen=zingchart.EVENTSMAP[sId][sEvent].length;i<iLen;i++) {
			if (oValue) {
				aArgs[aArgs.length-1] = zingchart.EVENTSMAP[sId][sEvent][i].fn.apply(zingchart, aArgs);
			} else {
				zingchart.EVENTSMAP[sId][sEvent][i].fn.apply(zingchart, aArgs);
			}
		}
		if (oValue) {
			return aArgs[aArgs.length-1];
		}
	}
	//endif
};
zingchart.hasEvent = function(sId, sEvent) {
	//if DEFAULT,NODEJS then
	sId = sId || 'zingchart-global';
	return zingchart.EVENTSMAP[sId] && zingchart.EVENTSMAP[sId][sEvent];
	//endif
};
/* <<< */

zingchart.render_html5 = function(oParams, sOutput) {

	ZC._ts_begin_('init');

	ZC._todash_(oParams, false);

	//if DEFAULT then
	/* parse flags & mode */
	var aFlags = [], mValue, mValue_;
	if ((mValue=oParams['flags']) != null) {
		aFlags = mValue.split(',');
	}
	if ((mValue=oParams['mode']) != null) {
		switch (mValue) {
			case 'static':
				aFlags = ['skip_context_menu','skip_segment_tracking','skip_marker_tracking','skip_interactivity','use_single_canvas'];
				break;
		}
	}
	//endif

	var sId = '';
	if ((mValue=oParams['container']) != null) {
		sId = mValue;
	}
	if ((mValue=oParams['id']) != null) {
		sId = mValue;
	}

	//if DEFAULT then
	/*ZC.TS[sId] = (new Date()).getTime();*/

 	if (!ZC._id_(sId)) {
		return;
	}
	//endif

	var sStage = null;
	for (var i=0;i<zingchart.aLoaders.length;i++) {
		if (zingchart.aLoaders[i].sId == sId) {
			sStage = zingchart.aLoaders[i].sStage;
		}
	}

	//if DEFAULT then
	/* check for multiple render calls and do our own destroy */
	/* if (ZC._id_(sId + '-top')) { */
	if (sStage != null) {
		if (sStage == '') {
			/* do it only if previous render is over, otherwise abort */
			zingchart.exec(sId, 'destroy');
		} else {
			return;
		}
	}
	//endif

	//if DEFAULT,NODEJS then
	var bFound = false;
	var oLoader = null;
	for (var i=0;i<zingchart.aLoaders.length;i++) {
		if (zingchart.aLoaders[i].sId == sId) {
			zingchart.aLoaders[i] = new ZC.ZCLoader();
			oLoader = zingchart.aLoaders[i];
			bFound = true;
		}
	}

	if (!bFound) {
		oLoader = new ZC.ZCLoader();
		oLoader.sStage = 'init';
		zingchart.aLoaders.push(oLoader);
	}
	//endif
	//if RHINO then
	oLoader = new ZC.ZCLoader();
	oLoader.sStage = 'init';
	//endif

	oLoader.sId = sId;

	//if DEFAULT then
	if (sOutput == 'vml' && !zingchart.bVmlReady) {
		ZC._ts_end_('init');
		/*
		window.setTimeout(function() {
			zingchart.render_html5(oParams, sOutput);
		}, 33);
		return oLoader;
		*/
		zingchart.render_html5(oParams, sOutput);
	}
	//endif

	//if DEFAULT then
	if (!zingchart.bCSSInit) {
		zingchart.bCSSInit = true;
		var oCssRules = {
			'.zc-style' : 'font-family:'+zingchart.FONTFAMILY+';font-size:'+zingchart.FONTSIZE+'px;font-weight:normal;font-style:normal;text-decoration:none;text-shadow:none;',
			'.zc-style[~]*' : 'font-family:'+zingchart.FONTFAMILY+';font-size:'+zingchart.FONTSIZE+'px;font-weight:normal;font-style:normal;text-decoration:none;text-shadow:none;',
			'.zc-top[~]*' : 'text-align:left;margin:auto;text-shadow:none;',
			'.zc-menu[~]*' : 'text-align:left;margin:auto;',
			'.zc-img' : '-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;',
			'.zc-map' : '-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;',
			'.zc-pixmap' : '-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;',
			'.zc-preview-mask' : '-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;',
			//if [!PHANTOMJS] then
			'.zc-about' : 'position:absolute;overflow:hidden;border:5px solid #fff;background:#003C4F url(' + (ZC.ie67?'//':ZC.LOGO_ABOUT) + ') no-repeat center 10px',
			'.zc-about-1' : 'padding:80px 5px 5px 5px;text-align:center !important;',
			'.zc-about-1 a' : 'color:#1AB6E3;font-size:17px;line-height:125%;',
			'.zc-about-2' : 'padding:5px;color:#fff;text-align:center !important;',
			'.zc-about-3' : 'padding:5px;text-align:center;line-height:125%;',
			'.zc-about-3 div' : 'background-color:#1AB6E3;line-height:125%;color:#fff;border:1px solid #fff;padding:5px 10px;font-weight:bold;width:60px;margin:0 auto;cursor:pointer;text-align:center',
			'.zc-about-4' : 'color:#fff;line-height:125%;',
			'.zc-about-4 div' : 'float:right;color:#fff;line-height:125%;',
			'.zc-viewsource' : 'border:5px solid #fff;background:#999',
			'.zc-error' : 'border:5px solid #fff;background:#900',
			'.zc-bugreport' : 'border:5px solid #fff;background:#999',
			'.zc-form-row-label' : 'padding:4px 10px 2px;text-align:left;color:#fff',
			'.zc-form-row-element' : 'padding:2px 8px',
			'.zc-form-row-last' : 'padding:8px 8px 2px !important',
			'.zc-form-row-element textarea' : 'text-align:left;background:#fff;color:#000;border:1px solid #333;',
			'.zc-form-row-label input' : 'color:#000;padding:2px;margin:0 5px 0 0;background-color:#999;',
			'.zc-form-row-element input' : 'color:#000;padding:2px;margin:0;background-color:#fff',
			'.zc-form-row-last input' : 'padding:4px 10px !important;margin:0 20px 0 0 !important;background-color:#eee !important;border:2px outset #ccc !important',
			'.zc-form-s0' : 'font-size:27px !important;letter-spacing:-1px;line-height:125%',
			'.zc-form-s1' : 'font-size:17px !important;line-height:125%',
			'.zc-form-s1 a' : 'color:#fff;padding:3px 10px;position:relative;top:4px;border:1px solid #333;border-bottom:0px solid #333',
			'.zc-tab-active' : 'background-color:#fff;color:#333 !important',
			'.zc-tab-inactive' : 'background-color:#999;color:#ddd !important',
			'.zc-bugreport label' : 'display:inline-block;position:relative;top:-2px',
			'.zc-viewimage div' : 'position:absolute;text-align:center;padding:5px;background:#999;color:#fff',
			'.zc-license-ie67' : 'padding:0;position:absolute;font-size:12px;font-weight:bold;font-family:Arial;color:#369;text-align:left',
			'.zc-license' : 'padding:0;position:absolute;',
			'#zc-fullscreen' : 'display:block;position:absolute;top:0;left:0;width:100%;height:100%;margin:0;padding:0;background:#fff;',
			'.zc-menu' : 'position:absolute;display:none;background-repeat:no-repeat !important;background-position:50% 0% !important;',
			'.zc-menu-sep' : 'font-size:1px;padding:0;line-height:1px;border-bottom:1px solid #000',
			'.zc-menu-item' : 'cursor:pointer;white-space:nowrap',
			'.zc-blocker' : 'background:#eee',
			'.zc-blocker div.zc-blocker-msg' : 'position:absolute;border:2px solid #ccc;padding:10px 30px;background-color:#333;color:#fff',
			'.zc-modal' : 'background-color:#fff;color:#000;border:2px solid #999',
			//endif
			'.zc-rel' : 'top:0;left:0;position:relative',
			'.zc-abs' : 'top:0;left:0;position:absolute'			
		};
		var oHead = document.getElementsByTagName('head')[0];
		var oStyle = document.createElement('style');
		oStyle.type = 'text/css';
		/*oStyle.title = 'zingchart';*/
		oHead.appendChild(oStyle);
		for (var i=0,iLen=document.styleSheets.length;i<iLen;i++) {
			if (document.styleSheets[i].title == 'zingchart') {
				zingchart.css = document.styleSheets[i];
			}
		}
		if (!zingchart.css) {
			zingchart.css = document.styleSheets[document.styleSheets.length-1];
		}
		for (var sSelector in oCssRules) {
			if (zingchart.USERCSS[sSelector] != null) {
				zingchart.addCssRule(sSelector, zingchart.USERCSS[sSelector]);
			} else {
				zingchart.addCssRule(sSelector, oCssRules[sSelector]);
			}
		}
	}
	if (sOutput == 'vml' && !zingchart.bVMLInit) {
		document.namespaces.add('zcv', 'urn:schemas-microsoft-com:vml');
		var oStyleSheet = document.createStyleSheet();
		oStyleSheet.cssText = ".zcvml { behavior:url(#default#VML); }";
		zingchart.bVMLInit = true;
	}
	//endif

	var sTheme = '';
	if ((mValue=oParams['theme']) != null) {
		sTheme = mValue;
	}
	var bValidApiKey = false;
	if ((mValue=oParams['apikey']) != null) {
		if (ZC._i_(mValue) == 1) {
			bValidApiKey = true;
		}
	}

	//if DEFAULT then
	var oXhrCache = {
		data : false,
		defaults : false,
		css : false,
		csv : false
	};
	if ((mValue=oParams['cache']) != null) {
		for (var sType in oXhrCache) {
			if ((mValue_=mValue[sType]) != null) {
				oXhrCache[sType] = ZC._b_(mValue_);
			}
		}
	}
	var bFullScreen = false;
	if ((mValue=oParams['fullscreen']) != null) {
		bFullScreen = ZC._b_(mValue);
	}
	var bAutoResize = true;
	if ((mValue=oParams['auto-resize']) != null) {
		bAutoResize = ZC._b_(mValue);
	}
	var oContainer = ZC.ZCQuery('#' + sId);
	var sWidth = (oParams['width'] || '100%') + '';
	var sHeight = (oParams['height'] || '100%') + '';
	if (sWidth == 'auto') {
		sWidth = '100%';
	}
	if (sHeight == 'auto') {
		sHeight = '100%';
	}
	var aWH = zingchart.wh(oContainer, sWidth, sHeight);
	var iWidth = aWH[0];
	var iHeight = aWH[1];
	if (bFullScreen) {
		iWidth = ZC.ZCQuery(window).width();
		iHeight = ZC.ZCQuery(window).height();
		document.body.style.overflow = 'hidden';
	}
	if (iWidth < 10 || iHeight < 10) {
		iWidth = 320;
		iHeight = 240;
	}
	//endif
	//if NODEJS,SILKJS,RHINO then
	var sFileName = '';
	//endif
	//if NODEJS,SILKJS,RHINO then
	var iWmType = 1;
	if ((mValue=oParams['wmtype']) != null) {
		iWmType = ZC._i_(mValue);
		if (!ZC._btw_(iWmType, 1, 3)) {
			iWmType = 1;
		}
	}
	var sWmPosition = 'br';
	if ((mValue=oParams['wmposition']) != null) {
		if (ZC._indexof_(['top-left', 'tl', 'top-right', 'tr', 'bottom-left', 'bl', 'bottom-right', 'br'], mValue) != -1) {
			sWmPosition = mValue;
		}
	}
	if ((mValue=oParams['filename']) != null) {
		sFileName = mValue;
	}
	var sWidth = oParams['width'] || '320';
	var sHeight = oParams['height'] || '240';
	if (sWidth == 'auto') {
		sWidth = '320';
	}
	if (sHeight == 'auto') {
		sHeight = '240';
	}
	var iWidth = ZC._i_(sWidth);
	var iHeight = ZC._i_(sHeight);

	//endif
	iWidth = (iWidth==0)?320:iWidth;
	iHeight = (iHeight==0)?240:iHeight;
	var sDataUrl = oParams['dataurl'] || '';
	var sDefaultsUrl = oParams['defaultsurl'] || '';
	var oDefaultsObj = null;
	var sData = '';
	var oDataObj = null;
	if ((mValue=oParams['data']) != null) {
		if (typeof(mValue) == 'string') {
			sData = mValue;
		} else {
			oDataObj = mValue;
		}
	}
	if ((mValue=oParams['defaults']) != null) {
		if (typeof(mValue) == 'string') {
			mValue = JSON.parse(mValue);
		}
		oDefaultsObj = mValue;
	}

	//if NODEJS,SILKJS then
	if ((mValue=oParams['http-response']) != null) {
		oLoader.oHttpResponse = mValue;
	}
	//endif

	if ((mValue=oParams['imggen']) != null) {
		oLoader.bImgGen = ZC._b_(mValue);
	}
	if (oLoader.bImgGen) {
		oLoader.oDOMFragments = null;
	}
	oLoader.sWH = sWidth + '/' + sHeight;
	oLoader.sOutput = sOutput;
	oLoader.oParent = oLoader;
	oLoader.iX = 0;
	oLoader.iY = 0;
	oLoader.iWidth = iWidth;
	oLoader.iHeight = iHeight;
	oLoader.sDataUrl = sDataUrl;
	oLoader.sData = sData;
	oLoader.oDataObj = oDataObj;
	oLoader.sDefaultsUrl = sDefaultsUrl;
	oLoader.oDefaultsObj = oDefaultsObj;
	oLoader.bValidApiKey = bValidApiKey;
	//if DEFAULT then
	if (oParams['fullscreenmode'] != null && ZC._b_(oParams['fullscreenmode'])) {
		oLoader.bFullScreenMode = true;
	}
	oLoader.bFullScreen = bFullScreen;
	oLoader.oXhrCache = oXhrCache;
	oLoader.aFlags = aFlags;
	//endif
	oLoader.sTheme = sTheme;
	//if NODEJS,SILKJS,RHINO then
	oLoader.sFileName = sFileName;
	oLoader.iWmType = iWmType;
	oLoader.sWmPosition = sWmPosition;
	//endif
	oLoader.oLoader = oLoader;
	//if DEFAULT then
	oLoader.oAttributes['hideprogresslogo'] = false;
	if ((mValue=oParams['hideprogresslogo']) != null) {
		oLoader.oAttributes['hideprogresslogo'] = ZC._b_(mValue);
	}
	if ((mValue=oParams['customprogresslogo']) != null) {
		oLoader.oAttributes['customprogresslogo'] = mValue;
	}
	if ((mValue=oParams['exportdataurl']) != null) {
		oLoader.oAttributes['exportdataurl'] = mValue;
	}
	if ((mValue=oParams['exportimageurl']) != null) {
		oLoader.oAttributes['exportimageurl'] = mValue;
	}
	var oProgress = {};
	if ((mValue=oParams['bgcolor']) != null) {
		oProgress['background-color'] = mValue;
	}
	if ((mValue=oParams['background-color']) != null) {
		oProgress['background-color'] = mValue;
	}
	if ((mValue=oParams['border-color']) != null) {
		oProgress['border-color'] = mValue;
	}
	if ((mValue=oParams['border-width']) != null) {
		oProgress['border-width'] = mValue;
	}
	if ((mValue=oParams['color']) != null) {
		oProgress['color'] = mValue;
	}
	oLoader.oAttributes['progress'] = oProgress;
	//endif
	if ((mValue=oParams['auto-load-modules']) != null) {
		oLoader.bAutoLoadModules = ZC._b_(mValue);
	}
	if ((mValue=oParams['events']) != null) {
		oLoader.oEvents = mValue;
	}
	if ((mValue=oParams['modules']) != null) {
		oLoader.sModules = mValue;
	}
	if ((mValue=oParams['format']) != null) {
		oLoader.sFormat = mValue;
	}
	if ((mValue=oParams['csvdata']) != null) {
		oLoader.sCsvData = mValue;
	}
	if ((mValue=oParams['locale']) != null) {
		if (zingchart.i18n[mValue] != null) {
			oLoader.sLocale = mValue;
			ZC.ZCLabels = zingchart.i18n[mValue];
		}
	}
	if ((mValue=oParams['cache-control']) != null) {
		oLoader.sCacheControl = mValue;
	}

	//if DEFAULT then
	/*window.setTimeout(function() {*/
		oLoader.render();
	/*}, 33);*/
	//endif
	//if NODEJS,SILKJS,RHINO then
	oLoader.render();
	//endif
	
	//if DEFAULT then
	oContainer.css('overflow', 'hidden');
	if (oLoader.bFullScreen) {
		oContainer.css('position', 'absolute').css('top', 0).css('left', 0);
	}
	//if [!PHANTOMJS] then
	if (((sWidth.indexOf('%') != -1 || sHeight.indexOf('%') != -1) || oLoader.bFullScreen || oLoader.bFullScreenMode) && bAutoResize) {
		var oContainerDim = (oLoader.bFullScreenMode || oLoader.bFullScreen)?ZC.ZCQuery(window):oContainer;
		var iWidth_ = oContainerDim.width();
		var iHeight_ = oContainerDim.height();
		var iCnt_ = 0;
		oLoader.iAutoResizeTick = window.setInterval(function() {
			if (ZC._id_(sId) != null) {
				if (iCnt_ == 0 && (oContainerDim.width() != iWidth_ || oContainerDim.height() != iHeight_)) {
					iWidth_ = oContainerDim.width();
					iHeight_ = oContainerDim.height();
					if (iWidth_ > 10 && iHeight_ > 10) {
						oLoader.iWidth = iWidth_;
						oLoader.iHeight = iHeight_;
						oLoader.resize();
					}
				} else {
					if ((oContainerDim.width() + oContainerDim.height() > 0) && (oContainerDim.width() != iWidth_ || oContainerDim.height() != iHeight_)) {
						if (oLoader.bFullScreen || oLoader.bFullScreenMode) {
							var aWH = zingchart.wh(oContainerDim, new String(oContainerDim.width()), new String(oContainerDim.height()));
						} else {
							var aWH = zingchart.wh(oContainerDim, sWidth, sHeight);
						}
						if (aWH[0] > 10 && aWH[1] > 10) {
							oLoader.iWidth = aWH[0];
							oLoader.iHeight = aWH[1];
							iWidth_ = oContainerDim.width();
							iHeight_ = oContainerDim.height();
							oLoader.resize();
						}
					}
				}
				iCnt_++;
			} else {
				window.clearInterval(oLoader.iAutoResizeTick);
			}
		}, 250);
	}
	return oLoader;
	//endif
	//endif
};
//endif
//if DEFAULT then
window.zingchart = zingchart;
//if [VML] then
if (ZC.ZCQuery.browser.msie && parseFloat(ZC.ZCQuery.browser.version) < 9) {
	var _window_onunload_ = window.onunload;
	window.onunload = function() {
		while (zingchart.aLoaders.length) {
			//if [STANDALONE] then
			zingchart.exec(zingchart.aLoaders[0].sId, 'destroy');
			//endif
			//if [MODULES] then
			var oLoader = zingchart.aLoaders[0];
			oLoader._api_clear_({}, true);
			if (oLoader.iAutoResizeTick) {
				window.clearInterval(oLoader.iAutoResizeTick);
			}
			ZC.ZCHtmlUtils._remove_(
				[
					oLoader.sId + '-top',
					oLoader.sId + '-text-ruler'
				]
			);
			var iIndex = ZC._indexof_(zingchart.aLoaders, oLoader);
			if (iIndex != -1) {
				zingchart.aLoaders.splice(iIndex, 1);
			}
			oLoader = null;
			//endif
		}

		ZC.ZCQuery(document)
			.unbind(ZC.ZCHtmlUtils._event_('mousemove'), zingchart.zc_mouseevent)
			.unbind(ZC.ZCHtmlUtils._event_('mousedown'), zingchart.zc_mouseevent)
			.unbind(ZC.ZCHtmlUtils._event_('mouseup'), zingchart.zc_mouseevent)
			.unbind('click', zingchart.zc_click)
			.unbind('contextmenu', zingchart.zc_contextmenu);
	
		zingchart.aLoaders = [];
		
		if (_window_onunload_) {
			_window_onunload_();
		}
	};
};
//endif
//endif
/*
(function(sDomain, sName) {
	var sKey = ZC._get_key_('F*nStrlng4Cu$tOmLlc9nc9!').replace('O', '0');
	var sLicense = ZC.ZCMD5.md5(ZC._obfuscate_(ZC._rot13_(sDomain)));
	console.log('ZC.LICENSE:', sLicense);
	var sBuildCode = ZC._tea_encrypt_(sName, sKey);
	console.log('ZC.BUILDCODE:', sBuildCode, sName);
	var sNoAbout = ZC.ZCMD5.md5(ZC._obfuscate_(ZC._rot13_(sLicense)));
	console.log('ZC.NOABOUT:', sNoAbout);
	var sNoAbout = ZC.ZCMD5.md5(ZC._obfuscate_(ZC._rot13_(sBuildCode)));
	console.log('ZC.NOABOUT:', sNoAbout);
	var sNoAbout = ZC.ZCMD5.md5(ZC._obfuscate_(ZC._rot13_(sDomain)));
	console.log('ZC.NOABOUT:', sNoAbout);
})('*.globenewswire.com', 'NASDAQ');
*/
/*
console.log(ZC.ZCMD5.md5(ZC._obfuscate_(ZC._rot13_('0.0.0.0'))));
*/