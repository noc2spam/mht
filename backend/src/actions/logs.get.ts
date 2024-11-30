import { Request, Response } from "express";
import parseJwt from "../utils/parseJwt";
import { prisma } from "../utils/client";
export default async function handler(req: Request, res: Response) {
  const bearerToken = req.headers.authorization?.split(" ")[1];
  if (!bearerToken) {
    return res.status(401).json({
      status: "error",
      errors: ["Unauthorized"],
    });
  }
  const user = await parseJwt(bearerToken);
  if (!user) {
    return res.status(401).json({
      status: "error",
      errors: ["Unauthorized"],
    });
  }
  const logs = await prisma.log.findMany({
    where: {
      user: {
        email: user.email,
      },
    },
  });
  res.status(200).json({ status: "success", logs: logs });
}
