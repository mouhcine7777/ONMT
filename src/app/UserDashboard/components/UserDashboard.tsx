'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  CalendarDaysIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  UserIcon,
  ClockIcon,
  BellIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowUpIcon,
  EyeIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserCircleIcon,
  CameraIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon as CheckCircleIconSolid,
  ClockIcon as ClockIconSolid,
  XCircleIcon as XCircleIconSolid
} from '@heroicons/react/24/solid'
import Image from 'next/image'

interface Event {
  id: number
  name: string
  type: 'salon' | 'workshop'
  location: string
  country: string
  date: string
  endDate: string
  price: number
  currency: string
  availableSpots: number
  totalSpots: number
  status: 'open' | 'waiting' | 'full' | 'closed'
  description: string
  image: string
}

interface CartItem {
  eventId: number
  event: Event
  listType: 'principal' | 'waiting'
  totalPrice: number
}

interface UserProfile {
  company: string
  representative: string
  email: string
  phone: string
  sector: string
  logo: string
  address: string
}

interface Participation {
  id: number
  eventName: string
  date: string
  status: 'confirmed' | 'pending' | 'rejected' | 'completed'
  amount: number
  justificatif: boolean
  certificate: boolean
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showCart, setShowCart] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const userProfile: UserProfile = {
    company: 'Atlas Voyages',
    representative: 'Ahmed Benali',
    email: 'a.benali@atlas.ma',
    phone: '+212 661 234 567',
    sector: 'Agence de voyage',
    logo: '/company-logo.png',
    address: 'Casablanca, Maroc'
  }

  const notifications = [
    { id: 1, message: 'Votre inscription à ATM Dubai 2025 est confirmée', type: 'success', date: '2025-01-08' },
    { id: 2, message: 'Paiement en attente pour Workshop Digital', type: 'warning', date: '2025-01-07' },
    { id: 3, message: 'Nouvelle place disponible pour FITUR Madrid', type: 'info', date: '2025-01-06' }
  ]

  const availableEvents: Event[] = [
    {
      id: 1,
      name: 'ATM Dubai 2025',
      type: 'salon',
      location: 'Dubai',
      country: 'Émirats Arabes Unis',
      date: '2025-05-25',
      endDate: '2025-05-28',
      price: 5000,
      currency: 'MAD',
      availableSpots: 8,
      totalSpots: 50,
      status: 'open',
      description: 'Le plus grand salon du tourisme au Moyen-Orient',
      image: '/atm-dubai.jpg'
    },
    {
      id: 2,
      name: 'Workshop Marketing Digital',
      type: 'workshop',
      location: 'Casablanca',
      country: 'Maroc',
      date: '2025-03-15',
      endDate: '2025-03-15',
      price: 0,
      currency: 'MAD',
      availableSpots: 2,
      totalSpots: 30,
      status: 'open',
      description: 'Formation sur les nouvelles stratégies digitales',
      image: '/workshop-digital.jpg'
    },
    {
      id: 3,
      name: 'ITB Berlin 2025',
      type: 'salon',
      location: 'Berlin',
      country: 'Allemagne',
      date: '2025-03-04',
      endDate: '2025-03-06',
      price: 4500,
      currency: 'MAD',
      availableSpots: 0,
      totalSpots: 40,
      status: 'waiting',
      description: 'Salon international du tourisme en Allemagne',
      image: '/itb-berlin.jpg'
    }
  ]

  const [cart, setCart] = useState<CartItem[]>([])

  const participations: Participation[] = [
    { id: 1, eventName: 'FITUR Madrid 2024', date: '2024-01-22', status: 'completed', amount: 5000, justificatif: true, certificate: true },
    { id: 2, eventName: 'Workshop Export 2024', date: '2024-11-15', status: 'confirmed', amount: 0, justificatif: true, certificate: false },
    { id: 3, eventName: 'ATM Dubai 2025', date: '2025-05-25', status: 'pending', amount: 5000, justificatif: false, certificate: false }
  ]

  const addToCart = (event: Event) => {
    const existingItem = cart.find(item => item.eventId === event.id)
    if (existingItem) return

    const listType = event.availableSpots > 0 ? 'principal' : 'waiting'
    const newItem: CartItem = {
      eventId: event.id,
      event,
      listType,
      totalPrice: event.price
    }
    setCart([...cart, newItem])
  }

  const removeFromCart = (eventId: number) => {
    setCart(cart.filter(item => item.eventId !== eventId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-emerald-600 bg-emerald-100'
      case 'waiting': return 'text-amber-600 bg-amber-100'
      case 'full': case 'closed': return 'text-red-600 bg-red-100'
      case 'confirmed': case 'completed': return 'text-emerald-600 bg-emerald-100'
      case 'pending': return 'text-amber-600 bg-amber-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Places disponibles'
      case 'waiting': return 'Liste d\'attente'
      case 'full': return 'Complet'
      case 'closed': return 'Fermé'
      case 'confirmed': return 'Confirmé'
      case 'pending': return 'En attente'
      case 'rejected': return 'Rejeté'
      case 'completed': return 'Terminé'
      default: return status
    }
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: HomeIcon },
    { id: 'events', label: 'Événements', icon: CalendarDaysIcon },
    { id: 'history', label: 'Historique', icon: ClockIcon },
    { id: 'documents', label: 'Documents', icon: DocumentTextIcon },
    { id: 'profile', label: 'Mon Profil', icon: UserIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Top Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-10 w-32">
              <Image
                src="/logo.png"
                alt="ONMT Logo"
                width={128}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Portail Professionnel</h1>
          </div>

          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64 placeholder-gray-500"
              />
            </div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300"
            >
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </motion.button>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{userProfile.company}</div>
                <div className="text-xs text-gray-500">{userProfile.representative}</div>
              </div>
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {userProfile.representative.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen"
        >
          <nav className="p-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black mb-2">Bienvenue, {userProfile.representative}!</h2>
                    <p className="text-emerald-100 text-lg">Gérez vos participations aux événements ONMT</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{participations.filter(p => p.status === 'confirmed').length}</div>
                    <div className="text-emerald-100">Événements confirmés</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {participations.filter(p => p.status === 'pending').length}
                    </div>
                  </div>
                  <div className="text-gray-600">Inscriptions en attente</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {participations.filter(p => p.certificate).length}
                    </div>
                  </div>
                  <div className="text-gray-600">Certificats disponibles</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <CurrencyDollarIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {participations.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} MAD
                    </div>
                  </div>
                  <div className="text-gray-600">Total investi</div>
                </motion.div>
              </div>

              {/* Notifications */}
              {notifications.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Notifications récentes</h3>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full mr-3 ${
                          notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                          notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <BellIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{notif.message}</div>
                          <div className="text-xs text-gray-500">{notif.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('events')}
                    className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                  >
                    <CalendarDaysIcon className="h-8 w-8 text-emerald-600 mr-4" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Découvrir les événements</div>
                      <div className="text-sm text-gray-600">Parcourir les salons et workshops</div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('documents')}
                    className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  >
                    <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-4" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Mes documents</div>
                      <div className="text-sm text-gray-600">Certificats et justificatifs</div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Événements disponibles</h2>
                  <p className="text-gray-600 mt-1">Découvrez les prochains salons et workshops</p>
                </div>
                {cart.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCart(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Voir le panier ({cart.length})</span>
                  </motion.button>
                )}
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {availableEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="relative h-48">
                      <Image
                        src="/api/placeholder/400/200"
                        alt={event.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          event.type === 'salon' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {event.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                          {getStatusLabel(event.status)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">{event.location}, {event.country}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CalendarDaysIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <UserIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {event.availableSpots} places disponibles / {event.totalSpots}
                          </span>
                        </div>
                        {event.price > 0 && (
                          <div className="flex items-center text-gray-600">
                            <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                            <span className="text-sm font-semibold">
                              {event.price.toLocaleString()} {event.currency}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(event)
                          }}
                          disabled={cart.some(item => item.eventId === event.id)}
                          className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          {cart.some(item => item.eventId === event.id) ? 'Déjà ajouté' : 'Ajouter au panier'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEvent(event)
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-gray-900">Historique de participations</h2>
                <p className="text-gray-600 mt-1">Retrouvez toutes vos participations passées et en cours</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Événement
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Montant
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
                      {participations.map((participation, index) => (
                        <motion.tr
                          key={participation.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{participation.eventName}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600">{participation.date}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-900 font-semibold">
                              {participation.amount > 0 ? `${participation.amount.toLocaleString()} MAD` : 'Gratuit'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(participation.status)}`}>
                              {getStatusLabel(participation.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {participation.status === 'pending' && !participation.justificatif && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                  title="Téléverser justificatif"
                                >
                                  <DocumentArrowUpIcon className="h-4 w-4" />
                                </motion.button>
                              )}
                              {participation.certificate && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                                  title="Télécharger certificat"
                                >
                                  <DocumentTextIcon className="h-4 w-4" />
                                </motion.button>
                              )}
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

          {activeTab === 'documents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-gray-900">Mes Documents</h2>
                <p className="text-gray-600 mt-1">Gérez vos certificats et justificatifs de paiement</p>
              </div>

              {/* Upload Section */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Téléverser un justificatif</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors duration-300">
                  <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-lg font-semibold text-gray-900 mb-2">Glissez vos fichiers ici</div>
                  <div className="text-gray-600 mb-4">ou cliquez pour sélectionner</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300"
                  >
                    Choisir un fichier
                  </motion.button>
                  <div className="text-xs text-gray-500 mt-2">PDF, JPG, PNG - Max 5MB</div>
                </div>
              </div>

              {/* Certificates Section */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Certificats de participation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {participations.filter(p => p.certificate).map((participation) => (
                    <motion.div
                      key={participation.id}
                      whileHover={{ scale: 1.02 }}
                      className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-all duration-300"
                    >
                      <div className="flex items-center mb-3">
                        <DocumentTextIcon className="h-8 w-8 text-emerald-600 mr-3" />
                        <div>
                          <div className="font-semibold text-gray-900">{participation.eventName}</div>
                          <div className="text-sm text-gray-600">{participation.date}</div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300"
                      >
                        Télécharger PDF
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-gray-900">Mon Profil</h2>
                <p className="text-gray-600 mt-1">Gérez les informations de votre entreprise</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <div className="h-24 w-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                          {userProfile.company.substring(0, 2)}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-emerald-600"
                        >
                          <CameraIcon className="h-4 w-4" />
                        </motion.button>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{userProfile.company}</h3>
                      <p className="text-gray-600">{userProfile.sector}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">Représentant</div>
                        <div className="font-semibold text-gray-900">{userProfile.representative}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Informations de l'entreprise</h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300"
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span>Modifier</span>
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom de l'entreprise
                        </label>
                        <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900">{userProfile.company}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Secteur d'activité
                        </label>
                        <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
                          <span className="text-gray-900">{userProfile.sector}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Représentant
                        </label>
                        <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
                          <UserCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900">{userProfile.representative}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900">{userProfile.email}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
                          <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900">{userProfile.phone}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Adresse
                        </label>
                        <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900">{userProfile.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowCart(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Mon Panier</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCart(false)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <XCircleIcon className="h-6 w-6" />
              </motion.button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <div className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</div>
                <div className="text-gray-600">Ajoutez des événements pour commencer</div>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.eventId} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{item.event.name}</div>
                      <div className="text-sm text-gray-600">{item.event.location} • {item.event.date}</div>
                      <div className="text-sm">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          item.listType === 'principal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.listType === 'principal' ? 'Liste principale' : 'Liste d\'attente'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {item.totalPrice > 0 ? `${item.totalPrice.toLocaleString()} MAD` : 'Gratuit'}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.eventId)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Supprimer
                      </motion.button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>{getTotalPrice().toLocaleString()} MAD</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCart(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Continuer mes achats
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300"
                  >
                    Valider et payer
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <Image
                src="/api/placeholder/800/300"
                alt={selectedEvent.name}
                fill
                className="object-cover rounded-t-2xl"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-red-600"
              >
                <XCircleIcon className="h-6 w-6" />
              </motion.button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEvent.name}</h2>
                  <p className="text-gray-600 text-lg">{selectedEvent.description}</p>
                </div>
                <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedEvent.status)}`}>
                  {getStatusLabel(selectedEvent.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{selectedEvent.location}, {selectedEvent.country}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{selectedEvent.date} - {selectedEvent.endDate}</span>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">
                      {selectedEvent.availableSpots} places disponibles sur {selectedEvent.totalSpots}
                    </span>
                  </div>
                  {selectedEvent.price > 0 && (
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900 font-semibold text-lg">
                        {selectedEvent.price.toLocaleString()} {selectedEvent.currency}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Informations importantes</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Inscription soumise à validation</li>
                    <li>• Paiement par virement bancaire uniquement</li>
                    <li>• Certificat de participation fourni</li>
                    <li>• Annulation possible jusqu'à 30 jours avant</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    addToCart(selectedEvent)
                    setSelectedEvent(null)
                  }}
                  disabled={cart.some(item => item.eventId === selectedEvent.id)}
                  className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {cart.some(item => item.eventId === selectedEvent.id) ? 'Déjà ajouté au panier' : 'Ajouter au panier'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Fermer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default UserDashboard