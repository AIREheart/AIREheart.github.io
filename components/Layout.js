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
      
      {/* Three.js background - fixed position, behind everything */}
      <div className="fixed inset-0 z-0">
        <LakesideBackground />
      </div>
      
      {/* Main content - positioned above background */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="border-t border-moonlight/10 mt-20 bg-midnight/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8 text-center text-moonlight/50">
            <p className="font-serif">
              © {new Date().getFullYear()} • Built with curiosity and code
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}