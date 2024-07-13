This repository was developed to run in a GitHub codespace with Docker.

NOTE: This repository is connected to a neo4j instance via GitHub secrets and the notebooks do not need to be ran again.

Steps to run:
1. Create a codespace
2. Wait for codespace to recognize poetry file and install notebook dependencies.
3. Change server.js cors origin to your codespace url with port 8000 Ex. app.use(cors({credentials: true, origin: 'https://coughing-spork-v6vvqwxp494jhp545-8000.app.github.dev'}));
4. Change fetch url to your codespace url with port 3000 and path /data Ex. const response = await fetch('https://coughing-spork-x5wwvxjr679pf6qwp-3000.app.github.dev/data', {mode: 'cors', credentials: 'include'});
5. Run docker-compose up.
