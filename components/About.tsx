'use client'

import { motion } from 'framer-motion'
import { User, MapPin, Mail, Award, Target, Users, Sparkles, Star, Heart, Rocket, BookOpen } from 'lucide-react'
import {SiGithub, SiInstagram} from "react-icons/si";

export default function About() {
  const personalInfo = [
    { icon: MapPin, label: 'Location', value: 'India', color: 'from-blue-500 to-cyan-500' },
    { icon: Mail, label: 'Email', value: 'shivam1209raj@gmail.com', color: 'from-green-500 to-emerald-500' },
    { icon: SiInstagram, label: 'Instagram', value: '@star098123', color: 'from-pink-500 to-rose-500' },
    { icon: SiGithub, label: 'GitHub', value: 'shivam-raj12', color: 'from-gray-600 to-gray-800' }
  ]

  const highlights = [
    {
      icon: Award,
      title: 'Self-Learner',
      description: 'I love learning new things on my own. I spend time exploring programming languages and technologies to build my skills.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: Target,
      title: 'Android Development',
      description: 'Right now, I\'m focused on building Android apps using modern tools like Jetpack Compose. I enjoy creating apps that people find useful and easy to use.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'I like working with others on interesting projects. I believe we can create better things when we work together and share ideas.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/30'
    }
  ]

  const journeySteps = [
    {
      icon: BookOpen,
      title: 'Learning Foundation',
      description: 'Started with Python and Java to understand programming basics',
      color: 'from-blue-500 to-cyan-500',
      step: '01'
    },
    {
      icon: Target,
      title: 'Focus Shift',
      description: 'Decided to specialize in Android app development',
      color: 'from-green-500 to-emerald-500',
      step: '02'
    },
    {
      icon: Rocket,
      title: 'Modern Tools',
      description: 'Adopted Kotlin and Jetpack Compose for better development',
      color: 'from-purple-500 to-pink-500',
      step: '03'
    },
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'Fully committed to creating amazing Android experiences',
      color: 'from-red-500 to-orange-500',
      step: '04'
    }
  ]

  return (
    <section id="about" className="section-padding bg-dark-900/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-primary-500/3 to-accent-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-r from-accent-500/3 to-primary-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Get to Know Me</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            A passionate Android developer from India, dedicated to creating innovative mobile experiences and continuously learning new technologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Personal Info & Journey */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Personal Information */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mb-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Personal Information</h3>
              </motion.div>
              
              <div className="space-y-4">
                {personalInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={
                      info.label === 'Email' 
                        ? `mailto:${info.value}` 
                        : info.label === 'GitHub'
                        ? `https://github.com/${info.value}`
                        : info.label === 'Instagram'
                        ? `https://instagram.com/${info.value.slice(1)}`
                        : '#'
                    }
                    target={info.label === 'GitHub' || info.label === 'Instagram' ? '_blank' : undefined}
                    rel={info.label === 'GitHub' || info.label === 'Instagram' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="group block"
                  >
                    <div className="p-6 bg-dark-800/30 rounded-2xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-500 backdrop-blur-sm hover:bg-dark-800/50">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                          <div className="text-white font-semibold group-hover:text-primary-400 transition-colors duration-300">
                            {info.value}
                          </div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Star className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* About My Journey */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 text-primary-400 mr-3" />
                  About My Journey
                </h3>
              </motion.div>
              
              <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-3xl border border-primary-500/20 p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-gray-300 leading-relaxed text-lg"
                  >
                    I started learning Android development because I was very interested in it. In the beginning, I learned some basic programming languages like Python and Java. These languages helped me understand how coding works and built my confidence.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-gray-300 leading-relaxed text-lg"
                  >
                    After that, I decided to focus only on Android app development. I chose Kotlin as my main language because it is modern and powerful. Along with Kotlin, I also started using Jetpack Compose, which makes it easier to design and build apps.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="text-gray-300 leading-relaxed text-lg"
                  >
                    Now, I am fully focused on creating Android apps using Kotlin and Jetpack Compose. This journey has been full of learning and growth, and I am excited to keep improving my skills and building more apps.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Highlights & Journey Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* What I Do */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-accent-400 mr-3" />
                  What I Do
                </h3>
              </motion.div>
              
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${highlight.bgColor} rounded-2xl border ${highlight.borderColor} p-6 backdrop-blur-sm hover:shadow-xl transition-all duration-500`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${highlight.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <highlight.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                            {highlight.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed text-lg">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-400 mr-3" />
                  My Learning Path
                </h3>
              </motion.div>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />
                
                <div className="space-y-8">
                  {journeySteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative flex items-center space-x-6"
                    >
                      {/* Step Number */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 relative`}>
                        {step.step}
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1 bg-dark-800/30 rounded-2xl border border-dark-700/50 p-6 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                            <step.icon className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-2xl text-primary-400 backdrop-blur-sm">
            <Heart className="w-5 h-5" />
            <span className="font-medium text-lg">Passionate about creating amazing mobile experiences!</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
