import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";

export default function handler(req: Request, res: Response) {
  const {
    GOOGLE_CLIENT_ID = "",
    GOOGLE_CLIENT_SECRET = "",
    NEXT_PUBLIC_BACKEND_URL,
  } = process.env;
  const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_BACKEND_URL + "/auth/google/callback"
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  });
  res.status(200).json({ status: "success", url: authorizeUrl });
}
