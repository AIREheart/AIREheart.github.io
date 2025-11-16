// pages/castle.js
// FINAL FIX - Pointer events on content wrapper!

import { useState } from 'react'
import CastleScene from '../components/three/CastleScene'

export default function Castle() {
  const [towerInfo, setTowerInfo] = useState(null)

  const handleTowerInteraction = (label, action) => {
    const towerDescriptions = {
      'Biochemistry': 'The foundation of my scientific journey - where molecular mechanisms first captured my imagination.',
      'Computation': 'Bridging biology with algorithms - discovering how code can illuminate biological complexity.',
      'Philosophy': 'The guiding questions that shape my approach to science and computation.'
    }
    
    if (action === 'click' || action === 'hover') {
      setTowerInfo({
        label,
        description: towerDescriptions[label]
      })
    } else {
      setTowerInfo(null)
    }
  }

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#0a1128'
    }}>
      {/* Castle as fixed background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <CastleScene onTowerInteraction={handleTowerInteraction} />
      </div>

      {/* Content wrapper - CRITICAL: pointerEvents none so clicks pass through! */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'none'  // ← THIS IS THE FIX!
      }}>
        {/* Navigation bar - re-enable pointer events */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(10, 17, 40, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(232, 241, 245, 0.15)',
          padding: '1rem 2rem',
          pointerEvents: 'auto'  // ← Re-enable for nav
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <a 
              href="/"
              style={{
                fontSize: '1.5rem',
                fontFamily: "'Crimson Text', Georgia, serif",
                fontWeight: 'bold',
                color: '#d4af37',
                textDecoration: 'none'
              }}
            >
              Allegory 🪶
            </a>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
              {[
                { href: '/', label: '🌓 Home' },
                { href: '/about', label: '🏛️ About' },
                { href: '/chronicles', label: '🖋️ Chronicles' }
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Crimson Text', Georgia, serif",
                    fontSize: '1.125rem',
                    color: 'rgba(232, 241, 245, 0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#e8f1f5'}
                  onMouseOut={(e) => e.target.style.color = 'rgba(232, 241, 245, 0.7)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Content - re-enable pointer events for interactive elements */}
        <div style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'flex-start',
          padding: '4rem 2rem',
          gap: '2rem',
          flexWrap: 'wrap',
          pointerEvents: 'none'  // ← Let clicks pass through empty space
        }}>
          {/* Content Box - Left Side - ENABLE pointer events */}
          <div style={{
            maxWidth: '500px',
            width: '100%',
            backgroundColor: 'rgba(10, 17, 40, 0.95)',
            backdropFilter: 'blur(12px)',
            padding: '2.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            flexShrink: 0,
            pointerEvents: 'auto'  // ← Re-enable for content box
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: '700',
              color: '#d4af37',
              marginBottom: '1rem',
              lineHeight: '1.1'
            }}>
              The Castle of Knowledge
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(232, 241, 245, 0.9)',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              An interactive 3D castle representing my interdisciplinary journey.
            </p>
            
            {/* Tower Info Display */}
            {towerInfo && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                borderLeft: '4px solid #d4af37',
                borderRadius: '6px',
                marginBottom: '2rem',
                animation: 'fadeIn 0.3s ease'
              }}>
                <h3 style={{
                  color: '#d4af37',
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontWeight: '600'
                }}>
                  {towerInfo.label}
                </h3>
                <p style={{
                  color: 'rgba(232, 241, 245, 0.85)',
                  fontSize: '0.9375rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {towerInfo.description}
                </p>
              </div>
            )}
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(205, 127, 50, 0.15)',
                borderLeft: '3px solid #cd7f32',
                borderRadius: '4px'
              }}>
                <h3 style={{
                  color: '#cd7f32',
                  fontSize: '1.125rem',
                  marginBottom: '0.25rem',
                  fontFamily: "'Crimson Text', Georgia, serif"
                }}>
                  🧬 Biochemistry
                </h3>
                <p style={{
                  color: 'rgba(232, 241, 245, 0.8)',
                  fontSize: '0.9375rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Left back tower - the molecular foundation
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                borderLeft: '3px solid #d4af37',
                borderRadius: '4px'
              }}>
                <h3 style={{
                  color: '#d4af37',
                  fontSize: '1.125rem',
                  marginBottom: '0.25rem',
                  fontFamily: "'Crimson Text', Georgia, serif"
                }}>
                  💻 Computation
                </h3>
                <p style={{
                  color: 'rgba(232, 241, 245, 0.8)',
                  fontSize: '0.9375rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Right back tower - algorithmic insights
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(128, 0, 32, 0.15)',
                borderLeft: '3px solid #800020',
                borderRadius: '4px'
              }}>
                <h3 style={{
                  color: '#800020',
                  fontSize: '1.125rem',
                  marginBottom: '0.25rem',
                  fontFamily: "'Crimson Text', Georgia, serif"
                }}>
                  🏛️ Philosophy
                </h3>
                <p style={{
                  color: 'rgba(232, 241, 245, 0.8)',
                  fontSize: '0.9375rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Front tower - guiding principles
                </p>
              </div>
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(212, 175, 55, 0.08)',
              borderRadius: '6px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                color: '#d4af37',
                fontSize: '1rem',
                marginBottom: '0.5rem',
                fontFamily: "'Crimson Text', Georgia, serif"
              }}>
                🎮 Interactive Controls
              </h3>
              <ul style={{
                color: 'rgba(232, 241, 245, 0.7)',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                paddingLeft: '1.25rem',
                margin: 0
              }}>
                <li><strong>Drag</strong> on the castle to rotate view</li>
                <li><strong>Scroll</strong> to zoom in/out</li>
                <li><strong>Hover</strong> over towers to see them glow</li>
                <li><strong>Click</strong> towers to select them</li>
                <li><strong>Click</strong> golden orb to open gate</li>
              </ul>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <a
                href="/about"
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid #d4af37',
                  color: '#d4af37',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  fontSize: '0.9375rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.15)'
                }}
              >
                Learn More About Me
              </a>
              
              <a
                href="/"
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'transparent',
                  border: '2px solid rgba(232, 241, 245, 0.3)',
                  color: 'rgba(232, 241, 245, 0.8)',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  fontSize: '0.9375rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'rgba(232, 241, 245, 0.5)'
                  e.target.style.color = '#e8f1f5'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(232, 241, 245, 0.3)'
                  e.target.style.color = 'rgba(232, 241, 245, 0.8)'
                }}
              >
                ← Back to Home
              </a>
            </div>
          </div>
          
          {/* Spacer - Castle visible and interactive here */}
          <div style={{ flex: 1, minHeight: '600px' }}>
            {/* Empty space for castle interaction */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}