/*
 USAGE:
 
 <iframe id="iframe" frameborder="0"></iframe>
 
 $("iframe").uploadMe({
	//imgUrl: "/img/meganfoxsupergirl.jpg",
	width: 200,
	height: 200,
	inputName: "image"
})
 * */

(function( $ ){
	/*
	 * width
	 * height
	 * imgUrl
	 * action 
	 * inputName
	 * 
	 * */
	
	
	var tools = {
		
	};
	var methods = {
		init : function( options ) {

			return this.each(function(){
	         
				var $this = $(this);
				var contents = $this.contents();
				var iframeBody = contents.find("body");
				
				data = $this.data('uploadMe');

				// If the plugin hasn't been initialized yet
				if ( ! data ) {
					
					var iframe = $this;
					
					var width = options.width || 100;
					var height = options.height || 100;
					var action = options.action || "/postme.php";
					var imgUrl = options.imgUrl || "http://akana.co.uk/wp-content/uploads/2012/03/shutterstock_73564222-sample.jpg";
					var inputName = options.inputName || "file";
					
					var input = contents.find("input[type=file]");
					
					var cover = $("<img>").prop("src", imgUrl).css({
						position: "absolute",
						"z-index": 1,
						top: 0,
						left: 0,
						width: width,
						height: height
					});
					
					var form = $.parseHTML('<form id="fileForm" action="'+ action +'" method="POST" enctype="multipart/form-data">'+
						'<input type="file" name="'+ inputName +'"/>' +
					'</form>');
					
					
					form = $(form);
					form.css({
						margin: 0,
						position: "absolute",
						"z-index": 5,
						opacity: 1,
						height: height,
						width: width,
						overflow: "hidden"
					});
					
					var input = form.find("input").css({
						position: "absolute",
						height: "200px",
						cursor: "pointer",
					});
					
					$this.css({
						overflow: "hidden",
						height: height,
						width: width
					});
					
					iframeBody.css({
						overflow: "hidden",
						height: height,
						width: width,
						margin: 0
					});
					
					$this.on("mouseenter",function(e){
						var vals = {
							left: e.pageX - 470 - 200,
							top: e.pageY - 302 - 120}
							//console.log(vals);
							//console.log(e,vals);
						input.css(vals);
					});
					iframeBody.on("mousemove",function(e){
						var vals = {
							left: e.pageX - 200,
							top: e.pageY - 120}
							//console.log("MM",e,vals);
						input.css(vals);
					});

					input.on("change",function(){
						$this.load(function(){});
						$this.off("mouseenter");
						iframeBody.off("mousemove");
						form.submit();
					})
					
					//console.log(form);
					iframeBody.append(cover);
					iframeBody.append(form);
					
					
					$this.data('uploadMe', {
							target: $this,
							contents: contents,
							options: options
						});
		         }
			});
		},
		destroy : function( ) {
	
			return this.each(function(){
	
				var $this = $(this),
				data = $this.data('uploadMe');
	
				$(window).unbind('.uploadMe');
				data.tooltip.remove();
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