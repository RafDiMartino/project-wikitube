const youtubeAPI = "AIzaSyBEBV7uxSff-XFwRYo2JGTFcXbAWFNtwX4"

var videoTest = $("#youtube-test")
var search = "";

// Event listener to get the search value
$("#search-button").click(function(e) {
    e.preventDefault()
    search = $("#search-input").val();
    console.log(search)
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
    }).then(function(data) {
        console.log(data)
        for (let i = 0; i < data.items.length; i++) {
            var videoId = data.items[i].id.videoId;
            console.log(videoId)
            videoTest.append(`
                <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/${videoId}">
                </iframe>
            `);
        }
    });
    
}