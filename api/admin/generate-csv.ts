import { PrismaClient } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node";
import isGoogleAuthed from "../../utils/googleAuthChecker";

const prisma: PrismaClient = new PrismaClient()
const generateCSV = (data: { [key:string]: string }[], delimiter: string = '|'): string => {
  const columns = Object.keys(data[0])
  const columnLength = columns.length
  let output: string = columns.join(delimiter) + "\n";
  data.forEach((row) => {
    Object.keys(row).forEach((colName: string, index: number) => {
      output = output.concat(row[colName])
      if (index < columnLength - 1) {
        output = output.concat(delimiter)
      }
    })
    output = output.concat('\n')
  })
  return output
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const isAuthed = await isGoogleAuthed(req)
  if (!isAuthed) {
    res.status(401).end()
  }

  if (req.method === "GET") {
    const data = (await prisma.pledge.findMany({
      select: {
        fullName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        address: true,
        address2: true,
        postCode: true,
        city: true,
        state: true,
        tshirtSize: true
      }
    })) as unknown as { [key:string]: string}[]
    const csvData = generateCSV(data)
    res.json({ csvData })
  }
}