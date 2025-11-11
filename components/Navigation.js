import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: '🌓 Home' },
  { href: '/about', label: '🏛️ About' },
  { href: '/chronicles', label: '🖋️ Chronicles' },
  { href: '/projects', label: '🛠️ Projects' },
  { href: '/research', label: '🧫 Research' },
  { href: '/bookshelf', label: '📚 Bookshelf' },
]

export default function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(10, 17, 40, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(232, 241, 245, 0.15)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Logo */}
          <Link 
            href="/" 
            style={{
              fontSize: '2rem',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: 'bold',
              color: '#d4af37',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#cd7f32'}
            onMouseOut={(e) => e.target.style.color = '#d4af37'}
          >
            Allegory 🪶
          </Link>
          
          {/* Desktop Navigation - KEY FIX: Added proper gap */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem'  // THIS WAS MISSING - adds space between nav items
          }} className="hidden md:flex">
            {navLinks.map(link => {
              const isActive = router.pathname === link.href || 
                             (link.href !== '/' && router.pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Crimson Text', Georgia, serif",
                    fontSize: '1.125rem',
                    color: isActive ? '#d4af37' : 'rgba(232, 241, 245, 0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    fontWeight: isActive ? '600' : '400'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#e8f1f5'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.target.style.color = 'rgba(232, 241, 245, 0.7)'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            style={{
              color: '#e8f1f5',
              padding: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              style={{ width: '1.75rem', height: '1.75rem' }}
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
          <div style={{ paddingBottom: '1.5rem' }} className="md:hidden">
            {navLinks.map(link => {
              const isActive = router.pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    fontFamily: "'Crimson Text', Georgia, serif",
                    fontSize: '1.125rem',
                    color: isActive ? '#d4af37' : 'rgba(232, 241, 245, 0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    fontWeight: isActive ? '600' : '400'
                  }}
                  onClick={() => setIsOpen(false)}
                  onMouseOver={(e) => !isActive && (e.target.style.color = '#e8f1f5')}
                  onMouseOut={(e) => !isActive && (e.target.style.color = 'rgba(232, 241, 245, 0.7)')}
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
