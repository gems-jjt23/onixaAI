"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const P = "#a78bfa";
const B = "#07070f";
const W = "#f5f3ff";
const M = "rgba(245,243,255,0.42)";
const BD = "rgba(167,139,250,0.12)";
const BG = "#0e0e1a";
const BG2 = "#0a0a14";
const H = "var(--font-heading), sans-serif";
const BODY = "var(--font-body), sans-serif";

export default function Home() {
  const [chatMessages, setChatMessages] = useState<{type:string;text:string;time:string}[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const chatStarted = useRef(false);

  const allMessages = [
    {type:"user",text:"Hola, tienen mesa para mañana?",time:"7:32 PM"},
    {type:"bot",text:"¡Hola! Claro que sí 😊 ¿Para cuántas personas y a qué hora?",time:"7:32 PM"},
    {type:"user",text:"somos 4, como a las 7pm",time:"7:33 PM"},
    {type:"bot",text:"Perfecto 🍽️ ¿Me das tu nombre para confirmar?",time:"7:33 PM"},
    {type:"user",text:"Carlos Mejía",time:"7:33 PM"},
    {type:"bot",text:"✅ ¡Listo Carlos! Reserva confirmada:\n\n📅 Mañana — 7:00 PM\n👥 4 personas\n📍 La Brasa Roja\n\nTe esperamos 🔥",time:"7:34 PM"},
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    const dObs = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && !chatStarted.current) {
        chatStarted.current = true;
        runChat(0);
        dObs.disconnect();
      }
    }, { threshold: 0.3 });
    if(demoRef.current) dObs.observe(demoRef.current);
    return () => { obs.disconnect(); dObs.disconnect(); };
  }, []);

  function runChat(idx: number) {
    if(idx >= allMessages.length) return;
    const msg = allMessages[idx];
    setTimeout(() => {
      setChatMessages(prev => [...prev, msg]);
      setTimeout(() => { if(chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight; }, 50);
      runChat(idx + 1);
    }, msg.type === "bot" ? 1600 : 1000);
  }

  const services = [
    {n:"01", t:"WhatsApp con IA", d:"Tu WhatsApp responde solo — reservas, pedidos y preguntas las 24 horas. Conversación real, sin botones, sin menús.", p:"Desde $150.000/mes"},
    {n:"02", t:"Desarrollo web", d:"Páginas profesionales con chatbot inteligente, formularios que convierten y panel de administración.", p:"Desde $800.000"},
    {n:"03", t:"Automatización", d:"Conectamos tus sistemas para que trabajen solos — facturación, inventario, notificaciones, reportes.", p:"Desde $300.000/mes"},
    {n:"04", t:"Contenido con IA", d:"30 publicaciones mensuales generadas, diseñadas y programadas. Presencia constante sin esfuerzo.", p:"Desde $200.000/mes"},
    {n:"05", t:"Consultoría IA", d:"Te mostramos exactamente cómo implementar IA en tu negocio para reducir costos y aumentar ventas.", p:"$100.000/hora"},
    {n:"06", t:"Reactivación", d:"Recupera clientes inactivos con mensajes inteligentes enviados en el momento exacto.", p:"Incluido en Pro+"},
  ];

  const plans = [
    {name:"Básico", price:"$150.000", featured:false, desc:"Para negocios que quieren empezar a automatizar.", features:["Respuestas automáticas 24/7","FAQ inteligente con IA","Horarios y disponibilidad","500 conversaciones/mes","Soporte por email"]},
    {name:"Pro", price:"$250.000", featured:true, desc:"Automatiza ventas, reservas y atención completa.", features:["Todo el plan Básico","Reservas y pedidos automáticos","Memoria por cliente","Escalado inteligente a humano","2.000 conversaciones/mes","Reportes mensuales"]},
    {name:"Premium", price:"$400.000", featured:false, desc:"Sistema completo con campañas y análisis avanzado.", features:["Todo el plan Pro","Campañas de reactivación","CRM integrado","Conversaciones ilimitadas","Panel de métricas avanzado","Soporte prioritario"]},
  ];

  return (
    <main style={{background:B, color:W, overflowX:"hidden", fontFamily:BODY}}>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.4rem 5rem",borderBottom:`1px solid ${BD}`,background:"rgba(7,7,15,0.92)",backdropFilter:"blur(24px)"}}>
        <div style={{fontFamily:H,fontSize:"1.55rem",fontWeight:700,letterSpacing:"-0.03em",lineHeight:1}}>
          Onixa<span style={{color:P}}>AI</span>
        </div>
        <div style={{display:"flex",gap:"2.8rem"}}>
          {[["Servicios","servicios"],["Demo","demo"],["Precios","precios"],["Contacto","contacto"]].map(([l,id])=>(
            <a key={id} href={`#${id}`} style={{color:M,textDecoration:"none",fontSize:"0.88rem",letterSpacing:"0.04em",fontWeight:400,transition:"color 0.2s",fontFamily:H}}
              onMouseEnter={e=>(e.currentTarget.style.color=W)} onMouseLeave={e=>(e.currentTarget.style.color=M)}>{l}</a>
          ))}
        </div>
        <a href="#contacto" style={{border:`1px solid rgba(167,139,250,0.28)`,color:P,padding:"0.65rem 1.6rem",borderRadius:"3px",fontFamily:H,fontSize:"0.85rem",fontWeight:600,letterSpacing:"0.04em",textDecoration:"none",transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background=P;e.currentTarget.style.color=B;}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=P;}}>
          Contáctanos
        </a>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"10rem 4rem 6rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 90% 60% at 50% -10%, rgba(124,58,237,0.2) 0%, transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(167,139,250,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,0.03) 1px,transparent 1px)",backgroundSize:"72px 72px",maskImage:"radial-gradient(ellipse 90% 70% at 50% 20%,black 0%,transparent 75%)",pointerEvents:"none"}}/>

        {/* Badge */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          style={{display:"inline-flex",alignItems:"center",gap:10,border:`1px solid rgba(167,139,250,0.2)`,background:"rgba(167,139,250,0.06)",padding:"0.5rem 1.4rem",borderRadius:"100px",fontSize:"0.82rem",letterSpacing:"0.06em",color:P,marginBottom:"3rem",position:"relative",zIndex:1,fontFamily:H,fontWeight:500}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:P,display:"inline-block",animation:"pulse 2s ease infinite"}}/>
          Inteligencia Artificial para negocios colombianos
        </motion.div>

        {/* NOMBRE — una sola línea, OniaxaAI */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.85,delay:0.05}}
          style={{position:"relative",zIndex:1,marginBottom:"0.5rem"}}>
          <div style={{fontFamily:H,fontSize:"clamp(5rem,14vw,13rem)",fontWeight:700,lineHeight:0.9,letterSpacing:"-0.04em",color:W}}>
            Onixa<span style={{color:P}}>AI</span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}}
          style={{fontSize:"clamp(1.1rem,2.2vw,1.45rem)",lineHeight:1.65,color:M,maxWidth:580,margin:"2.5rem auto 0",position:"relative",zIndex:1,fontWeight:300,fontFamily:BODY}}>
          Automatizamos la atención, las ventas y los procesos de tu negocio con Inteligencia Artificial — para que crezcas más rápido sin contratar más personal.
        </motion.p>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.28}}
          style={{fontSize:"clamp(1rem,1.8vw,1.25rem)",color:P,margin:"1rem auto 0",position:"relative",zIndex:1,fontWeight:600,fontFamily:H,letterSpacing:"-0.01em"}}>
          Tu negocio responde. Siempre.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.36}}
          style={{display:"flex",gap:"1rem",marginTop:"3.5rem",position:"relative",zIndex:1,flexWrap:"wrap",justifyContent:"center"}}>
          <a href="#demo" style={{background:P,color:B,padding:"1.1rem 2.8rem",fontFamily:H,fontSize:"0.95rem",fontWeight:600,letterSpacing:"0.02em",borderRadius:"3px",textDecoration:"none",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#c4b5fd";e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=P;e.currentTarget.style.transform="translateY(0)";}}>
            Ver demo gratis
          </a>
          <a href="#precios" style={{background:"transparent",color:W,border:`1px solid rgba(167,139,250,0.22)`,padding:"1.1rem 2.8rem",fontFamily:H,fontSize:"0.95rem",fontWeight:500,letterSpacing:"0.02em",borderRadius:"3px",textDecoration:"none",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=P;e.currentTarget.style.color=P;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(167,139,250,0.22)";e.currentTarget.style.color=W;}}>
            Ver planes
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.44}}
          style={{display:"flex",gap:"5rem",marginTop:"6rem",position:"relative",zIndex:1,flexWrap:"wrap",justifyContent:"center"}}>
          {[{n:"24/7",l:"Atención automática"},{n:"< 2s",l:"Tiempo de respuesta"},{n:"90%",l:"Resuelto por IA"}].map(s=>(
            <div key={s.l} style={{textAlign:"center"}}>
              <div style={{fontFamily:H,fontSize:"2.8rem",fontWeight:700,color:P,letterSpacing:"-0.04em",lineHeight:1}}>{s.n}</div>
              <div style={{fontSize:"0.8rem",color:M,letterSpacing:"0.08em",marginTop:"0.5rem",fontFamily:BODY,fontWeight:400}}>{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll */}
        <div style={{position:"absolute",bottom:"3rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,color:M,fontSize:"0.68rem",letterSpacing:"0.18em",zIndex:1,fontFamily:H}}>
          <div style={{width:1,height:50,background:`linear-gradient(to bottom, ${P}, transparent)`,animation:"scrollLine 2s ease infinite"}}/>
          scroll
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={{padding:"8rem 5rem",maxWidth:1400,margin:"0 auto"}}>
        <div className="reveal" style={{display:"flex",alignItems:"center",gap:16,marginBottom:"1.5rem"}}>
          <div style={{width:36,height:1,background:P}}/>
          <span style={{fontSize:"0.78rem",letterSpacing:"0.18em",textTransform:"uppercase",color:P,fontFamily:H,fontWeight:500}}>Lo que hacemos</span>
        </div>
        <h2 className="reveal" style={{fontFamily:H,fontSize:"clamp(2.5rem,5vw,4.5rem)",fontWeight:700,letterSpacing:"-0.035em",lineHeight:1.02,marginBottom:"5rem"}}>
          Servicios que<br/><span style={{color:"transparent",WebkitTextStroke:"1.5px rgba(167,139,250,0.4)"}}>transforman</span> negocios
        </h2>
        <div className="reveal" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",background:BD,border:`1px solid ${BD}`}}>
          {services.map(s=>(
            <div key={s.n}
              style={{background:BG,padding:"2.8rem",position:"relative",overflow:"hidden",transition:"background 0.3s",cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#121220";(e.currentTarget.querySelector(".sl") as HTMLElement).style.width="100%";}}
              onMouseLeave={e=>{e.currentTarget.style.background=BG;(e.currentTarget.querySelector(".sl") as HTMLElement).style.width="0%";}}>
              <div className="sl" style={{position:"absolute",top:0,left:0,height:"2px",width:"0%",background:P,transition:"width 0.4s ease"}}/>
              <div style={{fontFamily:H,fontSize:"0.7rem",fontWeight:600,color:P,letterSpacing:"0.18em",marginBottom:"1.8rem",opacity:0.8}}>{s.n}</div>
              <div style={{fontFamily:H,fontSize:"1.25rem",fontWeight:600,marginBottom:"0.9rem",lineHeight:1.25,letterSpacing:"-0.02em"}}>{s.t}</div>
              <div style={{fontSize:"0.93rem",color:M,lineHeight:1.75,fontFamily:BODY,fontWeight:300}}>{s.d}</div>
              <div style={{marginTop:"2rem",fontFamily:H,fontSize:"0.85rem",fontWeight:600,color:P}}>{s.p}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <div id="demo" ref={demoRef} style={{padding:"8rem 5rem",background:BG2,borderTop:`1px solid ${BD}`,borderBottom:`1px solid ${BD}`}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"center"}}>
          <div className="reveal">
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:"1.5rem"}}>
              <div style={{width:36,height:1,background:P}}/>
              <span style={{fontSize:"0.78rem",letterSpacing:"0.18em",textTransform:"uppercase",color:P,fontFamily:H,fontWeight:500}}>Demo en vivo</span>
            </div>
            <h2 style={{fontFamily:H,fontSize:"clamp(2rem,3.5vw,3.5rem)",fontWeight:700,letterSpacing:"-0.035em",lineHeight:1.05,marginBottom:"1.5rem"}}>
              Así responde tu<br/>negocio con IA
            </h2>
            <p style={{color:M,fontSize:"1rem",lineHeight:1.85,marginBottom:"2.5rem",fontFamily:BODY,fontWeight:300}}>
              Un bot real de Onixa AI para un restaurante. Conversación natural, sin menús, sin botones — exactamente como hablar con una persona.
            </p>
            {[
              {i:"✦",t:"Entiende el español colombiano",d:"Con errores, con jerga, como escriben tus clientes reales."},
              {i:"◈",t:"Recuerda a cada cliente",d:"Nombre, pedidos anteriores y preferencias personales."},
              {i:"⬡",t:"Toma reservas en tiempo real",d:"Registra y notifica al dueño automáticamente."},
              {i:"◎",t:"Escala a humano cuando es necesario",d:"Detecta situaciones complejas y avisa de inmediato."},
            ].map(f=>(
              <div key={f.t} style={{display:"flex",gap:"1.2rem",alignItems:"flex-start",marginBottom:"1.5rem"}}>
                <div style={{width:36,height:36,border:`1px solid rgba(167,139,250,0.18)`,borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.88rem",color:P,background:"rgba(167,139,250,0.05)",flexShrink:0}}>{f.i}</div>
                <div>
                  <div style={{fontSize:"1rem",fontWeight:500,marginBottom:4,fontFamily:H,letterSpacing:"-0.01em"}}>{f.t}</div>
                  <div style={{fontSize:"0.88rem",color:M,lineHeight:1.65,fontFamily:BODY,fontWeight:300}}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* PHONE */}
          <div className="reveal" style={{display:"flex",justifyContent:"center",animation:"float 4s ease-in-out infinite"}}>
            <div style={{width:320,background:"#0d0d18",borderRadius:32,border:"1px solid rgba(167,139,250,0.15)",overflow:"hidden",boxShadow:"0 60px 120px rgba(0,0,0,0.7),0 0 80px rgba(124,58,237,0.08)"}}>
              <div style={{background:"#111120",padding:"0.6rem 1.4rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"0.7rem",color:M,fontFamily:H}}>9:41</span>
                <span style={{fontSize:"0.7rem",color:M}}>●●●</span>
              </div>
              <div style={{background:"#141428",padding:"1rem 1.4rem",display:"flex",alignItems:"center",gap:12,borderBottom:`1px solid ${BD}`}}>
                <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:"0.8rem",fontWeight:700,color:B,flexShrink:0}}>LB</div>
                <div>
                  <div style={{fontSize:"0.95rem",fontWeight:500,fontFamily:H}}>La Brasa Roja 🍖</div>
                  <div style={{fontSize:"0.72rem",color:"#4ade80",marginTop:2,fontFamily:BODY}}>● En línea ahora</div>
                </div>
              </div>
              <div ref={chatBodyRef} style={{padding:"1.2rem",display:"flex",flexDirection:"column",gap:10,minHeight:400,maxHeight:400,overflowY:"auto",background:"#0d0d18"}}>
                {chatMessages.length===0&&(
                  <div style={{color:M,fontSize:"0.82rem",textAlign:"center",margin:"auto",lineHeight:1.85,fontFamily:BODY}}>
                    Baja hasta aquí para<br/>ver el demo en acción...
                  </div>
                )}
                {chatMessages.map((msg,i)=>(
                  <div key={i} style={{maxWidth:"88%",fontSize:"0.88rem",lineHeight:1.55,padding:"0.7rem 1rem",borderRadius:14,alignSelf:msg.type==="user"?"flex-end":"flex-start",background:msg.type==="user"?"#2a1d5e":"#181830",border:msg.type==="bot"?`1px solid rgba(167,139,250,0.1)`:"none",borderBottomRightRadius:msg.type==="user"?4:14,borderBottomLeftRadius:msg.type==="bot"?4:14,animation:"msgIn 0.3s ease both",whiteSpace:"pre-line",fontFamily:BODY,fontWeight:300}}>
                    {msg.text}
                    <div style={{fontSize:"0.65rem",color:"rgba(245,243,255,0.22)",marginTop:4,textAlign:"right",fontFamily:H}}>{msg.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <section style={{padding:"8rem 5rem",maxWidth:1400,margin:"0 auto"}}>
        <div className="reveal" style={{display:"flex",alignItems:"center",gap:16,marginBottom:"1.5rem"}}>
          <div style={{width:36,height:1,background:P}}/>
          <span style={{fontSize:"0.78rem",letterSpacing:"0.18em",textTransform:"uppercase",color:P,fontFamily:H,fontWeight:500}}>El proceso</span>
        </div>
        <h2 className="reveal" style={{fontFamily:H,fontSize:"clamp(2.5rem,5vw,4.5rem)",fontWeight:700,letterSpacing:"-0.035em",lineHeight:1.02,marginBottom:"5rem"}}>
          Implementado en<br/>48 horas
        </h2>
        <div className="reveal" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"3rem"}}>
          {[
            {n:"01",t:"Diagnóstico gratis",d:"Analizamos tu negocio y qué automatizar primero para máximo impacto desde el día uno."},
            {n:"02",t:"Configuración a medida",d:"Entrenamos la IA con tu menú, horarios y tono de voz específico de tu negocio."},
            {n:"03",t:"Pruebas reales",d:"Testamos con conversaciones reales antes de activar. Tú apruebas cómo responde."},
            {n:"04",t:"Activación y soporte",d:"Tu bot se activa. Soporte continuo y ajustes mensuales incluidos en todos los planes."},
          ].map(step=>(
            <div key={step.n}>
              <div style={{width:44,height:44,border:`1px solid rgba(167,139,250,0.18)`,borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:H,fontSize:"0.82rem",fontWeight:600,color:P,marginBottom:"1.5rem"}}>{step.n}</div>
              <div style={{fontFamily:H,fontSize:"1.15rem",fontWeight:600,marginBottom:"0.75rem",letterSpacing:"-0.02em"}}>{step.t}</div>
              <div style={{fontSize:"0.92rem",color:M,lineHeight:1.75,fontFamily:BODY,fontWeight:300}}>{step.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{padding:"8rem 5rem",background:BG2,borderTop:`1px solid ${BD}`}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <div className="reveal" style={{display:"flex",alignItems:"center",gap:16,marginBottom:"1.5rem"}}>
            <div style={{width:36,height:1,background:P}}/>
            <span style={{fontSize:"0.78rem",letterSpacing:"0.18em",textTransform:"uppercase",color:P,fontFamily:H,fontWeight:500}}>Planes</span>
          </div>
          <h2 className="reveal" style={{fontFamily:H,fontSize:"clamp(2.5rem,5vw,4.5rem)",fontWeight:700,letterSpacing:"-0.035em",lineHeight:1.02,marginBottom:"5rem"}}>
            Precios claros,<br/>sin sorpresas
          </h2>
          <div className="reveal" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
            {plans.map(plan=>(
              <div key={plan.name}
                style={{border:`1px solid ${plan.featured?P:"rgba(167,139,250,0.1)"}`,borderRadius:4,padding:"3rem",background:plan.featured?"rgba(124,58,237,0.06)":BG,position:"relative",transition:"transform 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}>
                {plan.featured&&(
                  <div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:P,color:B,fontFamily:H,fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.28rem 1.2rem",borderRadius:"0 0 4px 4px"}}>
                    Más popular
                  </div>
                )}
                <div style={{fontFamily:H,fontSize:"0.76rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:P,marginBottom:"1.2rem"}}>{plan.name}</div>
                <div style={{fontFamily:H,fontSize:"3rem",fontWeight:700,letterSpacing:"-0.04em",marginBottom:"0.5rem",lineHeight:1}}>
                  {plan.price}<span style={{fontSize:"1rem",fontWeight:400,color:M,letterSpacing:0}}>/mes</span>
                </div>
                <div style={{fontSize:"0.92rem",color:M,marginBottom:"2rem",lineHeight:1.7,fontFamily:BODY,fontWeight:300}}>{plan.desc}</div>
                <hr style={{border:"none",borderTop:`1px solid ${BD}`,marginBottom:"1.5rem"}}/>
                {plan.features.map(f=>(
                  <div key={f} style={{fontSize:"0.92rem",color:"rgba(245,243,255,0.62)",padding:"0.45rem 0",display:"flex",gap:10,alignItems:"flex-start",fontFamily:BODY,fontWeight:300}}>
                    <span style={{color:P,fontSize:"0.62rem",marginTop:5,flexShrink:0}}>✦</span>{f}
                  </div>
                ))}
                <a href="#contacto" style={{display:"block",width:"100%",marginTop:"2.5rem",textAlign:"center",padding:"1rem",borderRadius:3,fontFamily:H,fontSize:"0.9rem",fontWeight:600,letterSpacing:"0.02em",textDecoration:"none",background:plan.featured?P:"transparent",color:plan.featured?B:W,border:plan.featured?"none":`1px solid rgba(167,139,250,0.18)`,transition:"all 0.2s"}}
                  onMouseEnter={e=>{if(!plan.featured){e.currentTarget.style.borderColor=P;e.currentTarget.style.color=P;}else{e.currentTarget.style.background="#c4b5fd";}}}
                  onMouseLeave={e=>{if(!plan.featured){e.currentTarget.style.borderColor="rgba(167,139,250,0.18)";e.currentTarget.style.color=W;}else{e.currentTarget.style.background=P;}}}>
                  Empezar{plan.featured?" ahora":""}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" style={{textAlign:"center",padding:"10rem 5rem",position:"relative",overflow:"hidden",borderTop:`1px solid ${BD}`}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:500,background:"radial-gradient(ellipse,rgba(124,58,237,0.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.7}} viewport={{once:true}}>
          <div style={{fontFamily:H,fontSize:"0.78rem",fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:P,marginBottom:"2rem",position:"relative",zIndex:1,opacity:0.8}}>
            — OnixaAI —
          </div>
          <h2 style={{fontFamily:H,fontSize:"clamp(3rem,7vw,6rem)",fontWeight:700,letterSpacing:"-0.04em",lineHeight:1,position:"relative",zIndex:1,marginBottom:"2rem"}}>
            ¿Listo para que tu<br/>negocio <span style={{color:P}}>nunca</span><br/>deje de responder?
          </h2>
          <p style={{fontSize:"1.1rem",color:M,maxWidth:500,margin:"0 auto 4rem",lineHeight:1.85,position:"relative",zIndex:1,fontFamily:BODY,fontWeight:300}}>
            Te mostramos el bot funcionando en 15 minutos.<br/>Sin compromiso, sin costo.
          </p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",position:"relative",zIndex:1,flexWrap:"wrap"}}>
            <a href="https://wa.me/57300000000" style={{background:P,color:B,padding:"1.15rem 3rem",fontFamily:H,fontSize:"1rem",fontWeight:600,letterSpacing:"0.02em",borderRadius:"3px",textDecoration:"none",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#c4b5fd";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=P;e.currentTarget.style.transform="translateY(0)";}}>
              Ver demo por WhatsApp
            </a>
            <a href="mailto:hola@onixaai.co" style={{background:"transparent",color:W,border:`1px solid rgba(167,139,250,0.22)`,padding:"1.15rem 3rem",fontFamily:H,fontSize:"1rem",fontWeight:500,letterSpacing:"0.02em",borderRadius:"3px",textDecoration:"none",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=P;e.currentTarget.style.color=P;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(167,139,250,0.22)";e.currentTarget.style.color=W;}}>
              hola@onixaai.co
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${BD}`,padding:"2.8rem 5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{fontFamily:H,fontSize:"1.4rem",fontWeight:700,letterSpacing:"-0.03em"}}>
          Onixa<span style={{color:P}}>AI</span>
        </div>
        <div style={{fontSize:"0.85rem",color:M,fontFamily:BODY}}>© 2025 Onixa AI — Intelligence that moves business</div>
        <div style={{fontSize:"0.85rem",color:M,fontFamily:BODY}}>Colombia → Latinoamérica</div>
      </footer>

    </main>
  );
}