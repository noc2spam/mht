import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/client";
import parseJwt from "../utils/parseJwt";
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
  const schema = z.object({
    mood_rating: z.number().min(0).max(10),
    anxiety_level: z.number().min(0).max(10),
    sleep_hours: z.number().min(0).max(24).optional().default(0),
    sleep_quality: z.number().min(0).max(10).optional().default(0),
    disturbances: z
      .string()
      .refine((value) => value === "yes" || value === "no"),
    activity_type: z
      .string()
      .refine(
        (value) =>
          value === "none" ||
          value === "light" ||
          value === "moderate" ||
          value === "heavy"
      ),
    activity_duration: z.number().min(0).max(24).optional().default(0),
    socialized_for: z.number().min(0).max(24).optional().default(0),
  });
  const validatedData = schema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json({
      status: "error",
      errors: validatedData.error.errors,
    });
  }
  const data = validatedData.data;
  const today = new Date().toISOString().split("T")[0];
  const unixtime = Math.floor(new Date(today).getTime() / 1000);
  const existingLog = await prisma.log.findFirst({
    where: {
      user: {
        email: user.email,
      },
      createdAt: new Date(unixtime * 1000).toISOString(),
    },
  });
  if (existingLog) {
    await prisma.log.update({
      where: {
        id: existingLog.id,
      },
      data: {
        moodRating: data.mood_rating,
        anxietyLevel: data.anxiety_level,
        sleptHours: data.sleep_hours,
        qualityOfSleep: data.sleep_quality,
        disturbances: data.disturbances === "yes" ? 1 : 0,
        physicalActivityType: data.activity_type,
        physicalActivityDuration: data.activity_duration,
        socializedFor: data.socialized_for,
      },
    });
  } else {
    await prisma.log.create({
      data: {
        user: {
          connect: {
            email: user.email,
          },
        },
        moodRating: data.mood_rating,
        anxietyLevel: data.anxiety_level,
        sleptHours: data.sleep_hours,
        qualityOfSleep: data.sleep_quality,
        disturbances: data.disturbances === "yes" ? 1 : 0,
        physicalActivityType: data.activity_type,
        physicalActivityDuration: data.activity_duration,
        socializedFor: data.socialized_for,
        createdAt: new Date(unixtime * 1000).toISOString(),
      },
    });
  }
  return res.status(201).json({
    status: "success",
  });
}
