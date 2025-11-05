import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/chronicles', label: 'Chronicles' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/bookshelf', label: 'Bookshelf' },
]

export default function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className="sticky top-0 z-50 bg-midnight/90 backdrop-blur-md border-b border-moonlight/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-3xl font-serif font-bold text-gold hover:text-bronze transition-colors duration-300"
          >
            YN
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => {
              const isActive = router.pathname === link.href || 
                             (link.href !== '/' && router.pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-serif text-lg transition-all duration-300 ${
                    isActive
                      ? 'text-gold font-semibold'
                      : 'text-moonlight/70 hover:text-moonlight hover:scale-105'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-moonlight p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4">
            {navLinks.map(link => {
              const isActive = router.pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 font-serif text-lg transition-colors ${
                    isActive
                      ? 'text-gold font-semibold'
                      : 'text-moonlight/70 hover:text-moonlight'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}