'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChartBarIcon,
  UsersIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

interface Event {
  id: number
  name: string
  type: 'salon' | 'workshop'
  location: string
  date: string
  participants: number
  maxParticipants: number
  status: 'active' | 'draft' | 'completed'
  revenue: number
}

interface Participant {
  id: number
  company: string
  representative: string
  email: string
  phone: string
  status: 'pending' | 'validated' | 'rejected'
  registrationDate: string
  event: string
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    {
      title: 'Total Événements',
      value: '127',
      change: '+12%',
      trend: 'up',
      icon: CalendarDaysIcon,
      color: 'emerald'
    },
    {
      title: 'Entreprises Inscrites',
      value: '1,847',
      change: '+23%',
      trend: 'up',
      icon: BuildingOfficeIcon,
      color: 'blue'
    },
    {
      title: 'Chiffre d\'Affaires',
      value: '2.4M MAD',
      change: '+8%',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'purple'
    },
    {
      title: 'Taux de Satisfaction',
      value: '96%',
      change: '-2%',
      trend: 'down',
      icon: UsersIcon,
      color: 'orange'
    }
  ]

  const recentEvents: Event[] = [
    { id: 1, name: 'ATM Dubai 2025', type: 'salon', location: 'Dubai', date: '2025-05-25', participants: 42, maxParticipants: 50, status: 'active', revenue: 210000 },
    { id: 2, name: 'Workshop Digital', type: 'workshop', location: 'Casablanca', date: '2025-03-15', participants: 28, maxParticipants: 30, status: 'active', revenue: 0 },
    { id: 3, name: 'FITUR Madrid', type: 'salon', location: 'Madrid', date: '2025-01-22', participants: 67, maxParticipants: 80, status: 'completed', revenue: 301500 },
    { id: 4, name: 'Formation Export', type: 'workshop', location: 'Rabat', date: '2025-04-10', participants: 0, maxParticipants: 25, status: 'draft', revenue: 30000 }
  ]

  const recentParticipants: Participant[] = [
    { id: 1, company: 'Atlas Voyages', representative: 'Ahmed Benali', email: 'a.benali@atlas.ma', phone: '+212661234567', status: 'pending', registrationDate: '2025-01-08', event: 'ATM Dubai 2025' },
    { id: 2, company: 'Riad Mogador', representative: 'Fatima Zahra', email: 'f.zahra@riad.ma', phone: '+212662345678', status: 'validated', registrationDate: '2025-01-07', event: 'Workshop Digital' },
    { id: 3, company: 'Desert Tours', representative: 'Mohamed Alami', email: 'm.alami@desert.ma', phone: '+212663456789', status: 'rejected', registrationDate: '2025-01-06', event: 'FITUR Madrid' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'validated': return 'text-emerald-600 bg-emerald-100'
      case 'pending': case 'draft': return 'text-amber-600 bg-amber-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif'
      case 'draft': return 'Brouillon'
      case 'completed': return 'Terminé'
      case 'pending': return 'En attente'
      case 'validated': return 'Validé'
      case 'rejected': return 'Rejeté'
      default: return status
    }
  }

  const sidebarItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: ChartBarIcon },
    { id: 'events', label: 'Événements', icon: CalendarDaysIcon },
    { id: 'participants', label: 'Participants', icon: UsersIcon },
    { id: 'documents', label: 'Documents', icon: DocumentTextIcon },
    { id: 'settings', label: 'Paramètres', icon: CogIcon }
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Top Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            
            <div className="relative h-8 w-20 sm:h-10 sm:w-32">
              <Image
                src="/logo.png"
                alt="ONMT Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
            <h1 className="hidden sm:block text-xl lg:text-2xl font-bold text-gray-900">Back Office</h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Search - Hidden on mobile, shown on larger screens */}
            <div className="hidden md:block relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-48 lg:w-64 placeholder-gray-500 text-sm"
              />
            </div>

            {/* Mobile search button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300"
            >
              <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </motion.button>

            {/* Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold text-gray-900">Admin ONMT</div>
                <div className="text-xs text-gray-500">Administrateur</div>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                AD
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
  initial={{ x: -20, opacity: 0 }}
  animate={{ 
    x: 0, 
    opacity: 1,
    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
  }}
  transition={{ delay: 0.1 }}
  className={`
    fixed lg:relative lg:translate-x-0 z-50
    w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen
    transition-transform duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `}
>
          <nav className="p-4 lg:p-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm lg:text-base">{item.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 w-full lg:w-auto">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 lg:space-y-8"
            >
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black text-gray-900">Vue d'ensemble</h2>
                  <p className="text-gray-600 mt-1 text-sm lg:text-base">Tableau de bord général de la plateforme ONMT</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 px-4 lg:px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base w-full sm:w-auto"
                >
                  <PlusIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span>Nouvel Événement</span>
                </motion.button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  const TrendIcon = stat.trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-3 lg:mb-4">
                        <div className={`p-2 lg:p-3 rounded-xl bg-${stat.color}-100`}>
                          <Icon className={`h-5 w-5 lg:h-6 lg:w-6 text-${stat.color}-600`} />
                        </div>
                        <div className={`flex items-center space-x-1 text-xs lg:text-sm font-semibold ${
                          stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          <TrendIcon className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <div className="text-xl lg:text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-gray-600 text-xs lg:text-sm font-medium">{stat.title}</div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Recent Events - Mobile Card Layout */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900">Événements Récents</h3>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs lg:text-sm">
                      Voir tout
                    </button>
                  </div>
                </div>
                
                {/* Mobile Card View */}
                <div className="block lg:hidden">
                  <div className="divide-y divide-gray-200">
                    {recentEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">{event.name}</div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{event.date}</span>
                              <div className="flex items-center">
                                <GlobeAltIcon className="h-3 w-3 mr-1" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                            {getStatusLabel(event.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            event.type === 'salon' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {event.type}
                          </span>
                          <div className="text-sm font-semibold text-gray-900">
                            {event.participants}/{event.maxParticipants}
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Événement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Localisation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Participants
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentEvents.map((event, index) => (
                        <motion.tr
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{event.name}</div>
                            <div className="text-sm text-gray-500">{event.date}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              event.type === 'salon' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {event.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-gray-600">
                              <GlobeAltIcon className="h-4 w-4 mr-2" />
                              {event.location}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {event.participants}/{event.maxParticipants}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                              {getStatusLabel(event.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Participants - Mobile Card Layout */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900">Inscriptions Récentes</h3>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs lg:text-sm">
                      Gérer tout
                    </button>
                  </div>
                </div>
                
                {/* Mobile Card View */}
                <div className="block lg:hidden">
                  <div className="divide-y divide-gray-200">
                    {recentParticipants.map((participant, index) => (
                      <motion.div
                        key={participant.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">{participant.company}</div>
                            <div className="text-sm text-gray-500 mb-1">{participant.representative}</div>
                            <div className="text-xs text-gray-400">{participant.email}</div>
                          </div>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(participant.status)}`}>
                            {getStatusLabel(participant.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{participant.event}</div>
                            <div className="text-xs text-gray-500">{participant.registrationDate}</div>
                          </div>
                          <div className="text-xs text-gray-500">{participant.phone}</div>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-2">
                          {participant.status === 'pending' && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                              >
                                <XCircleIcon className="h-4 w-4" />
                              </motion.button>
                            </>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Entreprise
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Représentant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Événement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentParticipants.map((participant, index) => (
                        <motion.tr
                          key={participant.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{participant.company}</div>
                            <div className="text-sm text-gray-500">{participant.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{participant.representative}</div>
                            <div className="text-sm text-gray-500">{participant.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{participant.event}</div>
                            <div className="text-xs text-gray-500">{participant.registrationDate}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(participant.status)}`}>
                              {getStatusLabel(participant.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {participant.status === 'pending' && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                                  >
                                    <CheckCircleIcon className="h-4 w-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                  >
                                    <XCircleIcon className="h-4 w-4" />
                                  </motion.button>
                                </>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tabs content would go here */}
          {activeTab !== 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 lg:py-20"
            >
              <div className="text-4xl lg:text-6xl mb-4">🚧</div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Section en développement</h3>
              <p className="text-gray-600">Cette section sera bientôt disponible!</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard