'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      company: 'TechCorp Solutions',
      position: 'Senior Android Developer',
      duration: '2022 - Present',
      location: 'Bangalore, India',
      description: 'Leading Android development for enterprise applications, mentoring junior developers, and implementing best practices.',
      achievements: [
        'Led development of 5+ enterprise Android applications',
        'Improved app performance by 40% through optimization',
        'Mentored 3 junior developers and conducted code reviews',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ],
      technologies: ['Kotlin', 'MVVM', 'Jetpack Compose', 'Dagger Hilt', 'Room Database']
    },
    {
      company: 'MobileFirst Inc.',
      position: 'Android Developer',
      duration: '2020 - 2022',
      location: 'Mumbai, India',
      description: 'Developed consumer-facing Android applications with focus on user experience and performance.',
      achievements: [
        'Developed 3 consumer apps with 100K+ downloads',
        'Reduced app crash rate by 80% through better error handling',
        'Implemented offline-first architecture for better user experience',
        'Collaborated with UI/UX team to improve app design'
      ],
      technologies: ['Java', 'RxJava', 'Retrofit', 'Glide', 'Firebase']
    },
    {
      company: 'StartUp Ventures',
      position: 'Junior Android Developer',
      duration: '2019 - 2020',
      location: 'Delhi, India',
      description: 'Started career in Android development, working on startup projects and learning modern development practices.',
      achievements: [
        'Built MVP for 2 startup applications',
        'Learned modern Android development practices',
        'Contributed to app store optimization',
        'Participated in hackathons and coding competitions'
      ],
      technologies: ['Java', 'Android SDK', 'SQLite', 'REST APIs', 'Git']
    }
  ]

  return (
    <section id="experience" className="section-padding bg-dark-800/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey in Android development, showcasing growth, achievements, and continuous learning.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-950 z-10" />

                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 glass-effect rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{exp.position}</h3>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-primary-400 text-sm font-medium mt-2 sm:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-primary-400 mb-2 uppercase tracking-wide">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-accent-400 mb-2 uppercase tracking-wide">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-dark-700/50 border border-dark-600 rounded-full text-xs text-gray-300 hover:border-primary-500/50 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 hover:bg-primary-500/20 transition-all duration-300">
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm font-medium">View Full Resume</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
