driver = neo4j.driver("neo4j+s://1f724fe9.databases.neo4j.io", neo4j.auth.basic("neo4j", "MSwi-gYFniNhJ-ccPKnTS7dZnv0qh20N02XwCRaiLlc"));

function autocomplete(inputID) {
    let arr = []
    let fdata = document.getElementById(inputID);
    var session = driver.session()

    session.run('CALL db.index.fulltext.queryNodes("search_index", $searchString) YIELD node, score RETURN coalesce(node.name, node.full_address) AS value, score, labels(node)[0] AS label, node.id AS id ORDER BY score DESC LIMIT 25', { searchString: fdata.value })
    .then((result) => {
        result.records.forEach((record) => {
            const address = {
                address: record.get("value"),
                score: record.get("score")
            };
            if(address.address.includes("TAOS")){
                arr.push(address);
                arr.sort((a, b) => b.score - a.score);
            }
        });

    });
    
    fdata.addEventListener("keyup", (e) => {
        removeAutoElements();
        for(let i of arr) {
            
            if(i.address.toLowerCase().startsWith(fdata.value.toLowerCase()) && fdata.value != null){
                let listItem = document.createElement("li");
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                listItem.setAttribute("onclick", "displayNames('" + inputID + "', '" + i.address + "')");

                let word = "<b>" + i.address.substr(0, fdata.value.length) + "</b>";
                word += i.address.substr(fdata.value.length);

                listItem.innerHTML = word;
                document.querySelector(".autocomplete").appendChild(listItem);
            }
        }
    });
}

function displayNames(ID, address){
    element = document.getElementById(ID);
    element.value = address;
    removeAutoElements();
}
function removeAutoElements(){
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}

document.getElementById('source').addEventListener('input', function(e) {
    autocomplete("source");
});
document.getElementById('dest').addEventListener('input', function(e) {
    autocomplete("dest");
});
// Event listener for form submission
document.getElementById('routeForm').addEventListener('submit', function(e) {
//Allows for javascript to handle the submit event instead of refreshing the page.
    e.preventDefault();

    //Selects the input of the source (From) location 
    const source = document.getElementById('source').value;
    
    //Selects the input of the source (To) location 
    const destination = document.getElementById('dest').value;

    // Call function to get route
    getRoute(driver, source, destination);
    //Resets routeForm after submission.
    document.getElementById('routeForm').reset();

});