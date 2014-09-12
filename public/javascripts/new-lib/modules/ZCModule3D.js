//if [MODULES] then
ZC.aLoadedModules.push('3d');
//endif
ZC.ZCGraph.prototype.setup3DView = function() {
	//if [3D] then
	var self = this;
	if (self.oSettings['3d'] && typeof(ZC.ZCDraw3D) != 'undefined') {
		ZC.ZCDraw3D.iViewD = 2.5*ZC._max_(self.iWidth, self.iHeight);
		ZC.ZCDraw3D.iViewX = self.oPlotArea.iX + self.oPlotArea.iWidth/2;
		ZC.ZCDraw3D.iViewY = self.oPlotArea.iY + self.oPlotArea.iHeight/2;
		ZC.ZCDraw3D.iDepth = ZC._i_(self.o3DAspect['depth']);
		/*ZC.ZCDraw3D.iViewX += ZC._sin_(self.o3DAspect['y-angle'])*self.o3DAspect['depth'];*/
		ZC.ZCDraw3D.iViewX += self.o3DAspect['offset-x'];
		ZC.ZCDraw3D.iViewY += self.o3DAspect['offset-y'];
	}
	//endif
};
ZC.ZCGraph.prototype.parse3D = function() {
	var self = this, mValue;
	if (self.oSettings['3d'] && typeof(ZC.ZCDraw3D) != 'undefined') {
		self.oParent.oDefaults.load(self.o3DAspect, 'graph.3d-aspect');
		self.oParent.oDefaults.load(self.o3DAspect, self.sType + '.3d-aspect');
		if ((mValue=self.oData['3d-aspect']) != null) {
			ZC._cp_(mValue, self.o3DAspect);
		}
		/* consider old tilt (1-3) attribute for pie3d */
		if (self.sType == 'pie3d' && self.oData['plot'] && self.oData['plot']['tilt']) {
			var fTilt = ZC._l_(ZC._f_(self.oData['plot']['tilt']), 1, 3);
			self.o3DAspect['x-angle'] = 25 + ((fTilt-1)/2)*(self.oSettings['x-angle-max'] - self.oSettings['x-angle-min']);
		}
		var a3DAttrs = ['angle', 'depth', 'x-angle', 'y-angle', 'z-angle', 'zoom', 'offset-x', 'offset-y'];
		for (var i=0;i<a3DAttrs.length;i++) {
			self.o3DAspect[a3DAttrs[i]] = ZC._f_(self.o3DAspect[a3DAttrs[i]]);
		}
		var a3DAngles = ['angle', 'x-angle', 'y-angle', 'z-angle'];
		for (var i=0;i<a3DAngles.length;i++) {
			if (!ZC._btw_(self.o3DAspect[a3DAngles[i]], self.oSettings[a3DAngles[i]+'-min'], self.oSettings[a3DAngles[i]+'-max'])) {
				self.o3DAspect[a3DAngles[i]] = self.oSettings[a3DAngles[i]+'-min'];
			}
		}
		self.o3DAspect['true3d'] = ZC._b_(self.o3DAspect['true3d']);
	}
};
ZC.ZCGraph.prototype.paint3D = function() {
	//if [3D] then
	var self = this;

	if (zingchart.V3D != 3) {
		zingchart.V3D = self.o3DAspect['true3d']?1:2;
	}

	var iFaces = self.oEngine3D.aFaces.length;

	for (var f=0;f<iFaces;f++) {
		var oFace = self.oEngine3D.aFaces[f];
		oFace.evalFace();
		if (self.o3DAspect['true3d']) {
			if (zingchart.V3D == 3) {
				self.oEngine3D.aDistances[f] = [ZC._f_(oFace.iFarthestZ_.toFixed(1))*oFace.aPriorities[2], f];
			} else {
				self.oEngine3D.aDistances[f] = [
					[
						ZC._f_(oFace.iFarthestZ.toFixed(1))*oFace.aPriorities[0],
						ZC._f_(oFace.iClosestZ.toFixed(1))*oFace.aPriorities[1],
						ZC._f_(oFace.iFarthestZ_.toFixed(1))*oFace.aPriorities[2],
						ZC._f_(oFace.iAvgY.toFixed(1))
					], f];
			}
		} else {
			self.oEngine3D.aDistances[f] = [
				[
					ZC._f_(oFace.iFarthestZ.toFixed(1))*oFace.aPriorities[0],
					ZC._f_(oFace.iLeftestX.toFixed(1))*oFace.aPriorities[1],
					ZC._f_(oFace.iAvgX.toFixed(1))*oFace.aPriorities[2],
					ZC._i_(oFace.iPriority)
				], f];
		}
	}

	self.oEngine3D.aDistances.sort(self.oEngine3D.sortFaces);

	var oShape = new ZC.ZCShape(self);
	var oCanvas = self.oLoader.usc()?self.oLoader.mc():ZC._id_(self.sId + '-plots-bl-c');

	for (var f=0;f<iFaces;f++) {
		var aPoints = [];

		var iFace = self.oEngine3D.aDistances[f][1];
		var oFace = self.oEngine3D.aFaces[iFace];

		var iPoints = oFace.aPoints.length;
		if (iPoints > 0) {
			var bView = true;
			for (var p=0;p<iPoints;p++) {
				aPoints.push(oFace.aPoints[p].aXY);
			}
			if (bView) {
				aPoints.push(oFace.aPoints[0].aXY);
				oShape.init(self);

				/*oShape.sId = self.sId + '-3dshape-' + ZC.SEQ;*/
				oShape.sId = self.sId + '-3dshape-' + ((oFace.sId != '')?oFace.sId:ZC.SEQ++);
				/*ZC.SEQ++;*/
				oShape.copy(oFace.oStyle);
				oShape.bPixelCorrection = false;
				//if DEFAULT then
				oShape.oCanvas = oCanvas;
				//endif
				//if NODEJS,SILKJS,RHINO then
				oShape.oCanvas = self.oCanvas;
				//endif
				oShape.locate(1);
				oShape.aPoints = aPoints;
				oShape.sShape = 'poly';
				oShape.locate(2);
				oShape.paint();
			}
		}
	}
	//endif
};