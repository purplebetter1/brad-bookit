"use server";
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";

async function createUser(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!email || !name || !password) {
    return {
      error: "Please fill in all fields",
    };
  }
  if (password.length < 8) {
    return {
      error: "Password must have at least eight characters",
    };
  }
  if (password !== confirmPassword) {
    return {
      error: "Confirm password must match password",
    };
  }

  const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);
    return {
      success: true,
    };
  } catch (error) {
    console.log("Registration Error", error);
    return {
      error: "Could not register user",
    };
  }
}

export default createUser;
