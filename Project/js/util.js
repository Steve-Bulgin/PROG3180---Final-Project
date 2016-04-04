/* FileName: util.js
 * Purpose: Holds odd js that doesn't really fit anywhere else
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 */

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
