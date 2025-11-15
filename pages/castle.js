// pages/castle.js
// FIXED VERSION - Content doesn't cover castle, castle is interactive

import Layout from '../components/Layout'
import CastleScene from '../components/three/CastleScene'

export default function Castle() {
  return (
    <Layout title="Interactive Castle" backgroundComponent={CastleScene}>
      {/* Content positioned on the LEFT side, castle visible on RIGHT */}
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '4rem 2rem',
        gap: '2rem'
      }}>
        {/* Content Box - Left Side */}
        <div style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'rgba(10, 17, 40, 0.85)',
          backdropFilter: 'blur(12px)',
          padding: '2.5rem',
          borderRadius: '1rem',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          flexShrink: 0
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
            This interactive 3D castle represents my journey through different domains of knowledge.
          </p>
          
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
                Left back tower - where it all began
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
                Right back tower - current focus
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
                Front tower - guiding questions
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
              🎮 How to Interact
            </h3>
            <ul style={{
              color: 'rgba(232, 241, 245, 0.7)',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              paddingLeft: '1.25rem',
              margin: 0
            }}>
              <li>Drag on castle to rotate view</li>
              <li>Scroll to zoom in/out</li>
              <li>Hover towers to see glow</li>
              <li>Click golden sphere for gate</li>
              <li>Click towers to light them</li>
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
        
        {/* Spacer - Castle shows in this space */}
        <div style={{ flex: 1, minHeight: '600px' }}>
          {/* Empty space where castle is visible and interactive */}
        </div>
      </div>
    </Layout>
  )
}