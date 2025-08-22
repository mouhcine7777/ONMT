'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChevronRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon
} from 'lucide-react'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Événements',
    links: [
      { label: 'Salons Internationaux', href: '/salons' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'Calendrier', href: '/calendrier' },
      { label: 'Inscriptions', href: '/inscriptions' },
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Mon Espace', href: '/espace' },
      { label: 'Support', href: '/support' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Guides', href: '/guides' },
    ]
  },
  {
    title: 'À Propos',
    links: [
      { label: 'Notre Mission', href: '/mission' },
      { label: 'Équipe', href: '/equipe' },
      { label: 'Partenaires', href: '/partenaires' },
      { label: 'Actualités', href: '/actualites' },
    ]
  },
  {
    title: 'Légal',
    links: [
      { label: 'Conditions d\'utilisation', href: '/conditions' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Mentions légales', href: '/mentions' },
    ]
  }
]

const socialLinks = [
  { icon: FacebookIcon, href: 'https://facebook.com/onmt', label: 'Facebook' },
  { icon: InstagramIcon, href: 'https://instagram.com/onmt', label: 'Instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/company/onmt', label: 'LinkedIn' },
  { icon: YoutubeIcon, href: 'https://youtube.com/onmt', label: 'YouTube' },
]

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            {/* Logo */}
            <div className="mb-6">
              <div className="relative h-16 w-48">
                <Image
                  src="/logowhite.png"
                  alt="ONMT Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 font-poppins leading-relaxed mb-6 text-lg">
              L'Office National Marocain du Tourisme vous accompagne dans votre développement 
              international à travers les plus grands événements touristiques mondiaux.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <MapPinIcon className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0 group-hover:text-emerald-300 transition-colors duration-300" />
                <span className="text-gray-300 font-poppins leading-relaxed group-hover:text-white transition-colors duration-300">
                  Angle Rues Oued Al Makhazine et Zalaka<br />
                  Agdal - 10080 Rabat, Maroc
                </span>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <PhoneIcon className="h-5 w-5 text-emerald-400 flex-shrink-0 group-hover:text-emerald-300 transition-colors duration-300" />
                <div className="text-gray-300 font-poppins space-y-1">
                  <div className="group-hover:text-white transition-colors duration-300">+212 5 37 27 83 00</div>
                  <div className="group-hover:text-white transition-colors duration-300">+212 5 37 67 40 15</div>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <EnvelopeIcon className="h-5 w-5 text-emerald-400 flex-shrink-0 group-hover:text-emerald-300 transition-colors duration-300" />
                <span className="text-gray-300 font-poppins group-hover:text-white transition-colors duration-300">
                  contact@onmt.ma
                </span>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <GlobeAltIcon className="h-5 w-5 text-emerald-400 flex-shrink-0 group-hover:text-emerald-300 transition-colors duration-300" />
                <span className="text-gray-300 font-poppins group-hover:text-white transition-colors duration-300">
                  www.onmt.ma
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-white font-bold text-lg mb-6 font-poppins">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <motion.a
                          href={link.href}
                          whileHover={{ x: 5 }}
                          className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300 font-poppins"
                        >
                          <ChevronRightIcon className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-emerald-400" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.label}
                          </span>
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 font-poppins">
                Restez informé des nouveaux événements
              </h3>
              <p className="text-gray-300 font-poppins">
                Recevez en avant-première les invitations aux salons et workshops exclusifs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent font-poppins"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-poppins whitespace-nowrap"
              >
                S'abonner
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-400 font-poppins"
            >
              <span>© {currentYear} Office National Marocain du Tourisme.</span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-3 bg-white/10 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-emerald-400/30"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500" />
    </footer>
  )
}

export default Footer