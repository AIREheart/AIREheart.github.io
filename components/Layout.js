// components/Layout.js
// FIXED VERSION - Supports interactive backgrounds

import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'
import LakesideBackground from './LakesideBackground'

export default function Layout({ children, title = 'Aaisha Ameen', backgroundComponent, allowBackgroundInteraction = true }) {
  // Use custom background if provided, otherwise default to LakesideBackground
  const Background = backgroundComponent || LakesideBackground
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Computational biologist exploring the intersection of wet lab and algorithms" />
      </Head>
      
      {/* Three.js background - fixed position, behind everything */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        // KEY FIX: Allow pointer events when background needs to be interactive
        pointerEvents: allowBackgroundInteraction ? 'auto' : 'none'
      }}>
        <Background />
      </div>
      
      {/* Main content - positioned above background */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // When background is interactive, content needs to allow events to pass through
        // except on actual content elements
        pointerEvents: allowBackgroundInteraction ? 'none' : 'auto'
      }}>
        {/* Re-enable pointer events on nav and footer */}
        <div style={{ pointerEvents: 'auto' }}>
          <Navigation />
        </div>
        
        <main style={{ flex: 1, pointerEvents: 'auto' }}>
          {children}
        </main>
        
        <div style={{ pointerEvents: 'auto' }}>
          <Footer />
        </div>
      </div>
    </>
  )
}