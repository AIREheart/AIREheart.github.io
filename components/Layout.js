// components/Layout.js
// ⚠️ CRITICAL: This file MUST be replaced for castle interactivity to work!

import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'
import LakesideBackground from './LakesideBackground'

export default function Layout({ 
  children, 
  title = 'Aaisha Ameen', 
  backgroundComponent,
  allowBackgroundInteraction = false  // ← NEW PROP - Critical for castle!
}) {
  const Background = backgroundComponent || LakesideBackground
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Computational biologist exploring the intersection of wet lab and algorithms" />
      </Head>
      
      {/* Three.js background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        // ⚠️ CRITICAL FIX: Conditional pointer events
        pointerEvents: allowBackgroundInteraction ? 'auto' : 'none'
      }}>
        <Background />
      </div>
      
      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // ⚠️ CRITICAL: Let events pass through when background is interactive
        pointerEvents: allowBackgroundInteraction ? 'none' : 'auto'
      }}>
        {/* Re-enable pointer events on UI elements */}
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