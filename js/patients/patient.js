var template = require( "./patient.html" )
var templateForm = require( "./formulairePatient.html" )
var templateNonAff = require( "./patientNonAff.html" )
module.exports = function(moduleAngular) {
    require( "./patient.css" );
    var proxyNF = require( "../NF.js" )(moduleAngular);
    var ctrlPatient = function ( $http, proxyNF ){
        console.log( "on a une nouvelle instance de patient" );
        var ctrl=this;
        
        
        //mise à jour des donénes du controller
        this.majData = function() {
            proxyNF.getData("data/cabinetInfirmier.xml").then(function(cabinetMedicalJS) {
            ctrl.data = cabinetMedicalJS;
            console.log("patient.js => mise à jour des données");
            });
        };
        
        //définition de l'objet nouveau patient
        ctrl.nouveauPatient = {
            "patientName"       : "",
            "patientForname"	: "",
			"patientNumber"	    : "",
            "patientSex"		: "",
            "patientBirthday"   : "",
            "patientStreetNumber"  	: "",
            "patientStreet" 	: "",
            "patientPostalCode" : "",
            "patientCity"	    : ""
        };
        
        // Affichage formulaire -----------------
        ctrl.formulaire = false;
        
        ctrl.showFormulaire= function(){
            if (ctrl.formulaire==true){
                ctrl.formulaire = false;
            }
            else {
                ctrl.formulaire = true;
            }
            console.log(ctrl.formulaire);
         }
        
        // Supprimer un patient
        this.supprimerPatient = function(numeroSS) {
            var numeroSecu = {
                'patientNumber': numeroSS
            };
            //fait appel à la fonction du noyau fonctionnel /delPatient
            proxyNF.supprimerPatient(numeroSecu).then( function(){
                    ctrl.majData();
                });
        };

        //définition de l'objet sexe
        ctrl.sexe   = [
            {sexe: 'M'},
            {sexe: 'F'}
        ];
        
        //définition du patient à affecter
        ctrl.patientAff = {
            "patient"   : "",   //numero sécu du patient
            "infirmier" : ""    //id infirmier
        };
        
        
        
          // Affecter un patient à un infirmier
        this.affecterPatient = function(patient){
            ctrl.patientAff.patient = patient;
            console.log(ctrl.patientAff);
            proxyNF.affecterPatient(ctrl.patientAff).then(function(){
                    ctrl.majData();
                });
            };
        
        
        
        ctrl.check = false;
        
        //créer un nouveau patient et test si on l'affecte lors de la création
        ctrl.ajouterPatient = function(){
            console.log("test add patient");
            console.log(ctrl.nouveauPatient);
            proxyNF.ajouterNouveauPatient(ctrl.nouveauPatient).then(
                function(){
                    console.log("test affectation apres ajout");
                    if(ctrl.check==true && ctrl.patientAff.infirmier!=""){
                        ctrl.affecterPatient(ctrl.nouveauPatient.patientNumber);
                    }
                }
                );
            
        };
    };//fin controller

         // Construire une balise <patient non affs>
        moduleAngular.component("patientNonAff", {
            template    : templateNonAff,
            bindings    : { data : "<" },
            controller  : ctrlPatient
        });
        
    
        // Construire une balise <patiernt>
        moduleAngular.component("patient", {
            template    : template,
            bindings    : { data : "<" },
            controller  : ctrlPatient
        });
        
        moduleAngular.component("formPatient", {
        controller  : ctrlPatient,
        template    : templateForm,
        bindings    : {
            onValidation : "&",
            data : "<"}
        });


    
    
};
    
