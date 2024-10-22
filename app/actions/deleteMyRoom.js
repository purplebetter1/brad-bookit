"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function deleteMyRoom(roomId) {
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );

    const user = await account.get();
    const userId = user.$id;

    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );

    // Find room to delete
    const roomToDelete = rooms.find((room) => room.$id === roomId);

    // Delete Room
    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToDelete.$id
      );
      revalidatePath("/rooms/my", "layout");
      revalidatePath("/", "layout");

      return {
        success: true,
      };
    } else {
      return {
        error: "Room not found",
      };
    }
  } catch (error) {
    console.log("Failed to delete room", error);
    return {
      error: "Room could not be deleted",
    };
  }
}

export default deleteMyRoom;