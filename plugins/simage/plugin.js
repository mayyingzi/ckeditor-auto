CKEDITOR.plugins.add('simage', {
	icons: 'simage',
	allowedContent: 'img[alt,!src,width,height,data-width,data-height]{border-style,border-width,float,height,margin‌​,margin-bottom,margi‌​n-left,margin-right,‌​margin-top,width}',
	init: function (editor) {
		editor.addCommand('simage', {
			exec: function (editor) {
				a = document.createElement('input')
				a.setAttribute('type', 'file')
				a.setAttribute('multiple', 'multiple');
				a.setAttribute('accept', '.jpg,.jpeg,.png,.tif,.gif,.svg')
				a.onchange = function () {
					if (!a.files || a.files.length > 5) {
						editor.config.zImgFail('一次最多只能上传5张图片')
						return
					}
					var curCount = 0;
					var curr = CKEDITOR.currentInstance
					var multipleUp = function () {
						var file = a.files[curCount];
						$(CKEDITOR.currentInstance).trigger('enableFormSubmit')
						if (file.size > 1000000) {
							editor.config.zImgFail('图片大小不能超过1M')
							$(CKEDITOR.instances[curr.name]).trigger('enableFormSubmit')
							return
						} else if (['jpeg', 'jpg', 'png', 'svg', 'gif', 'tif', 'svg+xml'].indexOf(file.type.split('/')[1]) === -1) {
							editor.config.zImgFail('请上传正确的格式图片')
							$(CKEDITOR.instances[curr.name]).trigger('enableFormSubmit')
							return
						}
						img = new Image()
						img.onload = function () {
							inputWidth = this.width
							inputHeight = this.height
						}
						img.src = window.URL.createObjectURL(file)
						var formData = new FormData;
						formData.append('file', file);
						loaderElem = new CKEDITOR.dom.element('loader-elem')
						loaderHtmlStr = '<div style="position: relative; z-index: 100;width: 100%;height: 100%;text-align: center;background: white;opacity: 0.75;pointer-events:none">' + '<div style="width: 100%;height: 30px;margin-top: 100px;">Please wait while image is uploading...</div>' + '</div>'
						loaderDomEle = CKEDITOR.dom.element.createFromHtml(loaderHtmlStr)
						loaderElem.append(loaderDomEle)
						editor.insertElement(loaderElem)
						CKEDITOR.currentInstance.setReadOnly(true)
						domImgUp(formData, function () {
							curCount++
							if (curCount < a.files.length) {
								multipleUp()
							}
						})

					}
					var domImgUp = function (formData, callback) {
						var xhr = new XMLHttpRequest();
						// FIXME:接口只支持单张上传
						xhr.open('POST', editor.config.imageUploadURL);
						xhr.send(formData);
						// 返回数据
						xhr.onreadystatechange = function () {
							if (xhr.readyState === 4) {
								if (xhr.status < 200 || xhr.status >= 300) {
									CKEDITOR.instances[curr.name].setReadOnly(false)
									loaderElem.remove()
									$(CKEDITOR.instances[curr.name]).trigger('enableFormSubmit')
									editor.config.zImgFail()
									return;
								}
								var data = $.parseJSON(xhr.responseText);
								CKEDITOR.instances[curr.name].setReadOnly(false)
								url = editor.config.dataParser(data)
								// 服务端报错
								if(!url) {
									loaderElem.remove()
									$(CKEDITOR.instances[curr.name]).trigger('enableFormSubmit')
									editor.config.zImgFail()
									return
								}
								elem = new CKEDITOR.dom.element('p')
								maxWidth = Math.min(inputWidth, 600)
								maxHeight = Math.min(inputHeight, 600)
								if ((maxWidth / maxHeight) > (inputWidth / inputHeight)) {
									width = (maxWidth * inputWidth) / inputHeight
									height = maxHeight
								} else if ((maxWidth / maxHeight) < (inputWidth / inputHeight)) {
									width = maxWidth
									height = (maxHeight * inputHeight) / inputWidth
								} else {
									width = maxWidth
									height = maxHeight
								}
								if (editor.config.srcSet) {
									srcSet = editor.config.srcSet(data)
									imgElem = '<img src="' + url + '" class="image-editor" srcset="' + srcSet + '" data-width="' + inputWidth + '" data-height="' + inputHeight + '" height="' + height + '" width="' + width + '">'
								} else {
									imgElem = '<img src="' + url + '" class="image-editor">'
								}
								imgDomElem = CKEDITOR.dom.element.createFromHtml(imgElem)
								elem.append(imgDomElem)
								editor.insertElement(elem)
								loaderElem.remove()
								$(CKEDITOR.instances[curr.name]).trigger('enableFormSubmit')
								callback && callback()
							}

						}
					}
					multipleUp()
				}
				a.click()

			}
		});

		editor.ui.addButton('SImage', {
			label: 'Custom Image Uploader',
			command: 'simage',
			toolbar: 'insert'
		});
	}
});