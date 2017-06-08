var production = location.port.length == 0

var enableRichEditors = function(){
  $('textarea[data-schemaformat=html').sceditor()
}

var centerLayout = function(state){
  if( state ) $('div#app').addClass("edit")
  else $('div#app').removeClass("edit")
}

var supportDateTime = function(){
	JSONEditor.defaults.editors.dateTime = JSONEditor.defaults.editors.string.extend({
			getValue: function() {

					function getTimeZone() {
							var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
							return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
					}

					return this.value+getTimeZone();
			},

			setValue: function(val) {

					// strip timeZone
					var stripedDateTime = val.substring(0, val.lastIndexOf("+"));


					if(this.value !== stripedDateTime) {
							this.value = stripedDateTime;
							this.input.value = this.value;
							//this.refreshPreview();
							this.onChange();
					}
			},

			build: function() {
					this.schema.format = "datetime-local";
					this._super();

			}
	});

	// Instruct the json-editor to use the custom datetime-editor.
	JSONEditor.defaults.resolvers.unshift(function(schema) {
			if(schema.type === "string" && schema.format === "datetime") {
					return "dateTime";
			}

	});
}

var events = {
  '/*': function(url){
    enableRichEditors()
    //centerLayout( url.match('edit/') != null )
    initLanguage()
    supportDateTime()
  }, 
  '/edit\/pages/': function(url){
    $('div.row div select').hide()
  }, 
  '/edit\/.*\/create': function(url){
    $('input').each(function(k, v){
      v.setAttribute( 'placeholder', v.value )
      v.value = ''
    })
  }, 
  '/edit\/.*': function(url){
    var resource = url.replace(/.*\/edit\//, '').split('/')[0]
  }, 
  '/permissions': function(url){
    if( production ){
      $('button').hide()
      $('input[type=checkbox]').attr('disabled', 'disabled')
    } 
  }
}

var processUrl = function(){
  var url = window.location.hash.substring(1)
  for ( var regex in events  ) 
    if( url.match( new RegExp(regex) ) != null ) setTimeout( events[regex].bind(this,url), 100 ) 
}

if(("onhashchange" in window) && navigator.userAgent.toLowerCase().indexOf('msie') == -1){ // event supported?
  window.onhashchange = processUrl
}


Notification.requestPermission( function(permission){ })
// service worker
//navigator.serviceWorker.register('/admin/js/sw.js');
//navigator.serviceWorker.ready.then( function(swr){
//  swr.showNotification("Penna.co", {
//    body: "This is an update"
//   // image: '/img/logo.svg',
//   // icon: '/img/logo.svg'
//  });
//});
//


setTimeout(processUrl, 500)  // local,  this should be called by expressa-admin actually
