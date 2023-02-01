const youtubeAPI = "AIzaSyBEBV7uxSff-XFwRYo2JGTFcXbAWFNtwX4"

var videoTest = $("#youtube-test")
var wikipediaTest = $("#wikipedia-test")
var search = "";

// Event listener to get the search value
$("#search-button").click(function(e) {
    e.preventDefault()
    search = $("#search-input").val();
    console.log(search)
    getWikiArticles()
    wikipediaTest.empty()
    getYoutubeVideo()
    videoTest.empty()
});

// Function to get Youtube videos
function getYoutubeVideo(){
    var queryURL = "https://www.googleapis.com/youtube/v3/search?key="+ youtubeAPI +"&q="+ search +"&type=video&part=snippet&videoEmbeddable=true&videoSyndicated=true&videoLicense=youtube&order=viewCount"
    $.ajax({
        url: queryURL,
        method: "GET",
        error: () => {
            alert("error")
            return
        },
    }).then(function(youtubeData) {
        console.log(youtubeData)
        for (let i = 0; i < youtubeData.items.length; i++) {
            var videoId = youtubeData.items[i].id.videoId;
            console.log(videoId)
            videoTest.append(`
                <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/${videoId}">
                </iframe>
            `);
        }
    });   
}

//Function to get Wikipedia articles
function getWikiArticles(){
    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + search + "&format=json&origin=*"
    $.ajax({
        url: queryURL,
        method: "GET",
        error: () => {
            alert("error")
            return
        },
    }).then(function(wikiData) {
        console.log(wikiData);
        console.log(wikiData.query.search[0].snippet)

        for (let i = 0; i < wikiData.query.search.length; i++) {
            var snippet = wikiData.query.search[i].snippet;
            console.log(snippet)
            videoTest.append(`
                <p>${wikiData.query.search[i].snippet}</p>
            `);
        }
    });
}