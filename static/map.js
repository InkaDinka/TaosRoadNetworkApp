//Initializes map at the coordinates of Taos, NM
var map = L.map('map').setView([36.391686, -105.58258], 13);
    
//Uses the tiles from openstreetmap and adds them to the map.
const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,
                    attribution: 
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }
            ).addTo(map);

let currentPolylines = null
let currentMarkers = []

function getRoute(driver, source, dest) {
    //Removes previous layer if it exists.
        if(currentPolylines) {
            map.removeLayer(currentPolylines);
        }
    //Removes previous markers from previous route submissions.
        currentMarkers.forEach(marker => map.removeLayer(marker));
        currentMarkers = [];

    //Creates a driver session in READ mode to query database.
        var session = driver.session({
            database: "neo4j",
            defaultAccessMode: neo4j.session.READ,
        });

        const routeQuery = `
            //$source will be passed as the "From" attribute from the form as the full_address.
            MATCH (to {full_address: $source})-[:NEAREST_INTERSECTION]->(source:Intersection) 
            //$dest will be passed as the "To" attribute from the form as the full_address.
            MATCH (from {full_address: $dest})-[:NEAREST_INTERSECTION]->(target:Intersection) 
            CALL apoc.algo.dijkstra(source, target, "ROAD_SEGMENT", "length") YIELD path, weight 
            //Returns an array of coordinates from the intersection nodes that make up the path.
            RETURN [n in nodes(path) | [n.location.latitude, n.location.longitude]] AS route
            `;
    
        var session = driver.session({
            database: "neo4j",
            defaultAccessMode: neo4j.session.READ,
        });
        //Creates a polyline based on the route coordinates returned from the query using the dijkstra function
        session.run(routeQuery, { source, dest }).then((routeResult) => {
                if(routeResult.records.length == 0)
                {
                    let item = document.getElementById("noRouteMessage");
                    if(item){
                        item.remove();
                    }
                    let noRoute = document.createElement("div");
                    let message = document.createTextNode("No Route Between Locations");

                    noRoute.classList.add("message");
                    noRoute.id = "noRouteMessage";
                    noRoute.appendChild(message);

                    let currentDiv = document.getElementById("noRoute");
                    document.body.insertBefore(noRoute, currentDiv);
                }
                else {
                    let item = document.getElementById("noRouteMessage");
                    if(item){
                        item.remove();
                    }
                }
                routeResult.records.forEach((routeRecord) => {
                const routeCoords = routeRecord.get("route");
            //Updates polyline variable so that the map is updated each time a new route form is submitted.
                        currentPolylines = L.polyline(routeCoords)
                            .setStyle({ color: "magenta", weight: 8 })
                            .addTo(map);

                        // console.log(routeCoords[0])
                        // console.log(routeCoords[routeCoords.length-1])
            //Fetches the first node of the route as the start and last node of the route as the end.
                            var corner1 = L.latLng(routeCoords[0][0], routeCoords[0][1]),
                            corner2 = L.latLng(routeCoords[routeCoords.length-1][0], routeCoords[routeCoords.length-1][1])
            //Creates new markers for new route indicating start and end.
                            const start = L.marker(corner1).addTo(map).bindPopup(source).openPopup();
                            const end = L.marker(corner2).addTo(map).bindPopup(dest).openPopup();
                            currentMarkers.push(start, end);
                    
                });
            })
            .catch((error) =>{
                console.log(error);
            })
            .then(() => {
                session.close();
            });

}
