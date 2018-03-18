
var topics = ["Duck", "panda", "crocodile","dog", "hamster", "bird","turtle", "chicken", 
"turkey","bison", "dolphin", "Eagle","pony", "ape", "lobster","monkey", "deer", "rabbit","Gray Wolf","Lion","Shark","bear"];

var topicsC = topics.map(ele => (ele[0].toUpperCase()+ele.substr(1)));

var apiKey = "dc6zaTOxFJmzC";

function addTagBtn(arr) {
    var newButton = $("<button>")
        .addClass("btn btn-primary btn-space searchBtn")
        .text(arr)
        .attr("btn-name", arr)
        .attr("type","submit");
    $(".btnRow").append(newButton);

}

function addDefaultBtn() {
    $(".btnRow").empty();
    topicsC.map((currElement, index) => addTagBtn(currElement,index.toString()));
};



$(".addBtn").click(function(event) {

    event.preventDefault();

    var addBtn = $("#typeinKeyWord").val()

    if(!addBtn) {
        return;
    };
    addBtn_Cap = addBtn[0].toUpperCase() + addBtn.substr(1);
    if (topicsC.indexOf(addBtn) === -1) {
        topicsC.push(addBtn_Cap);
        console.log(topicsC);
        addTagBtn(topicsC[topicsC.length - 1], (topicsC.length-1));
    } else {
        alert("The entered search term exist!");
    }

    $("#typeinKeyWord").val('');

    addDefaultBtn();

    $(".gif").unbind();
    $(".searchBtn").unbind();

    searchGif();

});

function searchGif() {

    $(".searchBtn").click(function(){

        var currentSearchName = $(this).attr("btn-name").replace(/ /g, "+");
        console.log(currentSearchName);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSearchName + "&api_key=" + apiKey + "&limit=21";
        
        $.ajax({
            url: queryURL, 
            method:"GET" 
        }).then(function(response){
    
            $(".displayRow").empty();
            console.log(response);
            var results = response.data;
    
            for(var i=0; i<results.length; i++) {
                var rating = results[i].rating;
                var imgURLAnimate = results[i].images.fixed_height.url;
                var imgURLStill = results[i].images.fixed_height_still.url;
    
                var gifCol = $("<div>").addClass("col-md-4");
                var p = $("<p>")
                    .text("Rating: "+rating)
                    .addClass("pLineBr")
                    .addClass("text-uppercase");
                var gifImg = $("<img>")
                    .addClass("gif")
                    .attr("src",imgURLStill)
                    .attr("imgStill",imgURLStill)
                    .attr("imgAnimate",imgURLAnimate)
                    .attr("currentStatus","still")
                    .attr("alt",currentSearchName+" Gif Image");
                gifCol.append(p);
                gifCol.append(gifImg);
                $(".displayRow").append(gifCol);
            };
    
            $(".gif").click(function(){
    
                var imgURLAnimate = $(this).attr("imgAnimate");
                console.log(imgURLAnimate);
                var imgURLStill = $(this).attr("imgStill");
                console.log(imgURLStill);
            
                if($(this).attr("currentStatus") === "still") {
                    $(this).attr("src",imgURLAnimate);
                    $(this).attr("currentStatus","animate");
                } else {
                    $(this).attr("src",imgURLStill);
                    $(this).attr("currentStatus","still");
                };
            });
    
        });
    });    
}

addDefaultBtn();
searchGif();