import { NextResponse } from "next/server";
import { client } from "../../../../../Services/MongoDB_Routines";
import { ObjectId } from "mongodb";

export async function GET(request) {
  const url = new URL(request.url);
  const projectId = new URLSearchParams(url.search).get("projectId");

  // Connect to the MongoDB database
  const db = client.db("universityatalbanyDB");

  // Get the collection you want to work with
  const collection = db.collection("projects");

  // Query the collection for the project with the given projectId
  const project = await collection.findOne({
    _id: ObjectId.createFromHexString(projectId),
  });

  // Check if a project was found
  if (project) {
    // Return the project
    return NextResponse.json({
      isValidProjectID: true,
      project: project,
    });
  } else {
    return NextResponse.json({ isValidProjectID: false });
  }
}
