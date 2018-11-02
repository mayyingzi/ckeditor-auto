/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [{
			name: 'clipboard',
			groups: ['clipboard', 'undo']
		},
		{
			name: 'editing',
			groups: ['find', 'selection', 'spellchecker']
		},
		{
			name: 'links'
		},
		{
			name: 'insert'
		},
		{
			name: 'forms'
		},
		{
			name: 'tools'
		},
		{
			name: 'document',
			groups: ['mode', 'document', 'doctools']
		},
		{
			name: 'others'
		},
		'/',
		{
			name: 'basicstyles',
			groups: ['basicstyles', 'cleanup']
		},
		{
			name: 'paragraph',
			groups: ['list',
			// 'indent',
			'blocks', 'align', 'bidi']
		},
		{
			name: 'styles'
		},
		{
			name: 'colors'
		},
		{
			name: 'about'
		}
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript,Font';

	// default enterMode
	// config.enterMode = CKEDITOR.ENTER_P

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced;';

	config.fontSize_sizes = 'x-small;small;normal;large;x-large;xx-large';
	// FIXME:simage图片上传，依赖jq
	config.extraPlugins = 'div,textindent,colorbutton,lineheight,letterspacing,colordialog,simage,justify,quicktable,imagepaste';
	config.forcePasteAsPlainText = false
	config.pasteFromWordRemoveFontStyles = false;
	config.pasteFromWordRemoveStyles = false;
	config.allowedContent = true;
	// 拾色器
	config.colorButton_enableAutomatic = true;
	config.colorButton_enableMore = true;
	config.line_height = "1em;1.1em;1.2em;1.3em;1.4em;1.5em;1.6em;1.7em;1.8em;1.9em;2em;2.1em;2.2em";
	config.qtCon = {
		qtRows: 8, // Count of rows
		qtColumns: 10, // Count of columns
		qtBorder: '1', // Border of inserted table
		qtWidth: '100%', // Width of inserted table
		qtStyle: {
			'border-collapse': 'collapse'
		},
		qtClass: 'qtTable', // Class of table
		qtCellPadding: '0', // Cell padding table
		qtCellSpacing: '0', // Cell spacing table
		// qtPreviewBorder: '1px double black', // preview table border
		// qtPreviewSize: '1px', // Preview table cell size
		qtPreviewBackground: '#c8def4', // preview table background (hover)
		more: false, // 是否显示其他
	}
	// 间距设置
	// config.indentOffset = 1;
	// config.indentUnit = 'em';
	// 段落缩进 per
	config.indentation = 2

};