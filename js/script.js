var aktuellesPorto;
var briefmarken = [0.01, 0.02, 0.05, 0.10, 0.20, 0.45, 0.70, 1, 1.45]
var moeglichkeiten = [];
var neuesPorto = [];
var anzahlBriefmarken;

function output(){
	var output = '';
	for(var i = 0; moeglichkeiten.length > i; i++){
		var adden = '';
		moeglichkeiten[i].forEach(function(item2, index, array) {
			adden += '<div class="col-sm briefmarke">' + item2 + ' € </div>';
		});
		output += '<div class="container"><div class="row">' + adden + '</div></div>';
	};
	document.getElementById('displayAktuelleAuswahl').innerHTML=output;
}

function glattTeilbar(){
	neuesPorto = [];
	for (var i = 0; i < briefmarken.length; i++){
		var differenz = Math.round((aktuellesPorto - briefmarken[i])*100)/100;
		if(differenz==0){
			//console.log('Es wurde eine optimale Lösung gefunden: ' + briefmarken[i])
			moeglichkeiten.push([briefmarken[i]]);
		}
		else{
			neuesPorto.push([differenz, [briefmarken[i]]]);
		}
	}
	//console.log(neuesPorto);
	
}

function algorithmus(){
	var neuneuesPorto = [];
	for (var i = 0; i < neuesPorto.length; i++){
		for (var j = 0; j < briefmarken.length; j++){
			var differenz = Math.round((neuesPorto[i][0] - briefmarken[j])*100)/100;
			if(differenz<0){}
			else{
				var aktuelleBriefmarke = briefmarken[j];
				var vorherigeBriefmarken = neuesPorto[i][1];
				var dieseBriefmarken = [];
				for (var k = 0; k < vorherigeBriefmarken.length; k++){
					dieseBriefmarken.push(vorherigeBriefmarken[k]);
				}
				dieseBriefmarken.push(aktuelleBriefmarke);
				if(differenz==0){
					//console.log('Es wurde eine optimale Lösung gefunden: ' + dieseBriefmarken);
					moeglichkeiten.push(dieseBriefmarken);
				}
				else {
					neuneuesPorto.push ([differenz, dieseBriefmarken]);
				}
			}
		}
	}
	neuesPorto = neuneuesPorto;
	//console.log(neuesPorto);
}

function moeglichkeitenUeberpruefen(){
	var ueberpruefteMoeglichkeiten = [];
	console.log('Möglichkeiten werden überprüft ...');
	console.log(moeglichkeiten);
	ueberpruefteMoeglichkeiten.push(moeglichkeiten[0]);
	for(var i = 0; i < moeglichkeiten.length-1; i++){//geht jede mögliche kombination durch
		var identisch = false;
		for (var k = i; k > (-1); k--){
			//console.log("i = " + i + "; k = " + k)
			var uebereinstimmend = 0;
			for(var j = 0; j < moeglichkeiten[i+1].length; j++){//geht jede Briefmarke der Kombination durch
				var found = moeglichkeiten[k].find(function(element){
					return element == moeglichkeiten[i+1][j];
				});
				//console.log(found);
				if(found !== undefined){
					uebereinstimmend++;
				}
			}
			if(uebereinstimmend==moeglichkeiten[i+1].length){
				//console.log('Array ist identisch');
				identisch = true
			}	
		}
		if (identisch==true){}
		else{
			//console.log('Array ist nicht identisch');
			ueberpruefteMoeglichkeiten.push(moeglichkeiten[i+1])
		}
	}	
	console.log('Überprüfung abgeschlossen ...');
	console.log(ueberpruefteMoeglichkeiten);
	return(ueberpruefteMoeglichkeiten);
}

function aufbereiten(){
	for (var i = 0; i < moeglichkeiten.length; i++){
		moeglichkeiten[i].sort(numSort);
	}
}

function main(){
	moeglichkeiten = [];
	console.log('aktuelles Porto beträgt: ' + aktuellesPorto);
	console.log('aktuell zur Verfügung stehende Briefmarken: ' + briefmarken);
	console.log('Stückelung in ' + anzahlBriefmarken + " Briefmarken")
	glattTeilbar();
	for(var m = 0; m < anzahlBriefmarken - 1; m++){
		algorithmus();
	}
	moeglichkeiten=moeglichkeitenUeberpruefen();
	//console.log(moeglichkeiten);
	aufbereiten();
	output();
	clear();
}

function numSort(a, b) {
	return (b - a);
}

function clear(){
	aktuelleBriefmarke = null;
	neuneuesPorto = null;
}

function fakultaet(n){
    if ( n<=1 ) {
        return n;
    }
    return n * fakultaet( n - 1 );
}