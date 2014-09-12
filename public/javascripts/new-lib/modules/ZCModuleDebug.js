ZC.ZCModuleDebug = {};
//if [MODULES] then
ZC.aLoadedModules.push('debug');
//endif
ZC.ZCUtils._format_json_ = function(sJson) {
	//if DEFAULT then
	var sJson_ = '';
	//if [ERROR,BUGREPORT] then
	sJson = sJson.replace(/\t|\r|\n/g, '');
	var bValue = false;
	var bArray = false;
	var iLevel = 0;
	var sChar_ = '';
	for (var i=0,iLen=sJson.length;i<iLen;i++) {
		sChar = sJson.substr(i, 1);
		switch (sChar) {
			case '"':
				bValue = !bValue;
				sJson_ += sJson.substr(i, 1);
				sChar_ = sChar;
				break;
			case '{':
				sJson_ += sJson.substr(i, 1);
				if (!bValue) {
					sJson_ += "\n" + (new Array(iLevel+1).join('[~][~][~][~]'));
					iLevel++;
					sChar_ = sChar;
				}
				break;
			case '}':
				if (!bValue) {
					sJson_ += "\n" + (new Array(iLevel-2+1).join('[~][~][~][~]'));
					iLevel--;
					sChar_ = sChar;
				}
				sJson_ += sJson.substr(i, 1);
				break;
			case '[':
				var iPos1 = sJson.indexOf(']', i);
				var iPos2a = sJson.indexOf('}', i);
				iPos2a = (iPos2a == -1)?999999:iPos2a;
				var iPos2b = sJson.indexOf('{', i);
				iPos2b = (iPos2b == -1)?999999:iPos2b;
				var iPos2 = ZC._min_(iPos2a, iPos2b);
				if (iPos1 < iPos2) {
					bArray = true;
					sJson_ += sJson.substr(i, 1);
				} else {
					bArray = false;
					sJson_ += sJson.substr(i, 1);
					sJson_ += "\n" + (new Array(iLevel+1).join('[~][~][~][~]'));
					iLevel++;
				}
				sChar_ = sChar;
				break;
			case ']':
				if (bArray) {
					bArray = false;
				}
				if (sChar_ == '}') {
					iLevel--;
					sJson_ += "\n" + (new Array(iLevel-1+1).join('[~][~][~][~]'));
				}
				sJson_ += sJson.substr(i, 1);
				sChar_ = sChar;
				break;
			case ' ':
				if (bValue) {
					sJson_ += sJson.substr(i, 1);
					sChar_ = sChar;
				}
				break;
			case ',':
				sJson_ += sJson.substr(i, 1);
				if (!bValue && !bArray) {
					sJson_ += "\n" + (new Array(iLevel-1+1).join('[~][~][~][~]'));
				}
				sChar_ = sChar;
				break;
			default:
				sJson_ += sJson.substr(i, 1);
				sChar_ = sChar;
				break;
		}
	}
	//endif
	return sJson_;
	//endif
};
ZC.ZCLoader.prototype._api_viewsource_ = function() {
	//if DEFAULT then
	//if [VIEWSOURCE] then
	var self = this;
	var oViewSource = ZC.ZCHtmlUtils._div_({
		cls : 'zc-abs zc-viewsource zc-style',
		id : self.sId + '-viewsource',
		p : ZC._id_(self.sId + '-top'),
		wh : (self.iWidth-(ZC.quirks?0:10)) + '/' + (self.iHeight-(ZC.quirks?0:10))
	});
	oViewSource.innerHTML = ZC._h_('<div class="zc-form-row-label zc-form-s1">&nbsp;<a href="javascript:void(0)" id="' + self.sId + '-viewsource-jsonsource" class="zc-tab-active">' + ZC.ZCLabels['viewsource-jsonsource'] + '</a>&nbsp;<a href="javascript:void(0)" id="' + self.sId + '-viewsource-originalsource" class="zc-tab-inactive">' + ZC.ZCLabels['viewsource-originalsource'] + '</a></div><div class="zc-form-row-element"><textarea id="' + self.sId + '-viewsource-json" style="width:' + (self.iWidth-35) + 'px;height:' + (self.iHeight-95) + 'px;"></textarea></div><div class="zc-form-row-element zc-form-row-last" id="' + self.sId + '-viewsource-actions"><input type="button" value="' + ZC.ZCLabels['viewsource-close'] + '" id="' + self.sId + '-viewsource-close" /></div>');
	if (zingchart.EDITSOURCE) {
		/*oViewSource.innerHTML = '<div class="zc-form-row-label zc-form-s1">' + ZC.ZCLabels['viewsource-jsonsource'] + '</div><div class="zc-form-row-element"><textarea id="' + self.sId + '-viewsource-json" style="width:' + (self.iWidth-35) + 'px;height:' + (self.iHeight-95) + 'px;"></textarea></div><div class="zc-form-row-element zc-form-row-last"><input type="button" value="' + ZC.ZCLabels['viewsource-close'] + '" id="' + self.sId + '-viewsource-close" /><input type="button" value="' + ZC.ZCLabels['viewsource-apply'] + '" id="' + self.sId + '-viewsource-apply" /></div>';*/
		ZC._id_(self.sId + '-viewsource-actions').innerHTML += '<input type="button" value="' + ZC.ZCLabels['viewsource-apply'] + '" id="' + self.sId + '-viewsource-apply" />';
	}
	ZC.ZCQuery('#' + self.sId + '-viewsource-json').val(ZC.ZCUtils._format_json_(self.oAttributes['json']));
	ZC.ZCQuery('#' + self.sId + '-viewsource-jsonsource').bind('click', function() {
		ZC._id_(self.sId + '-viewsource-jsonsource').className = 'zc-tab-active';
		ZC._id_(self.sId + '-viewsource-originalsource').className = 'zc-tab-inactive';
		ZC.ZCQuery('#' + self.sId + '-viewsource-json').val(ZC.ZCUtils._format_json_(self.oAttributes['json']));
	});
	ZC.ZCQuery('#' + self.sId + '-viewsource-originalsource').bind('click', function() {
		ZC._id_(self.sId + '-viewsource-jsonsource').className = 'zc-tab-inactive';
		ZC._id_(self.sId + '-viewsource-originalsource').className = 'zc-tab-active';
		ZC.ZCQuery('#' + self.sId + '-viewsource-json').val(ZC.ZCUtils._format_json_(self.oAttributes['source']));
	});
	ZC.ZCQuery('#' + self.sId + '-viewsource-close').bind('click', function() {
		ZC.ZCHtmlUtils._remove_(self.sId + '-viewsource');
	});
	if (zingchart.EDITSOURCE) {
		ZC.ZCQuery('#' + self.sId + '-viewsource-apply').bind('click', function() {
			var sJson = ZC.ZCQuery('#' + self.sId + '-viewsource-json').val();
			ZC.ZCHtmlUtils._remove_(self.sId + '-viewsource');
			zingchart.exec(self.sId, 'setdata', {data : sJson});
		});
	}
	//endif
	//endif
};
ZC.ZCLoader.prototype._api_bugreport_ = function() {
	//if DEFAULT then
	//if [BUGREPORT] then
	var self = this;
	if (self.iWidth < 300 || self.iHeight < 300) {
		window.open('http://www.zingchart.com/support/', '', '');
		return;
	}
	var oBugReport = ZC.ZCHtmlUtils._div_({
		cls : 'zc-abs zc-bugreport zc-style',
		id : self.sId + '-bugreport',
		p : ZC._id_(self.sId + '-top'),
		wh : (self.iWidth-(ZC.quirks?0:10)) + '/' + (self.iHeight-(ZC.quirks?0:10))
	});
	var sHtml = '';
	sHtml += '<div class="zc-form-row-label zc-form-s0">' + ZC.ZCLabels['bugreport-header'] + '</div><div class="zc-form-row-label"><input type="checkbox" id="' + self.sId + '-chkdata" checked="checked" /><label for="' + self.sId + '-chkdata">' + ZC.ZCLabels['bugreport-senddata'] + '</label>';
	if (ZC.canvas) {
		sHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="' + self.sId + '-chkcapture" checked="checked" /><label for="' + self.sId + '-chkcapture">' + ZC.ZCLabels['bugreport-sendcapture'] + '</label>';
	}
	sHtml += '</div><div class="zc-form-row-label zc-form-s1">' + ZC.ZCLabels['bugreport-yourcomment'] + '</div><div class="zc-form-row-element"><textarea id="' + self.sId + '-bugreport-comment" style="width:' + (self.iWidth-35) + 'px;height:' + ((self.iHeight-300)/2-10) + 'px;"></textarea></div><div class="zc-form-row-label zc-form-s1">' + ZC.ZCLabels['bugreport-jsondata'] + '</div><div class="zc-form-row-element"><textarea id="' + self.sId + '-bugreport-json" style="width:' + (self.iWidth-35) + 'px;height:' + ((self.iHeight-210)/2) + 'px;"></textarea></div><div class="zc-form-row-label zc-form-s1">' + ZC.ZCLabels['bugreport-youremail'] + (self.iWidth>=510?(' <span>('+ZC.ZCLabels['bugreport-infoemail']+')</span>'):'') + '</div><div class="zc-form-row-element"><input type="text" id="' + self.sId + '-bugreport-email" style="width:' + (self.iWidth-35) + 'px;" /></div><div class="zc-form-row-element zc-form-row-last"><input type="button" value="' + ZC.ZCLabels['bugreport-submit'] + '" id="' + self.sId + '-bugreport-submit" /><input type="button" value="' + ZC.ZCLabels['bugreport-cancel'] + '" id="' + self.sId + '-bugreport-cancel" /></div>';
	oBugReport.innerHTML = ZC._h_(sHtml);

	ZC.ZCQuery('#' + self.sId + '-bugreport-json').val('PARSED\n----------\n' + ZC.ZCUtils._format_json_(self.oAttributes['json']) + '\n\nORIGINAL\n----------\n' + ZC.ZCUtils._format_json_(self.oAttributes['source']));
	ZC.ZCQuery('#' + self.sId + '-bugreport-cancel').bind('click', function() {
		ZC.ZCHtmlUtils._remove_(self.sId + '-bugreport');
	});
	ZC.ZCQuery('#' + self.sId + '-bugreport-submit').bind('click', function() {
		var oRegExp = /^((\w+\+*\-*)+\.?)+@((\w+\+*\-*)+\.?)*[\w-]+\.[a-z]{2,6}$/;
		var oEmail = ZC.ZCQuery('#' + self.sId + '-bugreport-email');
		if (!oRegExp.test(oEmail.val())) {
			oEmail.val(ZC.ZCLabels['bugreport-emailmandatory']);
			return;
		}
		var sImageData = '';
		if (ZC.canvas) {
			sImageData = self._api_getimagedata_('png');
		}
		var sJson = ('Parsed:'+self.oAttributes['json']+' Original:'+self.oAttributes['source']).replace(/\r|\n|\t|(\s{2,})/g, "");
		var sQS = '', aQS = [];

		if (ZC.ZCQuery('#' + self.sId + '-chkcapture').attr('checked')) {
			aQS.push('****IMAGE:', sImageData);
		}
		if (ZC.ZCQuery('#' + self.sId + '-chkdata').attr('checked')) {
			aQS.push('****JSON:', sJson);
		}
		aQS.push(
			'****COMMENT:', ZC.ZCQuery('#' + self.sId + '-bugreport-comment').val(),
			'****EMAIL:', oEmail.val(),
			'****VERSION:', ZC.VERSION,
			'****WIDTH:', self.iWidth,
			'****HEIGHT:', self.iHeight,
			'****URL:', window.location.href,
			'****UA:', navigator.userAgent,
			'****RENDER:', self.sOutput.toUpperCase(),
			'****RESOLUTION:', screen.width + 'x' + screen.height
		);
		for (var i=0;i<aQS.length-1;i+=2) {
			sQS += aQS[i] + encodeURIComponent(aQS[i+1]);
		}
		sQS += '****END';
		var oDoc = ZC.ZCHtmlUtils._iframe_(ZC._id_(self.sId + '-bugreport'));
        var oForm = oDoc.createElement('FORM');
        oForm.action = 'http://www.zingchart.com/support/submitreportH5.php';
        oForm.method = 'post';
        oDoc.body.appendChild(oForm);
        var oText = oDoc.createElement('INPUT');
        oText.type = 'text';
        oText.name = 'data';
        oText.value = sQS;
        oForm.appendChild(oText);
        oForm.submit();
        window.setTimeout(function() {
        	alert(ZC.ZCLabels['bugreport-confirm']);
            ZC.ZCHtmlUtils._remove_(self.sId + '-bugreport');
        }, 1000);
	});
	//endif
	//endif
};