Discussion.factory("discussionsFactory", function($http, $location, $routeParams){
	var factory = {};

	factory.createTopic = function(discussion, seeError){
		$http.post("/discussions/create", discussion).success(function(result){
			if(!result.error){
				$location.path('/discussions/category/'+result.category+'/'+result._id);
			} else {
				seeError(result.error);
			}
		});
	}

	factory.get_category = function(category, callback){
		$http.get("/discussions/category/" + category).success(function(result){
			callback(result);
		}); 
	}
	factory.get_discussion = function(callback, discussion){
		$http.get("/discussions/" + discussion).success(function(result){
			callback(result);
		});
	}
	factory.add_message = function(callback, message){
		$http.post("/discussions/add_message", message).success(function(result){
			callback(result);
		});
	}

	return factory;
});

Discussion.controller("new_topicController", function(sessionsFactory, discussionsFactory, $scope, $location){

	$scope.currentUser;
	$scope.id = $scope.currentUser._id;


	sessionsFactory.getCurrent(function(user){
		if(user.name){
			$scope.currentUser = user;
			console.log($scope.currentUser);
		}
	});

	$scope.createTopic = function(){
		$scope.discussion._user = $scope.currentUser._id;
		discussionsFactory.createTopic($scope.discussion,
			function(error){
				alert(error);
				$scope.discussion = {};
			}
		);
	}
});

Discussion.controller("categoryController", function(sessionsFactory, discussionsFactory, $routeParams, $scope, $location){

	$scope.messages = [];
	$scope.quantity = 4;
	var category = $routeParams.category;

	discussionsFactory.get_category(category, function(Category){
		$scope.categories = Category;
	});

	$scope.viewDiscussion = function(cat){
		$location.path("discussions/category/"+cat.category+"/"+cat._id);
		discussionsFactory.get_discussion(function(Category){
			$scope.specific_category = Category;
		});
	}
});

Discussion.controller("specificController", function(sessionsFactory, discussionsFactory, $routeParams, $scope, $location){

	$scope.messages = [];
	$scope.quantity = 4;
	var category = $routeParams.category;
	var discussion_id = $routeParams.id;
	console.log(discussion_id);

	discussionsFactory.get_discussion(discussion_id, function(Discussion){
		$scope.Discussion = Discussion;
	});
	$scope.addMessage = function(){
		discussionsFactory.add_message($scope.message,
			function(error){
				alert(error);
				$scope.message = {};
			}
		);
	}
});

