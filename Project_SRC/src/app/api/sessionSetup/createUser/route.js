import { NextResponse } from "next/server";
import { client } from "../../../../Services/MongoDB_Routines";

export async function POST(request) {
  const data = await request.json();

  await client.connect();
  // Connect to the MongoDB database
  const db = client.db("universityatalbanyDB");

  // Get the collection you want to work with
  const collection = db.collection("students");

  // Create a new user in the database
  const newUser = {
    email: data.email,
    name: data.name,
    photoUrl: data.photoUrl,
  };

  const result = await collection.insertOne(newUser);

  // Check if the user was successfully created
  if (result.insertedCount === 1) {
    return NextResponse.json({
      type: "UserCreated",
      userId: result.insertedId,
    });
  } else {
    return NextResponse.json({ type: "UserCreationFailed" });
  }
}
