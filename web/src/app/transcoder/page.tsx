'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodecOptions = ['H.264 (AVC)', 'H.265 (HEVC)', 'AV1', 'ProRes 422'];
const Resolutions = ['4K (2160p)', 'QHD (1440p)', 'FHD (1080p)', 'HD (720p)'];

export default function HyperStreamTranscoder() {
    const [streams, setStreams] = useState([
        { id: 1, name: 'STREAM_ALPHA', status: 'IDLE', progress: 0, bitrate: 0, resolution: '4K', codec: 'H.265' },
        { id: 2, name: 'STREAM_BETA', status: 'IDLE', progress: 0, bitrate: 0, resolution: '4K', codec: 'H.265' },
        { id: 3, name: 'STREAM_GAMMA', status: 'IDLE', progress: 0, bitrate: 0, resolution: '4K', codec: 'H.265' },
        { id: 4, name: 'STREAM_DELTA', status: 'IDLE', progress: 0, bitrate: 0, resolution: '4K', codec: 'H.265' },
    ]);

    const [globalCpu, setGlobalCpu] = useState(0);
    const [totalBandwidth, setTotalBandwidth] = useState(0);
    const chartRef = useRef<HTMLCanvasElement>(null);

    // Simulação de processamento pesado (Stress Engine)
    const startTranscoding = (id: number) => {
        setStreams(prev => prev.map(s => s.id === id ? { ...s, status: 'PROCESSING' } : s));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setStreams(prev => {
                const activeCount = prev.filter(s => s.status === 'PROCESSING').length;
                setGlobalCpu(activeCount * 22 + Math.random() * 5);
                setTotalBandwidth(activeCount * 45 + Math.random() * 10);

                return prev.map(s => {
                    if (s.status === 'PROCESSING') {
                        const nextProgress = s.progress + (Math.random() * 0.5);
                        if (nextProgress >= 100) return { ...s, status: 'DONE', progress: 100, bitrate: 0 };
                        return {
                            ...s,
                            progress: nextProgress,
                            bitrate: 35 + Math.random() * 15 // Mbps para 4K
                        };
                    }
                    return s;
                });
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Gráfico de Bitrate (Real-time Canvas)
    useEffect(() => {
        const canvas = chartRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let points: number[] = Array(50).fill(0);
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);

            points.push(totalBandwidth);
            points.shift();

            points.forEach((p, i) => {
                const x = (i / points.length) * canvas.width;
                const y = canvas.height - (p / 250) * canvas.height;
                ctx.lineTo(x, y);
            });

            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
            ctx.fill();

            requestAnimationFrame(render);
        };
        render();
    }, [totalBandwidth]);

    return (
        <div className="min-h-screen bg-[#020202] text-zinc-100 font-mono p-4 md:p-8">
            {/* Top Navigation / Stats */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                        <span className="bg-primary px-2 py-1 rounded italic">HYPER</span>
                        STREAM_TRANSCODER v4.2
                    </h1>
                    <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-widest leading-none">High-Density Video Processing Engine / Multi-Nodes</p>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-4 glass-panel rounded-2xl border border-white/5">
                        <p className="text-[10px] opacity-40 mb-1">AGGREGATE_CPU_LOAD</p>
                        <div className="flex items-end gap-2">
                            <span className={`text-2xl font-black ${globalCpu > 80 ? 'text-red-500' : 'text-primary'}`}>{globalCpu.toFixed(1)}%</span>
                            <div className="flex gap-0.5 mb-1 h-4 items-end">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className={`w-1 rounded-full ${i < globalCpu / 8 ? 'bg-primary' : 'bg-zinc-800'}`} style={{ height: `${20 + Math.random() * 80}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 glass-panel rounded-2xl border border-white/5">
                        <p className="text-[10px] opacity-40 mb-1">TOTAL_OUT_BANDWIDTH</p>
                        <p className="text-2xl font-black">{totalBandwidth.toFixed(0)} <span className="text-xs font-normal opacity-40">Mbps</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stream Monitors Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {streams.map((stream) => (
                        <div key={stream.id} className={`glass-panel p-4 rounded-3xl border ${stream.status === 'PROCESSING' ? 'border-primary/40' : 'border-white/5'} transition-all relative overflow-hidden group`}>
                            {stream.status === 'PROCESSING' && (
                                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                            )}

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <h3 className="font-bold text-xs flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${stream.status === 'PROCESSING' ? 'bg-primary animate-ping' : 'bg-zinc-700'}`} />
                                        {stream.name}
                                    </h3>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-[9px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-bold">{stream.resolution}</span>
                                        <span className="text-[9px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-bold">{stream.codec}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => startTranscoding(stream.id)}
                                    disabled={stream.status === 'PROCESSING'}
                                    className={`text-[9px] font-bold px-4 py-2 rounded-lg transition-all ${stream.status === 'PROCESSING' ? 'opacity-20 translate-x-10' : 'bg-primary hover:bg-indigo-600'}`}
                                >
                                    START_NODE
                                </button>
                            </div>

                            {/* Monitor "Screen" */}
                            <div className="aspect-video bg-zinc-900 rounded-2xl mb-4 border border-white/5 flex flex-col items-center justify-center relative group-hover:border-primary/30 transition-colors">
                                {stream.status === 'PROCESSING' ? (
                                    <div className="text-center">
                                        <div className="text-3xl mb-2 opacity-20">⚙️</div>
                                        <p className="text-[10px] font-mono tracking-tighter text-primary">ENCODING_BLOCKS_8x8...</p>
                                        <p className="text-xl font-black mt-2">{stream.progress.toFixed(1)}%</p>
                                    </div>
                                ) : stream.status === 'DONE' ? (
                                    <p className="text-emerald-500 font-bold text-xs tracking-widest">SUCCESS_EXPORT_4K</p>
                                ) : (
                                    <p className="text-[10px] opacity-20 font-bold tracking-[0.5em]">SIGNAL_READY</p>
                                )}

                                {/* Progress Bar overlay */}
                                {stream.status === 'PROCESSING' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stream.progress}%` }}
                                            className="h-full bg-primary shadow-[0_0_10px_#6366f1]"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between text-[10px] opacity-50 relative z-10">
                                <span>BITRATE: {stream.bitrate.toFixed(1)} Mbps</span>
                                <span>LATENCY: 12ms</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Control & Analysis Side */}
                <div className="space-y-6">
                    {/* Real-time Graph */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/5">
                        <h3 className="text-xs font-bold mb-6 text-zinc-400 tracking-widest uppercase">Network_Load Analisys</h3>
                        <canvas ref={chartRef} width={400} height={150} className="w-full" />
                        <div className="mt-4 flex justify-between text-[9px] font-bold text-zinc-600">
                            <span>0% LOAD</span>
                            <span>100% PEAK</span>
                        </div>
                    </div>

                    {/* Engine Logs */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 h-[300px] overflow-hidden flex flex-col">
                        <h3 className="text-xs font-bold mb-4 text-emerald-500 tracking-widest uppercase">System_Engine Terminal</h3>
                        <div className="flex-1 font-mono text-[9px] space-y-2 opacity-60 overflow-y-auto overflow-x-hidden">
                            <p className="text-zinc-500">[SYSTEM] Initializing CUDA Cores...</p>
                            <p className="text-zinc-500">[SYSTEM] Pre-allocating video buffers for 4K streams.</p>
                            <p className="text-zinc-500">[INFO] FFmpeg version 6.1.1-N-g73d63c5ae1-2026</p>
                            <AnimatePresence>
                                {globalCpu > 0 && (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                        <p className="text-primary font-bold">{`> transcoding: fps=${(60 - (globalCpu / 5)).toFixed(1)} q=22.0 size=142MB bitr=42.1Mbps`}</p>
                                        <p className="text-zinc-400">{`> frame= ${Math.floor(globalCpu * 124)} fps= 58.2 time=00:01:14.02 bitrate=42.1mb/s`}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {globalCpu > 80 && (
                                <p className="text-red-500 font-black animate-pulse">[CRITICAL] Thermal Throttling Detected - Check cooling</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl text-center">
                        <p className="text-xs font-bold text-primary mb-2 italic tracking-tighter underline decoration-2 offset-2">PREMIUM_ACCOUNT_DETECTED</p>
                        <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest">Acesso liberado para codificação em AV1 e renderização distribuída em 4 núcleos.</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-[10px] opacity-20 tracking-[1em] font-black italic underline decoration-2 offset-4">
                HARDWARE_ACCELERATION: ACTIVE [NVIDIA RTX 4090 EMULATED]
            </div>
        </div>
    );
}
