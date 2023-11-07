import { NextRequest, NextResponse } from 'next/server'
import { ssFechamento } from '@/infra/google/accessGoogle'

type TResponse = {
  worker: string
  payment: string
}
export async function GET(req: NextRequest, { params, query }: any) {
  const dataInicio = req.nextUrl.searchParams.get('dataInicio')
  const dataFim = req.nextUrl.searchParams.get('dataFim')

  const sheet = await ssFechamento()
  await sheet.loadCells(['D2', 'C2'])
  const d2 = sheet.getCellByA1('D2')
  const c2 = sheet.getCellByA1('C2')

  c2.value = dataInicio
  d2.value = dataFim
  await sheet.saveUpdatedCells()

  const rows = await sheet.getRows()
  const datas: TResponse[] = await rows.map((row) => {
    return {
      worker: row.get('funcionario'),
      payment: row.get('valor')
    }
  })

  return NextResponse.json(datas, { status: 200 })
}
