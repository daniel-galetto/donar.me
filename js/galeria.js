class IndexForSibling {
	static get(el){
		let children = el.parentNode.children;

		for (var i = 0; i < children.length; i++) {
			let child = children[i];
			if(child == el) return i;
		}
	}
}


class Slider {
	constructor(selector,movimiento=true){
	   this.move = this.move.bind(this);
	   this.moveByButton = this.moveByButton.bind(this);
       this.Slider = document.querySelector(selector);
       this.itemsCount = this.Slider.querySelectorAll(".container > *").length;
       
       this.interval = null;
       this.contador = 0;
       this.movimiento = movimiento;
       
       this.start();
       
       this.buildControls();
       this.bindEvents();
	}


	start () {
		if(!this.movimiento) return;
        this.interval = window.setInterval(this.move,3000);
	}


	restart(){
		if(this.interval)window.clearInterval(this.interval);
		this.start();
	}


	bindEvents(){
		this.Slider.querySelectorAll(".controls li")
           .forEach(item => {
                item.addEventListener("click",this.moveByButton)
           });
	}


	moveByButton(ev){
         let index = IndexForSibling.get(ev.currentTarget);
         this.contador = index;
         this.moveTo(index);
         this.restart();
	}


	buildControls () {
		for (var i = 0; i < this.itemsCount; i++) {
			let control = document.createElement("li");

			if(i == 0) control.classList.add("active");
			this.Slider.querySelector(".controls ul").appendChild(control);
		}
	}


	move () {
		this.contador++;
        if(this.contador > this.itemsCount - 1) this.contador = 0;
        this.moveTo(this.contador);
	}

	resetIndicator (){
       this.Slider.querySelectorAll(".controls li.active")
           .forEach(item => item.classList.remove("active"));
	}


	moveTo(index) {
		let  left = index * 100;
		this.resetIndicator();
        this.Slider.querySelector(".controls li:nth-child("+(index+1)+")").classList.add("active");
		this.Slider.querySelector(".container").style.left = "-"+left+"%";
	}
}




(function(){
   
   new Slider(".slider",true);

})();


/**** galeria 2 ****/

var galerias = document.querySelectorAll('div.image-gallery');

for (var i = 0; i < galerias.length; i++){
  var Idgaleria = galerias[i].id;
  galerias[i].addEventListener('mouseover', golive(Idgaleria));
};

function golive(Idgaleria){
  
var current = document.querySelector('div#'+Idgaleria+' .current');
var thumbnails = document.querySelectorAll('div#'+Idgaleria+' .thumbnail');

thumbnails[0].style.opacity = 0.6;

for (let i = 0; i < thumbnails.length; i++){
  thumbnails[i].addEventListener('click', show);
};

function show() {
  thumbnails.forEach(function (img){
    img.style.opacity = 1;
  })
  let imgSource = this.getAttribute('src');
  current.setAttribute('src', imgSource);
  current.classList.add('fade-in');
  this.style.opacity = 0.6;
  setTimeout (function (){
    current.classList.remove('fade-in');
  },500);
}
}


/****MODAL**** */

