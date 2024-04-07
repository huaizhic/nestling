from flask import Flask, jsonify
from flask_cors import CORS
import os
import json
from supabase import create_client
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from flask import request

app = Flask(__name__)
cors = CORS(app, origins='*')

url = "https://ycypmpdbtmpsjqublvez.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljeXBtcGRidG1wc2pxdWJsdmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMzY2NDQsImV4cCI6MjAyNDgxMjY0NH0.vBC30fXKWw3TRl5lFjEKHwkUSynnUfiNJ0fps2FNEUw"
supabase = create_client(url, key)
os.environ["OPENAI_API_KEY"] = "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"


def application(environ, start_response):
    if environ['REQUEST_METHOD'] == 'OPTIONS':
        start_response(
            '200 OK',
            [
                ('Content-Type', 'application/json'),
                ('Access-Control-Allow-Origin', '*'),
                ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
                ('Access-Control-Allow-Methods', 'POST'),
            ]
        )
        return ''


@app.route("/python", methods=['GET', 'POST'])
def users():

    # parses incoming JSON into a python dictionary
    # works, able to see in python cmd terminal
    dataGet = request.get_json(force=True)
    print('''====================================================
          dataGet: ''', dataGet, '''====================================================
          ''')

    # url = "https://ycypmpdbtmpsjqublvez.supabase.co"
    # key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljeXBtcGRidG1wc2pxdWJsdmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMzY2NDQsImV4cCI6MjAyNDgxMjY0NH0.vBC30fXKWw3TRl5lFjEKHwkUSynnUfiNJ0fps2FNEUw"
    # supabase = create_client(url,key)
    # os.environ["OPENAI_API_KEY"]= "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"

    # response1 = supabase.table('userInfo').select("desiredProperty").eq(
    #     "email", "nestling.ai@gmail.com").execute()
    # response = response1.data[0]

    # lisitingAttri = json.loads(dataGet)
    # print('''*************************************************************
    #       lisitingAttri: ''', lisitingAttri, '''************************************************************
    #       ''')

    # with open('sample.json', 'r') as file:
    #     # Load the JSON data into a Python dictionary
    #     lisitingAttri = json.load(file)

    # Function to format property information

    def format_SearchProperty(prop):
        formatted_prop = f"Location: {prop['searchLocation']}\n"
        formatted_prop += f"Desired Amenities:\n"
        formatted_prop += f"  - Amenity 1: {prop['searchAmenity1']}\n"
        formatted_prop += f"  - Amenity 2: {prop['searchAmenity2']}\n"
        formatted_prop += f"  - Amenity 3: {prop['searchAmenity3']}\n"
        formatted_prop += f"Room Count: {prop['searchRoomCount']}\n"
        formatted_prop += f"Distance Radius: {prop['searchDistance']}\n"
        formatted_prop += f"Gross Floor Area: {prop['searchGFA']}\n\n"
        return formatted_prop

    def format_CurrentProperty(prop):
        formatted_prop = f"Location: {prop['currentLocation']}\n"
        formatted_prop += f"Desired Amenities:\n"
        formatted_prop += f"  - Amenity 1: {prop['currentAmenity1']}\n"
        formatted_prop += f"  - Amenity 1 distance: {prop['currentAmenity1Distance']}\n"
        formatted_prop += f"  - Amenity 2: {prop['currentAmenity2']}\n"
        formatted_prop += f"  - Amenity 2 distance: {prop['currentAmenity2Distance']}\n"
        formatted_prop += f"  - Amenity 3: {prop['currentAmenity3']}\n"
        formatted_prop += f"  - Amenity 3 distance: {prop['currentAmenity3Distance']}\n"
        formatted_prop += f"Room Count: {prop['currentRoomCount']}\n"
        # formatted_prop += f"Distance Radius: {prop['currentDistance']}\n"
        formatted_prop += f"Gross Floor Area: {prop['currentGFA']}\n\n"
        return formatted_prop

    # Open a text file to write
    with open('output.txt', 'w') as file:
        for index, prop in enumerate(dataGet['currentListing'], start=1):
            file.write(f"Property {1}:\n")
            file.write(format_CurrentProperty(prop))
        for index, prop in enumerate(dataGet['searchListing'], start=1):
            print("index:", index)
            file.write(f"Property {2}:\n")
            file.write(format_SearchProperty(prop))
            file.write("North: Woodlands, Marsiling, Kranji, Yew Tee, Admiralty, Sembawang, Canberra, Yishun, Khatib, Yio Chu Kang, Ang Mo Kio, Bishan, Braddell, Toa Payoh, Novena, Newton " +
                       "West: Jurong East, Bukit Batok, Bukit Gombak, Choa Chu Kang, Boon Lay, Lakeside, Chinese Garden, Clementi, Dover, Commonwealth, Buona Vista, Queenstown, Redhill, Tiong Bahru, Outram Park " +
                       "East:Pasir Ris, Tampines, Simei, Tanah Merah, Expo, Changi Airport, Paya Lebar, Aljunied, Eunos, Kembangan, Bedok, Tanjong Katong, Marine Parade, Dakota")

    query = "As a housing estate agent, help me start comparing two properties to guide me in my decision-making. Here is the template of how to answer : Property A offers [attributes given], while Property B [attributes given]. Considering common priorities like family-friendliness, accessibility, and lifestyle amenities, I'd recommend Property A for [common priorites] and Property B for those prioritizing [common priorites] options. In addtion, the location are grouped in terms of North east west of singapore"

    # get the data from the output.txt file and feed it into the AI
    loader = TextLoader("output.txt")
    index = VectorstoreIndexCreator().from_loaders([loader])

    # output from openAI model (the suggestion of the best option)
    aiOutput = index.query(query)
    # print ("======================================================================================================================")
    # print ("NestlingAI: ")
    print("aiOutput:", aiOutput)

    # my_string_single = 'Therefore Property A is better than Property B!'  # Define your string heremy_string_single = 'Hello, World!'  # Define your string here
    return jsonify(
        {
            "Suggestion": [
                aiOutput
            ]
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
