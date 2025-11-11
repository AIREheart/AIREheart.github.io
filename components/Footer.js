import { useState } from 'react'

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:aaisha.ameen3@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: '#d4af37'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aaisha-ameen/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    color: '#cd7f32'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/aireheart',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#c0c0c0'
  },
  {
    name: 'Goodreads',
    href: 'https://www.goodreads.com/user/show/13691462-aaisha',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.525 15.977V.49h-2.059v2.906h-.064c-.211-.455-.481-.891-.842-1.307-.36-.412-.767-.777-1.232-1.094-.466-.314-.962-.561-1.519-.736C13.256.09 12.669 0 12.038 0c-1.021 0-1.952.151-2.794.456-.842.304-1.562.733-2.157 1.285-.595.553-1.057 1.213-1.379 1.981-.322.769-.483 1.613-.483 2.533 0 .805.143 1.613.424 2.417.283.805.692 1.528 1.232 2.168.54.64 1.202 1.164 1.986 1.573.785.411 1.67.615 2.655.615.884 0 1.658-.166 2.322-.5.664-.335 1.211-.779 1.643-1.337h.064v1.507c0 1.401-.354 2.477-1.061 3.226-.708.75-1.778 1.125-3.213 1.125-.706 0-1.363-.135-1.97-.399a6.816 6.816 0 0 1-1.597-1.058l-1.341 1.615c.574.53 1.326.974 2.254 1.333.929.36 1.99.54 3.184.54 1.054 0 1.976-.14 2.771-.42.795-.28 1.458-.686 1.985-1.218.527-.533.925-1.177 1.193-1.934.27-.757.404-1.604.404-2.543v-8.476z m-2.396-3.983c0 .607-.104 1.191-.312 1.751-.208.561-.51 1.051-.906 1.472-.395.42-.883.753-1.463.999-.58.245-1.243.368-1.993.368-.75 0-1.418-.123-2.003-.368-.584-.246-1.077-.579-1.478-.999-.401-.421-.707-.911-.918-1.472-.21-.56-.315-1.144-.315-1.751 0-.616.105-1.207.315-1.774.211-.567.517-1.064.918-1.49.401-.427.894-.763 1.478-1.009.585-.245 1.253-.368 2.003-.368.75 0 1.413.123 1.993.368.58.246 1.068.582 1.463 1.009.396.426.698.923.906 1.49.208.567.312 1.158.312 1.774z"/>
      </svg>
    ),
    color: '#800020'
  },
  {
    name: 'Letterboxd',
    href: 'https://letterboxd.com/aaishaameen/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 500 500" fill="currentColor">
        <circle cx="175" cy="250" r="125"/>
        <circle cx="325" cy="250" r="125"/>
        <path d="M8.224 14.352a4.447 4.447 0 0 1-3.775 2.092C1.992 16.444 0 14.454 0 12s1.992-4.444 4.45-4.444c1.592 0 2.988.836 3.774 2.092-.427.682-.673 1.488-.673 2.352s.246 1.67.673 2.352zM15.101 12c0-.864.247-1.67.674-2.352-.786-1.256-2.183-2.092-3.775-2.092s-2.989.836-3.775 2.092c.427.682.674 1.488.674 2.352s-.247 1.67-.674 2.352c.786 1.256 2.183 2.092 3.775 2.092s2.989-.836 3.775-2.092A4.42 4.42 0 0 1 15.1 12zm4.45-4.444a4.447 4.447 0 0 0-3.775 2.092c.427.682.673 1.488.673 2.352s-.246 1.67-.673 2.352a4.447 4.447 0 0 0 3.775 2.092C22.008 16.444 24 14.454 24 12s-1.992-4.444-4.45-4.444z"/></svg>
    ),
    color: '#0f1256ff'
  }
]

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null)

  return (
    <footer style={{
      marginTop: '5rem',
      borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      backgroundColor: 'rgba(10, 17, 40, 0.6)',
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* About Section */}
          <div>
            <h3 style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: '1.5rem',
              color: '#d4af37',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Aaisha Ameen 🔭
            </h3>
            <p style={{
              color: 'rgba(232, 241, 245, 0.7)',
              lineHeight: '1.7',
              fontSize: '0.9375rem'
            }}>
              Chronicling my multidisciplinary explorations 
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: '1.125rem',
              color: '#cd7f32',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Explore
            </h4>
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {[
                { label: 'About', href: '/about' },
                { label: 'Chronicles', href: '/chronicles' },
                { label: 'Projects', href: '/projects' },
                { label: 'Research', href: '/research' },
                { label: 'Bookshelf', href: '/bookshelf' }
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'rgba(232, 241, 245, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.9375rem',
                    transition: 'all 0.3s',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#d4af37'
                    e.target.style.paddingLeft = '0.5rem'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(232, 241, 245, 0.7)'
                    e.target.style.paddingLeft = '0'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div>
            <h4 style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: '1.125rem',
              color: '#cd7f32',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Let's Connect!
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: hoveredLink === link.name 
                      ? `${link.color}20` 
                      : 'rgba(232, 241, 245, 0.05)',
                    border: `2px solid ${hoveredLink === link.name ? link.color : 'rgba(232, 241, 245, 0.15)'}`,
                    color: hoveredLink === link.name ? link.color : 'rgba(232, 241, 245, 0.7)',
                    transition: 'all 0.3s ease',
                    transform: hoveredLink === link.name ? 'translateY(-4px) scale(1.1)' : 'translateY(0)',
                    boxShadow: hoveredLink === link.name 
                      ? `0 8px 20px ${link.color}30` 
                      : 'none'
                  }}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            {/* Tooltips for hovered link COULD POTENTIALLY REMOVE THIS SECTION */}
            {hoveredLink && (
              <p style={{
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#d4af37',
                fontWeight: '600',
                animation: 'fadeIn 0.3s ease'
              }}>
                {hoveredLink}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(232, 241, 245, 0.1)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <p style={{
            fontFamily: "'Crimson Text', Georgia, serif",
            color: 'rgba(232, 241, 245, 0.5)',
            fontSize: '0.9375rem',
            margin: 0
          }}>
            © {new Date().getFullYear()} • Aaisha Ameen 
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <a
              href="#top"
              style={{
                color: 'rgba(232, 241, 245, 0.5)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              onMouseEnter={(e) => e.target.style.color = '#d4af37'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(232, 241, 245, 0.5)'}
            >
              Back to top
              <span style={{ fontSize: '1.2rem' }}>↑</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          footer > div {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </footer>
  )
}