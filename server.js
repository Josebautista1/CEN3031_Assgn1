var http = require("http"), 
    fs = require("fs"), 
    url = require("url"),
    port = 8080;

/* Global variables */
var listingData 
var server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  //checking if the request is for listings
  if(parsedUrl.pathname == '/listings'){
	  response.statusCode = 200;
	  response.write(listingData);
	  } else {
		  response.statusCode = 404;
          response.write("Bad gateway error");
		  }
	response.end();
};

fs.readFile('listings.json', 'utf8', function(err, data) {
	if (err) {
		return err;
	}
	listingData = data;

   server = http.createServer(requestHandler);
   server.listen(port, function(){
	//execute callback function once server is listening
        console.log('Server listening on: http://localhost:' + port);
	});
});