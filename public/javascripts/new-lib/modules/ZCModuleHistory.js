//if [MODULES] then
ZC.aLoadedModules.push('history');
//endif
ZC.ZCLoader.prototype.paintHistory = function() {
	//if DEFAULT then
	var self = this, mValue;

	/* clear it first */
	ZC.ZCHtmlUtils._remove_(
		[
			self.sId + '-history-path',
			self.sId + '-history-back-path',
			self.sId + '-history-forw-path',
			self.sId + '-history-gradient',
			self.sId + '-history-back-gradient',
			self.sId + '-history-forw-gradient'
		]
	);

	if ((mValue=self.oData['history']) != null) {
		self.oHistory = new ZC.ZCTextBox(self);
		self.oDefaults.load(self.oHistory.oData, 'loader.gui.history');
		self.oHistory.append(mValue);
		self.oHistory.parse();
		self.oHistory.bSkipText = true;

		var oHistoryItem = new ZC.ZCShape(self);
		self.oDefaults.load(oHistoryItem.oData, 'loader.gui.history.item');
		oHistoryItem.append(mValue['item']);
		oHistoryItem.parse();

		var oHistoryItemOff = new ZC.ZCShape(self);
		self.oDefaults.load(oHistoryItemOff.oData, 'loader.gui.history.item-off');
		oHistoryItemOff.append(mValue['item']);
		oHistoryItemOff.append(mValue['item-off']);
		oHistoryItemOff.parse();
	}

	var sArea = '';

	if (self.oHistory) {

		self.oHistory.sId = self.sId + '-history';
		self.oHistory.oCanvas = self.oHistory.oCanvasSh = ZC._id_(self.sId + '-static-c');
		self.oHistory.paint();

		/* consider padding */
		var iX = self.oHistory.iX + self.oHistory.iPaddingLeft;
		var iY = self.oHistory.iY + self.oHistory.iPaddingTop;
		var iW = self.oHistory.iWidth - self.oHistory.iPaddingLeft - self.oHistory.iPaddingRight;
		var iH = self.oHistory.iHeight - self.oHistory.iPaddingTop - self.oHistory.iPaddingBottom;

		var oBack = new ZC.ZCShape(self);
		oBack.sId = self.sId + '-history-back';
		oBack.copy(oHistoryItem);
		oBack.bPixelCorrection = false;
		if (self.iHistory == 0) {
			oBack.copy(oHistoryItemOff);
		}
		oBack.aPoints = [
			[iX, iY + iH/2],
			[iX + iW/3, iY],
			[iX + iW/3, iY + iH],
			[iX, iY + iH/2]
		];
		oBack.oDOMParent = ZC._id_(self.oParent.sId + '-text');
		oBack.oCanvas = oBack.oCanvasSh = ZC._id_(self.sId + '-static-c');
		oBack.parse();
		oBack.paint();

		if (self.iHistory > 0) {
			sArea += ZC.ZCHtmlUtils._area_start_('rect', true) + 'class="' + (self.sId + '-history-area zc-history-area') + '" id="' + self.sId + '-history-back-area' + '" coords="';
			sArea += ZC._i_(iX+ZC.MAPTX) + ',' + ZC._i_(iY+ZC.MAPTX) + ',' + ZC._i_(iX+iW/3+ZC.MAPTX) + ',' + ZC._i_(iY+iH+ZC.MAPTX);
			sArea += '" />';
		}

		var oForw = new ZC.ZCShape(self);
		oForw.sId = self.sId + '-history-forw';
		oForw.copy(oHistoryItem);
		oForw.bPixelCorrection = false;
		if (self.iHistory == self.aHistory.length-1 || self.aHistory.length == 0) {
			oForw.copy(oHistoryItemOff);
		}
		oForw.aPoints = [
			[iX + iW, iY + iH/2],
			[iX + 2*iW/3, iY],
			[iX + 2*iW/3, iY + iH],
			[iX + iW, iY + iH/2]
		];
		oForw.oDOMParent = ZC._id_(self.oParent.sId + '-text');
		oForw.oCanvas = oForw.oCanvasSh = ZC._id_(self.sId + '-static-c');
		oForw.parse();
		oForw.paint();

		if (self.iHistory < self.aHistory.length-1) {
			sArea += ZC.ZCHtmlUtils._area_start_('rect', true) + 'class="' + (self.sId + '-history-area zc-history-area') + '" id="' + self.sId + '-history-forw-area' + '" coords="';
			sArea += ZC._i_(iX+2*iW/3+ZC.MAPTX) + ',' + ZC._i_(iY+ZC.MAPTX) + ',' + ZC._i_(iX+iW+ZC.MAPTX) + ',' + ZC._i_(iY+iH+ZC.MAPTX);
			sArea += '" />';
		}

		if (sArea != '') {
			ZC._id_(self.sId + '-map').innerHTML += sArea;
		}

		self.zc_loader_history = function(ev) {
			if (ev.target.id == self.sId + '-history-back-area') {
				zingchart.exec(self.sId, 'goback');
			} else if (ev.target.id == self.sId + '-history-forw-area') {
				zingchart.exec(self.sId, 'goforward');
			}
		};

		ZC.ZCQuery('.' + self.sId + '-history-area').bind('click', self.zc_loader_history);

	}

	//endif
};