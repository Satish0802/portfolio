"use client";
import { useState } from "react";
import Modal from "./Modal";
import ZoomableImage from "./ZoomableImage";
import { publicAssetPath } from "../lib/site";
interface Certification{name:string;issuer:string;date?:string;fileUrl?:string;previewUrl?:string}
const certifications:Certification[]=[
{name:"Full Stack Web Development (MERN Stack)",issuer:"Broadway Infosys",date:"Feb – Jun 2026",fileUrl:publicAssetPath("/certificates/mern-broadway-infosys.pdf"),previewUrl:publicAssetPath("/certificates/mern-broadway-infosys.png")},
{name:"GitHub Workshop",issuer:"Lumbini Academic College",fileUrl:publicAssetPath("/certificates/github-workshop.pdf"),previewUrl:publicAssetPath("/certificates/github-workshop.png")}];
export default function Certifications(){const [open,setOpen]=useState<Certification|null>(null);return <><div className="divide-y divide-[var(--line)]">{certifications.map(c=><div key={c.name} className="flex items-center justify-between gap-4 py-3"><div><p className="text-sm">{c.name}</p><p className="font-mono text-[10px] text-muted">{c.issuer}{c.date&&` · ${c.date}`}</p></div>{c.previewUrl&&<button onClick={()=>setOpen(c)} className="focus-ring shrink-0 font-mono text-[10px] uppercase text-accent hover:underline">View ↗</button>}</div>)}</div><Modal open={!!open} onClose={()=>setOpen(null)} title={open?.name} downloadUrl={open?.fileUrl}>{open?.previewUrl&&<ZoomableImage src={open.previewUrl} alt={open.name}/>}</Modal></>}
