import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromCookie } from '@/lib/auth'

export async function GET(){
  const session = getSessionFromCookie()
  if(!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const items = await prisma.equipment.findMany({ where: { breweryId: session.bid } })
  return NextResponse.json({ items })
}

export async function POST(req: Request){
  const session = getSessionFromCookie()
  if(!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json()
  const item = await prisma.equipment.create({ data: {
    name: body.name, category: body.category, usableVolume: body.usableVolume, maxBrewsPerDay: body.maxBrewsPerDay, breweryId: session.bid
  }})
  return NextResponse.json({ item })
}
