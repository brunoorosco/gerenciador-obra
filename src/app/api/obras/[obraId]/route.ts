import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { obraId: string } }
) {
  const obraId = params.obraId
  const result = await fetch(`https://swapi.dev/api/people/${'1'}`)
  if (!result.ok) throw new Error('Problemas com o Fetch')
  const data = await result.json()
  return NextResponse.json({ data })
}
