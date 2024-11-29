import { OAuth2Client } from "google-auth-library";
export default async function parseJwt(token: string) {
  const {
    GOOGLE_CLIENT_ID = "",
    GOOGLE_CLIENT_SECRET = "",
    NEXT_PUBLIC_BACKEND_URL = "http://localhost:3001",
    FRONTEND_URL = "http://localhost:3000",
  } = process.env;
  const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_BACKEND_URL + "/auth/google/callback"
  );
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  if (!ticket) {
    return null;
  }
  const payload = ticket.getPayload();
  if (!payload) {
    return null;
  }
  return payload;
}
