// components/Layout.js
import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer.js'
import LakesideBackground from './LakesideBackground'

export default function Layout({ children, title = 'Aaisha Ameen' }) {
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
        pointerEvents: 'none'
      }}>
        <LakesideBackground />
      </div>
      
      {/* Main content - positioned above background */}
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
        
        <Footer />
      </div>
    </>
  )
}