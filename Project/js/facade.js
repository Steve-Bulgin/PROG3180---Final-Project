/* FileName: facade.js
 * Purpose: Facade JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 *      Steven Bulgin, 2016.04.03: Listviews working, bounces to details
 *						for now
 */

//Function makes bookmark links for contacts
function linkMaker () {
	var code = "<a href=\"#num\" data-ajax=\"false\">#</a>";
    for (var i = 65; i <= 90; i++) {
        code += "<a href=\"#" + String.fromCharCode(i) + "\" data-ajax=\"false\">" + 
         String.fromCharCode(i) + "</a>";
    }
    $("#bookmarklinks").html(code);
}

//Constructs dynamic listviews. Adds to contactList div
function contactListMaker () {
	var code = "";
	for (var i = 65; i <= 90; i++) {
       code += " <ul  id=\"\""  + String.fromCharCode(i) + 
                "list\" data-role=\"listview\" class=\"lstRefresh ui-listview-inset\">" +
                "<h1 id=\"" + String.fromCharCode(i) + "\">" + 
                String.fromCharCode(i) + "</h1> ";

        for (var j = 0; j < 3; j++) {
        	code += "<li><a href=\"#pageDetails\"><h1>Some, Name</h1></a></li>";
        }
        code += "</ul>";
    }

	$("#contactList ").html(code);
	$(".lstRefresh").listview().listview("refresh");
     
}