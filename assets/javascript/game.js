
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

addDefaultBtn();

$(".addBtn").click(function(event) {

    event.preventDefault();

    var addBtn = $("#typeinKeyWord").val()

    if(!addBtn) {
        return;
    };
    // if ($("#typeinKeyWord").val() != "") {
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
    // };
});

$(".searchBtn").click(function(){

    var currentSearchName = $(this).attr("btn-name").replace(/ /g, "+");
    console.log(currentSearchName);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSearchName + "&api_key=" + apiKey + "&limit=20";
    
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
                .addClass("pLineBr");
            var gifImg = $("<img>")
                .addClass("gif")
                .attr("src",imgURLStill)
                .attr("imgStill",imgURLStill)
                .attr("imgAnimate",imgURLAnimate)
                .attr("currentStatus","still")
                .attr("alt","Gif Image");
            gifCol.append(p);
            gifCol.append(gifImg);
            $(".displayRow").append(gifCol);
        };

    });
});
