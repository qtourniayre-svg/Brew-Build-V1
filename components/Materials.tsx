'use client'
import useSWR from 'swr'
import { useState } from 'react'
const fetcher=(u:string)=>fetch(u).then(r=>r.json())
export default function Materials(){
  const { data, mutate } = useSWR('/api/materials', fetcher)
  const [name,setName]=useState('')
  const [category,setCategory]=useState<'BREWING'|'FERMENTING'|'PACKAGING'>('BREWING')
  const [volume,setVolume]=useState<number|''>('')
  const [maxBrews,setMaxBrews]=useState<number|''>('')
  const submit=async()=>{
    await fetch('/api/materials',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,category,usableVolume:volume||null,maxBrewsPerDay:maxBrews||null})})
    setName('');setVolume('');setMaxBrews('');mutate()
  }
  return (<div className='space-y-4'>
    <div className='card'><h2 className='font-semibold mb-2'>Nouveau matériel</h2>
      <div className='grid md:grid-cols-4 gap-2'>
        <input className='input' placeholder='Nom' value={name} onChange={e=>setName(e.target.value)}/>
        <select className='input' value={category} onChange={e=>setCategory(e.target.value as any)}>
          <option value='BREWING'>Brewing</option><option value='FERMENTING'>Fermenting</option><option value='PACKAGING'>Packaging</option>
        </select>
        {category!=='PACKAGING' && <input className='input' placeholder='Volume utile (L)' value={volume} onChange={e=>setVolume(Number(e.target.value)||'')}/>}
        {category==='BREWING' && <input className='input' placeholder='Brassins max/jour' value={maxBrews} onChange={e=>setMaxBrews(Number(e.target.value)||'')}/>}
        <button className='btn' onClick={submit}>Ajouter</button>
      </div>
    </div>
    <div className='card'><h2 className='font-semibold mb-2'>Matériels</h2>
      <table className='w-full text-sm'><thead><tr className='text-left border-b'><th>Nom</th><th>Catégorie</th><th>Volume</th><th>Brassins/j</th><th>Maintenance</th></tr></thead>
        <tbody>{data?.items?.map((m:any)=>(<tr key={m.id} className='border-b'>
          <td>{m.name}</td><td>{m.category}</td><td>{m.usableVolume??'-'}</td><td>{m.maxBrewsPerDay??'-'}</td>
          <td><button className='btn' onClick={async()=>{await fetch('/api/materials/'+m.id+'/maintenance',{method:'PATCH'}); await mutate()}}>{m.isMaintenance?'Réactiver':'Maintenance'}</button></td>
        </tr>))}</tbody></table>
    </div>
  </div>)
}
