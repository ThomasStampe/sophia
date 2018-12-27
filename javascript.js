// Globale variable
var antal_programkonstruktioner = [];
var program_og_analyse = [];
var tekst = "";
var sideskift = 0;
var sideskift2 = 0;
var kunstige_blanktegn_global = 0;

// Hjælpefunktion
function hentTekst () {
	var hent_tekst = document.getElementById("textareainput").value;
	var tekst_mellemrum = "";
	var kunstige_blanktegn = 0;
	for(var i = 0;i<hent_tekst.length;i++) {
		if(hent_tekst[i-1] === "<" && hent_tekst[i] !== " ") {
		tekst_mellemrum += " "+hent_tekst[i];
		kunstige_blanktegn = kunstige_blanktegn + 1;
	} else {
		tekst_mellemrum += hent_tekst[i];
	}
	}
	return tekst = tekst_mellemrum,kunstige_blanktegn_global = kunstige_blanktegn;
}

// Opgave 2 - Ansvarlig: Mads, Mickey, Thomas

function taelRedunt() {
	hentTekst();
	var n = 0;
	var t = 0;
	var redundanttegn = 0;
	var boolsk_og = 0;
	var boolsk_eller = 0;
	var optael = tekst.length;
	for (var i = 0; i < tekst.length; i++) {
		if (tekst[i] === "\n") {
			n = n + 1;
		} else if (tekst[i] == "\t") {
			t = t + 1;
		}
		if ((tekst[i] === "\n" || tekst[i] === "\t" || tekst[i] === " ") && (tekst[i+1] ==="\n" || tekst[i+1] === " " || tekst[i+1] === "\t")) {
			redundanttegn = redundanttegn +1;
		} else if (tekst[i] === "&" && tekst[i+1] === "&") {
			boolsk_og = boolsk_og + 1;
		} else if (tekst[i] === "|" && tekst[i+1] === "|") {
			boolsk_eller = boolsk_eller + 1;

		}
	}
	var relevant = optael - (redundanttegn + fjernkommentar() + kunstige_blanktegn_global); // dette er kode fra opgave 4
	program_og_analyse.push(new gemProgramOgAnalyse(tekst,relevant,n,t,redundanttegn,boolsk_og,boolsk_eller));
	document.getElementById("output").innerHTML = "Der er: <ul><li>"+relevant+" programrelevante tegn</li><li>"+redundanttegn+" redundante blanktegn</li><li>"+n+" linjeskift</li><li>"+t+" indryk</li><li>"+boolsk_og+" boolsk &&</li><li>"+boolsk_eller+" boolsk eller</li></ul>";
}

// Opgave 3.2 - Ansvarlig: Mickey

function tilfoejLinjeNumre () {
hentTekst();
	var hel_tekst = "";
	var liste_beholder2 = [];
	var liste_tekst = "";
	for(var i = 0; i<tekst.length;i++) {
		hel_tekst += tekst[i];
	}
	var liste_beholder1 = hel_tekst.split("\n");
	for(var k = 0; k<liste_beholder1.length;k++) {
		liste_beholder2.push('<span class = "linjenr">'+[k+1]+':</span> '+liste_beholder1[k]);
	}
	for(var j = 0;j <liste_beholder2.length;j++) {
		liste_tekst += liste_beholder2[j]+"\n";
	}
	document.getElementById("output").innerHTML = liste_tekst;
}

// Opgave 4 - Ansvarlig: Mads, Mickey, Thomas

function fjernkommentar () {
	var liste_kommentar1 = [];
	var liste_kommentar2 = [];
	var liste_kommentar3 = [];
	var liste_kommentar4 = [];
	var sum1 = 0;
	var sum2 = 0;

	for(var i = 0;i<tekst.length;i++) {	
		if(tekst[i] === "/" && tekst[i+1] === "/") {
			liste_kommentar1.push(i);
		}
		if (tekst[i] === "\n" && tekst[i-1] != ";" && tekst[i-1] != " " && tekst[i-1] != "{" && tekst[i-1] != "}" && tekst[i-1] != "\n") {
			liste_kommentar2.push(i);
		}
		if (tekst[i] === "/" && tekst[i+1] === "*") {
			liste_kommentar3.push(i);
		} else if (tekst[i] === "*" && tekst[i+1] === "/") {
			liste_kommentar4.push(i+2);
		}
	}
	for(var j = 0;j<liste_kommentar1.length;j++) {
		sum1 += liste_kommentar2[j]-liste_kommentar1[j];

	}
	for(var k = 0; k<liste_kommentar4.length;k++) {
		sum2 += liste_kommentar4[k]-liste_kommentar3[k];
	}
	return (sum1+sum2);
}

// Opgave 5 - Ansvarlig: Mads
function lavObjektKode (v,funk,assm,ei,r,fl) {
	this.vr = v;
	this.funktion = funk;
	this.if = assm;
	this.elseif = ei;
	this.retur = r;
	this.forloop = fl;
}

function gemProgramKode () {
	hentTekst();
	var tael_v = 0;
	var tael_f = 0;
	var tael_i = 0;
	var tael_ef = 0;
	var tael_r = 0;
	var tael_fl = 0;

	for(var i = 0;i<tekst.length;i++) {
		if(tekst[i] === "v" && tekst[i+1] === "a" && tekst[i+2] === "r" && tekst[i+3] === " ") {
			tael_v++;
		} else if (tekst[i] === "f" && tekst[i+1] === "u" && tekst[i+2] === "n" && tekst[i+3] === "c" && tekst[i+4] === "t" && tekst[i+5] === "i" && tekst[i+6] === "o" && tekst[i+7] === "n" && tekst[i+8] === " ") {
			tael_f++; 
		} else if ( tekst[i-2] != "e" && tekst[i] === "i" && tekst[i+1] === "f" && (tekst[i+2] === " " && tekst[i+3] === "(" || tekst[i+2] === "(")  ) {
			tael_i++;
		} else if (tekst[i] === "e" && tekst[i+1] === "l" && tekst[i+2] === "s" && tekst[i+3] === "e" && tekst[i+4] === " " && tekst[i+5] === "i" && tekst[i+6] === "f" && (tekst[i+7] === " " && tekst[i+8] === "(" || tekst[i+7] === "(" )) {
			tael_ef++;
		} else if (tekst[i] === "r" && tekst[i+1] === "e" && tekst[i+2] === "t" && tekst[i+3] === "u" && tekst[i+4] === "r" && tekst[i+5] === "n" && (tekst[i+6] === " " || tekst[i+6] === "(")) {
			tael_r++;
		} else if (tekst[i] === "f" && tekst[i+1] === "o" && tekst[i+2] === "r" && (tekst[i+3] === " " && tekst[i+4] === "(" || tekst[i+3] === "(")) {
			tael_fl++;
		}
	}  
	antal_programkonstruktioner.push(new lavObjektKode(tael_v,tael_f,tael_i,tael_ef,tael_r,tael_fl));
	document.getElementById("output").innerHTML = "Der er: <ul><li>"+tael_v+" Variable erklæringer</li><li>"+tael_fl+" For-løkker</li><li>"+tael_r+" Returns</li><li>"+tael_f+" Funktionserklæringer</li><li>"+tael_i+" If-sætninger</li><li>"+tael_ef+" Else if-sætninger</li></ul>";
}

// Opgave 6 - Ansvarlig: Kode

function farvkonstruktioner () {
	hentTekst();
	var liste_markeret_tekst = "";
	for(var i = 0;i<tekst.length;i++) {
		if(tekst[i] === "v" && tekst[i+1] === "a" && tekst[i+2] === "r" && tekst[i+3] === " ") {
			liste_markeret_tekst += '<span id = "farv_v" >'+tekst[i]+tekst[i+1]+tekst[i+2]+'</span> ';
			i = i + 3;
		} else if(tekst[i-2] != "e" && tekst[i] === "i" && tekst[i+1] === "f" && (tekst[i+2] === " " && tekst[i+3] === "(" || tekst[i+2] === "(")) {
			liste_markeret_tekst += '<span id = "farv_i" >'+tekst[i]+tekst[i+1]+'</span>';
			i = i + 1;
		} else if(tekst[i] === "f" && tekst[i+1] === "u" && tekst[i+2] === "n" && tekst[i+3] === "c" && tekst[i+4] === "t" && tekst[i+5] === "i" && tekst[i+6] === "o" && tekst[i+7] === "n" && tekst[i+8] === " ") {
			liste_markeret_tekst += '<span id = "farv_func">'+tekst[i]+tekst[i+1]+tekst[i+2]+tekst[i+3]+tekst[i+4]+tekst[i+5]+tekst[i+6]+tekst[i+7]+'</span>';
			i = i + 7;
		} else if (tekst[i] === "e" && tekst[i+1] === "l" && tekst[i+2] === "s" && tekst[i+3] === "e" && tekst[i+4] === " " && tekst[i+5] === "i" && tekst[i+6] === "f" && (tekst[i+7] === " " && tekst[i+8] === "(" || tekst[i+7] === "(" )) {
			liste_markeret_tekst += '<span id = "farv_ef">'+tekst[i]+tekst[i+1]+tekst[i+2]+tekst[i+3]+tekst[i+4]+tekst[i+5]+tekst[i+6]+'</span>';
			i = i + 6;
		} else if (tekst[i] === "r" && tekst[i+1] === "e" && tekst[i+2] === "t" && tekst[i+3] === "u" && tekst[i+4] === "r" && tekst[i+5] === "n" && (tekst[i+6] === " " || tekst[i+6] === "(")) {
			liste_markeret_tekst += '<span id = "farv_r">'+tekst[i]+tekst[i+1]+tekst[i+2]+tekst[i+3]+tekst[i+4]+tekst[i+5]+'</span>';
			i = i + 5;
		} else if (tekst[i] === "f" && tekst[i+1] === "o" && tekst[i+2] === "r" && (tekst[i+3] === " " && tekst[i+4] === "(" || tekst[i+3] === "(")) {
			liste_markeret_tekst += '<span id = "farv_fl">'+tekst[i]+tekst[i+1]+tekst[i+2]+'</span>';
			i = i + 2;
		} else if (tekst[i] === "&" && tekst[i+1] === "&") {
			liste_markeret_tekst += '<span id = "farv_og">'+tekst[i]+tekst[i+1]+'</span>';
			i = i + 1;
		} else if (tekst[i] === "|" && tekst[i+1] === "|") {
			liste_markeret_tekst += '<span id = "farv_eller">'+tekst[i]+tekst[i+1]+'</span>';
			i = i + 1;
		} else {
			liste_markeret_tekst+= tekst[i];
		}
	}
	document.getElementById("output").innerHTML = liste_markeret_tekst;
}

// Opgave 7 - Ansvarlig: Thomas

function gemProgramOgAnalyse (prog,programrele,linje,ind,red,og,eller) {
	this.programkode = prog;
	this.programrelevant = programrele;
	this.linjeskift = linje;
	this.indryk = ind;
	this.redundant = red;
	this.boolsk_og = og;
	this.boolsk_eller = eller;
	return this;
}

// Opgave 7.2 - Ansvarlig: Thomas

function visSeneste() {
	if(program_og_analyse.length === 0) {
		alert("Du har ikke indtastet nogen kode");
	} else if(program_og_analyse.length < 2) {
		alert("Koden du har indtastet er den seneste");
	} else {
	document.getElementById("visprogramkode").innerHTML = program_og_analyse[program_og_analyse.length-2].programkode;
	document.getElementById("visprogramanalyse").innerHTML = "Der er: <ul><li>"+program_og_analyse[program_og_analyse.length-2].programrelevant+" programrelevante tegn</li><li>"+program_og_analyse[program_og_analyse.length-2].redundant+" redundante tegn</li><li>"+program_og_analyse[program_og_analyse.length-2].linjeskift+" linjeskift</li><li>"+program_og_analyse[program_og_analyse.length-2].indryk+" indryk</li><li>"+program_og_analyse[program_og_analyse.length-2].boolsk_og+" sandhedsoperatorer og</li><li>"+program_og_analyse[program_og_analyse.length-2].boolsk_eller+" sandhedsoperatorer eller</li></ul>";
	}
}

// Opgave 8 - Ansvarlig: Thomas

function naeste () {
	sideskift = sideskift + 1;
	if (sideskift === program_og_analyse.length) {
		sideskift = 0;
	}
	document.getElementById("visprogramkode").innerHTML = program_og_analyse[sideskift].programkode;
	document.getElementById("visprogramanalyse").innerHTML = "Der er: <ul><li>"+program_og_analyse[sideskift].programrelevant+" programrelevante tegn</li><li>"+program_og_analyse[sideskift].redundant+" redundante tegn</li><li>"+program_og_analyse[sideskift].linjeskift+" linjeskift</li><li>"+program_og_analyse[sideskift].indryk+" indryk</li><li>"+program_og_analyse[sideskift].boolsk_og+" sandhedsoperatorer og</li><li>"+program_og_analyse[sideskift].boolsk_eller+" sandhedsoperatorer eller</li></ul>";
}

function forrige () {
		sideskift = sideskift - 1;
	if (sideskift < 0) {
		sideskift = program_og_analyse.length - 1;
	}
	document.getElementById("visprogramkode").innerHTML = program_og_analyse[sideskift].programkode;
	document.getElementById("visprogramanalyse").innerHTML = "Der er: <ul><li>"+program_og_analyse[sideskift].programrelevant+" programrelevante tegn</li><li>"+program_og_analyse[sideskift].redundant+" redundante tegn</li><li>"+program_og_analyse[sideskift].linjeskift+" linjeskift</li><li>"+program_og_analyse[sideskift].indryk+" indryk</li><li>"+program_og_analyse[sideskift].boolsk_og+" sandhedsoperatorer og</li><li>"+program_og_analyse[sideskift].boolsk_eller+" sandhedsoperatorer eller</li></ul>";
}

// Opgave 9 - Ansvarlig: Mickey

function naeste2 () {
	sideskift2 = sideskift2 + 1;
	if (sideskift2 === program_og_analyse.length) {
		sideskift2 = 0;
	}
	document.getElementById("sammenlign1").innerHTML = program_og_analyse[sideskift2].programkode;
	document.getElementById("sammenlign2").innerHTML = "Der er: <ul><li>"+program_og_analyse[sideskift2].programrelevant+" programrelevante tegn</li><li>"+program_og_analyse[sideskift2].redundant+" redundante tegn</li><li>"+program_og_analyse[sideskift2].linjeskift+" linjeskift</li><li>"+program_og_analyse[sideskift2].indryk+" indryk</li><li>"+program_og_analyse[sideskift2].boolsk_og+" sandhedsoperatorer og</li><li>"+program_og_analyse[sideskift2].boolsk_eller+" sandhedsoperatorer eller</li></ul>";
}

function forrige2 () {
	sideskift2 = sideskift2 - 1;
	if (sideskift2 < 0) {
		sideskift2 = program_og_analyse.length - 1;
	}
	document.getElementById("sammenlign1").innerHTML = program_og_analyse[sideskift2].programkode;
	document.getElementById("sammenlign2").innerHTML = "Der er: <ul><li>"+program_og_analyse[sideskift2].programrelevant+" programrelevante tegn</li><li>"+program_og_analyse[sideskift2].redundant+" redundante tegn</li><li>"+program_og_analyse[sideskift2].linjeskift+" linjeskift</li><li>"+program_og_analyse[sideskift2].indryk+" indryk</li><li>"+program_og_analyse[sideskift2].boolsk_og+" sandhedsoperatorer og</li><li>"+program_og_analyse[sideskift2].boolsk_eller+" sandhedsoperatorer eller</li></ul>";
}

function visSammenfald () {
	var sammenlign1 = [program_og_analyse[sideskift].programrelevant,program_og_analyse[sideskift].redundant,program_og_analyse[sideskift].linjeskift,program_og_analyse[sideskift].indryk,program_og_analyse[sideskift].boolsk_og,program_og_analyse[sideskift].boolsk_eller];
	var sammenlign2 = [program_og_analyse[sideskift2].programrelevant,program_og_analyse[sideskift2].redundant,program_og_analyse[sideskift2].linjeskift,program_og_analyse[sideskift2].indryk,program_og_analyse[sideskift2].boolsk_og,program_og_analyse[sideskift2].boolsk_eller];

	var sammenfald = [];
	for(var i=0;i<sammenlign1.length;i++) {
		sammenfald.push(sammenlign1[i]/sammenlign2[i]*100);
	}
	document.getElementById("res1").innerHTML = "Programrelevant: <br>"+sammenfald[0].toFixed(2)+" %"; // https://www.w3schools.com/jsref/jsref_tofixed.asp 
	document.getElementById("res2").innerHTML = "Redundante: <br>"+sammenfald[1].toFixed(2)+" %"; // https://www.w3schools.com/jsref/jsref_tofixed.asp
	document.getElementById("res3").innerHTML = "Linjeskift: <br>"+sammenfald[2].toFixed(2)+" %"; // https://www.w3schools.com/jsref/jsref_tofixed.asp	
	document.getElementById("res4").innerHTML = "Indryk: <br>"+sammenfald[3].toFixed(2)+" %"; // https://www.w3schools.com/jsref/jsref_tofixed.asp
	document.getElementById("res5").innerHTML = "Boolsk &&: <br>"+sammenfald[4].toFixed(2)+" %"; // https://www.w3schools.com/jsref/jsref_tofixed.asp
	document.getElementById("res6").innerHTML = "Boolsk ||: <br>"+sammenfald[5].toFixed(2)+" %"; // https://www.w3schools.com/jsref/jsref_tofixed.asp
}

// Opgave 10 - Ansvarlig: Mads
function lavIndryk () {
hentTekst();
	var antalT = 0;
	var nytekst = "";
	for(var i = 0; i<tekst.length;i++) {
		if(tekst[i] === "{") {
			antalT = antalT + 1;
			nytekst += tekst[i];
		} else if (tekst[i] === "}") {
			antalT = antalT - 1;
			nytekst += "\t".repeat(antalT)+tekst[i]; // https://www.w3schools.com/jsref/jsref_repeat.asp: Repeat funktionen virker således, at den gentager en string eller et number x antal gange
		} else if (tekst[i-1] === "\n") {
			nytekst += "\t".repeat(antalT)+tekst[i]; // https://www.w3schools.com/jsref/jsref_repeat.asp
		} else {
			nytekst += tekst[i];
		}
	}
	document.getElementById("output").innerHTML = nytekst;
}





