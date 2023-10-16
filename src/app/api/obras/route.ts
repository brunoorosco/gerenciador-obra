import { NextRequest, NextResponse } from 'next/server'
import { accessGoogle } from '@/infra/google/accessGoogle'

type TResponse = {
  work: string
  priceWork: string
  workExpense: string
  totalWork: string
}
export async function GET(req: NextRequest, res: NextResponse) {
  const ss = await accessGoogle()
  let sheet = ss.sheetsById[486805175]

  const rows = await sheet.getRows()
  const datas: TResponse[] = await rows.map((row) => {
    return {
      work: row.get('Obra'),
      priceWork: row.get('Valor da Obra'),
      workExpense: row.get('Gastos por Obra'),
      totalWork: row.get('Total Restante')
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
