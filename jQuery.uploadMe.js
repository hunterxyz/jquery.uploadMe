(function( $ ){
	/*
	width: 100,
	height: 100,
	action: "/postme.php",
	imgUrl: "http://akana.co.uk/wp-content/uploads/2012/03/shutterstock_73564222-sample.jpg",
	inputName: "file",
	onLoad: null,
	callback: null,
	activateMask: false,
	 * */
	
	
	var tools = {
		appendMask: function($this){
			var data = $this.data('uploadMe');
			var mask = $("<img/>").prop("src",data.options.imgMask);
			mask.addClass("uploadMe_mask");
			mask.css({
				position: "absolute",
			    "z-index": 2
			});
			data.iframe.contents().find("body").append(mask);
		}
	};
	var methods = {
		init : function( options ) {

			return this.each(function(){
	         
				var $this = $(this);
				
				
				data = $this.data('uploadMe');

				// If the plugin hasn't been initialized yet
				if ( ! data ) {
					if (!options){
						options = {};
					}
					
					$this.addClass("uploadMe");
					
					var iframe = $.parseHTML('<iframe id="iframe" frameborder="0"></iframe>');
					iframe = $(iframe);
					
					iframe.load(function(){
						$(this).off("load");
						var iframe = $this.find("iframe");
						
						var contents = iframe.contents();
						var iframeBody = contents.find("body");
						
						var defaultOptions = {
							width: 100,
							height: 100,
							action: "/postme.php",
							imgUrl: "http://akana.co.uk/wp-content/uploads/2012/03/shutterstock_73564222-sample.jpg",
							inputName: "file",
							onLoad: null,
							callback: null,
							activateMask: false,
							//cssDir: "/css"
						};
						
						
						var width = parseInt($this.css("width"));
						var height = parseInt($this.css("height"));
						var action = options.action || "/postme.php";
						var imgUrl = options.imgUrl || "http://akana.co.uk/wp-content/uploads/2012/03/shutterstock_73564222-sample.jpg";
						var inputName = options.inputName || "file";
						var onLoad = options.onLoad || null;
						var callback = options.callback || null;
						var activateMask = options.activateMask || false;
						//var cssDir = options.cssDir || defaultOptions.cssDir;
						
						if (onLoad){
							onLoad();
						}
						
						//var cssLink = $("<link rel='stylesheet' href='"+cssDir+"/jQuery.uploadMe.iframe.css' type='text/css'>");
						//contents.find("head").append(cssLink);
						
						var resultImageName = options.resultImageName || "image";
						var imgMask = options.imgMask || null;
						
						var cover = $("<img>")
							.prop("src", imgUrl)
							.addClass("uploadMe_cover")
							.css({
								width: width,
								height: height,
								position: "absolute",
								"z-index": 1,
								top: 0,
								left: 0,
							});
						
						var form = $.parseHTML('<form id="fileForm" action="'+ action +'" method="POST" enctype="multipart/form-data">'+
							'<input type="file" name="'+ inputName +'"/>' +
						'</form>');
						
						form = $(form);
						
						var input = form.find("input")
							.addClass("uploadMe_input")
							.css({
								height: height,
								position: "absolute",
								cursor: "pointer"
							});
						
						iframe.css({
							height: height,
							width: width
							
							
						
						});
						
						iframeBody.css({
							overflow: "hidden",
							height: height,
							width: width,
							margin: 0
						});
						
						form.addClass("uploadMe_form")
						.css({
							height: height,
							width: width,
							
							margin: 0,
							position: "absolute",
							"z-index": 5,
							opacity: 0,
							overflow: "hidden",
							top: 0,
							left: 0
						});
						
						iframe.on("mouseenter",function(e){
							form.click();
							var vals = {
								left: e.pageX - 450,
								top: 0
							}
							//console.log(e.pageX,vals);
							input.css(vals);
						});
						
						$this.on("mousemove",function(e){
							var vals = {
								left: e.pageX - 450,
								top: 0
							}
							//console.log("MM",e.pageX,vals);
							input.css(vals);
						});
						
						iframeBody.on("mousemove",function(e){
							var vals = {
								left: e.pageX - 200,
								top: 0
							}
							//console.log("MM2",e.pageX,width + width/3);
							input.css(vals);
						});
						
						input.on("change",function(){
							
							iframe.load(function(){
								var responseText = $(this).contents().find("body").text()
								var res = eval('['+responseText+']');
								if (callback){
									callback(res[0]);
								}
								$this.uploadMe("destroy");
								var tmpOptions = $.extend({},options);
								tmpOptions.imgUrl = res[0][resultImageName];
								tmpOptions.onLoad = function(){
									if (tmpOptions.imgMask){
										var mask = $("<img/>")
											.prop("src",tmpOptions.imgMask)
											.addClass("uploadMe_mask")
											.css({
												position: "absolute",
												"z-index": 2
											});
										$this.find("iframe").contents().find("body").append(mask);
									}
									
								};
								iframe.off("load");
								$this.uploadMe(tmpOptions);
								
							});
							
							iframe.off("mouseenter");
							iframeBody.off("mousemove");
							form.submit();
						})
						
						
						$this.data('uploadMe', {
								target: $this,
								iframe: iframe,
								contents: contents,
								options: options
							});
						
						iframeBody.append(cover);
						iframeBody.append(form);
						
						if (activateMask){
							tools.appendMask($this);
						}
					});
					$this.append(iframe);
		         }
			});
		},
		reset: function(options){
			var $this = $(this);
			data = $this.data('uploadMe');
			if ( data ){
			
				$this.html("");
				$this.removeData('uploadMe');
				$this.uploadMe(options);
			}
			
		},
		destroy : function( ) {
	
			return this.each(function(){
	
				var $this = $(this),
				data = $this.data('uploadMe');
				$this.find("iframe").remove();
				
				$(window).unbind('.uploadMe');
				
				$this.removeData('uploadMe');
	
			});
		}
	};

	$.fn.uploadMe = function( method ) {
	  
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
	 		$.error( 'Method ' +  method + ' does not exist on jQuery.uploadMe' );
		} 
	};
})( jQuery );
