from flask import Flask, jsonify
from flask_cors import CORS
import os
from supabase import create_client
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from flask import request
import pickle
import json
import numpy as np

app = Flask(__name__)
cors = CORS(app, origins='*')

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
    distance = data.get("distanceRadius")
    area = data.get("area")

    pickle_filename = "SupermarketPrimarySchoolPark.pkl"

    # Load the model from the pickle file
    model = load_model_from_pickle(pickle_filename)

    # Example input values
    input_values = [np.array([distanceRadius, distanceRadius, distanceRadius, area])]  # Adjust as needed

    estimated_price = model.predict(input_values)

    # Create a JSON response containing the estimated price
    response_data = {"estimated_price": estimated_price}

    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
