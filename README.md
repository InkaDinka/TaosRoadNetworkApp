# Taos Road Network

This web application represents Taos, New Mexico in a road network stored in a neo4j database. Database queries allow the front-end to plot routes using leaflet.js to simulate a GPS. The project is connected to an example neo4j database that already has street and road data imported. There's no need to run the notebook scripts.

Test its functionality by submitting these addresses:
- From: 343 SIERRA VISTA LN TAOS, NM 87571
- To: 343 JARAMILLO RD TAOS, NM 87571

## How To Run

### Method 1
Steps to run in codespace:
1. Create a codespace and wait for codespace to recognize poetry file and install notebook dependencies.
2. Run docker-compose up.
3. Open application in browser running on port 8000.
4. Click web/ -> address_routing.html

### Method 2
Clone repository and run:
1. python server.py
