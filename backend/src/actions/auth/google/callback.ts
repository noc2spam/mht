import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import { prisma } from "../../../utils/client";

const {
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  AUTH_URL = "http://localhost:3001",
  FRONTEND_URL = "http://localhost:3000",
} = process.env;

export default async function handler(req: Request, res: Response) {
  const code = req.query.code;
  if (!code || typeof code !== "string") {
    return res.status(400).json({ status: "error", message: "Invalid code" });
  }
  const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    AUTH_URL + "/auth/google/callback"
  );
  const response = await oAuth2Client.getToken(code);
  if (!response.tokens) {
    return res.status(400).json({ status: "error", message: "Invalid code" });
  }
  const { tokens } = response;
  oAuth2Client.setCredentials(tokens);
  const userInfo = await oAuth2Client.verifyIdToken({
    idToken: tokens.id_token || "",
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = userInfo.getPayload();
  if (!userInfo || !payload || !payload.email || !payload.name) {
    return res.status(400).json({ status: "error", message: "Invalid code" });
  }
  await prisma.user.upsert({
    where: {
      email: payload.email,
    },
    update: {
      name: payload.name,
    },
    create: {
      email: payload.email,
      name: payload.name,
    },
  });
  const redirectURL = `${FRONTEND_URL}/?token=${tokens.id_token}`;
  res.redirect(redirectURL);
}
