require.config({
    baseUrl: 'js',
    out:"dist/main-signup",
    removeCombined: true,
    paths: {
        jquery:   "lib/jquery",
        boostrap: "lib/bootstrap.min",
        usercontroller:    "modules/UserController",
        messagecontroller:  "modules/MessageController"
    },
    shim : {
	    jquery : {
	      exports : '$'
	    },
	    boostrap:                ['jquery']
  	}
});

require( ["usercontroller"], function (usercontroller) {
	var users = new usercontroller("#username","#idFirstEmail","#idSecondEmail", "#messageUsername", "#messageEmail");
	users.loadEvents();
});
