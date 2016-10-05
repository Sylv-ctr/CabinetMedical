var template = require( "./cabinetMedical.html" );
require( "./cabinetMedical.css" );

module.exports = function(moduleAngular) {
    
	var proxyNF = require( "../NF.js" )(moduleAngular);
    
	var controller = function( proxyNF ) {
        //console.log( "on a une nouvelle instance de cabinetMedical" );
        
        var ctrl = this;
        proxyNF.getData(this.src).then( function(cabinetMedicalJS){
            ctrl.data = cabinetMedicalJS;
            console.log(ctrl.data);
        });
        
        
        
       
        
        // Mettres à jour les données de notre cabinet
        //fonction appelée sur le changement de Tab par exemple
        this.majData = function() {
            proxyNF.getData(this.src).then( function(cabinetMedicalJS) {
            ctrl.data = cabinetMedicalJS;
            //console.log("CabinetMedical.js => mise à jour des données");
            });
        };
        
        
        
        
        
    //fin controlleur
	};
    
    
    //require pour pourvoir utiliser les composants de ses fichiers dans notre controller et le fichier html associé
    require( "../infirmiers/infirmier.js" )(moduleAngular);
    require( "../patients/patient.js" )(moduleAngular);
	//controller.$inject = [ 'proxyNF' ]; // Injection de dépendances ou services que va utiliser la fonction controller

	moduleAngular.component( "cabinetMedical", {
		template	: template,
        controller	: controller,
		bindings	: {
            src     : "@",
			titre	: "@"
		}		
	});
};