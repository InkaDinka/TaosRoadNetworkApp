
driver = neo4j.driver("neo4j+s://4a8a0d17.databases.neo4j.io", neo4j.auth.basic("neo4j", "J065QWWYW4Y3Mjc-Vozijb1V6A5kkwxC_a-zYskPCho"));

function autocomplete(inputID) {
    let arr = []
    // The element ID of the "From" and "To" input fields will be passed to the autocomplete function.
    let fdata = document.getElementById(inputID);
    var session = driver.session()

    //Each time the user types a character into the "From" and "To" fields the current input will be compared to addresses in the database and each address
    //will be given a score based on how close the input is to the addresses found in the database.
    session.run('CALL db.index.fulltext.queryNodes("search_index", $searchString) YIELD node, score RETURN coalesce(node.name, node.full_address) AS value, score, labels(node)[0] AS label, node.id AS id ORDER BY score DESC LIMIT 25', { searchString: fdata.value })
    .then((result) => {
        result.records.forEach((record) => {
            //For all addresses found each address has its name and score in a hash table and will be added to an array that is sorted based on the score
            const address = {
                address: record.get("value"),
                score: record.get("score")
            };
            if(address.address.includes("TAOS")){
                arr.push(address);
            //Sorted from highest score to lowest score.
                arr.sort((a, b) => b.score - a.score);
            }
        });

    });
    
    //Each time the user enters a character list elements are added to the form consisting of the matched addresses.
    fdata.addEventListener("keyup", (e) => {
        e.preventDefault();
        //resets list each for every character entered.
        removeAutoElements();
        //For each address in arr...
        for(let i of arr) {
            //Compares user input to element in array.
            if(i.address.toLowerCase().startsWith(fdata.value.toLowerCase()) && fdata.value != null){

                //If matched create new list element
                let listItem = document.createElement("li");
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                //Calls displayNames function for when the user clicks the address they want and it auto fills the input field and deletes all list items. 
                listItem.setAttribute("onclick", "displayNames('" + inputID + "', '" + i.address + "')");

                //Sets the user's matched characters of the addresses in the autofill list items to bold
                let word = "<b>" + i.address.substr(0, fdata.value.length) + "</b>";
                word += i.address.substr(fdata.value.length);

                listItem.innerHTML = word;
                //Attaches the list-items to the form as a child html element.
                document.querySelector(".autocomplete").appendChild(listItem);
            }
        }
    });
}

//Sets input field to passed address variable and clears list.
function displayNames(ID, address){
    element = document.getElementById(ID);
    element.value = address;
    removeAutoElements();
}
//Clears the list of autocomplete items.
function removeAutoElements(){
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}

//Added event listener to query database for each character inputted. 
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