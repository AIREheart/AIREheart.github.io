import Layout from '../components/Layout'

const publications = [
  {
    title: 'Deep Learning Approaches to Protein Structure Prediction',
    authors: 'Your Name, Collaborator A, Collaborator B',
    journal: 'Nature Computational Biology',
    year: '2024',
    doi: '10.1038/example',
    description: 'Novel transformer architecture achieving state-of-the-art accuracy on CASP15 targets with reduced computational requirements.'
  },
  {
    title: 'Multi-Omics Integration for Drug Target Discovery',
    authors: 'Your Name, Research Team',
    journal: 'Cell Systems',
    year: '2023',
    doi: '10.1016/example',
    description: 'Systematic integration of transcriptomic, proteomic, and metabolomic data reveals novel therapeutic targets in metabolic disease.'
  },
]

const interests = [
  {
    title: 'Machine Learning for Protein Structure',
    description: 'Developing novel architectures that combine physical constraints with data-driven approaches for accurate structure prediction.'
  },
  {
    title: 'Multi-Omics Data Integration',
    description: 'Creating statistical frameworks to synthesize heterogeneous biological data types into coherent mechanistic insights.'
  },
  {
    title: 'Network Biology',
    description: 'Applying graph theory and dynamical systems to understand emergent properties of biological networks.'
  },
  {
    title: 'Computational Drug Discovery',
    description: 'Leveraging ML and structural biology for rational design of therapeutic molecules with improved efficacy and specificity.'
  },
]

export default function Research() {
  return (
    <Layout title="Research">
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem'
      }}>
        {/* Header */}
        <header style={{
          marginBottom: '5rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          paddingBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '700',
            color: '#d4af37',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Research ⚗️
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: 'rgba(232, 241, 245, 0.7)',
            lineHeight: '1.7'
          }}>
            Exploring biological complexity through computational lenses
          </p>
        </header>

        {/* Research Interests - Grid Layout */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '600',
            color: '#cd7f32',
            marginBottom: '3rem',
            letterSpacing: '-0.02em'
          }}>
            Current Interests
          </h2>

          <div style={{
            display: 'grid',
            gap: '2rem'
          }}>
            {interests.map((interest, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2rem',
                  borderLeft: '3px solid rgba(212, 175, 55, 0.5)',
                  backgroundColor: 'rgba(10, 17, 40, 0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '2.5rem'
                  e.currentTarget.style.borderLeftColor = '#d4af37'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '2rem'
                  e.currentTarget.style.borderLeftColor = 'rgba(212, 175, 55, 0.5)'
                }}
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontWeight: '600',
                  color: '#c0c0c0',
                  marginBottom: '0.75rem'
                }}>
                  {interest.title}
                </h3>
                <p style={{
                  color: 'rgba(232, 241, 245, 0.75)',
                  lineHeight: '1.7',
                  fontSize: '1.0625rem'
                }}>
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications - Editorial Style */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '600',
            color: '#cd7f32',
            marginBottom: '3rem',
            letterSpacing: '-0.02em'
          }}>
            Selected Publications
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {publications.map((pub, idx) => (
              <article
                key={idx}
                style={{
                  padding: '2.5rem',
                  border: '1px solid rgba(232, 241, 245, 0.1)',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(10, 17, 40, 0.3)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(232, 241, 245, 0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Title */}
                <h3 style={{
                  fontSize: '1.75rem',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontWeight: '600',
                  color: '#d4af37',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {pub.title}
                </h3>

                {/* Meta information */}
                <div style={{
                  fontSize: '0.95rem',
                  color: 'rgba(232, 241, 245, 0.6)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  <div style={{ marginBottom: '0.25rem' }}>{pub.authors}</div>
                  <div>
                    <em>{pub.journal}</em> ({pub.year}) • DOI: {pub.doi}
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: 'rgba(232, 241, 245, 0.8)',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontSize: '1.0625rem'
                }}>
                  {pub.description}
                </p>

                {/* Link */}
                <a
                  href={`https://doi.org/${pub.doi}`}
                  style={{
                    color: '#d4af37',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.gap = '0.75rem'
                    e.target.style.color = '#cd7f32'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.gap = '0.5rem'
                    e.target.style.color = '#d4af37'
                  }}
                >
                  Read Paper
                  <span style={{ fontSize: '1.2rem' }}>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Collaborations CTA */}
        <section style={{
          padding: '3rem',
          backgroundColor: 'rgba(212, 175, 55, 0.03)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '600',
            color: '#cd7f32',
            marginBottom: '1rem'
          }}>
            Open to Collaboration
          </h2>
          <p style={{
            color: 'rgba(232, 241, 245, 0.75)',
            lineHeight: '1.7',
            fontSize: '1.125rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            I'm always interested in collaborative opportunities at the intersection 
            of computational and experimental biology. If our research interests align, 
            I'd love to hear from you.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="mailto:aaisha.ameen3@gmail.com"
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '2px solid #d4af37',
                color: '#d4af37',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Get in Touch
            </a>
            <a
              href="/chronicles"
              style={{
                padding: '0.875rem 2rem',
                backgroundColor: 'transparent',
                border: '2px solid rgba(232, 241, 245, 0.3)',
                color: 'rgba(232, 241, 245, 0.8)',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                transition: 'all 0.3s'
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
              Read Chronicles
            </a>
          </div>
        </section>
      </div>
    </Layout>
  )
}