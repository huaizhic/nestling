import flask
from flask import Flask, jsonify
import os
from flask import request
import pickle
import json
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", methods=["GET", "POST"], allow_headers=["Content-Type"])


@app.route("/generate_price", methods=["POST"])
def generate_price():
    # Function to load the model from a pickle file
    def load_model_from_pickle(pickle_filename):
        with open(pickle_filename, 'rb') as f:
            model = pickle.load(f)
        return model

    data = request.json
    amenities1 = data.get("amenities1")
    amenities2 = data.get("amenities2")
    amenities3 = data.get("amenities3")
    distanceRadius = data.get("distanceRadius")
    area = data.get("area")

    pickle_filename = "SupermarketPrimarySchoolMall.pkl"

    # Load the model from the pickle file
    model = load_model_from_pickle(pickle_filename)

    # Example input values
    input_values = [np.array([distanceRadius, distanceRadius, distanceRadius, area])]  # Adjust as needed

    estimated_price = model.predict(input_values)

    # Convert the estimated price to an integer
    estimated_price_integer = int(estimated_price)

    # Create a JSON response containing the estimated price
    response_data = {"estimated_price": estimated_price_integer}

    return jsonify(response_data)

@app.route("/", methods=["GET"])
def index():
    return "Welcome to the generate_price API!"

@app.route("/favicon.ico")
def favicon():
    return ""

if __name__ == "__main__":
    app.run(debug=True, port=8000)
