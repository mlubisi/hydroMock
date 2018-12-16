jQuery(document).ready(function($){
	// Quick Navig
	// TODO: make selected_ page consistent
		//-Use a Class for Subnav toggle visibility
		//-Make the Regulator ft techtical
		//loadContent($active) should fetch respectful then persist the current ith Session
	
	//nav regulator
	regulator('#nav_.menu');
	//subnav
	regulator('.subnav');
	function regulator(target){
		thisGuy=target;
		$(thisGuy).each(function(){
			var $active, $links = $(this).find('a');
			// If the location.hash matches one of the links, use that as the active page.
			// If no match is found, use the first link as the initial active page.
			$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
			$active.addClass('selected_');
			if(thisGuy != '.subnav'){loadContent($active);}
			// Hide the remaining content
			$links.not($active).each(function () {
				$(this.hash).hide();
			});
			// Bind the click event handler
			$(this).on('click', 'a', function(e){
				$active.removeClass('selected_');// Make the old page inactive.
				$active = $(this);
				if($(this).text()=="store"){$('.subnav').fadeIn(300);}
				else{if($(this.offsetParent)[0].id=='li_'){$('.subnav').fadeOut(100);}}
				$active.addClass('selected_');
				if($(this.offsetParent)[0].id=='li_'){loadContent($active);}
				e.preventDefault();
			});
		});
	}
	
	function loadContent(thisGuy){
		var url=thisGuy[0].hash;
		console.log("go:"+url);
		//$('#loading').css('visibility','visible');
		$('#loader').fadeIn();
		url=url.replace('#','');
		$.ajax({
			type: "POST",
			url: "regulate.php",
			data: 'go='+url,
			dataType: "html",
			success: function(result){
				if(parseInt(result)!=0){$('#pageContent').html(result);}
				$('#loader').fadeOut(200);
				console.log("Uhh");
			}
		});
	}
	// End Of Quick Nav

	
	var fancy=false;
	var mainHeader = $('.autohide_header'),
		secondaryNavigation = $('.lower_nav'),
		headerHeight = mainHeader.height();
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 100;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();
		checkSimpleNavigation(currentTop)
	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if ((previousTop - currentTop > scrollDelta) || currentTop==0) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

	//The Show Off Animation
	if(fancy != undefined && fancy==true){
var canvas=document.querySelector("canvas");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	var c=canvas.getContext('2d');
	var colors=[
				"rgba(121,42,184,0.21)",
				"rgba(21,42,84,0.21)",
				"rgba(121,142,184,0.21)",
				"rgba(22,21,84,0.21)",
				"rgba(221,142,84,0.21)",
			];
	var mouse={
		x:undefined,
		y:undefined
	}
	window.addEventListener("mousemove",function(event){
		mouse.x=event.x;
		mouse.y=event.y;
	})
	function Particle(x,y,dx,dy,radius,color){
		this.x=x;
		this.y=y;
		this.dx=dx;
		this.dy=dy;
		this.radius=radius;
		this.color=color;
		this.draw=function(){
			c.beginPath();
			c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
			//c.fillStyle=this.color;
			c.strokeStyle=this.color;
			//c.fill();
			c.stroke();
		}
		this.update=function(){
			if(this.x+this.radius>=canvas.width || this.x-radius < 0){this.dx=-this.dx;}
			if(this.y+radius>canvas.height || this.y-radius<0){this.dy=-this.dy;}
			this.x+=this.dx;
			this.y+=this.dy;
			if(mouse.x-this.x < 42 && mouse.x - this.x > - 42 && mouse.y - this.y < 42 && mouse.y-this.y > -42){if(this.radius<6){this.radius += 1;}}
			else if(this.radius>1){this.radius-=1;}
			this.draw();
		}
	}
	var pArray=[];
	for(var i=0;i<canvas.width/2+canvas.height/2;i++){
		var color=colors[Math.floor(Math.random()*colors.length)],
			dx=(Math.random()-0.5)*1.2,
			dy=(Math.random()-0.5)*1.2,
			radius=2;
		pArray.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,dx,dy,radius,color));
	}
	function animate(){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		for(var i=0;i<pArray.length;i++){pArray[i].update();}
	}
animate();
	}
});
