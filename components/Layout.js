import Head from 'next/head'
import Navigation from './Navigation'
import LakesideBackground from './LakesideBackground'

export default function Layout({ children, title = 'Your Name' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* LAYER 1: Three.js Background - Absolutely positioned, lowest z-index */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <LakesideBackground />
      </div>
      
      {/* LAYER 2: Content - Higher z-index, allows interaction */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navigation />
        
        <main style={{ flex: 1 }}>
          {children}
        </main>
        
        <footer style={{
          borderTop: '1px solid rgba(232, 241, 245, 0.1)',
          marginTop: '5rem',
          backgroundColor: 'rgba(10, 17, 40, 0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem',
            textAlign: 'center',
            color: 'rgba(232, 241, 245, 0.5)',
            fontFamily: "'Crimson Text', Georgia, serif"
          }}>
            <p>© {new Date().getFullYear()} • Built with curiosity and code</p>
          </div>
        </footer>
      </div>
    </>
  )
}
