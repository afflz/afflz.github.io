// create the module and name it afflzApp
var afflzApp = angular.module("afflzApp", ["ngRoute"]);

// configure our routes
afflzApp.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "templates/home.html",
		controller  : "mainController"
	})

	// route for the skills page
	.when("/skills", {
		templateUrl : "templates/skills.html",
		controller  : "skillsController",
	})

	// route for the exps.html page
	.when("/exps", {
		templateUrl : "exps.html",
		controller  : "expsController"
	})
	.otherwise(
		{
			redirectTo: "/"
		}
	);
});

// create the controller and inject Angular"s $scope
afflzApp.controller("mainController", function() {
	var header = $.getElementsByTagName("head")[0];
	var styleSheet = $.createElement("link");
	styleSheet.rel = "stylesheet";
	styleSheet.type = "text/css";
	styleSheet.href = "colors_b.css"; // name of your css file
	styleSheet.media = "all";
	header.appendChild(styleSheet);
});

afflzApp.controller("skillsController", function() {
	var header = $.getElementsByTagName("head")[0];
	var styleSheet = $.createElement("link");
	styleSheet.rel = "stylesheet";
	styleSheet.type = "text/css";
	styleSheet.href = "colors_g.css"; // name of your css file
	styleSheet.media = "all";
	header.appendChild(styleSheet);
});

afflzApp.controller("expsController", function() {
	var header = $.getElementsByTagName("head")[0];
	var styleSheet = $.createElement("link");
	styleSheet.rel = "stylesheet";
	styleSheet.type = "text/css";
	styleSheet.href = "colors_r.css"; // name of your css file
	styleSheet.media = "all";
	header.appendChild(styleSheet);
});
