/* FileName: util.js
 * Purpose: Holds odd js that doesn't really fit anywhere else
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 *      Steven Bulgin, 2016.04.04: Added theme switcher
 *      Steven Bulgin, 2016.04.09: Added a regex validation on phone 
 *						that I wrote summer 2015 that allows for all
 *						standard NA numbers and formats plus x#### extensions
 */

//show the advance setting
function showAdvance(){
	$("#advance").show();
}
//hide the advance setting
function hideAdvance(){
	$("#advance").hide();
}
//Grabs image from file picker
function getImg (input, elm_id) {
	if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	$(elm_id).show();
            $(elm_id).attr('src', e.target.result)
            .width(150).height(200);
        };
        reader.readAsDataURL(input.files[0]);
    } 
}

//Tests value of radio buttons and switches out css
function themeSwitcher (theme) {
	if (theme == "default") {
	 $("#cssstyle").attr('href','css/themes/default.min.css');
	}
	else if (theme == "red") {
	  $("#cssstyle").attr('href','css/themes/red.min.css');
	}
	else if (theme == "green") {
	  $("#cssstyle").attr('href','css/themes/green.min.css');
	}
	else if (theme == "purple") {
	  $("#cssstyle").attr('href','css/themes/purple.min.css');
	}   
}

function doValidate_Form(frmId) {
	var form = $(frmId);

	form.validate({
		rules:{
			txtFirstName:{
				required:true,
				rangelength: [2,20],
				checkfirstletter: true
			},
			txtLastName:{
				required:true,
				rangelength: [2,20],
				checkfirstletter: true
			},
			txtPhone:{
				required:false,
				phoneValidator: true
			},
			addEmail:{
				required: false,
				email: true
			},
			notes:{
				required:false,
				rangelength: [0,200]
			}
		},
		messages:{
			txtFirstName:{
				required:"You must enter the name",
				rangelength: "Name must be  2-20 characters long"
			},
			txtLastName:{
				required:"You must enter the name",
				rangelength: "Name must be  2-20 characters long"
			},
			txtPhone:{
				rangelength: "Phone number exceeds the range"
			},
			txtEmail:{
				email: "Enter a valid email address"
			},
			notes:{
				rangelength: "Note must not exceed 200 characters"
			}
		}
	});
	return form.valid();
}

jQuery.validator.addMethod("checkfirstletter",
	function (value, element) {
		var regex =  /^[a-zA-Z][a-zA-Z0-9.,'-/&]+$/;
		return this.optional(element) || regex.test(value);
	},
	"The first character must be alphabetical");

jQuery.validator.addMethod ("phoneValidator",
	function (value, element) {
		var regex =  /^([\+]?[1-2][ ]?)?([ \(\.\-])?([0-9]{3})([ \)\.\-]?)+([0-9]{3})+([ \.\-]?)+([0-9]{4})((([ ]?x+([0-9]{3,4}))?)?)$/;
		return this.optional(element) || regex.test(value);
	},
	"Phone number must be valid");

function clearfrmAdd(){
	txtFirstName.value='';
	txtLastName.value='';
	addEmail.value='';
	txtPhone.value='';
	notes.value='';
}