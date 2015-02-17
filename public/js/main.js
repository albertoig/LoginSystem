var jQueryStringName ="jquery";
var bootstrapStringName = "bootstrap.min";

require.config({
    baseUrl: 'js',
    paths: {
        jquery:   jQueryStringName,
        boostrap: bootstrapStringName,
        users:    'users',
        utils:    'AlertController'
    },
    shim : {
	    jquery : {
	      exports : '$'
	    },
	    boostrap : {
			deps : [jQueryStringName]
	    },
	    utils : {
			deps : [jQueryStringName,bootstrapStringName],
			exports: 'AlertController'
	    },
	    users: 	{
	    	deps : [jQueryStringName]	
	    }
  	}
});