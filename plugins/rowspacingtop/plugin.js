( function() {
	function addCombo( editor, comboName, styleType, lang, entries, defaultLabel, styleDefinition, order ) {
		this.allowedContent = {
			'caption div h1 h2 h3 h4 h5 h6 p pre td th li': {
				// Do not add elements, but only text-align style if element is validated by other rule.
				propertiesOnly: true,
				styles: this.cssClassName ? null : 'text-align',
				classes: this.cssClassName || null
			}
		};
		var config = editor.config,style = new CKEDITOR.style( styleDefinition );
		var names = entries.split( ';' ),values = [];
		var styles = {};
		for ( var i = 0; i < names.length; i++ ) {
			var parts = names[ i ];
			if ( parts ) {
				parts = parts.split( '/' );
				var vars = {},name = names[ i ] = parts[ 0 ];
				vars[ styleType ] = values[ i ] = parts[ 1 ] || name;
				styles[ name ] = new CKEDITOR.style( styleDefinition, vars );
				if(parts == '默认') {
					styles[ name ]._.definition.styles['margin-top'] = 'auto'
				}
				styles[ name ]._.definition.name = name;
				styles[ name ]._.enterMode = editor.config.enterMode;
			} else {
				names.splice( i--, 1 );
			}

		}
		editor.ui.addRichCombo( comboName, {
			label: editor.lang.rowspacingtop.title,
			title: editor.lang.rowspacingtop.title,
			toolbar: 'styles,' + order,
			allowedContent: style,
			requiredContent: style,
			panel: {
				css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
				multiSelect: false,
				attributes: { 'aria-label': editor.lang.rowspacingtop.title }
			},
			init: function() {
				this.startGroup(editor.lang.rowspacingtop.title);
				for ( var i = 0; i < names.length; i++ ) {
					var name = names[ i ];
					this.add( name, styles[ name ].buildPreview(), name );
				}
			},
			onClick: function( value ) {
				editor.focus();
				editor.fire( 'saveSnapshot' );
				/**
				 * 使用apply

				var style = styles[ value ];
				CKEDITOR.config.raw.top = value
				// 当前顶级元素
				var nodeD = editor.getSelection().getStartElement()
				// 涵盖其他属性
				var addStyle = new CKEDITOR.style( {
					element: 'p',
					styles: { 'margin-top': '#(size)' ,'margin-bottom': '#(bottom)',  'text-align': '#(textAlign)'},
					overrides: [ {
						element: 'margin-top', attributes: { 'size': null }
					},{
						element: 'margin-bottom', attributes: { 'bottom': null }
					},
					{
						element: 'text-align', attributes: { 'textAlign': null }
					} ]
				}, {size: value, bottom: CKEDITOR.config.raw.bottom, textAlign: CKEDITOR.config.raw['text-align']})
				editor[ this.getValue() == value ? 'removeStyle' : 'applyStyle' ]( addStyle );
				// cashNode.setStyle('margin-top', value)

				*/

				/**
				 * setStyle
				 */
				var selection = editor.getSelection(),
					enterMode = editor.config.enterMode;

				if ( !selection )
					return;

				var bookmarks = selection.createBookmarks(),
					ranges = selection.getRanges();

				var iterator, block;

				var useComputedState = editor.config.useComputedState;
				useComputedState = useComputedState === undefined || useComputedState;

				for ( var i = ranges.length - 1; i >= 0; i-- ) {
					iterator = ranges[ i ].createIterator();
					iterator.enlargeBr = enterMode != CKEDITOR.ENTER_BR;

					while ( ( block = iterator.getNextParagraph( enterMode == CKEDITOR.ENTER_P ? 'p' : 'div' ) ) ) {
						if ( block.isReadOnly() )
							continue;

						// Check if style or class might be applied to currently processed element (#455).
						var tag = block.getName(),
							isAllowedTextAlign;

						isAllowedTextAlign = editor.activeFilter.check( tag + '{margin-top}' );


						if ( !isAllowedTextAlign ) {
							continue;
						}

						// block.removeAttribute( 'align' );
						block.removeStyle( 'margin-top' );
						block.setStyle( 'margin-top', value);

					}

				}

				editor.focus();
				editor.forceNextSelectionCheck();
				selection.selectBookmarks( bookmarks );

				editor.fire( 'saveSnapshot' );
			},
			onRender: function() {
				editor.on( 'selectionChange', function( ev ) {
					var currentValue = this.getValue();
					var elementPath = ev.data.path,elements = elementPath.elements;
					for ( var i = 0, element; i < elements.length; i++ ) {
						element = elements[ i ];
						for ( var value in styles ) {
							if ( styles[ value ].checkElementMatch( element, true, editor ) ) {
								if ( value != currentValue ){
									this.setValue( value );
								}
								return;
							}
						}
					}
					this.setValue( '', defaultLabel );
				}, this );
			},
			refresh: function() {
				if ( !editor.activeFilter.check( style ) )
					this.setState( CKEDITOR.TRISTATE_DISABLED );
			}
		} );
	}
	CKEDITOR.plugins.add( 'rowspacingtop', {
		requires: 'richcombo',
		lang: 'en,fr,es',
		init: function( editor ) {
			var config = editor.config;
			addCombo( editor, 'rowspacingtop', 'size', editor.lang.rowspacingtop.title, config.row_top, editor.lang.rowspacingtop.title, config.rowTop_style, 40 );
		}
	} );
} )();

var rowTop = ['默认'];
for (var i = -3; i < 18; i++) {
	rowTop.push(String((i*0.2).toFixed(1)) + 'em');
}
CKEDITOR.config.row_top = rowTop.join(';');
CKEDITOR.config.rowTop_style = {
// CKEDITOR.config.lineHeight_style = {
	element: 'p',
	styles: { 'margin-top': '#(size)' },
	overrides: [ {
		element: 'margin-top', attributes: { 'size': null }
	} ]
};
