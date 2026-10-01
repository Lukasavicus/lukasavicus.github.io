function _process_data(raw_data, quotation = '"', sep = '\t', newline = /\r?\n|\r/){
	// Replace all tabs for single space
	var no_tabs_data = raw_data.replace(new RegExp("\t", 'g'), " ")
	// Transform data CSV to TSV (to split then in tabs and preserve the comma inside a string)
	var tsv_data = _csv_to_tsv(no_tabs_data, quotation)
	// Remove all quote marks
	var no_quotes_data = tsv_data.replace(new RegExp(quotation, 'g'), '')
	// Break data into lines
    var data_arr = no_quotes_data.split(newline);

    return data_arr;
}

function _csv_to_tsv(data, quotation){
	var inside_quotes = false;
	var new_data = [];
	for(var i = 0; i < data.length; i++){
			if(data[i] === quotation) 				inside_quotes = ! inside_quotes;
			if(data[i] === ',' && !inside_quotes){
				new_data[i] = '\t';
			}
			else
				new_data[i] = data[i];
			//console.log(new_data[i]);
	}
	return new_data.join("");
}

$(document).ready(function(){
    $.ajax({
        url:"data.csv",
        dataType:"text",
        success:function(raw_data){
            let no_pages = 0;
            let no_days = 0;
        	data = _process_data(raw_data);

            var table_data = '<table class="table table-bordered table-striped">';
            
            var header = data[0].split('\t');

            table_data += '<thead><tr>';
            table_data += '<th>Index</th>';
            for(var i = 0; i < header.length; i++){
                table_data += '<th>'+header[i]+'</th>';
            }
            table_data += '</tr></thead>';

            table_data += '<tbody>';
            for(var i = 1; i < data.length; i++){
                var cell_data = data[i].split('\t');
                table_data += '<tr>';
                table_data += '<td>'+i+'</td>';
                table_data += '<td>'+'<img src="book_cover_imgs/'+cell_data[0]+'" alt="" width="60" height="90" border="0">'+'</td>';
                for(var cell_i = 1; cell_i < cell_data.length; cell_i++){
                    table_data += '<td>'+cell_data[cell_i]+'</td>';
                }
                no_pages += parseInt(cell_data[2]) || 0;
                no_days += parseInt(cell_data[3]) || 0;
                table_data += '</tr>';
            }
            console.log("#pages " , no_pages);
            console.log("#days ", no_days);
            console.log("mean pace ", no_pages / no_days);
            table_data += '</tbody></table>';
            $('#recover').html(table_data);  
        }
    }); 
});