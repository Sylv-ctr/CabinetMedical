require( "./secretary.css" );
//prétraitement
var utils = require("./utils.js");
var cabinetJS = {patientNonAffectes : [], infirmiers : {} };
utils.XHR('GET', 'data/cabinetInfirmier.xml').then(function(xhr) {console.log(xhr);
        var parser = new DOMParser();
        var doc = parser.parseFromString(xhr.responseText, "text/xml");
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
        //Traitement
        var patientsXML, patientXML, patient;
        patientsXML = doc.querySelectorAll("patient");
        for(i=0 ; i<patientsXML.length ; i++) {
            patientXML = patientsXML[i];
            patient =   {   name : patientXML.querySelector("nom").textContent,
                            forname : patientXML.querySelector("prenom").textContent,
                            sex : patientXML.querySelector("sexe").textContent,
                            birthday : patientXML.querySelector("naissance").textContent,
                            numero : patientXML.querySelector("numero").textContent, 
                            adress: {   patientfloor : patientXML.querySelector("adresse[etage]"),
                                        numero : patientXML.querySelector("adresse[numero]"),
                                        street : patientXML.querySelector("adresse[rue]"),
                                        city : patientXML.querySelector("adresse[ville]"),
                                        postalCode : patientXML.querySelector("adresse[codePostal]")
                                    }
                        };
            //patient affecté?
            var visite = patientXML.querySelector("visite[intervenant]");
            if(visite===null){
            cabinetJS.patientNonAffectes.push(patient);
            } else {
            id = visite.getAttribute("intervenant");
            cabinetJS.infirmiers[id].patients.push(patient);
            }
        }
        console.log("cabinet :",cabinetJS);
} );