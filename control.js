window.addEventListener('load', initFields);
tree = null;

function initFields() {
	
	document.getElementById("start").addEventListener("click", startClicked);
	document.getElementById("reset").addEventListener("click", resetClicked);
	document.getElementById("ajax").addEventListener("click", ajaxClicked);
		
	//log holen und bereitstellen
	log = document.getElementById("log");
	
}



function startClicked(event) {
	
	loadTree();
	initCanvas();
}

function resetClicked(event) {
	
	var elem = document.getElementById("myCanvas");
	elem.removeEventListener("mousedown", mouseDown);
	elem.removeEventListener("mouseup", mouseUp);
	elem.removeEventListener("mousemove", mousemove);
	elem.removeEventListener("contextmenu", contextmenuListener);
	elem.removeEventListener("click", click);
	tree = null;
	log.innerHTML = "";
	repaint();
}

function ajaxClicked() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			tree = JSON.parse(this.responseText);
			log = document.getElementById("log");
			log.innerHTML += "Tree Loaded by AJAX<br>";
			log.innerHTML += "Tree: "+JSON.stringify(tree, null, 2)+"<br>";
			initCanvas();
		}
	};
	xhttp.open("GET", "http://www.schori.net/tree/ajax.txt", true);
	xhttp.send();
}