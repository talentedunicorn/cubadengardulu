import { ContentfulClientApi, createClient } from 'contentful'

export const getClient = (preview: boolean = false): ContentfulClientApi =>
  createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: preview
      ? process.env.CTF_PREVIEW_TOKEN
      : process.env.CTF_ACCESS_TOKEN,
  })
