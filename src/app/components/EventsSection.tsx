'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, MapPinIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

interface Event {
  id: number
  title: string
  type: 'salon' | 'workshop'
  location: string
  date: string
  duration: string
  price: string
  participants: string
  image: string
  description: string
  availability: 'available' | 'limited' | 'soldout'
  availabilityCount?: string
}

const events: Event[] = [
  {
    id: 1,
    title: "ATM Dubai 2025",
    type: "salon",
    location: "Dubai, UAE",
    date: "25-27 Mai 2025",
    duration: "3 jours",
    price: "5,000 MAD",
    participants: "40,000+",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    description: "Le plus grand salon du tourisme au Moyen-Orient",
    availability: "available",
    availabilityCount: "15 places"
  },
  {
    id: 2,
    title: "Digital Marketing Tourisme",
    type: "workshop",
    location: "Casablanca, Maroc",
    date: "15 Mars 2025",
    duration: "1 jour",
    price: "Gratuit",
    participants: "50",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    description: "Masterclass sur les stratégies digitales innovantes",
    availability: "limited",
    availabilityCount: "3 places"
  },
  {
    id: 3,
    title: "FITUR Madrid 2025",
    type: "salon",
    location: "Madrid, Espagne",
    date: "22-26 Janvier 2025",
    duration: "5 jours",
    price: "4,500 MAD",
    participants: "250,000+",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
    description: "Le salon de référence en Europe",
    availability: "available",
    availabilityCount: "25 places"
  },
  {
    id: 4,
    title: "ITB Berlin 2025",
    type: "salon",
    location: "Berlin, Allemagne",
    date: "4-6 Mars 2025",
    duration: "3 jours",
    price: "5,200 MAD",
    participants: "160,000+",
    image: "https://positiveday.am/_pu/1/s03754737.jpg",
    description: "La foire commerciale leader mondial du tourisme",
    availability: "available",
    availabilityCount: "20 places"
  },
  {
    id: 5,
    title: "Workshop E-Commerce",
    type: "workshop",
    location: "Rabat, Maroc",
    date: "10 Avril 2025",
    duration: "2 jours",
    price: "1,200 MAD",
    participants: "30",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Optimisation des ventes en ligne pour le tourisme",
    availability: "limited",
    availabilityCount: "5 places"
  }
]

const EventsSection: React.FC = () => {
  // Fix: Initialize useRef with null and proper typing
  const swiperRef = useRef<SwiperType | null>(null)

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-emerald-500'
      case 'limited':
        return 'bg-amber-500'
      case 'soldout':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTypeColor = (type: string) => {
    return type === 'salon' ? 'bg-blue-600' : 'bg-purple-600'
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="w-full px-0">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-6 lg:px-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-poppins"
          >
            ÉVÉNEMENTS
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              À VENIR
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins leading-relaxed"
          >
            Découvrez les prochaines opportunités de networking et de développement 
            pour propulser votre business à l'international
          </motion.p>
        </motion.div>

        {/* Custom Navigation */}
        <div className="flex justify-between items-center mb-8 px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-emerald-50"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white group-hover:text-emerald-600 transition-colors duration-300" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-emerald-50"
            >
              <ChevronRightIcon className="h-6 w-6 text-white group-hover:text-emerald-600 transition-colors duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 2.2,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 2.8,
                spaceBetween: 35,
              },
              1536: {
                slidesPerView: 3.2,
                spaceBetween: 40,
              },
            }}
            className="pb-16 !overflow-visible"
          >
            {events.map((event, index) => (
              <SwiperSlide key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-[600px] rounded-3xl overflow-hidden group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]">
                    
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${event.image})`,
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getAvailabilityColor(event.availability)}`}>
                          {event.availabilityCount}
                        </span>
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                      
                      {/* Title and Description */}
                      <div className="mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 font-poppins group-hover:text-emerald-300 transition-colors duration-300">
                          {event.title}
                        </h3>
                        <p className="text-white/90 font-medium font-poppins leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm font-medium font-poppins truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span className="text-sm font-medium font-poppins truncate">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span className="text-sm font-medium font-poppins truncate">{event.participants}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CurrencyDollarIcon className="h-4 w-4 text-amber-400 flex-shrink-0" />
                          <span className="text-sm font-medium font-poppins truncate">{event.price}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold font-poppins hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {event.type === 'salon' ? "S'inscrire" : "Réserver"}
                      </motion.button>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 px-6 lg:px-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 font-poppins"
          >
            Voir Tous les Événements
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper {
          padding-left: 24px;
          padding-right: 24px;
        }
        
        @media (min-width: 1024px) {
          .swiper {
            padding-left: 32px;
            padding-right: 32px;
          }
        }
        
        .swiper-pagination-bullet {
          background: #6b7280;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #10b981;
          opacity: 1;
          transform: scale(1.2);
        }
        .swiper-slide {
          transition: transform 0.3s ease;
        }
        .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </section>
  )
}

export default EventsSection