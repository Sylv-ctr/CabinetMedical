var proxyNF = function($http) {
	// Ajoutez le code de construction du service
    //construit un objet qui va être instancié dans le controlleur
	// Cette fonction sera appelée pour instancier un objet service ...
	// Utilisez $http pour télécharger la base de données
    //this.getData() = function(){return $http.get( ci dessous )....
    this.getData = function(src){
        return $http.get(src).then(processData);
    }


function processData(resp){
    
    //déclare notre objet principal qui contiendra nos données
    var cabinetJS = {patientNonAffectes : [], infirmiers : {}, patients : [] };
    
    //recupère les données du fichier XML
    var parser = new DOMParser();
    var doc = parser.parseFromString(resp.data, "text/xml");
    var infirmiersXML = doc.querySelectorAll("infirmier");
    var infirmierXML , i , infirmier;
    for(i=0; i<infirmiersXML.length ; i++) {  //voir avec foreach
        infirmierXML = infirmiersXML[i];
        var id = infirmierXML.getAttribute('id');
        infirmier = {   id : id,
                        name : infirmierXML.querySelector("nom").textContent,
                        forname : infirmierXML.querySelector("prenom").textContent,
                        photo : infirmierXML.querySelector("photo").textContent,
                        patients : [] 
                    };
        cabinetJS.infirmiers[id] = infirmier;
    }
    //essayer d'ajouter le champs infirmier en charge : recupere le nom de l'infirmier associé à l'id intervenant
    var patientsXML, patientXML, patient;
    patientsXML = doc.querySelectorAll("patient");
    for(i=0 ; i<patientsXML.length ; i++) {
        patientXML = patientsXML[i];
        patient =   {   name : patientXML.querySelector("nom").textContent,
                        forname : patientXML.querySelector("prenom").textContent,
                        sex : patientXML.querySelector("sexe").textContent,
                        birthday : patientXML.querySelector("naissance").textContent,
                        numero : patientXML.querySelector("numero").textContent, 
                        adress: {   numero : patientXML.querySelector("adresse > numero").textContent,
                                    street : patientXML.querySelector("adresse > rue").textContent,
                                    city : patientXML.querySelector("adresse > ville").textContent,
                                    postalCode : patientXML.querySelector("adresse > codePostal").textContent
                                }
                    };
        //pour chaque patient on l'injecte dans notre tableau de patient.
        cabinetJS.patients.push(patient);
        //patient affecté ou non => ajout dans le tableau des patients non affectés
        var visite = patientXML.querySelector("visite[intervenant]");
        if(visite===null){
            cabinetJS.patientNonAffectes.push(patient);
        } else {
            id = visite.getAttribute("intervenant");
            cabinetJS.infirmiers[id].patients.push(patient);
            
        }
    }
    
return cabinetJS;
    

    
    
    
}
    // Ajoute dans la BDD un nouveau patient via la fonction du serveur /addPatient
	this.ajouterNouveauPatient = function(nouveauPatient){
        return $http({
            method: 'POST',
            url: "/addPatient",
            data: nouveauPatient,
            header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            // success callback
            function(response){
                console.log("NF.js => Patient ajouté");
                },
            // error callback
            function(response){
                console.log("NF.js => Erreur : nouveau patient non ajouté");
                }
            );
        };
    
     // Supprime un patient de la BDD selon son numero de secu
    this.supprimerPatient = function(numeroSS) {
        //console.log("traitement NF");
        //console.log(numeroSS);
    	return $http({
    		method: 'POST',
    		url: "/delPatient",
    		data: numeroSS,
    		header: {'Content-Type': "application/json"}
    	}).then(
    		function(response){
    			console.log("NF.js => Patient supprimé");
    		},
    		function(response){
    			console.log("NF.js => Erreur : patient non supprimé");
    		}
    	);
    };
    
    // Affecte un patient à un infirmier
	this.affecterPatient = function(patientAff){
        //console.log("affecte NF");
        //console.log(patientAff);
        return $http({
            method: 'POST',
            url: "/affectation",
            data: patientAff,
            header: {'Content-Type': "application/json"}
        }).then(
            // success callback
            function(response){
                console.log("NF.js => Patient affecté");
                },
            // error callback
            function(response){
                console.log("NF.js => Erreur : patient non affecté");
                }
            );
        };
    
    // Desaffecte un patient de son infirmier
	this.desaffecterPatient = function(patientDesaff){
        //console.log("desaffecte NF");
        //console.log(patientDesaff);
        return $http({
            method: 'POST',
            url: "/desaffecter",
            data: patientDesaff,
            header: {'Content-Type': "application/json"}
        }).then(
            // success callback
            function(response){
                console.log("NF.js => Patient désaffecté");
                },
            // error callback
            function(response){
                console.log("NF.js => Erreur : patient non désaffecté");
                }
            );
        };
    
    
};



proxyNF.$inject = [ "$http" ]; // Injection de dépendances


module.exports = function(moduleAngular) {
	var idService = "proxyNF";
	moduleAngular.service(idService, proxyNF);
};
