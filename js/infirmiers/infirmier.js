
var template = require( "./infirmier.html" )




module.exports = function(moduleAngular) {
require( "./infirmier.css" )
var proxyNF = require( "../NF.js" )(moduleAngular);
var ctrlInfirmier = function (proxyNF){
    //console.log( "on a une nouvelle instance de infirmier" );
    var ctrl=this;
    
    
    //créer methodes pour affectert patient à l'infirmier et ce servir du proxyNF
    
     ctrl.patientDesaff = {
            "patient"   : ""
    };
    
    this.majData = function() {
            proxyNF.getData("data/cabinetInfirmier.xml").then(function(cabinetMedicalJS) {
            ctrl.data = cabinetMedicalJS;
            console.log("CabinetMedical.js => mise à jour des données");
            });
        };
    
        // Désaffecter un patient d'un infirmier
        this.desaffecterPatient = function(patient){
            ctrl.patientDesaff.patient = patient;
            console.log(ctrl.patientDesaff);
            //appelle la fonction dessafecter du noyau fonctionnel
            //avec en parametre le numero de sécu de notre patient
            proxyNF.desaffecterPatient(ctrl.patientDesaff).then(function(){ 
                ctrl.majData(); //mise à jour des données dans le controlleur infirmier
            },
                // success callback
                function(response){
                    console.log("infirmier.JS => Patient ajouté");
                    },
                // error callback
                function(response){
                    console.log("infirmier.js => Erreur : nouveau patient non ajouté");
                    }
                );
               
            };
    
};//fin controlleur
    
    // Construire une balise <infirmier>
    moduleAngular.component("infirmier", {
        controller  : ctrlInfirmier,
        template    : template,
        bindings    : {data : "<"}
    });
    
    

    
};