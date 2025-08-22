'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  IdentificationIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'

interface FormData {
  // Informations entreprise
  nomEntreprise: string
  formeJuridique: string
  secteurActivite: string
  numeroRC: string
  numeroTP: string
  numeroICE: string
  numeroPatente: string
  adresseSiege: string
  ville: string
  
  // Informations représentant
  nomRepresentant: string
  prenomRepresentant: string
  fonctionRepresentant: string
  emailRepresentant: string
  telephoneRepresentant: string
  
  // Informations CNSS
  numeroCNSS: string
  
  // Documents
  justificatifRC: File | null
  attestationFiscale: File | null
  attestationCNSS: File | null
  pouvoirRepresentant: File | null
  
  // Acceptation
  accepteConditions: boolean
  accepteConfidentialite: boolean
}

const secteurOptions = [
  'Hôtellerie',
  'Agence de voyage',
  'Transport touristique',
  'Restauration',
  'DMC (Destination Management Company)',
  'Tour opérateur',
  'Guide touristique',
  'Artisanat',
  'Animation et loisirs',
  'Autre'
]

const formeJuridiqueOptions = [
  'SARL',
  'SA',
  'SAS',
  'SASU',
  'Auto-entrepreneur',
  'Coopérative',
  'Association',
  'Personne physique',
  'Autre'
]

const InscriptionPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nomEntreprise: '',
    formeJuridique: '',
    secteurActivite: '',
    numeroRC: '',
    numeroTP: '',
    numeroICE: '',
    numeroPatente: '',
    adresseSiege: '',
    ville: '',
    nomRepresentant: '',
    prenomRepresentant: '',
    fonctionRepresentant: '',
    emailRepresentant: '',
    telephoneRepresentant: '',
    numeroCNSS: '',
    justificatifRC: null,
    attestationFiscale: null,
    attestationCNSS: null,
    pouvoirRepresentant: null,
    accepteConditions: false,
    accepteConfidentialite: false
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | boolean | File) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.nomEntreprise) newErrors.nomEntreprise = 'Nom d\'entreprise requis'
      if (!formData.formeJuridique) newErrors.formeJuridique = 'Forme juridique requise'
      if (!formData.secteurActivite) newErrors.secteurActivite = 'Secteur d\'activité requis'
      if (!formData.numeroICE) newErrors.numeroICE = 'Numéro ICE requis'
      if (!formData.adresseSiege) newErrors.adresseSiege = 'Adresse du siège requise'
      if (!formData.ville) newErrors.ville = 'Ville requise'
    }

    if (step === 2) {
      if (!formData.nomRepresentant) newErrors.nomRepresentant = 'Nom du représentant requis'
      if (!formData.prenomRepresentant) newErrors.prenomRepresentant = 'Prénom du représentant requis'
      if (!formData.emailRepresentant) newErrors.emailRepresentant = 'Email requis'
      if (!formData.telephoneRepresentant) newErrors.telephoneRepresentant = 'Téléphone requis'
      if (!formData.numeroCNSS) newErrors.numeroCNSS = 'Numéro CNSS requis'
    }

    if (step === 3) {
      if (!formData.justificatifRC) newErrors.justificatifRC = 'Justificatif RC requis'
      if (!formData.attestationFiscale) newErrors.attestationFiscale = 'Attestation fiscale requise'
      if (!formData.attestationCNSS) newErrors.attestationCNSS = 'Attestation CNSS requise'
    }

    if (step === 4) {
      if (!formData.accepteConditions) newErrors.accepteConditions = 'Vous devez accepter les conditions'
      if (!formData.accepteConfidentialite) newErrors.accepteConfidentialite = 'Vous devez accepter la politique de confidentialité'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    alert('Inscription soumise avec succès! Vous recevrez une confirmation par email.')
  }

  const steps = [
    { title: 'Informations Entreprise', icon: BuildingOfficeIcon },
    { title: 'Représentant', icon: UserIcon },
    { title: 'Documents', icon: DocumentTextIcon },
    { title: 'Validation', icon: CheckCircleIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-poppins">
            Inscription ONMT
          </h1>
          <p className="text-xl text-gray-600 font-poppins">
            Rejoignez notre plateforme pour participer aux événements internationaux
          </p>
        </motion.div>

{/* Progress Steps */}
<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = currentStep === stepNumber
              const isCompleted = currentStep > stepNumber
              const Icon = step.icon

              return (
                <div key={stepNumber} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : isActive
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-600'
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium mt-2 font-poppins ${
                        isActive ? 'text-emerald-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 lg:w-24 h-1 mx-4 transition-all duration-300 ${
                        currentStep > stepNumber ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile View */}
          <div className="flex md:hidden overflow-x-auto pb-4">
            <div className="flex items-center min-w-max px-4">
              {steps.map((step, index) => {
                const stepNumber = index + 1
                const isActive = currentStep === stepNumber
                const isCompleted = currentStep > stepNumber
                const Icon = step.icon

                return (
                  <div key={stepNumber} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : isActive
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-600'
                            : 'bg-gray-100 border-gray-300 text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircleIcon className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium mt-1 font-poppins text-center max-w-16 ${
                          isActive ? 'text-emerald-600' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-1 mx-2 transition-all duration-300 flex-shrink-0 ${
                          currentStep > stepNumber ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Alternative: Vertical Mobile Layout */}
          {/* Uncomment below and comment above mobile view if you prefer vertical layout on mobile */}
          {/*
          <div className="flex flex-col md:hidden space-y-4">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = currentStep === stepNumber
              const isCompleted = currentStep > stepNumber
              const Icon = step.icon

              return (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : isActive
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-600'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ml-3 font-poppins ${
                      isActive ? 'text-emerald-600' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && isActive && (
                    <div className="w-0.5 h-8 bg-emerald-500 ml-5 mt-2 absolute" />
                  )}
                </div>
              )
            })}
          </div>
          */}
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            
            {/* Step 1: Informations Entreprise */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-poppins flex items-center">
                  <BuildingOfficeIcon className="h-6 w-6 mr-3 text-emerald-600" />
                  Informations de l'Entreprise
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Nom de l'entreprise *
                    </label>
                    <input
                      type="text"
                      value={formData.nomEntreprise}
                      onChange={(e) => handleInputChange('nomEntreprise', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                        errors.nomEntreprise ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Agence Atlas Voyages"
                    />
                    {errors.nomEntreprise && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.nomEntreprise}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Forme juridique *
                    </label>
                    <select
                      value={formData.formeJuridique}
                      onChange={(e) => handleInputChange('formeJuridique', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins placeholder-gray-500 ${
                        errors.formeJuridique ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Sélectionner</option>
                      {formeJuridiqueOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.formeJuridique && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.formeJuridique}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Secteur d'activité *
                    </label>
                    <select
                      value={formData.secteurActivite}
                      onChange={(e) => handleInputChange('secteurActivite', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins placeholder-gray-500 ${
                        errors.secteurActivite ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Sélectionner</option>
                      {secteurOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.secteurActivite && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.secteurActivite}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Numéro ICE *
                    </label>
                    <input
                      type="text"
                      value={formData.numeroICE}
                      onChange={(e) => handleInputChange('numeroICE', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                        errors.numeroICE ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="15 chiffres"
                    />
                    {errors.numeroICE && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.numeroICE}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Numéro RC
                    </label>
                    <input
                      type="text"
                      value={formData.numeroRC}
                      onChange={(e) => handleInputChange('numeroRC', e.target.value)}
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins"
                      placeholder="Registre de commerce"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Numéro TP
                    </label>
                    <input
                      type="text"
                      value={formData.numeroTP}
                      onChange={(e) => handleInputChange('numeroTP', e.target.value)}
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins"
                      placeholder="Taxe professionnelle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Adresse du siège social *
                  </label>
                  <textarea
                    value={formData.adresseSiege}
                    onChange={(e) => handleInputChange('adresseSiege', e.target.value)}
                    rows={3}
                    className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                      errors.adresseSiege ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Adresse complète du siège social"
                  />
                  {errors.adresseSiege && (
                    <p className="text-red-500 text-sm mt-1 font-poppins">{errors.adresseSiege}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={formData.ville}
                    onChange={(e) => handleInputChange('ville', e.target.value)}
                    className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                      errors.ville ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Casablanca"
                  />
                  {errors.ville && (
                    <p className="text-red-500 text-sm mt-1 font-poppins">{errors.ville}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Représentant */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-poppins flex items-center">
                  <UserIcon className="h-6 w-6 mr-3 text-emerald-600" />
                  Informations du Représentant
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.nomRepresentant}
                      onChange={(e) => handleInputChange('nomRepresentant', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                        errors.nomRepresentant ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nom du représentant"
                    />
                    {errors.nomRepresentant && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.nomRepresentant}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={formData.prenomRepresentant}
                      onChange={(e) => handleInputChange('prenomRepresentant', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                        errors.prenomRepresentant ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Prénom du représentant"
                    />
                    {errors.prenomRepresentant && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.prenomRepresentant}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Fonction
                    </label>
                    <input
                      type="text"
                      value={formData.fonctionRepresentant}
                      onChange={(e) => handleInputChange('fonctionRepresentant', e.target.value)}
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins"
                      placeholder="Ex: Directeur Général"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.emailRepresentant}
                      onChange={(e) => handleInputChange('emailRepresentant', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                        errors.emailRepresentant ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="exemple@entreprise.ma"
                    />
                    {errors.emailRepresentant && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.emailRepresentant}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.telephoneRepresentant}
                      onChange={(e) => handleInputChange('telephoneRepresentant', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                        errors.telephoneRepresentant ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+212 6 XX XX XX XX"
                    />
                    {errors.telephoneRepresentant && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.telephoneRepresentant}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                      Numéro CNSS *
                    </label>
                    <input
                      type="text"
                      value={formData.numeroCNSS}
                      onChange={(e) => handleInputChange('numeroCNSS', e.target.value)}
                      className={`text-gray-700 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 font-poppins ${
                        errors.numeroCNSS ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Numéro d'affiliation CNSS"
                    />
                    {errors.numeroCNSS && (
                      <p className="text-red-500 text-sm mt-1 font-poppins">{errors.numeroCNSS}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-poppins flex items-center">
                  <DocumentTextIcon className="h-6 w-6 mr-3 text-emerald-600" />
                  Documents Justificatifs
                </h2>

                <div className="space-y-6">
                  {[
                    { key: 'justificatifRC', label: 'Justificatif Registre de Commerce *', required: true },
                    { key: 'attestationFiscale', label: 'Attestation Fiscale *', required: true },
                    { key: 'attestationCNSS', label: 'Attestation CNSS *', required: true },
                    { key: 'pouvoirRepresentant', label: 'Pouvoir du Représentant', required: false }
                  ].map((doc) => (
                    <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-emerald-400 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700 font-poppins">
                          {doc.label}
                        </label>
                        <CloudArrowUpIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.key as keyof FormData, e.target.files?.[0] || null)}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 font-poppins"
                      />
                      
                      {formData[doc.key as keyof FormData] && (
                        <p className="text-green-600 text-sm mt-2 font-poppins">
                          ✓ Fichier sélectionné: {(formData[doc.key as keyof FormData] as File)?.name}
                        </p>
                      )}
                      
                      {errors[doc.key] && (
                        <p className="text-red-500 text-sm mt-2 font-poppins">{errors[doc.key]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-800 font-poppins">
                      <strong>Format acceptés :</strong> PDF, JPG, PNG (max 5MB par fichier)<br />
                      <strong>Note :</strong> Tous les documents doivent être valides et à jour
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Validation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-poppins flex items-center">
                  <CheckCircleIcon className="h-6 w-6 mr-3 text-emerald-600" />
                  Validation et Acceptation
                </h2>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 font-poppins">Récapitulatif de votre inscription</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700 font-poppins">Entreprise :</span>
                      <span className="text-gray-700 ml-2 font-poppins">{formData.nomEntreprise}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 font-poppins">Secteur :</span>
                      <span className="text-gray-700 ml-2 font-poppins">{formData.secteurActivite}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 font-poppins">Représentant :</span>
                      <span className="text-gray-700 ml-2 font-poppins">{formData.prenomRepresentant} {formData.nomRepresentant}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 font-poppins">Email :</span>
                      <span className="text-gray-700 ml-2 font-poppins">{formData.emailRepresentant}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="conditions"
                      checked={formData.accepteConditions}
                      onChange={(e) => handleInputChange('accepteConditions', e.target.checked)}
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5 mr-3"
                    />
                    <label htmlFor="conditions" className="text-sm text-gray-700 font-poppins">
                      J'accepte les{' '}
                      <a href="/conditions" className="text-emerald-600 hover:text-emerald-700 underline">
                        conditions générales d'utilisation
                      </a>{' '}
                      de la plateforme ONMT *
                    </label>
                  </div>
                  {errors.accepteConditions && (
                    <p className="text-red-500 text-sm font-poppins">{errors.accepteConditions}</p>
                  )}

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="confidentialite"
                      checked={formData.accepteConfidentialite}
                      onChange={(e) => handleInputChange('accepteConfidentialite', e.target.checked)}
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5 mr-3"
                    />
                    <label htmlFor="confidentialite" className="text-sm text-gray-700 font-poppins">
                      J'accepte la{' '}
                      <a href="/confidentialite" className="text-emerald-600 hover:text-emerald-700 underline">
                        politique de confidentialité
                      </a>{' '}
                      et le traitement de mes données personnelles conformément à la loi 09-08 *
                    </label>
                  </div>
                  {errors.accepteConfidentialite && (
                    <p className="text-red-500 text-sm font-poppins">{errors.accepteConfidentialite}</p>
                  )}
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-emerald-800 font-poppins">
                      <strong>Prochaines étapes :</strong><br />
                      1. Validation de votre dossier par nos équipes (2-3 jours ouvrés)<br />
                      2. Réception d'un email de confirmation<br />
                      3. Accès à votre espace personnel pour les inscriptions aux événements
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              {currentStep > 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 font-poppins"
                >
                  Précédent
                </motion.button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-poppins"
                >
                  Suivant
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    'Finaliser l\'inscription'
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 font-poppins mb-4">
            Besoin d'aide pour votre inscription ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+212537278300"
              className="inline-flex items-center px-4 py-2 text-emerald-600 hover:text-emerald-700 font-poppins font-semibold"
            >
              <PhoneIcon className="h-4 w-4 mr-2" />
              +212 5 37 27 83 00
            </a>
            <a
              href="mailto:contact@onmt.ma"
              className="inline-flex items-center px-4 py-2 text-emerald-600 hover:text-emerald-700 font-poppins font-semibold"
            >
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              contact@onmt.ma
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InscriptionPage