'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Cloud, Palette, Settings, Sparkles, Zap, Star } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: 'Languages',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      skills: [
        { name: 'Kotlin', icon: 'https://skillicons.dev/icons?i=kotlin', level: 'Expert' },
        { name: 'Java', icon: 'https://skillicons.dev/icons?i=java', level: 'Advanced' },
        { name: 'Python', icon: 'https://skillicons.dev/icons?i=py', level: 'Intermediate' },
        { name: 'C++', icon: 'https://skillicons.dev/icons?i=cpp', level: 'Intermediate' }
      ]
    },
    {
      icon: Smartphone,
      title: 'Development Tools',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/30',
      skills: [
        { name: 'Android Studio', icon: 'https://skillicons.dev/icons?i=androidstudio', level: 'Expert' },
        { name: 'Figma', icon: 'https://skillicons.dev/icons?i=figma', level: 'Advanced' },
        { name: 'GitHub', icon: 'https://skillicons.dev/icons?i=github', level: 'Advanced' },
        { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman', level: 'Intermediate' }
      ]
    },
    {
      icon: Cloud,
      title: 'Backend Services',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/30',
      skills: [
        { name: 'Appwrite', icon: 'https://skillicons.dev/icons?i=appwrite', level: 'Advanced' },
        { name: 'Firebase', icon: 'https://skillicons.dev/icons?i=firebase', level: 'Intermediate' },
        { name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase', level: 'Learning' }
      ]
    },
    {
      icon: Palette,
      title: 'Frameworks',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/10 to-red-500/10',
      borderColor: 'border-orange-500/30',
      skills: [
        { name: 'Ktor', icon: 'https://skillicons.dev/icons?i=ktor', level: 'Intermediate' },
        { name: 'Material UI', icon: 'https://skillicons.dev/icons?i=materialui', level: 'Advanced' }
      ]
    },
    {
      icon: Settings,
      title: 'Other Skills',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-500/10 to-blue-500/10',
      borderColor: 'border-indigo-500/30',
      skills: [
        { name: 'Arduino', icon: 'https://skillicons.dev/icons?i=arduino', level: 'Intermediate' }
      ]
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'Advanced': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'Learning': return 'text-purple-400 bg-purple-400/20 border-purple-400/30'
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
    }
  }

  return (
    <section id="skills" className="section-padding bg-dark-900/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/3 to-accent-500/3 rounded-full blur-3xl" />
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
            <span>Technical Expertise</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            A comprehensive showcase of my technical skills, from programming languages to development tools and frameworks.
          </p>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Category Header */}
              <div className="flex items-center justify-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center"
                  >
                    <Star className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
                
                <div className="ml-6 text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">{category.title}</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
                </div>
              </div>

              {/* Skills Grid */}
              <div className={`bg-gradient-to-br ${category.bgColor} rounded-3xl border ${category.borderColor} p-8 backdrop-blur-sm`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="group/skill relative"
                    >
                      <div className="relative">
                        {/* Skill Icon Container */}
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl blur-xl group-hover/skill:blur-2xl transition-all duration-500" />
                          <div className="relative w-full h-full bg-white rounded-2xl p-4 shadow-2xl shadow-black/20 group-hover/skill:shadow-2xl group-hover/skill:shadow-primary-500/25 transition-all duration-500">
                            <img 
                              src={skill.icon} 
                              alt={skill.name} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Skill Name */}
                        <h4 className="text-center text-white font-semibold mb-2 group-hover/skill:text-primary-400 transition-colors duration-300">
                          {skill.name}
                        </h4>

                        {/* Skill Level Badge */}
                        <div className="flex justify-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: skillIndex * 0.5 }}
                          className="absolute -top-2 -right-2 w-3 h-3 bg-accent-400 rounded-full opacity-60"
                        />
                        <motion.div
                          animate={{ y: [5, -5, 5] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: skillIndex * 0.7 }}
                          className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary-400 rounded-full opacity-60"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Skills Overview</h3>
            <p className="text-gray-400">A quick summary of my learning journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative p-8 bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-500/30 rounded-2xl text-center backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary-400 mb-2">4+</div>
                <div className="text-gray-300 font-medium">Years Learning</div>
                <div className="text-gray-500 text-sm mt-2">Continuous growth</div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative p-8 bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/30 rounded-2xl text-center backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-accent-400 mb-2">15+</div>
                <div className="text-gray-300 font-medium">Technologies</div>
                <div className="text-gray-500 text-sm mt-2">Mastered & learning</div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative p-8 bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-2xl text-center backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
                <div className="text-gray-300 font-medium">Self-Learner</div>
                <div className="text-gray-500 text-sm mt-2">Driven by passion</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
