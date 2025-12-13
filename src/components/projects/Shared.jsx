import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Shared animated section component
export const ScrollFadeSection = ({ children, className }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])

    return (
        <motion.section
            ref={ref}
            style={{ opacity, scale }}
            className={className}
        >
            {children}
        </motion.section>
    )
}

// 3D Card Component
export const Card3D = ({ children, className = '' }) => {
    return (
        <motion.div
            className={`glass-card rounded-2xl p-8 relative overflow-hidden group preserve-3d perspective-1000 border border-white/10 bg-white/5 backdrop-blur-md ${className}`}
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {children}
        </motion.div>
    )
}

export const FloatingShape = ({ delay = 0, className }) => (
    <motion.div
        className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
        animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
    />
)
