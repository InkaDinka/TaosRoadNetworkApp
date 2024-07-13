#Declares language version
FROM python:3

#Sets path of container to host the other commands.
WORKDIR /app

#Copies dependencies to /app/requirements.txt path
COPY requirements.txt requirements.txt

#Installs dependencies in container.
RUN pip install -r requirements.txt

#Copies all files in the current directory to the working directory of the container.
COPY . .