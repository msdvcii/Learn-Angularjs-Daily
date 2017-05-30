angular.module("Ex1", ["ngRoute"])

.config(["$locationProvider", function ($locationProvider) {
	$locationProvider.hashPrefix('');
}])

.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'main.html'
		}) 
		.when("/list/:tur", {
			templateUrl: "list.html",
			controller: "ListDetailController"
		})
})

.controller('Init', function($scope, generalFactory){
	$scope.Islem = function (n1, n2, t) {
		var sonuc = parseFloat(0);
		switch(t) {
			case '+': sonuc = parseFloat(n1) + parseFloat(n2); t = "toplama"; break;
			case '-': sonuc = parseFloat(n1) - parseFloat(n2); t = "cikarma"; break;
			case '*': sonuc = parseFloat(n1) * parseFloat(n2); t = "carpma"; break;
			case '/': sonuc = parseFloat(n1) / parseFloat(n2); t = "bolme"; break;
		}
		generalFactory.addWork(n1, n2, t, sonuc);
		$scope.list = generalFactory.getList();
	}
	$scope.list = generalFactory.getList();
	$scope.activeLink = "All";
})

.controller('ListDetailController', function($scope, $routeParams, generalFactory){

	$scope.islem = $routeParams.tur;
	switch($scope.islem) {
		case 'toplama': $scope.islemAdi = "Toplama"; break;
		case 'cikarma': $scope.islemAdi = "Çıkarma"; break;
		case 'carpma': $scope.islemAdi = "Çarpma"; break;
		case 'bolme': $scope.islemAdi = "Bölme"; break;
	}
	$scope.gList = generalFactory.getList();
	$scope.allList = "";

})

.factory('generalFactory', function(){
	var generalFactory = {};
	var list = [];
	var symbol = "";

	generalFactory.addWork = function (s1, s2, it, r) {
		switch(it) {
			case 'toplama': symbol = "+"; break;
			case 'cikarma': symbol = "-"; break;
			case 'carpma': symbol = "*"; break;
			case 'bolme': symbol = "/"; break;
		}
		list.push({
			id: 0,
			w: it,
			s: symbol,
			v1: s1,
			v2: s2,
			result: r
		});
	};

	generalFactory.getList = function () {
		return list;
	}

	return generalFactory;
})