import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: "user" | "admin";
}

export const generateToken = (
  payload: TokenPayload
): string => {
  try {
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};