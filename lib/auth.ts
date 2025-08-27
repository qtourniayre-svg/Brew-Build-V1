import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
const SECRET = process.env.JWT_SECRET || 'dev_secret'
export function signSession(payload: any){ return jwt.sign(payload, SECRET, { expiresIn: '7d' }) }
export function verifySession(token: string){ try { return jwt.verify(token, SECRET) as any } catch { return null } }
export function getSessionFromCookie(){ const token = cookies().get('session')?.value; return token ? verifySession(token) : null }
