'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: { label: string; href: string; description?: string }[]
}

const navigationItems: NavItem[] = [
  {
    label: 'Salons',
    href: '/salons',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Salons Internationaux', href: '/salons/internationaux', description: 'Événements mondiaux' },
      { label: 'Salons Européens', href: '/salons/europeens', description: 'Focus Europe' },
      { label: 'Salons Africains', href: '/salons/africains', description: 'Continent africain' },
    ]
  },
  {
    label: 'Workshops',
    href: '/workshops',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Digital Marketing', href: '/workshops/digital', description: 'Stratégies numériques' },
      { label: 'E-Commerce', href: '/workshops/ecommerce', description: 'Vente en ligne' },
      { label: 'Formation Continue', href: '/workshops/formation', description: 'Développement professionnel' },
    ]
  },
  { label: 'Calendrier', href: '/calendrier' },
  { label: 'Mon Espace', href: '/espace' },
  { label: 'Support', href: '/support' },
]

const StickyNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
  }

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: 0,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
        style={{
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer"
            >
              <div className="relative h-10 w-32 lg:h-12 lg:w-40">
                <Image
                  src="/logo.png"
                  alt="ONMT Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={closeDropdowns}
                    >
                      <button
                        className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold font-poppins transition-all duration-300 ${
                          activeDropdown === item.label
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                        }`}
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                          >
                            <div className="p-2">
                              {item.dropdownItems?.map((dropdownItem, index) => (
                                <motion.a
                                  key={dropdownItem.label}
                                  href={dropdownItem.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.05 }}
                                  className="flex flex-col p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                                >
                                  <span className="font-semibold text-gray-900 font-poppins group-hover:text-emerald-600 transition-colors duration-200">
                                    {dropdownItem.label}
                                  </span>
                                  {dropdownItem.description && (
                                    <span className="text-sm text-gray-500 font-poppins mt-1">
                                      {dropdownItem.description}
                                    </span>
                                  )}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-all duration-300 font-poppins"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden lg:flex relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              </motion.button>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-emerald-600 font-poppins transition-colors duration-300"
                >
                  Se connecter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-poppins"
                >
                  Créer un compte
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold font-poppins transition-all duration-300 ${
                            activeDropdown === item.label
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {item.label}
                          <ChevronDownIcon
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 ml-4 space-y-1"
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <motion.a
                                  key={dropdownItem.label}
                                  href={dropdownItem.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-poppins"
                                >
                                  {dropdownItem.label}
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-100 rounded-xl font-semibold font-poppins transition-all duration-300"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button className="w-full px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-gray-100 rounded-xl font-semibold font-poppins transition-all duration-300 text-left">
                    Se connecter
                  </button>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-poppins">
                    Créer un compte
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 lg:h-20" />
    </>
  )
}

export default StickyNavigation