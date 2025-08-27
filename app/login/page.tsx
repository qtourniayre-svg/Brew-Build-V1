'use client'
import { useState } from 'react'

export default function LoginPage(){
  const [email, setEmail] = useState('admin@brewbuild.local')
  const [password, setPassword] = useState('admin123')
  const [message, setMessage] = useState<string>('')
  const submit = async (e:any)=>{
    e.preventDefault()
    setMessage('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    })
    if(res.ok){ location.href='/' } else { setMessage('Identifiants invalides') }
  }
  return (
    <div className="max-w-sm mx-auto card">
      <h1 className="text-lg font-semibold mb-3">Connexion</h1>
      <form onSubmit={submit} className="space-y-3">
        <div><label className="label">Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label className="label">Mot de passe</label><input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button className="btn w-full" type="submit">Se connecter</button>
        {message && <p className="text-red-600 text-sm">{message}</p>}
      </form>
    </div>
  )
}
