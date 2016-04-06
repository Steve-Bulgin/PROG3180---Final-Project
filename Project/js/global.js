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
	console.info("page show");
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
	initDB();
}

function pageAdd_show () {
	dropDownSetter("#relationshipType");
}

function btnSave_click () {
	addContact();
}

function pageDetails_show () {
	dropDownSetter("#relationshipTypeEdit");
	showDetails();
}

function btnDelete_click () {
	deleteContact();
}

function btnUpdate_click () {
	updateContact();
}

function btnCancel_click () {
	$(location).prop('href', "#pageContacts");  
}

function pageSettings_show () {
	var theme = localStorage.getItem('theme');
	console.info("theme set: " + theme);
	$('input[name=themeChoice][value=' + theme + ']').prop('checked',true).checkboxradio("refresh");
}

function init () {
	themeSwitcher(localStorage.getItem("theme"));
	$("#pageContacts").on("pageshow", pageContacts_show); 
	$("#btnSetTheme").on("click", btnSetTheme_click);
	$("#btnDatabaseClear").on("click", btnDatabaseClear_click);
	$("#pageAdd").on("pageshow", pageAdd_show);
	$("#btnSave").on("click", btnSave_click);
	$("#pageDetails").on("pageshow", pageDetails_show);
	$("#btnDelete").on("click", btnDelete_click);
	$("#btnUpdate").on("click", btnUpdate_click);
	$("#btnCancel").on("click", btnCancel_click);
	$("#pageSettings").on("pageshow", pageSettings_show);
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