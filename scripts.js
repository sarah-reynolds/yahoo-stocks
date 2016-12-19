
// 1. Make getJson into a function so you can call it whenver oyu need to.
// 2. Instead of auto saving their symbols, you give them a save button
// 3. Retreive button?
// 4. Put bookmarks on the side of teh page2
// 5. Automatically refresh all stocks every X seconds
// 6. Keep the watchlist stocks in a separate table from searched stocks
// 7. Keep a "Recent" localStorage var, and a "saved" localStorage var
// 8. Pair up with BlackJack

$(document).ready(function(){

		$('#arrow1').click(function(){
			$('#page1,#page2').animate({
				'right': '100vw'
			},100);
		});
		$('#arrow2').click(function(){
			$('#page1,#page2').animate({
				'right': '0vw'
			},100);	
		});
    
    var userStocksSaved = localStorage.getItem('userStocks');
    console.log(userStocksSaved)
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+userStocksSaved+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
	pullStocks(url);

    $('.yahoo-form').submit(function(){
        event.preventDefault();
        var symbol = $('#symbol').val();
        // console.log(symbol);
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+symbol+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
        // console.log(url);

        pullStocks(url);

    });

    $('#save-button').click(function(){
        var userStocksSaved = localStorage.getItem('userStocks');
        var symbol = $('#symbol').val();
        if(userStocksSaved !== null){
		localStorage.setItem("userStocks", symbol + "," + userStocksSaved);
		}else{
			localStorage.setItem("userStocks", symbol);
		}

		console.log("userStocksSaved after save: " + userStocksSaved);
		console.log("userStocksSaved.split after save: " + userStocksSaved.split(","));

    });
});

function buildStockRow(stock){
    if(stock.Change.indexOf('+') > -1){
        var classChange = "success";
    }else{
        var classChange = "danger";
    }
    var newHTML = '';
    newHTML += '<tr>';
        newHTML += '<td>'+stock.Symbol+'</td>';
        newHTML += '<td>'+stock.Name+'</td>';
        newHTML += '<td>'+stock.Ask+'</td>';
        newHTML += '<td>'+stock.Bid+'</td>';
        newHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
    newHTML += '</tr>';
    $('#stock-body').append(newHTML);
    // console.log(newHTML);
};


function pullStocks(url){
    $.getJSON(url, function(data){
        var stockInfo = data.query.results.quote;
        if(data.query.count == 1){
        	var htmlToPlot = buildStockRow(stockInfo);
        	$('#stock-body').append(htmlToPlot);
        }else{
        // console.dir(stockInfo);
        	for(let i = 0; i < stockInfo.length; i++){
            	var htmlToPlot = buildStockRow(stockInfo[i]);
            	$('#stock-body').append(htmlToPlot)
        	}
        }

    });
};

function deleteDuplicateKeypairs() {

    // console.log("+++++++ " + userStocksSaved);
    var userStocksSaved2 = userStocksSaved.split(",");
    // console.log("+++++++ " + userStocksSaved2);
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


// create empty object
// loop through user local storage split string, and add to object as a property using object.key (objects can not have the same property)