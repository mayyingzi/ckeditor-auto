( function() {
	function addCombo( editor, comboName, styleType, lang, entries, defaultLabel, styleDefinition, order ) {
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
					styles[ name ]._.definition.styles['margin-bottom'] = 'auto'
				}
				styles[ name ]._.definition.name = name;
			} else {
				names.splice( i--, 1 );
			}
				
		}
		editor.ui.addRichCombo( comboName, {
			label: editor.lang.rowspacingbottom.title,
			title: editor.lang.rowspacingbottom.title,
			toolbar: 'styles,' + order,
			allowedContent: style,
			requiredContent: style,
			panel: {
				css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
				multiSelect: false,
				attributes: { 'aria-label': editor.lang.rowspacingbottom.title }
			},
			init: function() {
				this.startGroup(editor.lang.rowspacingbottom.title);
				for ( var i = 0; i < names.length; i++ ) {
					var name = names[ i ];
					this.add( name, styles[ name ].buildPreview(), name );
				}
			},
			onClick: function( value ) {				
				editor.focus();
				editor.fire( 'saveSnapshot' );
				var style = styles[ value ];
				CKEDITOR.config.raw.bottom = value
				var addStyle = new CKEDITOR.style( {
					element: 'p',
					styles: { 'margin-top': '#(size)' ,'margin-bottom': '#(bottom)' , 'text-align': '#(textAlign)'},
					overrides: [ {
						element: 'margin-top', attributes: { 'size': null }
					},{
						element: 'margin-bottom', attributes: { 'bottom': null }
					} ,
					{
						element: 'text-align', attributes: { 'textAlign': null }
					}]
				}, {size: CKEDITOR.config.raw.top, bottom: value, textAlign: CKEDITOR.config.raw['text-align']})	
				editor[ this.getValue() == value ? 'removeStyle' : 'applyStyle' ]( style );
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
								if ( value != currentValue )
									this.setValue( value );
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
	CKEDITOR.plugins.add( 'rowspacingbottom', {
		requires: 'richcombo',
		lang: 'en,fr,es',
		init: function( editor ) {
			var config = editor.config;
			addCombo( editor, 'rowspacingbottom', 'size', editor.lang.rowspacingbottom.title, config.row_top, editor.lang.rowspacingbottom.title, config.rowBottom_style, 40 );
		}
	} );
} )();

var rowBottom = ['默认'];
for (var i = -3; i < 18; i++) {
	rowBottom.push(String((i*0.2).toFixed(1)) + 'em');
}
CKEDITOR.config.row_bottom = rowBottom.join(';');
CKEDITOR.config.rowBottom_style = {
// CKEDITOR.config.lineHeight_style = {
	element: 'p',
	styles: { 'margin-bottom': '#(size)' },
	overrides: [ {
		element: 'margin-bottom', attributes: { 'size': null }
	} ]
};
