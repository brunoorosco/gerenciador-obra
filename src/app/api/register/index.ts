import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.body)
  const result = await fetch(`https://swapi.dev/api/people`)
  if (!result.ok) throw new Error('Problrmas com o Fetch')
  const data = await result.json()
  return NextResponse.json({ data })
}
