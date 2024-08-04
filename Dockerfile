#Declares language version
FROM python:3

<<<<<<< HEAD
#Logs outputs. Useful for debugging
ENV PYTHONUNBUFFERED 1

#Avoids creation of .pyc files to filesystem.
ENV PYTHONDONTWRITEBYTECODE 1

#Sets path of container to host the other commands.
WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

=======
#Sets path of container to host the other commands.
WORKDIR /app

>>>>>>> d6e93abfcb8f6e52c5e4869e1c6b70ae149e936d
#Copies dependencies to /app/requirements.txt path
COPY requirements.txt requirements.txt

#Installs dependencies in container.
RUN pip install -r requirements.txt

#Copies all files in the current directory to the working directory of the container.
<<<<<<< HEAD
COPY . .

CMD ["python", "server.py"]
=======
COPY . .
>>>>>>> d6e93abfcb8f6e52c5e4869e1c6b70ae149e936d
