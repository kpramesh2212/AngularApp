// JavaScript Document

var app = angular.module('BillerApp', []);

var controller = app.controller('BillerController', ['$scope', function(scope){
	scope.sharedbylist = [];
	scope.billItems = new Dict();
	scope.users = new Dict();
	
	var getId = function() {
		var d = new Date();
		return d.getTime();
	}
	
	scope.getUsers = function() {
		return scope.users.keys();
	}
	
	scope.isSharedByListEmpty =  function() {
		return !scope.sharedbylist.length;	
	}
	
	scope.userAdd = function(user) {	
		u = new Object();
		u.name = user;
		u.creditAmount = 0;
		u.debitAmount = 0;
		u.creditBillItemsMap = new Dict();
		u.debitBillItemsMap = new Dict();
		scope.users.put(user, u);
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
		billItem.id = getId();
		billItem.itemname = scope.itemname;
		billItem.billdate = scope.billdate;
		billItem.paidby = scope.paidby;
		billItem.amount = scope.amount;
		billItem.sharedbylist=angular.copy(scope.sharedbylist);
		billItem.individualShare = billItem.amount / billItem.sharedbylist.length;
		scope.billItems.put(billItem.id, billItem);
		
		//now calculate individual expenses
		var paidUser = scope.users.get(billItem.paidby);
		paidUser.creditAmount = paidUser.creditAmount + scope.amount;
		paidUser.creditBillItemsMap.put(billItem.id, billItem);
		
		//now calculate debit expenses
		for (var index in billItem.sharedbylist) {
			var sharedUser = scope.users.get(billItem.sharedbylist[index]);
			sharedUser.debitAmount = sharedUser.debitAmount - billItem.individualShare;
			sharedUser.debitBillItemsMap.put(billItem.id, billItem);
		}
		
	}
	
	function Dict() {
		this.keyList = [];
		this.valueList = [];
		
		this.put = function(key, value) {
			var index = this.keyList.indexOf(key);
			if (index < 0) {
				this.keyList.push(key);
				this.valueList.push(value);
			} else {
				alert(key + ' already exist');
			}
		}
	
		this.get = function(key) {
			var index = this.keyList.indexOf(key);
			if (index < 0) {
				return;
			} else {
				return this.valueList[index];
			} 
		}
	
		this.keys = function() {
			return angular.copy(this.keyList);
		}
	
		this.values = function() {
			return angular.copy(this.valueList);
		}
	
		this.hasKey = function(key) {
			return (this.keyList.indexOf(key) < 0) ? false : true;
		}
		
		this.remove = function(key) {
			var index = this.keyList.indexOf(key);
			if (index < 0) {
				return false;
			} else {
				this.keyList.splice(index, 1);
				this.valueList.splice(index, 1);
				return true;ss
			}
		}
		
		this.length = function() {
			return this.keyList.length;
		}
	}
	
	


}]);