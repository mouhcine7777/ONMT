'use client'

import React, { useEffect, useState } from 'react'
import { ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline'
import { motion, useScroll, useTransform } from 'framer-motion'

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-[120vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg.jpg')`,
          }}
        />
        {/* Black Shadow Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Floating Geometric Elements - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-16 left-2 sm:top-20 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-32 right-2 sm:top-40 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-lg"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-20 left-4 sm:bottom-32 sm:left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-green-400/15 to-teal-400/15 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8 hover:bg-white/15 transition-all duration-300"
        >
          <span className="font-poppins w-2 h-2 bg-emerald-400 rounded-full mr-2 sm:mr-3 animate-pulse" />
          <span className="hidden xs:inline">Plateforme Officielle ONMT</span>
          <span className="xs:hidden">ONMT Officiel</span>
          <ChevronRightIcon className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight"
        >
          <span className="block font-poppins">VOTRE PASSERELLE</span>
          <span className="block bg-gradient-to-r from-emerald-300 via-blue-300 to-amber-300 bg-clip-text text-transparent font-poppins">
          VERS L'EXCELLENCE
          </span>
          <span className="block text-white/90 font-poppins">TOURISTIQUE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-12 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-medium font-poppins px-2 sm:px-0"
        >
          Rejoignez les plus grands événements internationaux du tourisme. 
          Participez aux salons prestigieux et workshops exclusifs organisés par l'ONMT 
          pour développer votre business à l'échelle mondiale.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2 sm:px-0"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center font-poppins">
              <span className="hidden xs:inline">Découvrir les Salons</span>
              <span className="xs:hidden">Découvrir</span>
              <ChevronRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-base sm:text-lg border-2 border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px]"
          >
            <span className="flex items-center justify-center font-poppins">
              <PlayIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">Explorer les Workshops</span>
              <span className="xs:hidden">Explorer</span>
            </span>
          </motion.button>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Gradient Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}

export default HeroSection