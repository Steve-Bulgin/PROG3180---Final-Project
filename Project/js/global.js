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

function btnDatabaseClear_click () {
	clearDatabase();
	initDB();
}

function pageAdd_show () {
	dropDownSetter("#relationshipType");
	clearfrmAdd();
}

function btnSave_click () {
	addContact();
}

function pageDetails_show () {
	dropDownSetter("#relationshipTypeEdit");
	showDetails();
}

function pageDisplay_show () {
	console.info("Page display");
	displayData();
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
function btnCancel1_click () {
	$(location).prop('href', "#pageContacts");
}
function pageSettings_show () {
	var theme = localStorage.getItem('theme');
	console.info("theme set: " + theme);
	$('input[name=themeChoice][value=' + theme + ']').prop('checked',true).checkboxradio("refresh");
	$("#frmSet1 :radio").checkboxradio("refresh");
	hideAdvance();
}

function btnList_click () {
	$(location).prop('href', "#pageContacts"); 
}

function init () {
	themeSwitcher(localStorage.getItem("theme"));
	$("#pageContacts").on("pageshow", pageContacts_show);
	$("#pageAdd").on("pageshow", pageAdd_show);
	$("#btnSave").on("click", btnSave_click);
	$("#pageDetails").on("pageshow", pageDetails_show);
	$("#pageDisplay").on("pageshow", pageDisplay_show);
	$("#btnDelete").on("click", btnDelete_click);
	$("#btnUpdate").on("click", btnUpdate_click);
	$("#btnCancel").on("click", btnCancel_click);
	$("#btnCancel1").on("click",btnCancel1_click);
	$("#pageSettings").on("pageshow", pageSettings_show);
	$("#frmSet1 :radio").on("click", change_theme);
	$("#btnList").on("click", btnList_click);

	$("#btnDatabaseClear").on("click", btnDatabaseClear_click);
}

function change_theme(){
	var theme = $("input[name=themeChoice]:checked").val();
	localStorage.setItem("theme", theme);
	themeSwitcher(theme);
	$("#frmSet1 :radio").checkboxradio("refresh");
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