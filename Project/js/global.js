/* FileName: global.js
 * Purpose: Global JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 */

//Function calls 'contactListMaker' 
//on contact page show
function pageContacts_show () { 
	contactListMaker();
}

function btnSetTheme_click () {
	var theme = "";
	theme = $("input[name=themeChoice]:checked").val();
	localStorage.setItem("theme", theme);
	alert(localStorage.getItem("theme") + " set");
	themeSwitcher(theme);
}

function init () {
	themeSwitcher(localStorage.getItem("theme"));
	$("#pageContacts").on("pageshow", pageContacts_show); 
	$("#btnSetTheme").on("click", btnSetTheme_click);
}

//Ready
$(document).ready(function() {
	init();
});