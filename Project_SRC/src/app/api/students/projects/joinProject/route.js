import { NextResponse } from "next/server";
import { client } from "../../../../../Services/MongoDB_Routines";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  const url = new URL(request.url);
  const projectId = new URLSearchParams(url.search).get("projectId");
  const studentId = new URLSearchParams(url.search).get("studentId");

  // Connect to the MongoDB database
  const db = client.db("universityatalbanyDB");

  // Get the collection you want to work with
  const collection = db.collection("projects");

  const result = await collection.updateOne(
    { _id: ObjectId.createFromHexString(projectId) },
    { $addToSet: { studentIds: studentId } }
  );

  if (result.modifiedCount === 1) {
    return NextResponse.json({
      status: 200,
      message: "Successfully joined the project.",
    });
  } else {
    return NextResponse.json({ status: 404, message: "Project not found." });
  }
}
