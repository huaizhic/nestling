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

    if (amenities1 == "station" and amenities2 == "supermarket" and amenities3 == "primary school") or \
    (amenities1 == "station" and amenities2 == "primary school" and amenities3 == "supermarket") or \
    (amenities1 == "supermarket" and amenities2 == "station" and amenities3 == "primary school") or \
    (amenities1 == "supermarket" and amenities2 == "primary school" and amenities3 == "station") or \
    (amenities1 == "primary school" and amenities2 == "station" and amenities3 == "supermarket") or \
    (amenities1 == "primary school" and amenities2 == "supermarket" and amenities3 == "station"):
        pickle_filename = "MRTSupermarketPrimarySchool.pkl"

    elif (amenities1 == "station" and amenities2 == "supermarket" and amenities3 == "secondary school") or \
        (amenities1 == "station" and amenities2 == "secondary school" and amenities3 == "supermarket") or \
        (amenities1 == "supermarket" and amenities2 == "station" and amenities3 == "secondary school") or \
        (amenities1 == "supermarket" and amenities2 == "secondary school" and amenities3 == "station") or \
        (amenities1 == "secondary school" and amenities2 == "station" and amenities3 == "supermarket") or \
        (amenities1 == "secondary school" and amenities2 == "supermarket" and amenities3 == "station"):
        pickle_filename = "MRTSupermarketSecondarySchool.pkl"

    elif (amenities1 == "station" and amenities2 == "supermarket" and amenities3 == "park") or \
        (amenities1 == "station" and amenities2 == "park" and amenities3 == "supermarket") or \
        (amenities1 == "supermarket" and amenities2 == "station" and amenities3 == "park") or \
        (amenities1 == "supermarket" and amenities2 == "park" and amenities3 == "station") or \
        (amenities1 == "park" and amenities2 == "station" and amenities3 == "supermarket") or \
        (amenities1 == "park" and amenities2 == "supermarket" and amenities3 == "station"):
        pickle_filename = "MRTSupermarketPark.pkl"

    elif (amenities1 == "station" and amenities2 == "supermarket" and amenities3 == "mall") or \
        (amenities1 == "station" and amenities2 == "mall" and amenities3 == "supermarket") or \
        (amenities1 == "supermarket" and amenities2 == "station" and amenities3 == "mall") or \
        (amenities1 == "supermarket" and amenities2 == "mall" and amenities3 == "station") or \
        (amenities1 == "mall" and amenities2 == "station" and amenities3 == "supermarket") or \
        (amenities1 == "mall" and amenities2 == "supermarket" and amenities3 == "station"):
        pickle_filename = "MRTSupermarketMall.pkl"

    elif (amenities1 == "station" and amenities2 == "primary school" and amenities3 == "secondary school") or \
        (amenities1 == "station" and amenities2 == "secondary school" and amenities3 == "primary school") or \
        (amenities1 == "primary school" and amenities2 == "station" and amenities3 == "secondary school") or \
        (amenities1 == "primary school" and amenities2 == "secondary school" and amenities3 == "station") or \
        (amenities1 == "secondary school" and amenities2 == "station" and amenities3 == "primary school") or \
        (amenities1 == "secondary school" and amenities2 == "primary school" and amenities3 == "station"):
        pickle_filename = "MRTPrimarySchoolSecondarySchool.pkl"

    elif (amenities1 == "station" and amenities2 == "primary school" and amenities3 == "park") or \
        (amenities1 == "station" and amenities2 == "park" and amenities3 == "primary school") or \
        (amenities1 == "primary school" and amenities2 == "station" and amenities3 == "park") or \
        (amenities1 == "primary school" and amenities2 == "park" and amenities3 == "station") or \
        (amenities1 == "park" and amenities2 == "station" and amenities3 == "primary school") or \
        (amenities1 == "park" and amenities2 == "primary school" and amenities3 == "station"):
        pickle_filename = "MRTPrimarySchoolPark.pkl"

    elif (amenities1 == "station" and amenities2 == "primary school" and amenities3 == "mall") or \
        (amenities1 == "station" and amenities2 == "mall" and amenities3 == "primary school") or \
        (amenities1 == "primary school" and amenities2 == "station" and amenities3 == "mall") or \
        (amenities1 == "primary school" and amenities2 == "mall" and amenities3 == "station") or \
        (amenities1 == "mall" and amenities2 == "station" and amenities3 == "primary school") or \
        (amenities1 == "mall" and amenities2 == "primary school" and amenities3 == "station"):
        pickle_filename = "MRTPrimarySchoolMall.pkl"

    elif (amenities1 == "station" and amenities2 == "secondary school" and amenities3 == "park") or \
        (amenities1 == "station" and amenities2 == "park" and amenities3 == "secondary school") or \
        (amenities1 == "secondary school" and amenities2 == "station" and amenities3 == "park") or \
        (amenities1 == "secondary school" and amenities2 == "park" and amenities3 == "station") or \
        (amenities1 == "park" and amenities2 == "station" and amenities3 == "secondary school") or \
        (amenities1 == "park" and amenities2 == "secondary school" and amenities3 == "station"):
        pickle_filename = "MRTSecondarySchoolPark.pkl"

    elif (amenities1 == "station" and amenities2 == "secondary school" and amenities3 == "mall") or \
        (amenities1 == "station" and amenities2 == "mall" and amenities3 == "secondary school") or \
        (amenities1 == "secondary school" and amenities2 == "station" and amenities3 == "mall") or \
        (amenities1 == "secondary school" and amenities2 == "mall" and amenities3 == "station") or \
        (amenities1 == "mall" and amenities2 == "station" and amenities3 == "secondary school") or \
        (amenities1 == "mall" and amenities2 == "secondary school" and amenities3 == "station"):
        pickle_filename = "MRTSecondarySchoolMall.pkl"

    elif (amenities1 == "station" and amenities2 == "park" and amenities3 == "mall") or \
        (amenities1 == "station" and amenities2 == "mall" and amenities3 == "park") or \
        (amenities1 == "park" and amenities2 == "station" and amenities3 == "mall") or \
        (amenities1 == "park" and amenities2 == "mall" and amenities3 == "station") or \
        (amenities1 == "mall" and amenities2 == "station" and amenities3 == "park") or \
        (amenities1 == "mall" and amenities2 == "park" and amenities3 == "station"):
        pickle_filename = "MRTParkMall.pkl"

    elif (amenities1 == "supermarket" and amenities2 == "primary school" and amenities3 == "secondary school") or \
        (amenities1 == "supermarket" and amenities2 == "secondary school" and amenities3 == "primary school") or \
        (amenities1 == "primary school" and amenities2 == "supermarket" and amenities3 == "secondary school") or \
        (amenities1 == "primary school" and amenities2 == "secondary school" and amenities3 == "supermarket") or \
        (amenities1 == "secondary school" and amenities2 == "supermarket" and amenities3 == "primary school") or \
        (amenities1 == "secondary school" and amenities2 == "primary school" and amenities3 == "supermarket"):
        pickle_filename = "SupermarketPrimarySchoolSecondarySchool.pkl"

    elif (amenities1 == "supermarket" and amenities2 == "primary school" and amenities3 == "park") or \
        (amenities1 == "supermarket" and amenities2 == "park" and amenities3 == "primary school") or \
        (amenities1 == "primary school" and amenities2 == "supermarket" and amenities3 == "park") or \
        (amenities1 == "primary school" and amenities2 == "park" and amenities3 == "supermarket") or \
        (amenities1 == "park" and amenities2 == "supermarket" and amenities3 == "primary school") or \
        (amenities1 == "park" and amenities2 == "primary school" and amenities3 == "supermarket"):
        pickle_filename = "SupermarketPrimarySchoolPark.pkl"

    elif (amenities1 == "supermarket" and amenities2 == "primary school" and amenities3 == "mall") or \
        (amenities1 == "supermarket" and amenities2 == "mall" and amenities3 == "primary school") or \
        (amenities1 == "primary school" and amenities2 == "supermarket" and amenities3 == "mall") or \
        (amenities1 == "primary school" and amenities2 == "mall" and amenities3 == "supermarket") or \
        (amenities1 == "mall" and amenities2 == "supermarket" and amenities3 == "primary school") or \
        (amenities1 == "mall" and amenities2 == "primary school" and amenities3 == "supermarket"):
        pickle_filename = "SupermarketPrimarySchoolMall.pkl"

    elif (amenities1 == "supermarket" and amenities2 == "secondary school" and amenities3 == "park") or \
        (amenities1 == "supermarket" and amenities2 == "park" and amenities3 == "secondary school") or \
        (amenities1 == "secondary school" and amenities2 == "supermarket" and amenities3 == "park") or \
        (amenities1 == "secondary school" and amenities2 == "park" and amenities3 == "supermarket") or \
        (amenities1 == "park" and amenities2 == "supermarket" and amenities3 == "secondary school") or \
        (amenities1 == "park" and amenities2 == "secondary school" and amenities3 == "supermarket"):
        pickle_filename = "SupermarketSecondarySchoolPark.pkl"

    elif (amenities1 == "supermarket" and amenities2 == "secondary school" and amenities3 == "mall") or \
        (amenities1 == "supermarket" and amenities2 == "mall" and amenities3 == "secondary school") or \
        (amenities1 == "secondary school" and amenities2 == "supermarket" and amenities3 == "mall") or \
        (amenities1 == "secondary school" and amenities2 == "mall" and amenities3 == "supermarket") or \
        (amenities1 == "mall" and amenities2 == "supermarket" and amenities3 == "secondary school") or \
        (amenities1 == "mall" and amenities2 == "secondary school" and amenities3 == "supermarket"):
        pickle_filename = "SupermarketSecondarySchoolMall.pkl"

    elif (amenities1 == "supermarket" and amenities2 == "park" and amenities3 == "mall") or \
        (amenities1 == "supermarket" and amenities2 == "mall" and amenities3 == "park") or \
        (amenities1 == "park" and amenities2 == "supermarket" and amenities3 == "mall") or \
        (amenities1 == "park" and amenities2 == "mall" and amenities3 == "supermarket") or \
        (amenities1 == "mall" and amenities2 == "supermarket" and amenities3 == "park") or \
        (amenities1 == "mall" and amenities2 == "park" and amenities3 == "supermarket"):
        pickle_filename = "SupermarketParkMall.pkl"

    elif (amenities1 == "primary school" and amenities2 == "secondary school" and amenities3 == "park") or \
        (amenities1 == "primary school" and amenities2 == "park" and amenities3 == "secondary school") or \
        (amenities1 == "secondary school" and amenities2 == "primary school" and amenities3 == "park") or \
        (amenities1 == "secondary school" and amenities2 == "park" and amenities3 == "primary school") or \
        (amenities1 == "park" and amenities2 == "primary school" and amenities3 == "secondary school") or \
        (amenities1 == "park" and amenities2 == "secondary school" and amenities3 == "primary school"):
        pickle_filename = "PrimarySchoolSecondarySchoolPark.pkl"

    elif (amenities1 == "primary school" and amenities2 == "secondary school" and amenities3 == "mall") or \
        (amenities1 == "primary school" and amenities2 == "mall" and amenities3 == "secondary school") or \
        (amenities1 == "secondary school" and amenities2 == "primary school" and amenities3 == "mall") or \
        (amenities1 == "secondary school" and amenities2 == "mall" and amenities3 == "primary school") or \
        (amenities1 == "mall" and amenities2 == "primary school" and amenities3 == "secondary school") or \
        (amenities1 == "mall" and amenities2 == "secondary school" and amenities3 == "primary school"):
        pickle_filename = "PrimarySchoolSecondarySchoolMall.pkl"

    elif (amenities1 == "primary school" and amenities2 == "park" and amenities3 == "mall") or \
        (amenities1 == "primary school" and amenities2 == "mall" and amenities3 == "park") or \
        (amenities1 == "park" and amenities2 == "primary school" and amenities3 == "mall") or \
        (amenities1 == "park" and amenities2 == "mall" and amenities3 == "primary school") or \
        (amenities1 == "mall" and amenities2 == "primary school" and amenities3 == "park") or \
        (amenities1 == "mall" and amenities2 == "park" and amenities3 == "primary school"):
        pickle_filename = "PrimarySchoolParkMall.pkl"

    elif (amenities1 == "secondary school" and amenities2 == "park" and amenities3 == "mall") or \
        (amenities1 == "secondary school" and amenities2 == "mall" and amenities3 == "park") or \
        (amenities1 == "park" and amenities2 == "secondary school" and amenities3 == "mall") or \
        (amenities1 == "park" and amenities2 == "mall" and amenities3 == "secondary school") or \
        (amenities1 == "mall" and amenities2 == "secondary school" and amenities3 == "park") or \
        (amenities1 == "mall" and amenities2 == "park" and amenities3 == "secondary school"):
        pickle_filename = "SecondarySchoolParkMall.pkl"

    # Load the model from the pickle file
    model = load_model_from_pickle(pickle_filename)

    # Example input values
    input_values = [np.array([distanceRadius, distanceRadius, distanceRadius, area])]  # Adjust as needed

    estimated_price = model.predict(input_values)

    print(estimated_price)

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
