/* FileName: facade.js
 * Purpose: Facade JS for Final Project PROG3180
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 *      Steven Bulgin, 2016.04.03: Listviews working, bounces to details
 *						for now
 *      Steven Bulgin, 2016.04.05: Got relation type inserter working how I
 *						like
 *      Steven Bulgin, 2016.04.05: Contact add works but no validation at this point
 *      Steven Bulgin, 2016.04.05: Add validation to Add (line 85)
 */

//Constructs dynamic listviews. Adds to contactList div
function contactListMaker () {
	function successSelectAllOrderByLastName (tx, results) {
		var code = "";
		for (var i = 65; i <= 90; i++) {
			code += "<li data-role=\"list-divider\">" + String.fromCharCode(i) + "</li>";

	        for (var j = 0; j < results.rows.length; j++) {
	        	var row = results.rows[j];
	        	var char_val = row['lastName'].toUpperCase().charCodeAt(0);
	        	if (char_val == i) {
	        		code += "<li><a href=\"\" data-row-id=" + row['id'] + 
	        		"><h2>" + row['lastName'] + ", " + row['firstName'] + "</h2></a></li>";
	        	}
	        }       
    	}
		$("#listul").html(code);
		$("#listul").listview().listview("refresh");
		$("#listul a").on("click", list_click);
	}

	function list_click () {
	    localStorage.setItem("id", $(this).attr("data-row-id"));
	    $(location).prop('href', "#pageDisplay");
	}
	Contacts.selectAllOrderByLastName(successSelectAllOrderByLastName);     
}

//Called to drop RelationType table on load so as not to store
// duplicate data in db
function dropRelationType () {
	RelationType.drop(); 
}

//Inserts types in relationType table
// add or remove from relTypes array to alter select options
function insertRelationTypes () {
	var relTypes = ["Friend", "Classmate", "Instructor", "BFF",
				    "Coworker", "Other", "Spouse", "Family"];

	for (var i = 0; i < relTypes.length; i++) {
		type = [relTypes[i]];
		RelationType.insert(type);
	}	
}

//Grabs items from relationType table and appends
// as options to html select
function dropDownSetter (elm_id) {
	function successSelectAll (tx, results) {
	 	var code = "";
	 	for (var i = 0; i < results.rows.length; i++) {
	 	 	var row = results.rows[i];

	 	 	code += "<option value=\"" + row['id'] + "\">" +
	 	 			row['name'] + "</option>";
	 	}
	 	var list = $(elm_id);
	 	list = list.html(code);
	 	$(elm_id).selectmenu();
	 	$(elm_id).selectmenu('refresh', true); 
	}
	RelationType.selectAll(successSelectAll); 
}

//Add contact to db
function addContact () {
	if (doValidate_Form("#frmAdd")){

		var firstName = $("#txtFirstName").val();
		var lastName = $("#txtLastName").val();
		var eMail = $("#addEmail").val();
		var phone = $("#txtPhone").val();
		var relationshipId = $("#relationshipType").val();
		var notes = $("#notes").val();


	var options = [firstName, lastName, eMail, phone,
	 			   relationshipId, notes];

	Contacts.insert(options);
	$(location).prop('href', "#pageContacts");
	}
}

function displayData () {
	console.info("dd");
	var id = localStorage.getItem("id");
	var options = [id];

	function successSelectOne (tx, results) {
		var row = results.rows[0];
		$("#fname").html('<span>'+'jmghkjg'+'</span>');
		$("#lname").html(row['lastName']);
		$("#emaild").html("Email: " + row['eMail']);
		$("#phoned").html("Calll: " + row['phone']);
		if (row['relationshipId'] == 1) {
			$("#relationship").html("Friend");
		} else if (row['relationshipId'] == 2) {
			$("#relationship").html("Classmate");
		} else if (row['relationshipId'] == 3) {
			$("#relationship").html("Instructor");
		} else if (row['relationshipId'] == 4) {
			$("#relationship").html("BFF");
		} else if (row['relationshipId'] == 5) {
			$("#relationship").html("Coworker");
		} else if (row['relationshipId'] == 6) {
			$("#relationship").html("Other");
		} else if (row['relationshipId'] == 7) {
			$("#relationship").html("Spouse");
		} else if (row['relationshipId'] == 8) {
			$("#relationship").html("Family");
		}
		$("#notesd").html(row['notes']);
	}
	Contacts.selectOne(options, successSelectOne);

}

//Shows the detail of the contact clicked on from the listview
// in the details page form
function showDetails () {
	var id = localStorage.getItem("id");
	var options = [id];

	function successSelectOne (tx, results) {
	 	var row = results.rows[0];
	 	$("#txtFirstNameEdit").val(row['firstName']);;
	 	$("#txtLastNameEdit").val(row['lastName']);
	 	$("#editEmail").val(row['eMail']);
	 	$("#txtPhoneEdit").val(row['phone']);
	 	$("#relationshipTypeEdit").val(row['relationshipId']).selectmenu('refresh', true);
	 	$("#notesEdit").val(row['notes']);
	}
	Contacts.selectOne(options, successSelectOne); 
}

function deleteContact () {
	var id = localStorage.getItem("id");
	var options = [id];
	var result = confirm("Are you sure you want to delete the contact? ");
	if(result){
		Contacts.delete(options);
		$(location).prop('href', "#pageContacts");
	}
}

function updateContact () {
	if (doValidate_Form("#frmEdit")){

		var id = localStorage.getItem("id");
		var firstName = $("#txtFirstNameEdit").val();
		var lastName = $("#txtLastNameEdit").val();
		var eMail = $("#editEmail").val();
		var phone = $("#txtPhoneEdit").val();
		var relationshipId = $("#relationshipTypeEdit").val();
		var notes = $("#notesEdit").val();

	var options = [firstName, lastName, eMail, phone,
	 			   relationshipId, notes, id];

	Contacts.update(options);
	$(location).prop('href', "#pageContacts");
	}
}
// clear database
function clearDatabase(){
	var result = confirm("Do you really want to clear the database? All data will be lost");
	try {
		if (result) {
			DB.dropTables();
			alert("Database Cleared!");
		}
	} catch (e) {
		alert(e);
	}
}