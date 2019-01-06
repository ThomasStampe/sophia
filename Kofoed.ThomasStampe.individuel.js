// Globale variable
var listen = farveformprisliste[7]; // Henter en liste af objekter fra listen af lister
var prisliste = []; // Eklærer en tom liste til priserne

// Opgave 1
function lav_html (farveformpris) {
  var indsæt = "";
    for (i = 0; i < farveformpris.length; i++ ) {
        indsæt += "<font color='"+farveformpris[i].farve+"'> Elementets form: "+farveformpris[i].form+" ------- Elementets farve: <font color='"+farveformpris[i].farve+"'>"+farveformpris[i].farve+" ------- Elemetets pris: <font color='"+farveformpris[i].farve+"'>"+farveformpris[i].pris+"<br>";
	}
	document.getElementById("sorteringen").innerHTML = indsæt; // Indsætter indsæt variablen i HTML - på hjemmesiden
}
lav_html(listen);

// Opgave 2
// Liste over farver og former
var farver = ["salmon","tomato","deeppink","coral","peachpuff","rebeccapurple","indigo","steelblue","olive","peru","sienna","mistyrose","gainsboro","navajowhite","bisque"];
var former = ["bordform","husform","raketform","flyform","bilform","pæreform","firkant","kaninform","thekandeform","platonform","trekant","træform","cirkel","turingform","skeform"];

// Sorter efter former
function sorterform () {
	var ny_form = "";
	 for(var i = 0; i < listen.length; i++) {
		for(var j = 0; j < listen.length; j++) {
			if(former[i] == listen[j].form) {
				ny_form += "<br><font color='"+listen[j].farve+"'> Form: "+listen[j].form+" ------- Farve: <font color='"+listen[j].farve+"'>"+listen[j].farve+" ------ Pris: <font color='"+listen[j].farve+"'>"+listen[j].pris+"<br><br>";

			}
		}
	}
	document.getElementById("sorteringen").innerHTML = ny_form;
}

// Sorter efter farve
function sorterfarve () {
	var ny_farve = "";
	 for(var i = 0; i < listen.length; i++) {
		for(var j = 0; j < listen.length; j++) {
			if(farver[i] == listen[j].farve) {
				ny_farve += "<br><font color='"+listen[j].farve+"'> Form: "+listen[j].form+" ------- Farve: <font color='"+listen[j].farve+"'>"+listen[j].farve+" ------- Pris: <font color='"+listen[j].farve+"'>"+listen[j].pris+"<br><br>";
			}
		}
	}
	document.getElementById("sorteringen").innerHTML = ny_farve;
}

// Sorter efter pris med bubblesort algoritme
function pris_i_liste () {
	for(var i = 0; i < listen.length; i++) {
		prisliste.push(listen[i].pris);
	}
}

// Bubblesort algoritme 
function sortering_af_prisliste (prisliste) { 
	var færdig_sortering = false;
	while (!færdig_sortering) {
		færdig_sortering = true;
		for(var i = 1; i < prisliste.length; i++) {
			if(prisliste[i - 1] > prisliste[i]) {
				færdig_sortering = false;
				var midlertidig = prisliste[i - 1];
				prisliste[i - 1] = prisliste[i];
				prisliste[i] = midlertidig;
			}
		}
	}
}

function sorterpris () {
	pris_i_liste();
	sortering_af_prisliste(prisliste);
	var ny_pris = "";
	for(var i = 0; i < listen.length; i++) {
		for(var j = 0; j < listen.length; j++) {
			if(prisliste[i] == listen[j].pris) {
				ny_pris += "<br><font color='"+listen[j].farve+"'> Form: "+listen[j].form+" ------- Farve: <font color='"+listen[j].farve+"'>"+listen[j].farve+" ------- Pris: <font color='"+listen[j].farve+"'>"+listen[j].pris+"<br><br>";
			}
		}
	}
	document.getElementById("sorteringen").innerHTML = ny_pris;
}
