class Book {
    constructor(cover, title, n_pages, publisher) {
        this.cover = cover;
        this.title = title;
        this.n_pages = n_pages;
        this.publisher = publisher;
    }

    set_cover(cover) {
        this.cover = cover;
    }
    set_title(title) {
        this.title = title;
    }
    set_n_pages(n_pages) {
        this.n_pages = n_pages;
    }
    set_publisher(publisher) {
        this.publisher = publisher;
    }

    get_cover() {
        return this.cover;
    }
    get_title() {
        return this.title;
    }
    get_n_pages() {
        return this.n_pages;
    }
    get_publisher() {
        return this.publisher;
    }
}

class Reading {
    constructor(book, n_days, year) {
        this.book = book;
        this.n_days = n_days;
        this.year = year;
    }

    set_book(book) {
        this.book = book;
    }
    set_n_days(n_days) {
        this.n_days = n_days;
    }
    set_year(year) {
        this.year = year;
    }

    get_book() {
        return this.book;
    }
    get_n_days() {
        return this.n_days;
    }
    get_year() {
        return this.year;
    }
}

$(document).ready(function(){
    $.ajax({
        url:"data.csv",
        dataType:"text",
        success:function(data){
            var data_arr = data.split(/\r?\n|\r/);
            var table_data = '<table class="table table-bordered table-striped">';
            for(var count = 0; count<data_arr.length; count++){
                var cell_data = data_arr[count].split(",");
                table_data += '<tr>';
                for(var cell_count=0; cell_count<cell_data.length; cell_count++){
                    if(count === 0){
                        table_data += '<th>'+cell_data[cell_count]+'</th>';
                    }
                    else{
                        table_data += '<td>'+cell_data[cell_count]+'</td>';
                    }
                }
                table_data += '</tr>';
            }
            table_data += '</table>';
            $('#table').html(table_data);  
        }
    }); 
});