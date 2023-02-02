const youtubeAPI = "AIzaSyARAdM68mQB0klzmy4LNFuo2e8Z4t4BQu8"

var videoTest = $("#youtube-test")
var wikipediaTest = $("#wikipedia-test")
var search = "";

//Modal
$('#exampleModal').modal('show');

// Event listener to get the search value
$(".search-button-class").click(function(e) {
    e.preventDefault()
    search = $("#search-input").val();
    // $('#container').toggleClass("hide");
    // console.log(search)
    getWikiArticles()
    wikipediaTest.empty()
    
    getYoutubeVideo()
    videoTest.empty()
});

$(".search-button-modal").click(function(e) {
    e.preventDefault()
    search = $("#search-input-modal").val();
    $("div#container").toggleClass("hide");
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
    // var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + search + "&format=json&origin=*"
    //var queryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles="+ search +"&rvslots=*&rvprop=content&format=json&origin=*"
    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=allimages&aifrom=B&generator=search&links&gsrsearch="+ search +"&gsrlimit=1&prop=pageimages|extracts&exintro&exlimit=max&format=json&origin=*&pithumbsize=1000"
    //var queryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles="+ search +"&rvslots=*&rvprop=content&format=json&origin=*"
    //var queryURL = "http://en.wikipedia.org/w/api.php?action=parse&format=json&page=Rome&prop=text|extract&format=json&origin=*"
    $.ajax({
        url: queryURL,
        method: "GET",
        error: () => {
            alert("error")
            return
        },
    }).then(function(wikiData) {
        console.log(wikiData);
        var test = wikiData.query.pages;
        // var test2 = Object.keys(test).toString()
        var results = wikiData.query.pages
        Object.keys(results).forEach( key => {
            const id = key
            const title = results[key].title
            const text = results[key].extract
            console.log(results[key].extract)
            const image = results[key].thumbnail.source
            // console.log( id, title, text)
            wikipediaTest.append(`
                <h2>${title}</h2>
                <img src="${image}">
                <p>${text}</p>
            `)
        }) 
        console.log(results)
    });
}

