 function get() {
 var val = document.getElementById('url').value;
var url;
	switch(val) {
	
	case "google":
		url = "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss";
	break;
	case "tc":
		url = "http://techcrunch.com/feed/";
	break;
	case "bbc":
		url = "http://feeds.bbci.co.uk/news/world/rss.xml";
	break;
	case "yahoo":
		url = "http://news.yahoo.com/rss/";
	break
	case "onion":
		url = "http://www.theonion.com/feeds/rss"
	break;
	}
	
	
	var numfeeds = document.getElementById('num_feeds').value;
	
	
	alert("URL= " + url);
	write(url, numfeeds);
 }
 
 document.addEventListener('DOMContentLoaded', function(){
	var button = document.getElementById('savebutton');
	button.addEventListener('click', function(){get(); });
} );
 
 function write(url, num) {
	

	
	chrome.runtime.onConnect.addListener(function(port){
	console.assert(port.name == "feedspage");
	port.onMessage.addListener(function(msg){
	
		if(msg.greeting == "Hello")
		{
			port.postMessage({feed: url, number: num});
		
		}
		else console.log("Null Connect");
	
	});

});
}
 




