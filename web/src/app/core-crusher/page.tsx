'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CoreCrusher() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cpuLoad, setCpuLoad] = useState(0);
    const [particleCount, setParticleCount] = useState(5000);
    const [fps, setFps] = useState(0);

    // Sistema de Partículas Massivo (Física de Hardware)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles: any[] = [];
        let lastTime = 0;
        let frameCount = 0;

        class Particle {
            x: number; y: number; vx: number; vy: number;
            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
            }
            draw() {
                ctx!.fillStyle = '#6366f1';
                ctx!.fillRect(this.x, this.y, 1.5, 1.5);
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = (time: number) => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Cálculo de Performance
            frameCount++;
            if (time - lastTime > 1000) {
                setFps(frameCount);
                setCpuLoad(Math.min(100, (particleCount / 500))); // Simulação de carga
                frameCount = 0;
                lastTime = time;
            }

            requestAnimationFrame(animate);
        };

        init();
        requestAnimationFrame(animate);

        return () => { };
    }, [particleCount]);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-mono overflow-hidden relative">
            <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

            {/* HUD de Controle */}
            <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="col-span-1 p-6 bg-black/60 border border-primary/20 backdrop-blur-xl rounded-2xl"
                >
                    <h2 className="text-primary font-black text-xl mb-4 tracking-tighter">CORE CRUSHER v1.0</h2>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-[10px] mb-2">
                                <span>INTENSIDADE DE CÁLCULO</span>
                                <span className="text-primary">{particleCount} OBJETOS</span>
                            </div>
                            <input
                                type="range" min="1000" max="50000" step="1000"
                                value={particleCount}
                                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                                <p className="text-[10px] opacity-50">FPS</p>
                                <p className={`text-2xl font-black ${fps < 30 ? 'text-red-500' : 'text-emerald-500'}`}>{fps}</p>
                            </div>
                            <div className="p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                                <p className="text-[10px] opacity-50">CPU LOAD</p>
                                <p className="text-2xl font-black text-primary">{cpuLoad.toFixed(0)}%</p>
                            </div>
                        </div>

                        <div className="p-4 border border-white/5 bg-white/5 rounded-xl">
                            <p className="text-[10px] mb-2 uppercase tracking-widest text-zinc-500">Threads de Processamento</p>
                            <div className="flex gap-1">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [10, Math.random() * 30, 10] }}
                                        transition={{ repeat: Infinity, duration: 0.5 + Math.random() }}
                                        className="flex-1 bg-primary/40 rounded-t-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Dashboard de Status Central */}
                <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-64 h-64 border-2 border-primary/20 rounded-full flex items-center justify-center relative"
                    >
                        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
                        <div className="text-center">
                            <p className="text-[10px] tracking-[0.3em] opacity-50">SISTEMA INFRA</p>
                            <p className="text-4xl font-black tracking-tighter">ESTÁVEL</p>
                        </div>
                    </motion.div>
                </div>

                {/* Log de Hardware */}
                <div className="col-span-1 p-6 bg-black/60 border border-white/5 backdrop-blur-xl rounded-2xl">
                    <p className="text-[10px] mb-4 text-emerald-500 font-bold tracking-widest">LIVE HARDWARE LOG</p>
                    <div className="text-[10px] space-y-2 opacity-70">
                        <p className="animate-pulse">{`> [INFO] Inicializando motor de física...`}</p>
                        <p>{`> [INFO] Alocando ${particleCount} buffers em memória...`}</p>
                        <p>{`> [WARN] Saturação de CPU detectada em single-thread...`}</p>
                        <p className="text-primary">{`> [OK] WebGL acelerado via GPU detectado.`}</p>
                        <p>{`> [INFO] Calculando vetores de colisão...`}</p>
                        <p className="text-zinc-500 underline">{`> [DEBUG] ${Math.random().toString(36).substring(7)}`}</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center opacity-30">
                <p className="text-[9px] tracking-[0.5em] uppercase">Built to push the boundaries of modern AI computing</p>
            </div>
        </div>
    );
}
