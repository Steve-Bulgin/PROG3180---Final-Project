/* FileName: global.js
 * Purpose: Global JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 */

function pageContacts_show () {
	//linkMaker(); 
	contactListMaker();
}

function init () {
	$("#pageContacts").on("pageshow", pageContacts_show); 
}

//Ready
$(document).ready(function() {
	init();
});