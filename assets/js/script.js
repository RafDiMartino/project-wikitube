const youtubeAPI = "AIzaSyARAdM68mQB0klzmy4LNFuo2e8Z4t4BQu8"
const pastSearches = $(".history");
var videoTest = $("#youtube-test")
var wikipediaTest = $("#wikipedia-test")
var search = "";
var searchHistory = [];

//Modal
$("#exampleModal").modal("show");

// Event listener to get the search value from the page
$(".search-button-class").click(function(e) {
    e.preventDefault()
    search = $("#search-input").val();
    if (searchHistory.includes(search) || search === "") {
        $("div#container").addClass("hide");
        wikipediaTest.empty()
        videoTest.empty()
        location.reload()
        return
    }else{
        searchHistory.push(search)
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        initSearchHistory()
        getWikiArticles()
        wikipediaTest.empty()
        getYoutubeVideo()
        videoTest.empty()
        console.log(searchHistory)
        $("div#container").removeClass("hide")
    }
});

// Event listener to get the search value from the modal
$(".search-button-modal").click(function(e) {
    e.preventDefault()
    search = $("#search-input-modal").val();
    if (searchHistory.includes(search) || search === "") {
        location.reload()
        return
    }else{
        searchHistory.push(search)
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        wikipediaTest.fadeOut()
        $("div#container").removeClass("hide");
        getWikiArticles()  
        getYoutubeVideo()
        videoTest.empty()
        initSearchHistory()  
    } 
});

//Function to get Youtube videos using the youtube API
function getYoutubeVideo(){
    var queryURL = "https://www.googleapis.com/youtube/v3/search?key="+ youtubeAPI +"&q="+ search +"&type=video&part=snippet&videoEmbeddable=true&videoSyndicated=true&videoLicense=youtube&order=viewCount"
    $.ajax({
        url: queryURL,
        method: "GET"
        
    }).then(function(youtubeData) {
        console.log(youtubeData)
        for (let i = 0; i < youtubeData.items.length; i++) {
            var videoId = youtubeData.items[i].id.videoId;
            videoTest.append(`
            <div class="video" id="video${i+1}">
                <iframe width="100%" height="100%"
                    src="https://www.youtube.com/embed/${videoId}">
                </iframe>
            </div>
            `)
            .hide()
            .fadeIn(500)
        }
    });   
}

//Function to get Wikipedia articles using the Wikipedia API
function getWikiArticles() {
    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=allimages&aifrom=B&generator=search&links&gsrsearch=" + search + "&gsrlimit=1&prop=pageimages|extracts&exintro&exlimit=max&format=json&origin=*&pithumbsize=1000"
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (wikiData) {
        var results = wikiData.query.pages
        Object.keys(results).forEach(key => {
            const id = key
            const title = results[key].title
            const text = results[key].extract
            const image = results[key].thumbnail.source
            wikipediaTest.append(`
                <h2>${title}</h2>
                <img src="${image}">
                <p>${text}</p>
            `)
            .hide()
            .fadeIn(500)
        })
        console.log(results)
    });
}

// Adds a click event to all the buttons wiht a class of past-search 
$(document).on('click', '.past-search', historySearches);

// Function to re-display the current weather based on the click of past-searches buttons
function historySearches(){
    search = $(this).attr("data-search")
    $("div#container").removeClass("hide");
    getWikiArticles()
    wikipediaTest.empty().fadeOut()
    getYoutubeVideo()
    videoTest.empty()
}

//function to get past searches from local storage
function initSearchHistory(){
    var storedHistory = localStorage.getItem('search-history');
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
        renderSearchHistory(searchHistory); 
    }
}

//Function to render past searches buttons
function renderSearchHistory(searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
        const element = searchHistory[i];
        if (searchHistory[i].includes(search)) {
            pastSearches.prepend($(`<button class="past-search btn btn-outline-dark mb-2" data-search="${element}" data-dismiss="modal">`).text(element));
        } 
    }
}
initSearchHistory()

// Clear searches event listener
$(".clear-search").click(function() {
    location.reload()
    localStorage.clear();
    searchHistory = ""
})