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

function init () {
	themeSwitcher(localStorage.getItem("theme"));
	$("#pageContacts").on("pageshow", pageContacts_show); 
	$("#btnSetTheme").on("click", btnSetTheme_click);
}

//Ready
$(document).ready(function() {
	init();
});