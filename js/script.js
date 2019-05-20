var aktuellesPorto;
var briefmarken = [0.01, 0.02, 0.05, 0.10, 0.20, 0.45, 0.70, 1, 1.45]
var moeglichkeiten = [];
var neuesPorto = [];

function output(){
	var output = '';
	for(var i = 0; moeglichkeiten.length > i; i++){
		var adden = '';
		moeglichkeiten[i].forEach(function(item2, index, array) {
			adden += '1x ' + item2 + ' ';
		});
		output += '<p>' + adden + '</p>';
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

function main(){
	moeglichkeiten = [];
	console.log('aktuelles Porto beträgt: ' + aktuellesPorto);
	console.log('aktuell zur Verfügung stehende Briefmarken: ' + briefmarken);
	glattTeilbar();
	algorithmus();
	algorithmus();
	algorithmus();
	//console.log(moeglichkeiten);
	output();
	clear();
}

function clear(){
	aktuellesPorto = null;
	aktuelleBriefmarke = null;
	neuneuesPorto = null;
}

function fakultaet(n){
    if ( n<=1 ) {
        return n;
    }
    return n * fakultaet( n - 1 );
}