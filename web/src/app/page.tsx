'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "AI DIAGNOSTIC ENGINE",
      category: "AI & Logic",
      description: "Agente inteligente que processa sintomas técnicos via GPT-4o para gerar relatórios de manutenção precisos.",
      tags: ["Python", "OpenAI API", "Dotenv"],
      color: "python-blue",
      github: "ai_diagnostico"
    },
    {
      title: "INTELLIGENT LEAD SCRAPER",
      category: "Data Automation",
      description: "Script de mineração de dados comerciais com Pandas, simulando o ciclo completo de ETL e exportação para Excel.",
      tags: ["Python", "Pandas", "Automation"],
      color: "python-yellow",
      github: "leads_scraper"
    },
    {
      title: "PREMIUM BARBER MANAGER API",
      category: "Backend / Web",
      description: "API REST de alta performance construída com FastAPI para controle de agendamentos e serviços.",
      tags: ["FastAPI", "Pydantic", "Uvicorn"],
      color: "python-blue",
      github: "management_api"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-python-yellow/30 bg-[#0a0a0c]">
      <div className="matrix-bg" />

      {/* Header */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter"
        >
          JEAN<span className="text-python-blue">CARLOS</span><span className="text-python-yellow">.PY</span>
        </motion.div>

        <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase items-center">
          <a href="#projects" className="opacity-40 hover:opacity-100 transition-opacity">Projects</a>
          <a href="https://www.linkedin.com/in/jean-carlos-reis-47478717a/" target="_blank" className="bg-python-blue text-white px-4 py-2 rounded-lg opacity-100 hover:scale-105 transition-transform">LinkedIn</a>
        </div>
      </nav>

      <main className="container mx-auto px-6 relative z-10">

        {/* Welcome Block */}
        <section className="pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-python-blue/30 bg-python-blue/5 text-python-blue text-[10px] font-bold mb-8 uppercase tracking-[0.2em]"
          >
            Python Backend Specialist & AI Integrator
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none italic">
            CODING <br /> THE <span className="text-python-blue glow-text-blue">FUTURE.</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-500 text-lg mb-12 italic border-l-2 border-python-blue pl-6 py-2">
            "Desenvolvedor focado em Python, transformando automação em lucro e IA em soluções práticas."
          </p>
        </section>

        {/* Project Grid */}
        <section id="projects" className="py-20">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-black tracking-widest uppercase">My_Projects</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-python-blue/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence>
              {projects.map((proj, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={proj.title}
                  className="group p-8 bg-zinc-900/50 border border-white/5 rounded-[40px] hover:border-python-blue/30 transition-all flex flex-col justify-between aspect-square terminal-shadow"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-mono text-zinc-600">{proj.category}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${proj.color}/10 text-${proj.color}`}>
                        {i === 0 ? '🧠' : i === 1 ? '📊' : '🔌'}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mb-4 group-hover:text-python-blue transition-colors leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-[9px] font-bold rounded uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold pt-4 border-t border-white/5">
                      <span className="text-zinc-600 tracking-tighter">PROJECT_DIR: /{proj.github}</span>
                      <span className="text-python-blue opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE_CODE →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Technical Terminal Footer */}
        <section className="py-32">
          <div className="glass-panel p-8 rounded-[50px] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-python-blue/10 blur-[100px] -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-black mb-6">PRONTO PARA <br /><span className="text-python-blue">CONTRATAR?</span></h3>
                <p className="text-zinc-500 mb-8">Especialista júnior com mentalidade sênior. Foco em resultados, código limpo e arquitetura escalável.</p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/jean-carlos-reis-47478717a/" target="_blank" className="px-8 py-4 bg-python-blue text-white rounded-2xl font-bold shadow-xl shadow-python-blue/20">LinkedIn Message</a>
                  <button className="px-8 py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-colors">Curriculum Vitae</button>
                </div>
              </div>
              <div className="bg-black p-6 rounded-3xl border border-white/5 font-mono text-[10px] space-y-2 opacity-50">
                <p className="text-python-blue">$ python --version</p>
                <p>Python 3.12.1 (Active)</p>
                <p className="text-python-blue">$ whoami</p>
                <p>Jean Carlos Reis [Software Developer]</p>
                <p className="text-python-blue">$ locate --skills</p>
                <p>[+] FastAPI, Django, Flask, OpenAI API, Pandas, ETL, WebScraping, Git, PostgreSQL</p>
                <p className="text-python-blue animate-pulse">$ _</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 container mx-auto px-6 flex justify-between items-center opacity-30 text-[10px] font-bold tracking-[0.5em]">
        <span>&copy; 2026 JEAN_CARLOS_REIS</span>
        <div className="flex gap-8">
          <span>MDXXVI</span>
          <span>SÃO_PAULO_BR</span>
        </div>
      </footer>
    </div>
  );
}
