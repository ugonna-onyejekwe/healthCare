"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  CAREPULSE_DB_ID,
  databases,
  ENDPOINT,
  PATIENTS_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// Create user
export const createUser = async ({ email, phone, name }: createUserTypes) => {
  try {
    console.log("amhere");

    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );
    console.log("am here 2");
    console.log(newUser, "new user");
    return parseStringify(newUser);
  } catch (error: any) {
    console.log("am here 3");
    if (error && error?.code === 409) {
      let existingUser = await users.list([Query.equal("email", [email])]);

      if (existingUser.users.length === 0) {
        existingUser = await users.list([Query.equal("phone", [phone])]);
      }

      return existingUser.users[0];
    }
    console.log("An error occurred while creating a new user:", error);
  }
};

// Get user
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      CAREPULSE_DB_ID!,
      PATIENTS_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      CAREPULSE_DB_ID!,
      PATIENTS_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
