'use client'

import Link from 'next/link'
import { useTheme } from '@/context/TheamContext'

export default function Footer() {
  const { darkMode } = useTheme()

  return (
    <footer className={`w-full py-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              WBSFT®
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              An elite team of software engineers dedicated to building innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/advisory" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/blockchain" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Blockchain
                </Link>
              </li>
              <li>
                <Link href="/services/product-development" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Product Development
                </Link>
              </li>
              <li>
                <Link href="/services/enterprise-software" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Enterprise Software
                </Link>
              </li>
              <li>
                <Link href="/services/ai" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Artificial Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@wbsft.com" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  contact@wbsft.com
                </a>
              </li>
              <li>
                <a href="tel:+15148743224" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  (514) 874-3224
                </a>
              </li>
              <li className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                460 Saint-Catherine W. Suite 305<br />
                Montreal, Quebec H3B 1A6
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} WBSFT®. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
