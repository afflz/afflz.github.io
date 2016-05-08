// create the module and name it afflzApp
var afflzApp = angular.module("afflzApp", ["ngRoute"]);

// configure our routes
afflzApp.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "templates/home.html",
		controller  : "mainController",
	})

	// route for the skills page
	.when("/skills", {
		templateUrl : "templates/skills.html",
		controller  : "skillsController",
	})

	// route for the exps.html page
	.when("/exps", {
		templateUrl : "templates/exps.html",
		controller  : "expsController",
	})
	.otherwise(
		{
			redirectTo: "/"
		}
	);
});
// create the controller and inject Angular"s $scope
afflzApp.controller("mainController", function($scope) {
	$scope.color = "r";
});

afflzApp.controller("skillsController", function($scope) {
	$scope.color = 'r';
});

afflzApp.controller("expsController", function($scope) {
	$scope.color = 'r';
});
