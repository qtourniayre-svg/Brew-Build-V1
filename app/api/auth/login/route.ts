import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { signSession } from '@/lib/auth'

export async function POST(req: Request){
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  if(!user) return NextResponse.json({ ok:false }, { status: 401 })
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return NextResponse.json({ ok:false }, { status: 401 })
  const token = signSession({ uid: user.id, bid: user.breweryId, role: user.role })
  const res = NextResponse.json({ ok:true })
  res.cookies.set('session', token, { httpOnly: true, sameSite: 'lax', path: '/' })
  return res
}
