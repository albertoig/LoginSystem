var models = [
	'users.js'
];

var loadModels = [];

exports.initialize = function() {
    var length = models.length;
    for (var i = 0; i < length; i++) {
        require('./' + models[i]);
    }
};

module.exports = loadModels