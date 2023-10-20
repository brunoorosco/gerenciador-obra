import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const accessGoogle = async () => {
  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_ID as string,
    serviceAccountAuth
  )
  await doc.loadInfo() // loads document properties and worksheets
  return doc
}

export const ssWorker = async () => {
  const ss = await accessGoogle()
  return ss.sheetsById[1679707489]
}

export const ssWork = async () => {
  const ss = await accessGoogle()
  return ss.sheetsById[486805175]
}

export const ssRegister = async () => {
  const ss = await accessGoogle()
  return ss.sheetsById[1743141677]
}
