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
