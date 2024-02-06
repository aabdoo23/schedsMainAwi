import re
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://aabdoo2304:MNMN1234@cluster0.rnptjs1.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Connect to MongoDB
db = client['scheds']
collection = db['coursesData']

# Function to parse course information and insert into MongoDB
def parse_and_insert(course_info):
    instructor_name = re.search(r'Instructor Name: (.+)', course_info).group(1)
    course_name_line = re.search(r'Course Name: (.+)', course_info).group(1)
    section = re.search(r'Section: (.+)', course_info).group(1)
    subtype = re.search(r'Subtype: (.+)', course_info).group(1)
    schedule_match = re.search(r'Schedule: (\[\[.+\]\])', course_info)
    schedule = eval(schedule_match.group(1)) if schedule_match else []

    course_code, course_name = course_name_line.split(' ', 1)
    # Insert into MongoDB
    document = {
        'Instructor Name': instructor_name,
        'Course Code': course_code,
        'Course Name': course_name,
        'Section': section,
        'Subtype': subtype,
        'Schedule': schedule
    }

    collection.insert_one(document)
    print(course_code+": "+course_name)

# Read the file and extract course instances
with open('output.txt', 'r') as file:
    file_content = file.read()

course_instances = file_content.split('\n\n')

# Iterate through each course instance and insert into MongoDB
for course_instance in course_instances:
    parse_and_insert(course_instance)

# Close the MongoDB connection
client.close()
