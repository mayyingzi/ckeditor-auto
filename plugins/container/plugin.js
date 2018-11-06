(function() {
    CKEDITOR.plugins.add('container', {
        requires: ['dialog'],
        init: function(editor) {
            editor.addCommand('container', new CKEDITOR.dialogCommand('container'))
            editor.ui.addButton('container', {
                label: '内容边距',
                command: 'container',
                icon: this.path + 'page.png',
                toolbar: 'mode,10'
            });
            CKEDITOR.dialog.add('container', this.path + 'dialogs/container.js')
        }
    })
})()