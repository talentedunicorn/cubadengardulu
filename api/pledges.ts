import { VercelRequest, VercelResponse } from "@vercel/node"
import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient()

export default async (req: VercelRequest, res: VercelResponse) => {
  // GET /pledges
  if (req.method === 'GET') {
    // Get pledges count
    try {
      const total = await prisma.pledge.count()
      res.json({ total })
    } catch(err) {
      console.error(err)
    }
  }

  // POST /pledges
  if (req.method === 'POST') {
    const newPledge = req.body;
    if (!newPledge) return res.status(400)

    try {
      // const pledge = await prisma.pledge.create(newPledge)
      res.json({ newPledge })
    } catch(err) {
      console.error(err)
    }
  }
}