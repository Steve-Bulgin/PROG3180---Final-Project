/* FileName: DAL.js
 * Purpose: DAL JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 *      Steven Bulgin, 2016.04.05: DAL set up
 */

var RelationType = {
	selectAll: function (callback) {
		var options = [];
		function txFunction (tx) {
		 	var sql = "SELECT * FROM relationType;";

		 	tx.executeSql(sql, options, callback, errorHandler); 
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	},
	insert: function (options) {
		function txFunction (tx) {
		 	function successInsert () {
		 	 	console.info("Inserted relation types"); 
		 	}

		 	var sql = "INSERT INTO relationType(name) " +
		 			  "VALUES(?); "; 

		 	tx.executeSql(sql, options, successInsert, errorHandler);
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	},
	drop: function () {
		function successDrop () {
			console.info("relationType Dropped"); 
		}

		function txFunction (tx) {
			var options =[];
			console.info("Dropped rt");
			var sql = "DROP TABLE IF EXISTS relationType;";

			tx.executeSql(sql, options, successDrop, errorHandler);  
		}
		db.transaction(txFunction, errorHandler, successTransaction);
	}
};

var Contacts = {
	insert: function (options) {
		function txFunction (tx) {
		 	var sql = "INSERT INTO contacts(firstName, lastName, eMail, " +
					  "phone, relationshipId, notes) " +
					  "VALUES(?, ?, ?, ?, ?, ?);";

			function successInsert () {
			 	alert("New contact information added.");  
			}
			tx.executeSql(sql, options, successInsert, errorHandler); 	 
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	},
	selectAllOrderByLastName: function (callback) {
		var options = [];
		function txFunction (tx) {
		 	var sql = "SELECT * FROM contacts " +
		 	 		  "ORDER BY lastName;";

		 	tx.executeSql(sql, options, callback, errorHandler);
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	},
	selectOne: function (options, callback) {
		function txFunction (tx) {
		 	var sql = "SELECT * FROM contacts WHERE id=?;";

		    tx.executeSql(sql, options, callback, errorHandler); 
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	},
	update: function (options) {
		function txFunction (tx) {
		 	var sql = "UPDATE contacts " +
					  "SET firstName=?, lastName=?, eMail=?, " +
					  "phone=?, relationshipId=?, notes=? " +
					  "WHERE id=?;";

			function successUpdate () {
				 	alert("Record updated"); 
			}
			tx.executeSql(sql, options, successUpdate, errorHandler);	 
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	},
	delete: function (options) {
		function txFunction (tx) {
		 	var sql = "DELETE FROM contacts WHERE id=?;";

		 	function successDelete () {
		 	 	alert("Delete successful"); 
		 	}
		 	tx.executeSql(sql, options, successDelete, errorHandler); 
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	}
};