/* FileName: util.js
 * Purpose: Holds odd js that doesn't really fit anywhere else
 * Revision History
 * 		Steven Bulgin, 2016.04.02: Created
 */


function getImg (input) {
	 if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	$("#imgDisplay").show();
            $("#imgDisplay")
            .attr('src', e.target.result)
            .width(150)
            .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    } 
}
