"use server";

async function createSession(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      error: "Please fill in all info",
    };
  }

  return {
    success: true,
  };
}

export default createSession;
