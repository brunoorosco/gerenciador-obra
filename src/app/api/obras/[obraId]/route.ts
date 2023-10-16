import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest, { params, query }: any) {
	const funcId = params.funcId
	console.log(req.query)
	console.log(params)
	const result = await fetch(`https://swapi.dev/api/people/${funcId}`)
	if (!result.ok) throw new Error('Problemas com o Fetch')
	const data = await result.json()
	return NextResponse.json({ data })
}
