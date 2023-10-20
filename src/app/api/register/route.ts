import { ssRegister } from '@/infra/google/accessGoogle'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const res = await req.json()
  const data = transformData(res.data)
  let response: any = []
  try {
    if (req.method === 'POST') {
      const sheet = await ssRegister()
      for (const item of data) {
        const res = await sheet.addRow({
          worker: item.worker,
          work: item.work,
          present: '1',
          date: new Date()
        })
        response.push(res)
      }
      console.log(response)
      return new Response(response, { status: 201 })
    }
  } catch (error) {
    throw new Error(error as string)
  }
}

function transformData(data: any) {
  return Object.entries(data.worker)
    .filter(([name, isWorking]) => isWorking)
    .map(([name, isWorking]) => ({
      work: data.work,
      worker: name
    }))
}
