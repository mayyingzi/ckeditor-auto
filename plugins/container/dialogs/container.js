(function () {
    CKEDITOR.dialog.add("container",
        function (editor) {
            var wrapId = 'pageDiv'
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
                onShow: function() {
                    // 显示当前的padding设置
                    var element = new CKEDITOR.dom.element( 'div' );
                    var allData = editor.getData();
                    element.$.innerHTML = allData
                    var inWrap = element.find('#' + wrapId)
                    if(inWrap.$.length) {
                        var str = inWrap.$[0].style.padding
                        var strArr = str.split(' ')
                        for(var i = 0; i < strArr.length; i++) {
                            strArr[i] = strArr[i].split('em')[0]
                        }
                        if(strArr.length === 1) {
                            strArr = strArr.concat(strArr[0], strArr[0], strArr[0])
                        } else if(strArr.length === 2) {
                            strArr = strArr.concat(strArr[0], strArr[1])
                        } else if (strArr.length === 3) {
                            strArr = strArr.concat(strArr[1])
                        }
                        var styleList = ['top', 'right', 'bottom', 'left']
                        for(var i = 0; i < styleList.length; i++) {
                            this.setValueOf('tab1', styleList[i], strArr[i])
                        }

                    }
                },
                onOk: function () {
                    var styleList = ['top', 'right', 'bottom', 'left']
                    var styleStr = []
                    for(var i = 0; i < styleList.length; i++) {
                        // 获取录入的padding值
                        styleStr.push(+this.getValueOf('tab1', styleList[i]) + 'em')
                    }
                    var element = new CKEDITOR.dom.element( 'div' );
                    var allData = editor.getData();
                    element.$.innerHTML = allData
                    var inWrap = element.find('#' + wrapId)
                    if(inWrap.$.length) {
                        // inWrap
                        inWrap.$[0].style.padding = styleStr.join(' ')
                        // inWrap.$[0].setAttribute('style', 'padding: ' + styleStr.join(' ') + ';')
                        editor.setData(inWrap.$[0].outerHTML)
                    } else {
                        element.setAttribute('id', wrapId)
                        element.setStyle('padding', styleStr.join(' '))
                        editor.setData(element.$.outerHTML)
                    }
                    //点击确定按钮后的操作
                    //a.insertHtml("编辑器追加内容");
                }
            }
        })
})();