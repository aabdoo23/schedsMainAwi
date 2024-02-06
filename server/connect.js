import { MongoClient } from 'mongodb';
import { config } from "dotenv";
config({ path: "./config.env" });
const coursesDataa = [];
async function connect() {
  const client = new MongoClient("mongodb+srv://aabdoo2304:MNMN1234@cluster0.rnptjs1.mongodb.net/?retryWrites=true&w=majority");

  try {
    await client.connect();

    const db = client.db("scheds");
    const collection = db.collection("coursesData");
    // const documents = await collection.find().limit(20).toArray();
    // documents.forEach(element => {
    //   console.log(element);
    // });
    // Define a function to search for courses using a given search string
    async function searchCourses(searchString) {
      const searchRegex = new RegExp(`.*${searchString}.*`, 'i'); // Case-insensitive search regex with wildcard
      const query = {
        $or: [
          { 'Course Code': { $regex: searchRegex } },
          { 'Course Name': { $regex: searchRegex } }
        ]
      };
      const courses = await collection.find(query).toArray();
      return courses;
    }
    // const result = await searchCourses('math30');
    // console.log(result);
    
    // Define a function to get all courses
    async function getAllCourses() {
      const courses = await collection.find({}).toArray();
      return courses;
    }
    coursesDataa= getAllCourses();
    // var i = 0;
    // coursesDataa.forEach(element => {
    //   if (i > 10) return;
    //   i++;
    //   console.log(element);
    // });

    return { searchCourses, getAllCourses };
  } catch (e) {
    console.error(e);
  } finally {
    // Don't close the client here to keep the connection open for the function call
  }
}
connect();
export default { connect };
