import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export async function PATCH(_: Request, { params }: { params: { id: string } }){
  const cur = await prisma.equipment.findUnique({ where: { id: params.id } })
  if(!cur) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const upd = await prisma.equipment.update({ where: { id: params.id }, data: { isMaintenance: !cur.isMaintenance } })
  return NextResponse.json({ ok: true, item: upd })
}
