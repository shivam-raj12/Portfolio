'use client'

import {motion} from 'framer-motion'
import {Smartphone, Code} from 'lucide-react'

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-dark-950 flex items-center justify-center z-50">
            <div className="text-center">
                {/* Logo/Icon */}
                <motion.div
                    initial={{scale: 0, rotate: -180}}
                    animate={{scale: 1, rotate: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    className="mb-8"
                >
                    <div className="relative">
                        <Smartphone className="w-20 h-20 text-primary-400 mx-auto"/>
                        <motion.div
                            animate={{rotate: 360}}
                            transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                            className="absolute inset-0"
                        >
                            <Code className="w-8 h-8 text-accent-400 absolute top-2 right-2"/>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Loading text */}
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.3}}
                    className="text-3xl font-bold text-white mb-4"
                >
                    Shivam Raj
                </motion.h1>

                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.5}}
                    className="text-lg text-gray-400 mb-8"
                >
                    Android Developer
                </motion.p>

                {/* Loading animation */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.7}}
                    className="flex items-center justify-center space-x-2"
                >
                    <motion.div
                        animate={{scale: [1, 1.2, 1]}}
                        transition={{duration: 1, repeat: Infinity, delay: 0}}
                        className="w-3 h-3 bg-primary-400 rounded-full"
                    />
                    <motion.div
                        animate={{scale: [1, 1.2, 1]}}
                        transition={{duration: 1, repeat: Infinity, delay: 0.2}}
                        className="w-3 h-3 bg-accent-400 rounded-full"
                    />
                    <motion.div
                        animate={{scale: [1, 1.2, 1]}}
                        transition={{duration: 1, repeat: Infinity, delay: 0.4}}
                        className="w-3 h-3 bg-primary-400 rounded-full"
                    />
                </motion.div>

                {/* Loading progress */}
                <motion.div
                    initial={{width: 0}}
                    animate={{width: "100%"}}
                    transition={{duration: 2, ease: "easeInOut"}}
                    className="mt-8 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
                />
            </div>
        </div>
    )
}
