    $('#save-button').click(function(){
        var userStocksSaved = localStorage.getItem('userStocks');
        var symbol = $('#symbol').val();
        if(userStocksSaved.length > 0){
		localStorage.setItem("userStocks", symbol + userStocksSaved);
		}else{
			localStorage.setItem("userStocks", symbol);
		}


		function deleteDuplicateKeypairs() {

    var userStocksSaved2 = userStocksSaved.split(",");
    var userStocksSavedFinal = userStocksSaved2;

    for (var b = 0; b < userStocksSaved2.length; b++) {
        for (var c = 0; c < userStocksSaved2.length; c++) {
            if ((userStocksSaved2[b] == userStocksSaved2[c]) && (c != b)) {
                userStocksSavedFinal.splice(c,1);
            }
        }
    }
    return userStocksSavedFinal;
}


// function deleteDuplicateKeypairs() {

//     // console.log("+++++++ " + userStocksSaved);
//     var userStocksSaved2 = userStocksSaved.split(",");
//     // console.log("+++++++ " + userStocksSaved2);
//     var userStocksSavedFinal = userStocksSaved2;

//     for (var b = 0; b < userStocksSaved2.length; b++) {
//         for (var c = 0; c < userStocksSaved2.length; c++) {
//             if ((userStocksSaved2[b] == userStocksSaved2[c]) && (c != b)) {
//                 userStocksSavedFinal.splice(c,1);
//             }
//         }
//     }
//     return userStocksSavedFinal;
// }



// ====== ORIGINAL SAVE BUTTON ====== //
  //   $('#save-button').click(function(){
  //       var userStocksSaved = localStorage.getItem('userStocks');
  //       var symbol = $('#symbol').val();
  //       if(userStocksSaved !== null){
		// localStorage.setItem("userStocks", symbol + "," + userStocksSaved);
		// }else{
		// 	localStorage.setItem("userStocks", symbol);
		// }

		// console.log("userStocksSaved after save: " + userStocksSaved);
		// console.log("userStocksSaved.split after save: " + userStocksSaved.split(","));

  //   });

 //    $('.save-button').click(function(){
 //    	var userStocksSaved = localStorage.getItem('userStocks');
 //        var symbol = $('#symbol').val();
 //            	console.log(".save-button 'this': " + this);

 //        if(userStocksSaved !== null){
	// 	localStorage.setItem("userStocks", symbol + "," + userStocksSaved);
	// 	}else{
	// 		localStorage.setItem("userStocks", symbol);
	// 	}
 //    	// saveStock(this);

	// });