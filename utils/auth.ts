import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const signUpWithEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    // Trim all inputs
    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedEmail || !password || !trimmedFirstName || !trimmedLastName) {
      throw new Error("All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error("Invalid email address");
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      trimmedEmail,
      password
    );
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: `${trimmedFirstName} ${trimmedLastName}` });

    // Write user data to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error: any) {
    console.error("Firebase signup error:", error);
    // Convert Firebase errors to friendly messages
    let message = error.message || "Signup failed";
    if (error.code === "auth/email-already-in-use") {
      message = "Email is already in use";
    } else if (error.code === "auth/weak-password") {
      message = "Password should be at least 6 characters";
    }
    throw new Error(message);
  }
};
