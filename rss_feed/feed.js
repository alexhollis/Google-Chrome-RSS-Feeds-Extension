// Retrieves 
google.load("feeds", "1")
var feedcontainer=document.getElementById("feeddiv")
var feedurl="http://www.theonion.com/feeds/rss" // default feed url
var feedlimit=5 	// max # of  feeds.
var rssoutput = "";
function rssfeedsetup(){
var feedpointer=new google.feeds.Feed(feedurl) //Google Feed API method
feedpointer.setNumEntries(feedlimit) //Google Feed API method
feedpointer.load(displayfeed) //Google Feed API method
console.log("RSS feed Setup");

}

var thefeeds  // Global variable feeds

function displayfeed(result){
console.log("Display feed setup");
if (!result.error){
thefeeds=result.feed.entries
rssoutput += "<h2 id='feedtitle'><font color='yellow'><center>" + result.feed.description + "</center></font></h2>" + "<br /><ul>";
for (var i=0; i<thefeeds.length; i++)
rssoutput+="<li id='block'><a href='" + thefeeds[i].link + "' target='_newtab'>" + "<h3 id='title'>" + thefeeds[i].title + "</h3>" + "<p></p>" + "<p id='summary'>" + thefeeds[i].contentSnippet + "</p>" + "</a></li>"
rssoutput+="</ul>"
feedcontainer.innerHTML=rssoutput

}
else
alert("Error fetching feeds!")
}


window.onload=function(){
rssfeedsetup();
console.log("Window load");
}

var port = chrome.runtime.connect({name: "feedspage"});		// set up port to message the options page to get new url for feed when requested by user.
port.postMessage({greeting: "Hello"});

port.onMessage.addListener(function(msg){
	
	feedurl = msg.feed;
	feedlimit = msg.number;
});


/*chrome.storage.onChanged.addListener(function(changes, namespace) {
	
	
	for(key in changes) {
	
		var storageChange = changes[key];
		
		feedurl = storageChange.newValue;
		console.log("New value=" + feedurl);
		rssfeedsetup();
	}
	
});*/