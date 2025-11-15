import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout title="About">
      {/* Hero Section */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem'
      }}>
        <div style={{
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          paddingBottom: '3rem',
          marginBottom: '4rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '700',
            color: '#d4af37',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            About Me 🧬
          </h1>
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            color: 'rgba(232, 241, 245, 0.8)',
            lineHeight: '1.6',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontStyle: 'italic'
          }}>
            Biochemist by training with over 4 years of R&D spanning genomics, structural biology, SynBio and vaccine stabilization 
          </p>
        </div>

        {/* Main Content - Clean Typography */}
        <article style={{
          fontSize: '1.125rem',
          lineHeight: '1.9',
          color: 'rgba(232, 241, 245, 0.85)'
        }}>
          <p style={{ marginBottom: '2rem' }}>
            A biochemist by training, I've found myself drawn to the elegant mathematics underlying 
            biological systems. My journey from pipettes to Python has been one of discovery—finding 
            that computational tools don't replace wet lab intuition but amplify it.
          </p>

          {/* Section with visual separation */}
          <div style={{
            margin: '5rem 0',
            borderLeft: '3px solid #cd7f32',
            paddingLeft: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: '600',
              color: '#cd7f32',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Background 
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              With roots in biochemistry, I developed a deep appreciation for 
              molecular mechanisms. As I encountered increasingly complex biological questions, I 
              realized the computational approaches offered new lenses for understanding life at scale.
            </p>
          </div>

          <div style={{
            margin: '5rem 0',
            borderLeft: '3px solid #cd7f32',
            paddingLeft: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: '600',
              color: '#cd7f32',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Current Focus
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Now, I'm building expertise in:
            </p>
            
            {/* Clean list styling */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '2rem 0'
            }}>
              {[
                'Convergence of data science and machine learning with biological analysis',
                'Model Embryology & Interpretabiliy 🐣',
                'AI alignment and ethics (model scope & scalability w.r.t. design, development and deployment)',
                'Bioinformatics pipelines for multi-omics data',
                'Protein structure prediction and design',
                'Network analysis of biological systems'
              ].map((item, idx) => (
                <li key={idx} style={{
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(232, 241, 245, 0.1)',
                  color: 'rgba(232, 241, 245, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#d4af37',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            margin: '5rem 0',
            borderLeft: '3px solid #cd7f32',
            paddingLeft: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: '600',
              color: '#cd7f32',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Philosophy
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              I believe the best computational biology emerges at the intersection of deep domain 
              knowledge and technical sophistication. Like Janus, we must look both ways—honoring 
              the biochemical reality while embracing computational abstraction.
            </p>
            </div>

            <div style={{
            margin: '5rem 0',
            borderLeft: '3px solid #cd7f32',
            paddingLeft: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontWeight: '600',
              color: '#6ac0f2ff',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
      

              Galleria {/* ///./pages/whimsy.js*/}
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Miscellaneous creative collections.
            </p>
            
            <p>
            <Link 
            href="./castle-test" 
            style={{ color: 'gba(232, 241, 245, 0.85)', textDecoration: 'underline dotted' }}
            >
            Castle 
            </Link>
             <break></break> 🏰 a three.js experiment
            </p>
          </div>

          

          {/* Pullquote - Editorial Style */}
          <blockquote style={{
            margin: '4rem 0',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(128, 0, 32, 0.05))',
            borderLeft: '4px solid #d4af37',
            borderRadius: '4px'
          }}>
            <p style={{
              fontSize: '1.5rem',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontStyle: 'italic',
              color: 'rgba(232, 241, 245, 0.9)',
              lineHeight: '1.7',
              margin: 0
            }}>
              “There is something at work in my soul, which I do not understand.”

            </p>
            <footer style={{
              marginTop: '1rem',
              fontSize: '1rem',
              color: 'rgba(232, 241, 245, 0.6)',
              fontStyle: 'normal'
            }}>
              — Mary Shelley, <em>Frankenstein</em>
            </footer>
          </blockquote>
        </article>
      </div>
    </Layout>
  )
}