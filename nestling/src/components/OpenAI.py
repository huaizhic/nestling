import os
#import sys
#import constants
import json
from supabase import create_client
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator

#supabase API key (nicole's)
#url = "https://sxprjgneerfyuwisyzdh.supabase.co"
#key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cHJqZ25lZXJmeXV3aXN5emRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NjI1MjYsImV4cCI6MjAyNjMzODUyNn0.ALe6eQ3ng2MAM-JbuwxCb-el8JpwRS6RqxiBzaga8us"

url = "https://ycypmpdbtmpsjqublvez.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljeXBtcGRidG1wc2pxdWJsdmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMzY2NDQsImV4cCI6MjAyNDgxMjY0NH0.vBC30fXKWw3TRl5lFjEKHwkUSynnUfiNJ0fps2FNEUw"
supabase = create_client(url,key)

#openai API key
os.environ["OPENAI_API_KEY"]= "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"

#retrieving data from supabase "desiredProperty" column -> base on email
response1 = supabase.table('userInfo').select("desiredProperty").eq("email","nestling.ai@gmail.com").execute()
response = response1.data[0]


#retriving data from Json file (listing)
with open('sample.json', 'r') as file:
    # Load the JSON data into a Python dictionary
    lisitingAttri = json.load(file)



# Function to format property information
def format_property(prop):
    formatted_prop = f"Location: {prop['location']}\n"
    formatted_prop += f"Desired Amenities:\n"
    formatted_prop += f"  - Amenity 1: {prop['amenity1']}\n"
    formatted_prop += f"  - Amenity 2: {prop['amenity2']}\n"
    formatted_prop += f"  - Amenity 3: {prop['amenity3']}\n"
    formatted_prop += f"Room Count: {prop['roomCount']}\n"
    formatted_prop += f"Distance Radius: {prop['distanceRadius']}\n"
    formatted_prop += f"Gross Floor Area: {prop['grossFloorArea']}\n\n"
    return formatted_prop

# Open a text file to write
with open('output.txt', 'w') as file: 
    for index, prop in enumerate(response['desiredProperty'], start=1):
        file.write(f"Property {1}:\n")
        file.write(format_property(prop))
    for index, prop in enumerate(lisitingAttri['desiredProperty'],start=1):
        file.write(f"Property {2}:\n")
        file.write(format_property(prop)) 
        file.write("North: Woodlands, Marsiling, Kranji, Yew Tee, Admiralty, Sembawang, Canberra, Yishun, Khatib, Yio Chu Kang, Ang Mo Kio, Bishan, Braddell, Toa Payoh, Novena, Newton "+
                    "West: Jurong East, Bukit Batok, Bukit Gombak, Choa Chu Kang, Boon Lay, Lakeside, Chinese Garden, Clementi, Dover, Commonwealth, Buona Vista, Queenstown, Redhill, Tiong Bahru, Outram Park " +
                    "East:Pasir Ris, Tampines, Simei, Tanah Merah, Expo, Changi Airport, Paya Lebar, Aljunied, Eunos, Kembangan, Bedok, Tanjong Katong, Marine Parade, Dakota")
    

#===================================================
# # Path to the text file
# file_path = "output.txt"

# # Convert response to a string representation
# response_str = str(response)
# # 
# # Writing the content into the text file
# with open(file_path, 'w') as file:
#     file.write(response_str)
#=====================================================
    
# #query the Ai model and ask for the best option -> need to create template of the info you want
#query = "Based on the properties given, can you take on the role as a property agent and suggest to me the best option between both properties. Start by describing what you see and come to a decison."
query =  "As a housing estate agent, help me start comparing two properties to guide me in my decision-making. Here is the template of how to answer : Property A offers [attributes given], while Property B [attributes given]. Considering common priorities like family-friendliness, accessibility, and lifestyle amenities, I'd recommend Property A for [common priorites] and Property B for those prioritizing [common priorites] options. In addtion, the location are grouped in terms of North east west of singapore"



#get the data from the output.txt file and feed it into the AI
loader = TextLoader("output.txt")
index = VectorstoreIndexCreator().from_loaders([loader])

#output from openAI model (the suggestion of the best option)
aiOutput= index.query(query)
print ("======================================================================================================================")
print ("NestlingAI: ")
print (aiOutput)


# things to do to continue:
# - have more comparisons and try adding more properties and test
# - understand where is the trigger to call the ArithmeticError
# - during the log in make sure that it logs in as nestling.ai? 
# -------of not need to code a column to signify account in use
# - new aim : do the python trigger 
# - try it out on the website

#{'desiredProperty': [{'amenity1': 'Schools', 'amenity2': 'Parks', 'amenity3': 'Supermarkets', 'location': 'ORCHARD MRT STATION', 'roomCount': '5', 'distanceRadius': '4', 'grossFloorArea': '1983'},{'amenity1': 'Schools', 'amenity2': 'Parks', 'amenity3': 'Supermarkets', 'location': 'ORCHARD MRT STATION', 'roomCount': '5', 'distanceRadius': '4', 'grossFloorArea': '1983'}]}



