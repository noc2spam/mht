export default function parseJwt(token: string) {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (error) {
    console.error(error);
    return null;
  }
}
