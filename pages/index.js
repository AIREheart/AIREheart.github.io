import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      <div style={{
        minHeight: 'calc(100vh - 80px)',  // Account for nav height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1100px',
          backgroundColor: 'rgba(10, 17, 40, 0.4)',  // Semi-transparent backdrop
          backdropFilter: 'blur(8px)',
          padding: '4rem 3rem',
          borderRadius: '1rem',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          {/* Main heading */}
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#d4af37',
            animation: 'fadeIn 1.2s ease-out'
          }}>
            Allegory 🪶
          </h1>
          
          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
            color: 'rgba(232, 241, 245, 0.9)',
            fontFamily: "'Crimson Text', Georgia, serif",
            marginBottom: '3rem',
            animation: 'fadeIn 1.2s ease-out 0.3s backwards',
            lineHeight: '1.5'
          }}>
            "👋🏽 🌎"  - Aaisha A 
          </p>
          
          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'rgba(232, 241, 245, 0.8)',
            maxWidth: '900px',
            margin: '0 auto 3rem',
            lineHeight: '1.75',
            animation: 'fadeIn 1.2s ease-out 0.6s backwards'
          }}>
           {/*} Exploring the intersection of wet lab intuition and computational discovery. 
            Chronicles of transformation, philosophy in algorithms, and the poetry of protein folding. */}
          </p>



          {/* new rando paragraph */}
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'rgba(232, 241, 245, 0.8)',
            maxWidth: '900px',
            margin: '0 auto 3rem',
            lineHeight: '1.75',
            animation: 'fadeIn 1.2s ease-out 0.6s backwards'
          }}>
            Spurred from wanting to plant my own&nbsp;
            <a
            href="https://www.technologyreview.com/2020/09/03/1007716/digital-gardens-let-you-cultivate-your-own-little-bit-of-the-internet/" 
            style={{ color: 'gba(232, 241, 245, 0.85)', textDecoration: 'underline dotted' }}
            >
            digital garden 
            </a>
            , I launched Allegory, a personal site to chronicle the journey of a computational biochemist. 
            Part passion project, part portfolio, but predominantly persistence, this is a living space for self-expression and refining my voice.
            </p>


          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'rgba(166, 185, 240, 0.8)',
            maxWidth: '900px',
            margin: '0 auto 3rem',
            lineHeight: '1.75',
            animation: 'fadeIn 1.2s ease-out 0.6s backwards'
          }}>
          
            Please click, scroll and swipe around to explore my pseudo-structured mental playground. After all, they say that play is the highest form of research.
          </p>


          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeIn 1.2s ease-out 0.9s backwards'
          }}>
            {[
              { href: '/about', label: 'About Me', color: '#b8b396ff' },
              { href: '/chronicles', label: 'Chronicles', color: '#b8b396ff' },
              { href: '/projects', label: 'Projects', color: '#b8b396ff' }
            ].map(btn => (
              <a 
                key={btn.href}
                href={btn.href}
                style={{
                  padding: '1rem 2.5rem',
                  backgroundColor: `${btn.color}15`,
                  border: `2px solid ${btn.color}`,
                  color: btn.color,
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  transition: 'all 0.3s',
                  boxShadow: `0 4px 12px ${btn.color}10`
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = `${btn.color}30`
                  e.target.style.transform = 'scale(1.05) translateY(-2px)'
                  e.target.style.boxShadow = `0 8px 20px ${btn.color}30`
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = `${btn.color}15`
                  e.target.style.transform = 'scale(1) translateY(0)'
                  e.target.style.boxShadow = `0 4px 12px ${btn.color}10`
                }}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  )
}
