import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const result = await fetch('https://swapi.dev/api/')
		res.status(200).json({ result })
	} catch (err) {
		res.status(500).json({ error: 'failed to load data' })
	}
}
