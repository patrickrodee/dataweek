//if [MODULES] then
ZC.aLoadedModules.push('legend');
//endif

ZC.ZCGraph.prototype.paintLegend = function() {
	if (zingchart.SKIP.LEGEND) {
		return;
	}
	var self = this, mValue;
	if (self.oLegend != null) {
		//if DEFAULT then
		self.oLegend.oCanvas = self.oLegend.oCanvasSh = self.oLoader.usc()?self.oLoader.mc('top'):ZC._id_(self.sId + '-legend-c');
		//endif
		//if NODEJS,SILKJS,RHINO then
		self.oLegend.oCanvas = self.oLegend.oCanvasSh = self.oParent.oCanvas;
		//endif

		self.oLegend.paint();
		if (!self.bSoftPaint) {
			//if DEFAULT then
			if (ZC._indexof_(self.oLoader.aFlags, 'skip_interactivity') == -1) {
				self.zc_legend_item_mouseover = function(ev) {
					if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
						self.oParent.oTooltip.onmouseover(ev);
					}					
					var sTargetId = ev.targetid || ev.target.id;
					var iPlotIndex = ZC._i_(sTargetId.replace(self.sId, '').replace('-legend-item_', '').replace('-legend-marker_', '').replace('-area', ''));
					var oPlot = self.oPlotSet.aPlots[iPlotIndex];
					if (oPlot.bHighlight && oPlot.getNode(0)) {
						var _sHoverMode = oPlot.sHoverMode;
						oPlot.sHoverMode = 'plot';
						oPlot.getNode(0).showLayer('highlight');
						oPlot.sHoverMode = _sHoverMode;
					}
				};
				self.zc_legend_item_mousemove_tt = function(ev) {
					if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
						self.oParent.oTooltip.onmousemove(ev);
					}
				};
				self.zc_legend_item_mouseout = function(ev) {
					if (self.oTooltip && self.oParent.oTooltip && self.oTooltip.bVisible) {
						self.oParent.oTooltip.onmouseout(ev);
					}
					/*
					var sTargetId = ev.targetid || ev.target.id;
					var iPlotIndex = ZC._i_(sTargetId.replace(self.sId, '').replace('-legend-item_', '').replace('-legend-marker_', '').replace('-area', ''));
					if (self.oPlotSet.aPlots[iPlotIndex].bHighlight) {
						self.hideLayer();
						self.oPlotSet.aPlots[iPlotIndex].getNode(0).hideLayer();
					}
					*/
					self.hideLayer();
				};
				self.zc_legend_item_click = function(ev) {
					
					zingchart.zc_click(ev);

					if (ev.which > 1) {
						return;
					}
					var sTargetId = ev.targetid || ev.target.id;

					if (ZC.mobile && self.oLoader.oTooltip) {
						self.oLoader.oTooltip.hide();
					}

					var sTargetType = 'item';
					if (sTargetId.indexOf('-legend-marker_') != -1) {
						sTargetType = 'marker';
					}

					self.hideLayer();

					ev.preventDefault();
					
					var sToggleAction = self.oLegend.sToggleAction;
					if (sTargetType == 'item') {
						sToggleAction = self.oLegend.sItemToggleAction;
					} else if (sTargetType == 'marker') {
						sToggleAction = self.oLegend.sMarkerToggleAction;
					}
					if (self.oParent.bFlat) {
						sToggleAction = 'remove';
					}
					self.oAttributes['legend-last-trigger'] = sTargetType;

					var iPlotIndex = ZC._i_(sTargetId.replace(self.sId + '-legend-item_', '').replace(self.sId + '-legend-marker_', '').replace('-area', ''));
					
					/* reset any initial visible status */
					if (self.oData['series'] && self.oData['series'][iPlotIndex]) {
						/* look for url and target */
						if ((mValue=self.oData['series'][iPlotIndex]['legend-item']) != null) {
							var sUrl = mValue['url'] || '';
							var sTarget = mValue['target'] || '';
							if (sUrl != '') {
								self._onclick_(ev, sUrl, sTarget);
							}
						}
						self.oData['series'][iPlotIndex]['visible'] = true;	
					}

					var oPlotInfo = self.oPlotSet.aPlots[iPlotIndex]._api_plot_info_(ev);
					oPlotInfo['visible'] = ZC._b_(self.oAttributes['plot'+iPlotIndex+'.visible']);
					ZC.ZCUtils._trigger_event_('legend_' + sTargetType + '_click', self.oParent, oPlotInfo);

					if (!self.oLegend.oAttributes['item.toggle']) {
						return;
					}

					if (self.oLegend.bShared) {
						for (var i=0,iLen=self.oLoader.aGraphs.length;i<iLen;i++) {
							var oGraph = self.oLoader.aGraphs[i];
							if (oGraph.oLegend && oGraph.oLegend.bShared && oGraph.oLegend.iGroup == self.oLegend.iGroup && oGraph.sId != self.sId) {
								oGraph._api_plot_toggle_({repaint : 1, plotindex : iPlotIndex, 'toggle-action' : sToggleAction});
							}
						}
					}

					switch (sToggleAction) {
						case 'none':
						default:
							break;
						case 'hide':
						case 'remove':
							if (!ev.shiftKey) {
								self._api_plot_toggle_({repaint : 1, plotindex : iPlotIndex, 'toggle-action' : sToggleAction});
							} else {
								var c = 0;
								for (var i=0,iLen=self.oPlotSet.aPlots.length;i<iLen;i++) {
									if (i != iPlotIndex) {
										c++;
										bRepaint = (c == iLen-1);
										self._api_plot_toggle_({repaint : bRepaint, plotindex : i, 'toggle-action' : sToggleAction});
									}
								}
							}
							break;
					}
				};
				//if [HTMLAREA] then
				/*
				ZC.ZCQuery('.' + self.sId + '-legend-item-area')
					.live(ZC.ZCHtmlUtils._event_('click'), self.zc_legend_item_click);
				ZC.ZCQuery('.' + self.sId + '-legend-marker-area')
					.live(ZC.ZCHtmlUtils._event_('click'), self.zc_legend_item_click)
				*/
				ZC.ZCQuery('.' + self.sId + '-legend-item-area').live('mouseup touchstart', self.zc_legend_item_click);
				ZC.ZCQuery('.' + self.sId + '-legend-marker-area').live('mouseup touchstart', self.zc_legend_item_click);

				if (!ZC.mobile) {
					ZC.ZCQuery('.' + self.sId + '-legend-item-area')
						.live(ZC.ZCHtmlUtils._event_('mouseover'), self.zc_legend_item_mouseover)
						.live(ZC.ZCHtmlUtils._event_('mouseout'), self.zc_legend_item_mouseout)
						.live(ZC.ZCHtmlUtils._event_('mousemove'), self.zc_legend_item_mousemove_tt);
					ZC.ZCQuery('.' + self.sId + '-legend-marker-area')
						.live(ZC.ZCHtmlUtils._event_('mouseover'), self.zc_legend_item_mouseover)
						.live(ZC.ZCHtmlUtils._event_('mouseout'), self.zc_legend_item_mouseout)
						.live(ZC.ZCHtmlUtils._event_('mousemove'), self.zc_legend_item_mousemove_tt);
				}
				//endif
			}
			//endif
		}
	}
};