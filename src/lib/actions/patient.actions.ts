"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async ({
  email,
  phoneNumber: phone,
  fullName: name,
}: createUserTypes) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      undefined,
      name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([Query.equal("email", [email])]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};
