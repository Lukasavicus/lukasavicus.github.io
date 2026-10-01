class Book {
    
    constructor(image, title, no_pages, no_days, year, publisher, author) {
        
        this._image = _image;
        this._title = title;
        this._no_pages = no_pages;
        this._no_days = no_days;
        this._year = year;
        this._publisher = publisher;
        this._author = author;
        Object.freeze(this);
    }
    
    get image() {
        
        return new this._image;
    }
    
    get title() {
        
        return this._title;
    }
    
    get no_pages() {
        
        return this._no_pages;
    }

    get no_days() {
        
        return this._no_days;
    }

    get year() {
        
        return this._year;
    }

    get publisher() {
        
        return this._publisher;
    }

    get author() {
        
        return this._author;
    }
}