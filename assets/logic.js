var searchBox = document.querySelector('#searchBox');
var searchButton = document.querySelector('#searchButton');
var results = document.querySelector('#resultContainer');

var NASA_API_URL = 'https://images-api.nasa.gov/search?q='


searchButton.addEventListener('click', function() {
    var userInput = searchBox.value;
    fetchResults(userInput);
})


function fetchResults(input) {
    fetch (NASA_API_URL + input)
    .then(function (res) {
        if (!res.ok) throw new Error('oops got an error');
        return res.json();
    })
    .then(function (data) {
        console.log('data :>>', data);
        renderResults(data.collection.items);
    })
    .catch(function (error) {
        console.error(error);
    });
}

function renderResults(NasaData) {
    results.textContent= "";
    if (NasaData.length === 0) {
        var noResults = document.createElement('h2');
        noResults.textContent = "Sorry, nothing was found";
        noResults.setAttribute('id', 'noResults');
        results.append(noResults);
    }

    for (i=0; i < NasaData.length; i++) {
        var resultLinks = (NasaData[i].links[0]);
        var resultData = (NasaData[i].data[0]);
        var resultIMG = resultLinks.href;
        var resultTitle = resultData.title;
        var resultDesc = resultData.description;

        var newIMG = document.createElement('img');
        newIMG.setAttribute('src',resultIMG);

        var newTitle = document.createElement('h4');
        newTitle.textContent = resultTitle;

        var newDesc = document.createElement('p');
        newDesc.textContent = resultDesc;

        var resultBox = document.createElement('div')
        resultBox.append(newIMG);
        resultBox.append(newTitle);
        resultBox.append(newDesc);

        results.append(resultBox);
}
}