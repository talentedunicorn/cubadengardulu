import { VercelRequest } from "@vercel/node"
import axios from "axios"

const isGoogleAuthed =  async (req: VercelRequest): Promise<boolean> => {
  if (!req.headers.authorization) return false 
  const token = req.headers.authorization?.split(' ')[1]  
  try {
    await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
    return true
  } catch(_) {
    return false
  }
}

export default isGoogleAuthed