'use client'

import {createMessage} from "@/lib/appwrite";
import {useState} from 'react'
import {motion} from 'framer-motion'
import {Mail, MapPin, Send, MessageCircle} from 'lucide-react'
import {SiGithub, SiInstagram} from "react-icons/si";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const message = await createMessage({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            });
            
            if (message) {
                alert('Thank you for your message! I\'ll get back to you soon.')
                setFormData({name: '', email: '', subject: '', message: ''})
            } else {
                alert('Failed to send message. Please try again.')
            }
        } catch (error) {
            console.error('Error sending message:', error)
            alert("An error occurred while sending your message. Please try again.")
        }

        setIsSubmitting(false)
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'shivam1209raj@gmail.com',
            link: 'mailto:shivam1209raj@gmail.com'
        },
        {
            icon: MapPin,
            title: 'Location',
            value: 'India',
            link: '#'
        },
        {
            icon: MessageCircle,
            title: 'Languages',
            value: 'Hindi, English',
            link: '#'
        }
    ]

    const socialLinks = [
        {
            icon: SiGithub,
            name: 'GitHub',
            url: 'https://github.com/shivam-raj12',
            color: 'hover:text-gray-300'
        },
        {
            icon: SiInstagram,
            name: 'Instagram',
            url: 'https://instagram.com/star098123',
            color: 'hover:text-pink-400'
        }
    ]

    return (
        <section id="contact" className="section-padding bg-dark-900/50">
            <div className="container-custom">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    viewport={{once: true}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Ready to start a project or have a question? Let's discuss how I can help bring your ideas to
                        life.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Side - Contact Information */}
                    <motion.div
                        initial={{opacity: 0, x: -50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                I'm always interested in hearing about new projects and opportunities.
                                Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.title}
                                    href={info.link}
                                    initial={{opacity: 0, x: -20}}
                                    whileInView={{opacity: 1, x: 0}}
                                    transition={{duration: 0.5, delay: index * 0.1}}
                                    viewport={{once: true}}
                                    className="flex items-center space-x-4 p-4 bg-dark-800/50 rounded-lg border border-dark-700 hover:border-primary-500/30 transition-all duration-300 group"
                                >
                                    <div
                                        className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-all duration-300">
                                        <info.icon className="w-6 h-6 text-primary-400"/>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">{info.title}</div>
                                        <div
                                            className="text-white font-medium group-hover:text-primary-400 transition-colors duration-300">
                                            {info.value}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{opacity: 0, scale: 0.8}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.5, delay: index * 0.1}}
                                        viewport={{once: true}}
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.95}}
                                        className={`w-12 h-12 bg-dark-800/50 border border-dark-700 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:border-primary-500/30 transition-all duration-300`}
                                    >
                                        <social.icon className="w-6 h-6"/>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                    >
                        <div className="p-8 glass-effect rounded-xl border border-white/10">
                            <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                                            placeholder="Your email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300 resize-none"
                                        placeholder="Tell me about your project or question..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5"/>
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.6}}
                    viewport={{once: true}}
                    className="text-center mt-16"
                >
                    <div
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-lg text-accent-400 hover:border-accent-500/40 transition-all duration-300">
                        <MessageCircle className="w-5 h-5"/>
                        <span className="font-medium">Let's build something amazing together!</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
