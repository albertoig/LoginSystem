var mongoose = require('mongoose');
var mongoTypes = require('mongoose-types');
var crypto = require('crypto');
var Schema = mongoose.Schema; 

mongoTypes.loadTypes(mongoose, 'email');

var User = new  Schema({
	username: {
	    type: String,
	    validate: [required, 'Username is required'],
	    index: { unique: true }
	},
	password: {
		type: String
	},
	email: {
	    type: mongoose.SchemaTypes.Email,
	    validate: [required, 'Email is required'],
	    index: { unique: true }
	},
	picture:  String,
	salt: 	  String,
	active: {
		type: Boolean,
		'default': false
	},
	createdAt: {
		type: Date,
		'default': Date.now
	}
});

User.virtual('passwordEncrypt').set(function(password){
	this.setPassword(password);
	this._password = password;
}).get(function(){
	return this._password;
});

User.method('setPassword', function(cleartext) {
	var hex;
	this.salt = this.makeSalt();
	hex = this.encryptPassword(cleartext);
	this.password = hex;
});

User.method('makeSalt', function() {
	return Math.round((new Date().valueOf() * Math.random())) + '';
});

User.method('encryptPassword', function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

User.statics.getUsername = function(username){
    return this.findOne({ username: username }, username);
}

User.pre('save', function(next){
	var err = new Error('something went wrong');

	if (!validatePassword(this.password)) {
		err.message = "Invalid Password",
		next(err);
	}else{
  		next();
	}
});

User.method('makeSalt', function() {
	return Math.round((new Date().valueOf() * Math.random())) + '';
});

User.method('checkIfSameEmail', function(firstEmail,secondEmail) {
	var checkEmails = false;
	
	if (firstEmail !== "" && secondEmail !== "" &&
	    firstEmail === secondEmail){
		checkEmails == true;
	}

	return checkEmails;
});
//refinar jeje jeje
function validatePassword(value) {
	if(value!==null){
		if(value.length < 8){
			return false;
		}else{
			return true;
		}
	}else{
		return false;
	}
}

function required(val) { 
	return val && val.length; 
}

mongoose.model('users', User);
User = mongoose.model('users');
module.exports = User;