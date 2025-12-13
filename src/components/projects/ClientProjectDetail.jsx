import React from 'react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaArrowLeft, FaLayerGroup, FaCode } from 'react-icons/fa'
import { FloatingShape, ScrollFadeSection } from './Shared'

const ClientProjectDetail = ({ project, onBack }) => {
    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden pb-20">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <FloatingShape className="bg-purple-600 top-[-10%] right-[10%] w-[500px] h-[500px] opacity-10" />
                <FloatingShape className="bg-blue-600 bottom-[10%] left-[-10%] w-[600px] h-[600px] opacity-10" delay={2} />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
            </div>

            {/* Nav Row */}
            <div className="relative z-50 pt-8 px-4 sm:px-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10">
                        <FaArrowLeft />
                    </div>
                    <span>Back to Projects</span>
                </button>
            </div>

            {/* Hero */}
            <div className="relative z-10 pt-10 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 backdrop-blur-md">
                            <FaLayerGroup className="w-3 h-3" />
                            <span>CLIENT SUCCESS STORY</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6">
                            {project.name}
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>

                    {/* Project Showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm mx-auto max-w-5xl"
                    >
                        {/* Mock Browser Header */}
                        <div className="bg-black/40 border-b border-white/10 p-3 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="flex-1 text-center text-xs text-slate-500 font-mono truncate">
                                {project.url}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 md:p-12 text-center">
                            <div className="aspect-video bg-gradient-to-br from-slate-900 to-black rounded-lg border border-white/5 flex items-center justify-center mb-8 relative group overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <FaCode className="text-6xl text-slate-700" />
                                    </>
                                )}
                            </div>

                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left mb-10">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-2">Industry</h4>
                                    <p className="text-white font-medium">{project.industry || 'Technology'}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-2">Services</h4>
                                    <p className="text-white font-medium">{project.services || 'Web Development'}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-2">Year</h4>
                                    <p className="text-white font-medium">2024</p>
                                </div>
                                {project.address && (
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-2">Location</h4>
                                        <p className="text-white font-medium text-sm">{project.address}</p>
                                    </div>
                                )}
                            </div>

                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-slate-200 transition-all hover:scale-105"
                            >
                                <span>Visit Live Site</span>
                                <FaExternalLinkAlt />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ClientProjectDetail
