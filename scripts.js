
// 1. Make getJson into a function so you can call it whenver oyu need to.
// 2. Instead of auto saving their symbols, you give them a save button
// 3. Retreive button?
// 4. Put bookmarks on the side of teh page2
// 5. Automatically refresh all stocks every X seconds
// 6. Keep the watchlist stocks in a separate table from searched stocks
// 7. Keep a "Recent" localStorage var, and a "saved" localStorage var
// 8. Pair up with BlackJack

// remove dups idea: 
// create empty object
// loop through user local storage split string
// add to object as a property using object.key (objects can not have the same property)

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
    // console.log(userStocksSaved)
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+userStocksSaved+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
	pullStocksSave(url);

    $('.yahoo-form').submit(function(){
        event.preventDefault();
        var symbol = $('#symbol').val();
        // console.log(symbol);
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+symbol+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
        // console.log(url);

        pullStocks(url);

    });


});

function saveStock(param){

	var stockSymbolSaved = param;
	console.log(stockSymbolSaved);
	var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+stockSymbolSaved+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
	pullStocksSave(url);
	var userStocksSaved = localStorage.getItem('userStocks');
    if(userStocksSaved !== null){
	localStorage.setItem("userStocks", param + "," + userStocksSaved);
	}else{
	localStorage.setItem("userStocks", param);
	}
}

function buildStockRow(stock){
    if(stock.Change.indexOf('+') > -1){
        var classChange = "success";
    }else{
        var classChange = "danger";
    }
    var newHTML = '';
    newHTML += '<tr>';
    	newHTML += '<td onclick="saveStock(this.nextSibling.innerHTML)"><button class="save-button btn-success">+</button></td>';
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

function pullStocksSave(url){
    $.getJSON(url, function(data){
        var stockInfo = data.query.results.quote;
        if(data.query.count == 1){
        	var htmlToPlot = buildStockRowSave(stockInfo);
        	$('#save-body').append(htmlToPlot);
        }else{
        // console.dir(stockInfo);
        	for(let i = 0; i < stockInfo.length; i++){
            	var htmlToPlot = buildStockRowSave(stockInfo[i]);
            	$('#save-body').append(htmlToPlot)
        	}
        }

    });
};

function buildStockRowSave(stock){
    if(stock.Change.indexOf('+') > -1){
        var classChange = "success";
    }else{
        var classChange = "danger";
    }
    var saveHTML = '';
    saveHTML += '<tr>';
    	saveHTML += '<td><button class="btn btn-danger">-</button></td>';
        saveHTML += '<td>'+stock.Symbol+'</td>';
        saveHTML += '<td>'+stock.Name+'</td>';
        saveHTML += '<td>'+stock.Ask+'</td>';
        saveHTML += '<td>'+stock.Bid+'</td>';
        saveHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
    saveHTML += '</tr>';

    $('#save-body').append(saveHTML);
    // console.log(newHTML);
};
