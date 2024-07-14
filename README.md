This web application represents Taos, New Mexico in a road network stored in a neo4j database. Database queries allow the front-end to plot routes using leaflet.js to simulate a GPS.

NOTE: This repository was developed to run in a GitHub codespace with Docker. This repository is connected to an example neo4j database that already has street and road data imported. There's no need to run the notebook scripts unless you are using your own neo4j database. 

Steps to run:
1. Create a codespace and wait for codespace to recognize poetry file and install notebook dependencies.
2. Run docker-compose up.
3. Open application in browser running on port 8000.
4. Click web/ -> address_routing.html
