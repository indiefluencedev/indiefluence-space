'use client'

import { useTheme } from '@/context/TheamContext'

export default function Services() {
  const { darkMode } = useTheme()

  const services = [
    {
      title: "Advisory",
      description: "Gain strategic insights from our fractional CTOs, benefit from comprehensive technical reviews, and achieve accelerated development with expert backend, frontend, and DevOps solutions.",
      icon: "💡"
    },
    {
      title: "Blockchain",
      description: "Delivering secure immutable data, smart contract development, tokenomics, and zero-knowledge proof technologies to optimize security, transparency, and financial operations.",
      icon: "⛓️"
    },
    {
      title: "Product Development",
      description: "Bring market-ready products to life with our product development services. Prototypes & MVPs, SaaS, web, and mobile applications, managed services from planning and design to coding, testing, and ongoing maintenance.",
      icon: "🚀"
    },
    {
      title: "Enterprise Software",
      description: "Scale effectively with our enterprise software solutions: streamline operations with customized platforms, enhance productivity through advanced integrations, and secure your infrastructure with a robust support systems.",
      icon: "🏢"
    },
    {
      title: "Artificial Intelligence",
      description: "Enhance operations with AI, from strategy to development, LLM integration, automated decision systems, and OCR technology, tailored to optimize performance and efficiency.",
      icon: "🤖"
    }
  ]

  return (
    <div className={`min-h-screen py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Services
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
