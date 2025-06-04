function BookSearchApiClientX(format) {
  this.format = format; //Inside xhr.onload, this refers to the XMLHttpRequest instance, not the BookSearchApiClient
}

BookSearchApiClientX.prototype.getBooksByAuthor = function (authorName, limit) {
  var result = [];
  
  var self = this; 

  var xhr = new XMLHttpRequest(); //first way to do AJAX requests in the browser...2000s
  //  In production, hardcoding URLs is bad practice. Ideally, inject or configure the base URL.
  xhr.open(
    "GET",
    "http://api.book-seller-example.com/by-author?q=" +
      authorName +
      "&limit=" +
      limit +
      "&format=" +
      this.format
  );

  xhr.onload = function () { //this inside xhr.onload = function () { ... } refers to the XMLHttpRequest object
    if (xhr.status == 200) {
      if (this.format == "json") {
        var json = JSON.parse(xhr.responseText);

        result = json.map(function (item) {
          return {
            title: item.book.title,
            author: item.book.author,
            isbn: item.book.isbn,
            quantity: item.stock.quantity,
            price: item.stock.price,
          };
        });
      } else if (this.format == "xml") {
        var xml = xhr.responseXML;

        // Full of noise (like #text whitespace nodes)
        // Not an array, so no .map, .filter, etc.
        // Easy to break if formatting or indentation changes
        // Have to assume : item.childNodes[0] is always a container for <title>, <author>, and <isbn>
        result = xml.documentElement.childNodes.map(function (item) { //xml.documentElement.childNodes is terrible for XML parsing
          return {
            title: item.childNodes[0].childNodes[0].nodeValue, 
            author: item.childNodes[0].childNodes[1].nodeValue,
            isbn: item.childNodes[0].childNodes[2].nodeValue,
            quantity: item.childNodes[1].childNodes[0].nodeValue,
            price: item.childNodes[1].childNodes[1].nodeValue,
          };
        });
      }

      return result;
    } else {
      alert("Request failed.  Returned status of " + xhr.status);
    }
  };
  xhr.send();
};

module.exports = GetBookListApiClient; return result; // This runs before xhr.onload finishes, must use callback or Promise
