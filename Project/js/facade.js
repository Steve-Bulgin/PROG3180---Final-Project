/* FileName: facade.js
 * Purpose: Facade JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 *      Steven Bulgin, 2016.04.03: Listviews working, bounces to details
 *						for now
 */


//Constructs dynamic listviews. Adds to contactList div
function contactListMaker () {
	var code = "";
	for (var i = 64; i <= 90; i++) {
		if (i == 64) {
			code += "<li data-role=\"list-divider\">#</li>";

	        for (var j = 0; j < 3; j++) {
	        	code += "<li><a href=\"#pageDetails\"><h1>Some, Name</h1></a></li>";
	        }
		} 
		else {
			code += "<li data-role=\"list-divider\">" + String.fromCharCode(i) + "</li>";

	        for (var j = 0; j < 3; j++) {
	        	code += "<li><a href=\"#pageDetails\"><h1>" + String.fromCharCode(i) + "Some, Name</h1></a></li>";
	        }
		}       
    }

	$("#listul").html(code);
	$("#listul").listview().listview("refresh");
     
}