import { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient()


const isGoogleAuthed = async (req: VercelRequest): Promise<boolean> => {
  if (!req.headers.authorization) return false 
  const token = req.headers.authorization?.split(' ')[1]  
  try {
    await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
    return true
  } catch(_) {
    return false
  }
}

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
        }
      })
      res.json({ pledges })
    } catch(err) {
      res.status(500)
    }
  }
}