"use client";
import { useState } from "react";
interface EducationEntry{degree:string;institution:string;period:string;url:string;note?:string}
const educationData:EducationEntry[]=[{degree:"Bachelor of Computer Application",institution:"Lumbini Academic College",period:"2020 – 2026",url:"https://laf.edu.np/",note:"BCA · MERN focus"}];
function EducationRow({entry}:{entry:EducationEntry}){
 const [show,setShow]=useState(false);
 return <div className="group relative py-3" onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
  <div className="flex justify-between gap-4"><span className="text-sm">{entry.degree}</span><span className="shrink-0 font-mono text-[10px] text-muted">{entry.period}</span></div>
  <span tabIndex={0} onFocus={()=>setShow(true)} onBlur={()=>setShow(false)} className="mt-2 inline-block border-b border-dotted border-muted font-mono text-[10px] text-accent">{entry.institution}</span>
  <div className={`absolute left-0 top-full z-20 border border-[var(--line)] bg-surface p-3 text-[10px] shadow-xl transition-opacity ${show?"opacity-100":"pointer-events-none opacity-0"}`}><p className="text-muted">{entry.note}</p><a href={entry.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-accent">visit site ↗</a></div>
 </div>
}
export default function Education(){return <section className="divide-y divide-[var(--line)]">{educationData.map(e=><EducationRow key={e.institution} entry={e}/>)}</section>}
