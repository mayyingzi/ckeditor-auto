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
CKEDITOR.config.zPastImgData = function (data) {
	console.log('------:data', data)
}
CKEDITOR.config.zImgSize = 5
CKEDITOR.config.zImgFail = function (data) {
	alert(data || '上传失败，请重尝试')
}

// 视频上传
CKEDITOR.config.html5video_v1UploadFn = function(file,callback){
	var maxSize = 20 * 1024 *1024;
	if (file.size > maxSize) {
		// 提示 ‘请上传有效的视频且低于20M’
		return
	}
	// TODO:视频上传回调
	//uploadFile(file);
	var file_url = 'http://vod.pigkeeping.cn/77ab56c4f83745559f455f2d21890ca3/fbdb91ace0f548108d700e1059082245-c12633e06beb6e71a770377124975de3-fd.mp4'
	callback(file_url);
}

// 视频上传-终止
CKEDITOR.config.html5video_v1UploadStop = function(callback){
	// TODO:视频上传接口终端
	callback('中断成功');
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
	document.getElementById('mainData').innerHTML = curHtml
}

// 初始化内容
CKEDITOR.on('instanceReady', function (e) {
	CKEDITOR.instances.editor.setData('<h1>初始化内容</h1>');
	// CKEDITOR.addCss('.cke_editable p { margin: 0 !important; }');
});

