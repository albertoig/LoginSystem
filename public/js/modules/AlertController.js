define( 'AlertController', ["jquery"], function ($) { 

  var AlertController = (function(idInput){
    var idInputAlertplace = idInput;
    var message = "";
    var alertClases = ["alert-success","alert-info","alert-warning","alert-danger"];

    var printHtmlAlert = function(){

    }

    var isHtmlAlertExist = function(){
      if(idInputAlertplace === "" || idInputAlertplace == null ){
        console.log("Developer, you must to load the id for alert box");  
        return false;
      }else{
        console.log("Great, alert box id exist!"); 
        return true; 
      }
    }

    var printSucessAlert = function(message){
      printAlert(alertClases[0],message);
    }

    var printInfoAlert = function(message){
      printAlert(alertClases[1],message);
    }

    var printWarningAlert = function(message){
      printAlert(alertClases[2],message);
    }

    var printDangerAlert = function(message){
      printAlert(alertClases[3],message);
    }

    var printAlert = function(type,message){
      if(isHtmlAlertExist()){

        removeClasses();

        if(type===alertClases[0]){
          addClass(alertClases[0]);
        }else if(type===alertClases[1]){
          addClass(alertClases[1]);
        }else if(type===alertClases[2]){
          addClass(alertClases[2]);         
        }else if(type===alertClases[3]){
          addClass(alertClases[3]);        
        }

        addMessage(message);
      }
    }

    var removeClasses = function(){
      $.each(alertClases, function( index, value ) {
        $(idInputAlertplace).removeClass(value);
      });
    }

    var addClass = function(choosenClass){
      $(idInputAlertplace).addClass(choosenClass);
    }

    var addMessage = function(message){
      $(idInputAlertplace).text(message);
    }

    // ACCESIBLE METHODS
    return {
      printSucessAlert : function(message){
       return printSucessAlert(message);
      },
      printInfoAlert : function(message){
       return printInfoAlert(message);
      },
      printWarningAlert : function(message){
       return printWarningAlert(message);
      },
      printDangerAlert : function(message){
       return printDangerAlert(message);
      },
    }

  });


  return AlertController;
});