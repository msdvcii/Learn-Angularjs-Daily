angular.module("wunderlist", ["ngRoute"])

/* Setting url config for slash */
.config(["$locationProvider", function ($locationProvider) {
	$locationProvider.hashPrefix('');
}])

/* Create a routing setting */
.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "main.html"
		})
		.when("/list/:listId", {
			templateUrl: "list.html",
			controller: "ListDetailController"
		})
})

/* Create a controller for list of data */
.controller("ListController", function ($scope, listFactory) {

	/* Create a list for all scopes */
	$scope.lists = listFactory.getLists();

	/* Create function for add event */
	$scope.addLists = function(NewItem) {

		/* Add list push */
		listFactory.addList(NewItem);

		/* Remove input content */
		$scope.NewItem = "";

	}

})

/* Create a controller for list detail page */
.controller('ListDetailController', function($scope, $routeParams, listFactory){
	$scope.list = listFactory.getList($routeParams.listId);

	$scope.addItem = function(NewItem) {
		listFactory.addItem($routeParams.listId, NewItem);
		$scope.NewItem = "";
	}
})

/* Create a factory. This functions work on all pages. */
.factory('listFactory', function(){
	var listFactory = {};
	var lists = [];

	listFactory.getLists = function () {
		return lists;
	};

	listFactory.getList = function (idx) {
		return lists[idx];
	}

	listFactory.addList = function (NewItem) {
		lists.push({
			id: lists.length,
			name: NewItem,
			items: []
		});
	}

	listFactory.addItem = function (idx, NewItem) {
		lists[idx].items.push(NewItem);
	}

	return listFactory;
})















