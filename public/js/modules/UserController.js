define(["jquery","messagecontroller"], function($,message) {

	var UserController = ( function(idUsername,idEmail,idSecondEmail,idMessage,idEmailMessage){

		var idInputUserName = idUsername;
		var idInputEmail = idEmail;
		var idInputSecondEmail = idSecondEmail;

        var oUserMessage = new message(idMessage);
        var oEmailMessage = new message(idEmailMessage);

		var loadEvents = function(){
			loadUsernameEvents();
			loadEmailEvents();
		}

		var loadUsernameEvents = function(){
			loadCheckIfUsernameIsAvailableEvent();
		}

		var loadEmailEvents = function(){
			loadCheckIfEmailIsAvailableEvent();
			loadCheckIfEmailsAreEqualEvent();
		}

		var loadCheckIfUsernameIsAvailableEvent = function(){
			if(isInputUsernameExist()){
				$(idInputUserName).change(function(){ 
					if(getUserName()!== null){
						$.ajax({
							url: 'http://localhost:3000/api/users/username/' + getUserName()  ,
							dataType: 'json',
							cache: false,
							success: function (response) {
								if( response.msg === "notExist"){ oUserMessage.printSucessMessage("El nombre de usuario está libre");}
								else{oUserMessage.printDangerMessage("El nombre de usuario no está libre");}
							}
						});				
					}
				});
			}
		}

		var loadCheckIfEmailIsAvailableEvent = function(){
			if(isInputEmailExist()){
				$(idInputEmail).change(function(){ 
					if(getEmail()!== null){
						$.ajax({
							url: 'http://localhost:3000/api/users/email/' + getEmail()  ,
							dataType: 'json',
							cache: false,
							success: function (response) {
								if( response.msg === "notExist"){ oEmailMessage.printSucessMessage("El email está libre");}
								else{oEmailMessage.printDangerMessage("El email no está libre");}
							}
						});				
					}
				});
			}
		}	

		var loadCheckIfEmailsAreEqualEvent = function(){
			if(isInputEmailExist() && isInputSecondEmailExist()){
				$(idInputEmail).change(function(){ 
					checkFormatEmailAndPrintMessage(getEmail());
					if(getSecondEmail()!==""){
						checkSameEmails(getEmail(),getSecondEmail());	
					}
				});

				$(idInputSecondEmail).change(function(){ 
					checkFormatEmailAndPrintMessage(getSecondEmail());		
					checkSameEmails(getEmail(),getSecondEmail());			
				});				
			}
		}	

		var checkFormatEmailAndPrintMessage = function(email){
			if(email !== null && email !== ""){
				if(!checkEmailFormat(email)){
					oEmailMessage.printDangerMessage("Escribe el email con el formato correcto");
				}
			}
		}

		var checkSameEmails = function(email,secondEmail){
			if(email !== secondEmail ){
				oEmailMessage.printDangerMessage("Los emails no son iguales.");
			}else{
				oEmailMessage.printSucessMessage("Los emails son iguales");
			}
		}

		var checkEmailFormat = function(email){
			var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

			if(filter.test(email))
				return true;
			else
				return false;
		}

		var isInputUsernameExist = function(){
		  if(idInputUserName === "" || idInputUserName == null  ){return false;}
		  else{return true; }
		}

		var isInputEmailExist = function(){
		  if(idInputEmail === "" || idInputEmail == null  ){return false;}
		  else{return true; }
		}

		var isInputSecondEmailExist = function(){
		  if(idInputSecondEmail === "" || idInputSecondEmail == null  ){return false;}
		  else{return true; }
		}

		var getUserName = function(){
			return $(idInputUserName).val()
		}

		var getEmail = function(){
			return $(idInputEmail).val()
		}

		var getSecondEmail = function(){
			return $(idInputSecondEmail).val()
		}

		return {
			loadEvents: 	loadEvents
		}

	});

	return UserController;
	
});