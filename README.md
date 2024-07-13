This repository was developed to run in a GitHub codespace with Docker.

NOTE: This repository is connected to a personal neo4j database. Connect your own neo4j instance by using your database credentials with the GitHub secret names NEO4J_PASSWORD, NEO4J_URI, and NEO4J_USER. 

Steps to run:
1. Create a codespace
2. Wait for codespace to recognize poetry file and install notebook dependencies.
3. Change server.js cors origin to your codespace url with port 8000 Ex. app.use(cors({credentials: true, origin: 'https://coughing-spork-v6vvqwxp494jhp545-8000.app.github.dev'}));
4. Change fetch url in address_routing.html to your codespace url with port 3000 and path /data Ex. const response = await fetch('https://coughing-spork-x5wwvxjr679pf6qwp-3000.app.github.dev/data', {mode: 'cors', credentials: 'include'});
5. Run docker-compose up.
