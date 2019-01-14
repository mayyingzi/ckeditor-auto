CKEDITOR.dialog.add('html5video_v1', function (editor) {
    return {
        title: editor.lang.html5video_v1.title,
        minWidth: 500,
        minHeight: 100,
        onCancel: function() {
            // 点击取消
            editor.config.html5video_v1UploadStop(function (msg) {
                console.log(msg)

            });
        },
        onShow: function() {
            var that = this
            var inIframe = that.getElement().getElementsByTag("iframe").$[0].contentWindow.document.forms[0].elements[0]
            if(inIframe) {
                inIframe.setAttribute('accept', 'video/*')
            }
        },
        contents: [
            {
                id: 'Upload',
                hidden: false,
                filebrowser: 'uploadButton',
                label: editor.lang.html5video_v1.upload,
                elements: [
                    {
                        type: 'text',
                        id: 'url',
                        hidden: true,
                        label: editor.lang.html5video_v1.allowed,
                        required: true,
                        validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.html5video_v1.urlMissing),
                        setup: function (widget) {
                            this.setValue(widget.data.src);
                        },
                        commit: function (widget) {
                            widget.setData('src', this.getValue());
                        }
                    },
                    {
                        type: 'file',
                        id: 'upload',
                        accept: 'video/*',
                        label: editor.lang.html5video_v1.btnUpload,
                        style: 'height:60px;padding-top: 20px',
                        size: 50,
                        onChange: function (file) {
                            console.log(file)
                        },
                    },
                    {
                        type: 'fileButton',
                        id: 'uploadButton',
                        hidden: false,
                        filebrowser: 'info:url',
                        style: 'height:40px;line-height: 30px; width: 100px',
                        label: editor.lang.html5video_v1.btnUpload,
                        'for': ['Upload', 'upload'],
                        onClick: function () {
                            var that = this;
                            var curDom = that.getInputElement().$
                            curDom.style.display = 'none'
                            var fileIframe = that.getInputElement().getParent().getParent().getPrevious().getElementsByTag("iframe").$[0];
                            var input = fileIframe.contentWindow.document.forms[0].elements[0];
                            var files = input.files;
                            var nextBtn = that.getInputElement().getParent().getParent().getNext().getElementsByTag("a").$[0];
                            if (files.length !== 0) {
                                var file = files[0];
                                curDom.style.display = 'none'
                                nextBtn.style.display = 'inline-block'

                                //上传文件
                                if (editor.config.html5video_v1UploadFn) {
                                    editor.config.html5video_v1UploadFn({file: file, curDom: curDom}, function (fileUrl) {
                                        that.getDialog().getContentElement('Upload', 'url').setValue(fileUrl);
                                        nextBtn.style.display = 'none'
                                        if(!fileUrl) {
                                            that.style.display = 'inline-block'
                                        }
                                        // that.getDialog().selectPage('info')
                                        // 设置上传视频信息

                                    });
                                }
                            }
                            return false;
                        }
                    },
                    {
                        type: 'button',
                        hidden: true,
                        id: 'buttonStop',
                        label: '取消上传',
                        title: '取消上传',
                        onClick: function() {
                            editor.config.html5video_v1UploadStop(function (msg) {
                                console.log(msg)

                            });
                        }
                    }
                ]
            },
            {
                id: 'info',
                hidden: true,
                label: editor.lang.html5video_v1.infoLabel,
                elements: [
                    {
                        type: 'vbox',
                        padding: 0,
                        children: [{
                            type: 'hbox',
                            widths: ['365px', '110px'],
                            align: 'right',
                            children: [
                                // {
                                //     type: 'text',
                                //     id: 'url',
                                //     label: editor.lang.html5video_v1.allowed,
                                //     required: true,
                                //     validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.html5video_v1.urlMissing),
                                //     setup: function (widget) {
                                //         this.setValue(widget.data.src);
                                //     },
                                //     commit: function (widget) {
                                //         widget.setData('src', this.getValue());
                                //     }
                                // },
                                {
                                    type: 'button',
                                    id: 'browse',
                                    // v-align with the 'txtUrl' field.
                                    // TODO: We need something better than a fixed size here.
                                    style: 'display:inline-block;margin-top:14px;',
                                    align: 'center',
                                    label: editor.lang.common.browseServer,
                                    hidden: true,
                                    filebrowser: 'info:url'
                                }
                            ]
                        }]
                    },
                    {
                        type: 'checkbox',
                        id: 'responsive',
                        label: editor.lang.html5video_v1.responsive,
                        setup: function (widget) {
                            if (widget.data.responsive == null) { //默认选中
                                this.setValue(true)
                            } else {
                                this.setValue(widget.data.responsive);
                            }
                        },
                        commit: function (widget) {
                            widget.setData('responsive', this.getValue() ? 'true' : '');
                        }
                    },
                    {
                        type: 'hbox',
                        hidden: true,
                        id: 'size',
                        children: [{
                                type: 'text',
                                id: 'width',
                                label: editor.lang.common.width,
                                setup: function (widget) {
                                    if (widget.data.width) {
                                        this.setValue(widget.data.width);
                                    }
                                },
                                commit: function (widget) {
                                    widget.setData('width', this.getValue());
                                }
                            },
                            {
                                type: 'text',
                                id: 'height',
                                label: editor.lang.common.height,
                                setup: function (widget) {
                                    if (widget.data.height) {
                                        this.setValue(widget.data.height);
                                    }
                                },
                                commit: function (widget) {
                                    widget.setData('height', this.getValue());
                                }
                            },
                        ]
                    },

                    {
                        type: 'hbox',
                        id: 'alignment',
                        children: [{
                            type: 'radio',
                            id: 'align',
                            label: editor.lang.common.align,
                            items: [
                                [editor.lang.common.alignCenter, 'center'],
                                [editor.lang.common.alignLeft, 'left'],
                                [editor.lang.common.alignRight, 'right'],
                                [editor.lang.common.alignNone, 'none']
                            ],
                            'default': 'center',
                            setup: function (widget) {
                                if (widget.data.align) {
                                    this.setValue(widget.data.align);
                                }
                            },
                            commit: function (widget) {
                                widget.setData('align', this.getValue());
                            }
                        }]
                    }
                ]
            },

            {
                id: 'advanced',
                hidden: true,
                label: editor.lang.html5video_v1.advanced,
                elements: [{
                    type: 'vbox',
                    padding: 0,
                    children: [
                        {
                        type: 'hbox',
                        children: [
                            {
                            type: 'radio',
                            id: 'autoplay',
                            label: editor.lang.html5video_v1.autoplay,
                            items: [
                                [editor.lang.html5video_v1.yes, 'yes'],
                                [editor.lang.html5video_v1.no, 'no']
                            ],
                            'default': 'no',
                            setup: function (widget) {
                                if (widget.data.autoplay) {
                                    this.setValue(widget.data.autoplay);
                                }
                            },
                            commit: function (widget) {
                                widget.setData('autoplay', this.getValue());
                            }
                        }]
                    }]
                }]
            }
        ]
    };
});