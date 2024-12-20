import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Handle POST request to update the wishlist
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Connect to DB
    await connectToDB();

    // Find the user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Get productId from request body
    const { productId } = await req.json();

    if (!productId) {
      return new NextResponse("Product Id required", { status: 400 });
    }

    // Check if the product is already in the wishlist
    const isLiked = user.wishlist.includes(productId);

    if (isLiked) {
      // Remove product from wishlist (Dislike)
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      // Add product to wishlist (Like)
      user.wishlist.push(productId);
    }

    // Save the updated user document
    await user.save();

    // Set CORS headers
    const response = NextResponse.json(user, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins (use specific domains in production)
    response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // Allowed methods
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers

    return response;
  } catch (err) {
    console.log("[wishlist_POST]", err);
    const response = new NextResponse("Internal Server Error", { status: 500 });
    response.headers.set("Access-Control-Allow-Origin", "*"); // Set CORS for error responses
    return response;
  }
};

// Handle preflight requests (for CORS)
export const OPTIONS = async () => {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
};
