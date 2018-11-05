(function () {
    CKEDITOR.dialog.add("container",
        function (editor) {
            return {
                title: "页面边距设置",
                minWidth: 400,
                minHeight: 165,
                contents: [{
                    id: "tab1",
                    label: "",
                    title: "",
                    expand: true,
                    width: "500px",
                    minHeight: "600px",
                    padding: 0,
                    elements: [
                        {
                            type: 'text',
                            labelLayout: 'horizontal',
                            widths: [ '20%', '80%' ],
                            style: 'width: 50%',
                            id: 'top',
                            label: '上边距（单位：em）',
                            'default': '0'
                        },
                        {
                            type: 'text',
                            labelLayout: 'horizontal',
                            widths: [ '20%', '80%' ],
                            style: 'margin-top: 10px; width: 50%',
                            id: 'right',
                            label: '右边距（单位：em）',
                            'default': '0'
                        },
                        {
                            type: 'text',
                            labelLayout: 'horizontal',
                            widths: [ '20%', '80%' ],
                            style: 'margin-top: 10px; width: 50%',
                            id: 'bottom',
                            label: '下边距（单位：em）',
                            'default': '0'
                        },
                        {
                            type: 'text',
                            labelLayout: 'horizontal',
                            widths: [ '20%', '80%' ],
                            style: 'margin-top: 10px; width: 50%',
                            id: 'left',
                            label: '左边距（单位：em）',
                            'default': '0'
                        },
                    ]
                }],
                onOk: function () {
                    var wrapId = 'pageDiv'
                    var element = new CKEDITOR.dom.element( 'div' );
                    element.setAttribute('id', wrapId)
                    var allData = editor.getData();

                    console.log(editor)
                    console.log('ajsdhkajh')
                    //点击确定按钮后的操作
                    //a.insertHtml("编辑器追加内容");
                }
            }
        })
})();