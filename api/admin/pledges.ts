import { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import isGoogleAuthed from "../../utils/googleAuthChecker";
const prisma = new PrismaClient()

export default async (req: VercelRequest, res: VercelResponse) => {
  const isAuthed = await isGoogleAuthed(req)
  if (!isAuthed) {
    res.status(401).end()
  }
  
  if (req.method === "GET") {
    const { limit, page } = req.query
    const take = parseInt(limit as string, 10) || 10
    const skip = (parseInt(page as string, 10) ) * take  || 0 
    try {
      const pledges = await prisma.pledge.findMany({
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          fullName: true,
          email: true,
          createdAt: true,
        }
      })
      res.json({ pledges })
    } catch(err) {
      res.status(500)
    }
  }
}