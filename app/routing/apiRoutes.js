var friends = require('../data/friends.js');
var friendCompare =[];
var chosenFriendIndex;

module.exports = function(app){
	app.get('/api/friends', function(req,res){
		res.json(friends);
	});

	app.post('/api/friends', function(req,res){
		var surveyScores = req.body.scores;
		
		console.log(surveyScores);
		friendCompare = [];
		friendsFunct(surveyScores,afterFriends);

		friends.push(req.body);
	
		res.json(friends[chosenFriendIndex]);
	});
};

function friendsFunct(surveyScores,callback){
	for(var i=0; i < friends.length; i++){
		var total = 0;
		console.log('Name:',friends[i].name);

		for(var j=0; j < friends[i].scores.length; j++){
			var diff = surveyScores[j]-friends[i].scores[j];

			if (diff < 0){
				diff = -1*diff;
			};

			total += diff;
			console.log('Total:', total);
		}

		friendCompare.push(total);
	}
	console.log(friendCompare);
	callback();
};

function afterFriends(){
	chosenFriendIndex = 0;
	
	for (var k=0; k < friendCompare.length; k++){
	
		if(chosenFriendIndex === undefined){
			chosenFriendIndex = k;
		
		}else if(friendCompare[k] < friendCompare[chosenFriendIndex]){
			chosenFriendIndex = k;
		};
	}
	console.log('Index is:',chosenFriendIndex);
}
