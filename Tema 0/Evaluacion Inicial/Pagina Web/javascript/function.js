var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
	  showDivs(slideIndex += n);
}

function showDivs(n) {
	 var i;
	 var x = document.getElementsByClassName("slide");
	  if (n > x.length) {slideIndex = 1}
	  if (n < 1) {slideIndex = x.length} ;
	  for (i = 0; i < x.length; i++) {
	    x[i].style.display = "none";
	  }
	  x[slideIndex-1].style.display = "block";
}
function contacto() {
  	var x = document.getElementById("contacto");
  	var y = document.getElementById("inicio");
  	var z = document.getElementById("calendario");
  	var w = document.getElementById("comiteorganizador");
  		if (x.style.display === "none") {
    		x.style.display = "block";
    		y.style.display = "none";
    		z.style.display = "none";
    		w.style.display = "none";
  		} else {
    		x.style.display = "none";
    		y.style.display = "block";
    		z.style.display = "none";
    		w.style.display = "none";    		
  		}
}
function comite() {
  	var x = document.getElementById("comiteorganizador");
  	var y = document.getElementById("inicio");
  	var z = document.getElementById("calendario");
  	var w = document.getElementById("contacto");
  		if (x.style.display === "none") {
    		x.style.display = "block";
    		y.style.display = "none";
    		z.style.display = "none";
    		w.style.display = "none";
  		} else {
    		x.style.display = "none";
    		y.style.display = "block";
    		z.style.display = "none";
    		w.style.display = "none";
  		}
}
function calendario() {
  	var x = document.getElementById("calendario");
  	var y = document.getElementById("inicio");
  	var z = document.getElementById("comiteorganizador");
  	var w = document.getElementById("contacto")
  		if (x.style.display === "none") {
    		x.style.display = "block";
    		y.style.display = "none";
    		z.style.display = "none";
    		w.style.display = "none";
  		} else {
    		x.style.display = "none";
    		y.style.display = "block";
    		z.style.display = "none";
    		w.style.display = "none";
  		}
}