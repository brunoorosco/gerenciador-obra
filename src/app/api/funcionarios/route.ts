import { NextRequest, NextResponse } from 'next/server'
import { accessGoogle } from '@/infra/google/accessGoogle'

export async function GET(req: NextRequest, res: NextResponse) {
  const ss = await accessGoogle()
  let sheet = ss.sheetsById[1679707489]

  const rows = await sheet.getRows()
  const datas = await rows.map((row) => {
    return {
      name: row.get('Nome'),
      cpf: row.get('Cpf'),
      priceDay: row.get('Valor da Diaria'),
      office: row.get('Funcao')
    }
  })
  return NextResponse.json(datas)
}

export async function POST(req: NextRequest, res: NextResponse) {
  const result = await fetch(`https://swapi.dev/api/people`)
  if (!result.ok) throw new Error('Problrmas com o Fetch')
  const data = await result.json()
  return NextResponse.json({ data })
}
