require( "./secretary.css" );





var angular 		= require( "angular"),
    angularMaterial	= require( "angular-material" );
  
require( "angular-material/angular-material.css" );

var modAng =    angular.module( "cabinet", [ angularMaterial, 'ngMaterial' ] )
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default');
});

//var modAngMap =    angular.module( "cabinet", ['google-map'] )
//.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
//	uiGmapGoogleMapApiProvider.configure({
//		key: "AIzaSyDE084V7ig2XsFiFpcamrhewrhOjwLwnjw", //Clé pour utiliser l'API
//		v: '3.17', //Par défaut la version la plus récente disponible
//		libraries: 'geometry,visualization' //Librairies supplémentaires
//	});
//}]) ;

require( "./cabinetMedical/cabinetMedical.js" )(modAng);

