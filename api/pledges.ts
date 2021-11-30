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
      res.status(500)
    }
  }

  // POST /pledges
  if (req.method === 'POST') {
    const newPledge = req.body;
    if (!newPledge) return res.status(400).send('')

    try {
      const pledge = await prisma.pledge.create({ data: newPledge })
      res.json({ pledge })
    } catch(err) {
      let error;
      if (err.code === 'P2002') { // Unique constraint error
        error = { message: 'Sorry, you can only pledge once' }
      }
      res.status(500).json(error)
    }
  }
}