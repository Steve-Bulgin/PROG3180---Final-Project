/* FileName: database.js
 * Purpose: Database JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 *      Steven Bulgin, 2016.04.04: DB Creates
 */

var db;

function errorHandler (tx, error) {
	console.error("SQL error: " + tx + " (" + error.code + ") " +
				  error.message); 
}

function successTransaction () {
	console.info("Successful transaction");
}

var DB = {
	createDatabase: function () {
		var shortName = "PROG3180Final";
		var version = "1.0";
		var displayName = "Final DB";
		var dbSize = 2*1024*1024;

		console.info("Making the db... ");
		db = openDatabase(shortName, version, displayName, dbSize,
						  dbCreateSuccess);

		function dbCreateSuccess () {
			console.info("DB Created"); 
		}
	},
	createTables: function () {
		function successCreate () {
		 	console.info("Tables made"); 
		}

		function txFunction (tx) {
		 	var options = [];
		 	console.info("Making tables... ");

		 	var sql = "CREATE TABLE IF NOT EXISTS relationType(" +
 		  		"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
 		  		"name VARCHAR(20) NOT NULL); ";

		 	tx.executeSql(sql, options, successCreate, errorHandler);

		 	sql = "CREATE TABLE IF NOT EXISTS contacts(" +
		 		  "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
		 		  "firstName VARCHAR(20) NOT NULL, " +
		 		  "lastName VARCHAR(20) NOT NULL, " +
		 		  "eMail VARCHAR(30), " +
		 		  "phone VARCHAR(25), " +
		 		  "relationshipId INTEGER NOT NULL, " +
		 		  "notes TEXT, " +
		 		  "FOREIGN KEY(relationshipId) REFERENCES relationType(id));";

		 	tx.executeSql(sql, options, successCreate, errorHandler);
		}
		db.transaction(txFunction, errorHandler, successTransaction);
	},
	dropTables: function () {
		
		function successDrop () {
		 	console.info("Tables dropped"); 
		}

		function txFunction (tx) {
		 	var options = [];
		 	console.info("Dropping contacts... ");
		 	var sql = "DROP TABLE IF EXISTS contacts;";
		 	tx.executeSql(sql, options, successDrop, errorHandler);

		 	console.info("Dropping relationType... ");
		 	sql = "DROP TABLE IF EXISTS relationType;";
		 	tx.executeSql(sql, options, successDrop, errorHandler); 
		}
		db.transaction(txFunction, errorHandler, successTransaction); 
	} 
};