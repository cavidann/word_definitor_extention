function setup() {
    let bgpage = chrome.extension.getBackgroundPage();
    let word = bgpage.word;

    let url = `https://api.wordnik.com/v4/word.json/
    ${word}
    /definitions?limit=1
    &includeRelated=false
    &sourceDictionaries=all
    &useCanonical=false
    &includeTags=false
    &api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;

    url = url.replace(/\s+/g, '');
    loadData(url);

    // document.getElementById('selectedWord').innerHTML = word;

    // var node = document.createElement("h1");                 // Create a <li> node
    // var textnode = document.createTextNode(word);         // Create a text node
    // node.appendChild(textnode);                              // Append the text to <li>
    // document.body.appendChild(node);
}

function loadData(url) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.responseText) {
            gotData(JSON.parse(Http.responseText)[0]);
        }

    }
}

function gotData(data) {
    addDefinition(data);
}

function addDefinition(data) {
    document.getElementById('word').innerHTML = data.word;
    document.getElementById('definition').innerHTML = data.text;
}

setup();