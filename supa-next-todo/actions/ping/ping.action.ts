"use server";

export const pingAction = async () => {
  console.log("ping action called");
  return "pong";
};
