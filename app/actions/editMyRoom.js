"use server";
import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

async function editMyRoom(previousState, formData) {
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();
    console.log(`User_id is ${user.id}`);
    if (!user) {
      return {
        error: "You must be logged in to add a room",
      };
    }

    const documentID = formData.get("room_id");

    const editedRoom = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      documentID,
      {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        price_per_hour: formData.get("price_per_hour"),
        amenities: formData.get("amenities"),
      }
    );

    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response.message || "An unexpected error has ocurred";
    return {
      error: errorMessage,
    };
  }
}

export default editMyRoom;
