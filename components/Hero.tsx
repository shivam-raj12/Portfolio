'use client'

import {useState, useEffect} from "react";
import {motion} from 'framer-motion'
import {ExternalLink, ArrowRight, Smartphone, Code, Zap, TrendingUp} from 'lucide-react'
import {getProfile, type Profile, getLatestBlogs, type BlogPost} from "@/lib/appwrite";


function ProfileImage({imageUrl}: { imageUrl?: string }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
            {imageUrl && !imgError ? (
                <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="text-6xl">👨‍💻</div>
            )}
        </div>
    );
}


export default function Hero() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, blogsData] = await Promise.all([
                    getProfile(),
                    getLatestBlogs(3)
                ]);
                setProfile(profileData);
                setBlogs(blogsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollToContact = () => {
        const element = document.getElementById('contact')
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
        }
    }

    const goToStore = () => {
        window.location.href = '/store'
    }

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="container-custom section-padding">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                            className="mb-6"
                        >
              <span
                  className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-4">
                👋 Welcome to my portfolio
              </span>
                        </motion.div>

                        <motion.h1
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                        >
                            Hi, I'm{' '}
                            <span className="gradient-text">Shivam Raj</span>
                            <br/>
                            <span className="text-gray-300 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Android Developer</span>
                        </motion.h1>

                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.4}}
                            className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            I am a developer from India who loves creating mobile apps and learning new technologies. Currently focused on Android development with Jetpack Compose.
                        </motion.p>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.5}}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                        >
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={scrollToContact}
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 text-sm sm:text-base"
                            >
                                <span>Get In Touch</span>
                                <ArrowRight className="w-5 h-5"/>
                            </motion.button>

                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={goToStore}
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                <ExternalLink className="w-5 h-5"/>
                                <span>My App Store</span>
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.6}}
                            className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-md mx-auto lg:mx-0"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-400">4+</div>
                                <div className="text-sm text-gray-500">Years Learning</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-accent-400">100%</div>
                                <div className="text-sm text-gray-500">Self-Learner</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Photo & 3D Phone Mockup */}
                    <motion.div
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.8, delay: 0.4}}
                        className="relative flex flex-col items-center lg:items-end space-y-8"
                    >
                        {/* Profile Photo */}
                        <motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.8, delay: 0.6}}
                            className="relative"
                        >
                            <div
                                className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-1">
                                {/*<div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">*/}
                                {/*  <div className="text-6xl">👨‍💻</div>*/}
                                {/*</div>*/}
                                <ProfileImage imageUrl={profile?.profile}/>
                            </div>
                            <div
                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                                <Code className="w-4 h-4 text-white"/>
                            </div>
                        </motion.div>

                        {/* 3D Phone Mockup */}
                        <div className="relative">
                            <motion.div
                                animate={{rotateY: [0, 5, 0]}}
                                transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                                className="relative w-64 h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] border-8 border-gray-700 shadow-2xl"
                            >
                                <div
                                    className="absolute inset-2 bg-gradient-to-br from-primary-900 to-accent-900 rounded-[2rem] overflow-hidden">
                                    <div className="grid grid-cols-4 gap-4 p-6">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{scale: 0}}
                                                animate={{scale: 1}}
                                                transition={{duration: 0.5, delay: 0.8 + i * 0.1}}
                                                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
                                            >
                                                <Code className="w-5 h-5 text-white"/>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.div
                                        animate={{y: [-10, 10, -10]}}
                                        transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                                        className="absolute top-20 right-6 w-3 h-3 bg-accent-400 rounded-full"
                                    />
                                    <motion.div
                                        animate={{y: [10, -10, 10]}}
                                        transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                                        className="absolute bottom-20 left-6 w-2 h-2 bg-primary-400 rounded-full"
                                    />
                                </div>

                                <div
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"/>
                            </motion.div>

                            <motion.div
                                animate={{rotate: 360}}
                                transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                                className="absolute -top-8 -right-8 w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center"
                            >
                                <Smartphone className="w-8 h-8 text-primary-400"/>
                            </motion.div>

                            <motion.div
                                animate={{rotate: -360}}
                                transition={{duration: 25, repeat: Infinity, ease: "linear"}}
                                className="absolute -bottom-8 -left-8 w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center"
                            >
                                <Zap className="w-6 h-6 text-accent-400"/>
                            </motion.div>

                            <motion.div
                                animate={{y: [-5, 5, -5]}}
                                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                                className="absolute top-1/2 -right-12 w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center"
                            >
                                <TrendingUp className="w-4 h-4 text-primary-400"/>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
