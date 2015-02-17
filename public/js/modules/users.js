define(["MessageController","jquery"], function(messageController,$) {

	var UserController = ( function(idUsername){
		var idInputUserName = idUsername;
		var idInputAlertplace = "";
		var messageController = new MessageController("#alertUsername");

		var isInputUsernameExist = function(){
		  if(idInputUserName!==""){console.log("Developer, you must to load the id input for the username"); return false;}
		  else{ console.log("Great, input for the username exist!"); return true; }
		}

		var load = function(){
			if(isInputUsernameExist){


			}
		}

		var checkUsername = function(){
		    $.getJSON( "http://localhost:3000/api/users/pepe444", function() {
				console.log("success");
				return true;
			})
			.fail(function() {
				console.log("fail");
				return false;
			});	
		}

		var getUsernameFromServer = function(){
		    var jsonResponse = $.getJSON( "http://localhost:3000/api/users/pepe444", function() {
				console.log("success");
			})
			.fail(function() {
				console.log("fail");
			});

			return jsonResponse;			
		}

		return {
			eventListener: function() {     
			  $('#username').change(function(){ 

			  }); 
			}
		}

	});

	return {
		eventListener: function() {     
		  $('#username').change(function(){ 

		  }); 
		}
	}
});