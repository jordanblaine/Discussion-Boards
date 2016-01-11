var Discussion = angular.module("discussionsApp", ["ngRoute"]);
var sess;

Discussion.config(function($routeProvider){
	$routeProvider
		.when("/", {
			title: "Home"
		})
		.when("/discussions/category/:category", {
			templateUrl: "partials/category.html",
			title: "Discussions",
			controller: "categoryController"
		})
		.when("/discussions/category/:category/:id", {
			templateUrl: "partials/specific_discussion.html",
			title: "Discussions",
			controller: "specificController"
		})
		.when("/create_discussion", {
			templateUrl: "partials/new_topic.html",
			title: "Discussions",
			controller: "new_topicController"
		})	
		.when("/categories", {
			templateUrl: "partials/look_categories.html",
			title: "Find By Categories",
			controller: "new_topicController"
		})
});

Discussion.factory("sessionsFactory", function($http, $location){
	
	var currentUser;

	var factory = {};

	factory.sign_up = function(user, seeError){
		$http.post("/users/create", user).success(function(user){
			return user;
		}).error(function(err){
			return err;
		});
	}
	

	factory.login = function(user, seeError){
		$http.post("/users/login", user).success(function(user){
			return user;
		}).error(function(err){
			return err;
		});
	}

	factory.getCurrent = function(callback){
		$http.get("/users/current").success(function(user){
			callback(user);
		});
	}

	factory.logout = function(current, reportError){
		$http.post("/users/logout", current).success(function(user){
				return user;
		}).error(function(err){
			return err;
		});
	}

	return factory;
});

Discussion.controller("indexController", function(sessionsFactory, discussionsFactory, $scope, $location){
	
});

Discussion.controller("userController", function(sessionsFactory, discussionsFactory, $scope, $location){

	$scope.currentUser = null;

	sessionsFactory.getCurrent(function(user){
		if(user.name){
			$scope.currentUser = user;
			console.log($scope.currentUser);
		}
	});

	$scope.user_login = function(){
		sessionsFactory.login($scope.user,
			function(error){
				alert(error);
				$scope.user = {};
			}
		);
	}

	$scope.user_signup = function(){
		sessionsFactory.sign_up($scope.new_user,
			function(error){
				alert(error);
				$scope.new_user = {};
			}
		);
	}

$scope.logout = function(){
		sessionsFactory.logout($scope.currentUser,
			function(error){
				alert(error);
			}
		);
	}

});


