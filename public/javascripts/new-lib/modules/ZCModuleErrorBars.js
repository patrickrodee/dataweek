//if [MODULES] then
ZC.aLoadedModules.push('errorbars');
//endif
ZC.ZCPlotNode.prototype.sharedErrors = function(oCtx, bHover) {
	//if [ERRORBARS] then
	var self = this;
	if (typeof(bHover) == 'undefined') {
		bHover = false;
	}
	if (!bHover) {
		var oScaleVal = self.oParent._oScaleVal;
		var oScaleKey = self.oParent._oScaleKey;
		if (self.oParent.aErrors.length != 0) {
			var fErrorPlus = null, fErrorMinus = null;
			/* check to see if its a global error definition (max two items, simple array) */
			var bGlobal = true;
			if (self.oParent.aErrors.length <= 2) {
				if (self.oParent.aErrors[0] != null && self.oParent.aErrors[0] instanceof Array) {
					bGlobal = false;
				}
				if (self.oParent.aErrors[1] != null && self.oParent.aErrors[1] instanceof Array) {
					bGlobal = false;
				}
			} else {
				bGlobal = false;
			}
			if (bGlobal) {
				fErrorPlus = self.oParent.aErrors[0];
				fErrorMinus = self.oParent.aErrors[1];
			} else {
				if ((mError=self.oParent.aErrors[self.iIndex]) != null) {
					if (mError instanceof Array) {
						fErrorPlus = fErrorMinus = mError[0];
						if (mError.length == 2) {
							fErrorMinus = mError[1];
						}
					}
				}
			}

			self.oAttributes['node-error-plus'] = fErrorPlus;
			self.oAttributes['node-error-minus'] = fErrorMinus;

			if ((fErrorPlus+'').indexOf('%') != -1) {
				fErrorPlus = ZC._dimension_(fErrorPlus);
				if (fErrorPlus <= 1) {
					fErrorPlus *= self.fValue;
				}
			}
			if ((fErrorMinus+'').indexOf('%') != -1) {
				fErrorMinus = ZC._dimension_(fErrorMinus);
				if (fErrorMinus <= 1) {
					fErrorMinus *= self.fValue;
				}
			}

			var aPointsError = [];
			var iErrorSize = ZC._dimension_(self.oParent.oError?(self.oParent.oError.oData['size'] || 0.5):0.5);
			if (iErrorSize <= 1) {
				if (self.oParent.sType == 'vbar') {
					iErrorSize = ZC._i_(iErrorSize*self.iWidth);
				} else if (self.oParent.sType == 'hbar') {
					iErrorSize = ZC._i_(iErrorSize*self.iHeight);
				} else {
					iErrorSize = ZC._i_(iErrorSize*oScaleKey.iStepSize);
				}
			}
			var iRefWidth = 0;
			if (self.oParent.sType == 'vbar') {
				iRefWidth = self.iWidth;
			} else if (self.oParent.sType == 'hbar') {
				iRefWidth = self.iHeight;
			}
			if (fErrorPlus != null) {
				var iCoordPlus = oScaleVal.getCoordByValue(self.fAbsoluteValue + fErrorPlus);
				if (self.oParent.sType == 'hbar') {
					aPointsError.push(
						[iCoordPlus, self.iY + iRefWidth/2 - iErrorSize/2],
						[iCoordPlus, self.iY + iRefWidth/2 + iErrorSize/2],
						null,
						[iCoordPlus, self.iY + iRefWidth/2],
						[self.iX, self.iY + iRefWidth/2]
					);
				} else {
					aPointsError.push(
						[self.iX + iRefWidth/2 - iErrorSize/2, iCoordPlus],
						[self.iX + iRefWidth/2 + iErrorSize/2, iCoordPlus],
						null,
						[self.iX + iRefWidth/2, iCoordPlus],
						[self.iX + iRefWidth/2, self.iY]
					);
				}
			}
			if (fErrorMinus != null) {
				var iCoordMinus = oScaleVal.getCoordByValue(self.fAbsoluteValue - fErrorMinus);
				if (self.oParent.sType == 'hbar') {
					aPointsError.push(
						null,
						[iCoordMinus, self.iY + iRefWidth/2 - iErrorSize/2],
						[iCoordMinus, self.iY + iRefWidth/2 + iErrorSize/2],
						null,
						[iCoordMinus, self.iY + iRefWidth/2],
						[self.iX, self.iY + iRefWidth/2]
					);
				} else {
					aPointsError.push(
						null,
						[self.iX + iRefWidth/2 - iErrorSize/2, iCoordMinus],
						[self.iX + iRefWidth/2 + iErrorSize/2, iCoordMinus],
						null,
						[self.iX + iRefWidth/2, iCoordMinus],
						[self.iX + iRefWidth/2, self.iY]
					);
				}
			}
			var oCopy = new ZC.ZCStyle(self);
			oCopy.copy(self.oParent);
			if (self.oParent.oError) {
				oCopy.copy(self.oParent.oError);
			}
			oCopy.parse();
			oCopy.sId = self.sId + '--error';
			ZC.ZCLine.paint(oCtx, oCopy, aPointsError);
			self.oAttributes['pointserror'] = aPointsError;
		}
	} else {
		if (typeof(self.oAttributes['pointserror']) != 'undefined') {
			var oCopy = new ZC.ZCStyle(self);
			oCopy.copy(self.oParent);
			if (self.oParent.oError) {
				oCopy.copy(self.oParent.oError);
			}
			oCopy.parse();
			oCopy.sId = self.sId + '--error-hover';
			ZC.ZCLine.paint(oCtx, oCopy, self.oAttributes['pointserror']);
		}
	}
	//endif
};