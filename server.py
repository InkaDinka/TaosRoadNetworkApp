from flask import Flask, render_template, request, Response
import os

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def webpage():
    return render_template("address_routing.html")

if __name__ == '__main__':

#Set debug to true so server doesn't need to be executed with every change.
    app.run(port=int(os.environ.get("PORT", 8080)), host='0.0.0.0', debug=True)