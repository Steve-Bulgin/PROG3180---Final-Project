/* FileName: global.js
 * Purpose: Global JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 *      Steven Bulgin, 2016.04.04: Added btnSetTheme_click that 
 *						sets theme based on radio button selected
 *						in Settings page and saves it to local
 *						storage
 */

//Function calls 'contactListMaker' 
//on contact page show
function pageContacts_show () { 
	contactListMaker();
}

//Gets Sets theme selection adds to 
//local storage
function btnSetTheme_click () {
	var theme = "";
	theme = $("input[name=themeChoice]:checked").val();
	localStorage.setItem("theme", theme);
	alert(localStorage.getItem("theme") + " set");
	themeSwitcher(theme);
}

function btnDatabaseClear_click () {
	DB.dropTables(); 
}

function init () {
	themeSwitcher(localStorage.getItem("theme"));
	$("#pageContacts").on("pageshow", pageContacts_show); 
	$("#btnSetTheme").on("click", btnSetTheme_click);
	$("#btnDatabaseClear").on("click", btnDatabaseClear_click);
}

function initDB () {
	console.info("Creating DB... ");
	try {
	    DB.createDatabase();
	    if (db) {
	    	console.info("Making the tables... ");
	    	dropRelationType();
	    	DB.createTables();
	    }
	} catch(e) {
	    console.error("Error: (Fatal) Error in initDB. Can not proceed");
	}
	insertRelationTypes(); 
}

//Ready
$(document).ready(function() {
	init();
	initDB();
});