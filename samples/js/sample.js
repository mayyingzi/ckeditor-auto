/**
 * Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* exported initSample */

if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
	CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';

// 图片上传设置
CKEDITOR.config.imageUploadURL = 'http://trade-admin-test1.pigkeeping.com.cn/file'

// CKEDITOR.config.filebrowserImageUploadUrl =CKEDITOR.config.imageUploadURL;
// CKEDITOR.config.imageUploadURL = '/file'

CKEDITOR.config.dataParser = function (data) {
	if (data && data.data && data.data.address) {
		return data.data.address
	}
}

// paste image
CKEDITOR.config.zPastImgData = function(data) {
	console.log('------:data', data)
}
CKEDITOR.config.zImgSize = 5
CKEDITOR.config.zImgFail = function (data) {
	alert(data || '上传失败，请重尝试')
}


var initSample = (function () {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

	return function () {
		var editorElement = CKEDITOR.document.getById('editor');

		// :(((
		if (isBBCodeBuiltIn) {
			editorElement.setHtml(
				'Hello world!\n\n' +
				'I\'m an instance of [url=https://ckeditor.com]CKEditor[/url].'
			);
		}

		// Depending on the wysiwygarea plugin availability initialize classic or inline editor.
		if (wysiwygareaAvailable) {
			CKEDITOR.replace('editor');
		} else {
			editorElement.setAttribute('contenteditable', 'true');
			CKEDITOR.inline('editor');

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
	};

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if (CKEDITOR.revision == ('%RE' + 'V%')) {
			return true;
		}

		return !!CKEDITOR.plugins.get('wysiwygarea');
	}
})();

// 获取当前内容

document.getElementById('showData').onclick = function () {
	var curHtml = CKEDITOR.instances.editor.getData()
	console.log(curHtml)
	document.getElementById('mainData').innerHTML =curHtml
}