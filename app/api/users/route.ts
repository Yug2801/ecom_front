import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      console.error("Unauthorized: User ID is missing");
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    console.log("User ID from Clerk:", userId);

    // Connect to the database
    await connectToDB();
    console.log("Database connected successfully");

    // Check if user exists
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      try {
        // Create a new user if not found
        user = await User.create({ clerkId: userId });
        console.log("New user created:", user);
      } catch (createError) {
        console.error("Error creating user:", createError);
        return new NextResponse("Failed to create user", { status: 500 });
      }
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("[users_GET] Internal Server Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
