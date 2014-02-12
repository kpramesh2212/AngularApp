// JavaScript Document

var app = angular.module('BillerApp', []);

var controller = app.controller('BillerController', ['$scope', function(scope){
	scope.userlist = [];
	scope.username = 'ramesh';
	scope.sharedbylist = [];
	scope.billItems = [];
	
	scope.isSharedByListEmpty =  function() {
		return !scope.sharedbylist.length;	
	}
	
	scope.userAdd = function(user) {
		var index = scope.userlist.indexOf(user);
		if (index < 0 ) {
			scope.userlist.push(user);
		} else {
			alert('user already exist');
		}
	};
	
	scope.updateSharedBy = function(user) {
		var index = scope.sharedbylist.indexOf(user);
		if (index < 0 ) {
			scope.sharedbylist.push(user);
		} else {
			scope.sharedbylist.splice(index, 1);
		}
	}
	
	scope.addBillItems = function(billForm) {
		billItem = new Object();
		billItem.itemname = scope.itemname;
		billItem.billdate = scope.billdate;
		billItem.paidby = scope.paidby;
		billItem.sharedbylist = scope.sharedbylist;
		scope.billItems.push(billItem);
	}


}]);