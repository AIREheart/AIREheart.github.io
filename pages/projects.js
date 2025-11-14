import Layout from '../components/Layout'

const projects = [
  {
    title: 'Bioclassifiers: A Suite of ML Models for Biology',
    description:'Tinkering with various classifier models to explore fundamental ML concepts applied to -omics-based approaches and biological datasets.',
    tags: ['EDA (numpy, pandas, seaborn)','R', 'Python','model training + evals'],
    year: '2024 - present',
    link: 'https://github.com/AIREheart/Replication-Station'
  },
  {
    title: 'Interpreting Protein Predictors',
    description:'Probing model interpretability of protein structure representations from AlphaFold using modern methods such as LIME, SHAP and sparse feature discovery (inspired by Anthropic and OpenAI interpretability work).',
    tags: ['interpretability metrics', 'feature attribution',],
    year: '2024 - present',
    link: 'https://github.com/AIREheart/AlphaInterp'
  },
  {
    title: 'Engineering PETases @ The Align Foundation',
    description: 'Creating a benchark model capable of predicting and generating novel PETase enzyme properties for enhanced plastic degradtion via computational and ML models.',
    tags: ['protein prediction', 'zero-shot & supervised learning', 'GNNs + reinforcement learning'],
    year: '2025',
    link: 'https://github.com/AIREheart/AlignBio2025',
  },
  {
    title: 'BERT Takes a BoW',
    description: 'Exploring natural language processing models for clinical diagnosis of neurodegenerative diseases',
    tags: ['ClinicalBERT',' & stratification techniques', 'text classification', 'Python', 'scikit-learn'],
    year: '2024',
    link: '',
  },
{
    title: 'Solubility Express',
    description: 'Senior undergraduate thesis studying a parasitic metabolic enzyme as a therapeutic target via molecular biology and protein purification workflows.',
    tags: ['bacterial transformations', 'induced protein expression', 'affinity + size-exclusion chromatography'],
    year: '2023 - 2024',
    link: 'https://drive.google.com/file/d/1oRnFtidRJDSv9lInBkskvvXGAs2-m25a/view',
  }

]

export default function Projects() {
  return (
    <Layout title="Projects">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem'
      }}>
        {/* Header */}
        <header style={{
          marginBottom: '5rem',
          maxWidth: '800px'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '700',
            color: '#d4af37',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Projects
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: 'rgba(232, 241, 245, 0.7)',
            lineHeight: '1.7'
          }}>
            Computational explorations in biology and beyond
          </p>
        </header>

        {/* Projects Grid - Magazine Style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {projects.map((project, idx) => (
            <article
              key={idx}
              style={{
                border: '1px solid rgba(232, 241, 245, 0.1)',
                borderRadius: '8px',
                padding: '2.5rem',
                transition: 'all 0.4s ease',
                backgroundColor: 'rgba(10, 17, 40, 0.3)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(212, 175, 55, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(232, 241, 245, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Year Label */}
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(232, 241, 245, 0.5)',
                marginBottom: '1rem',
                fontWeight: '600',
                letterSpacing: '0.05em'
              }}>
                {project.year}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.75rem',
                fontFamily: "'Crimson Text', Georgia, serif",
                fontWeight: '600',
                color: '#cd7f32',
                marginBottom: '1.25rem',
                lineHeight: '1.3'
              }}>
                {project.title}
              </h3>

              {/* Description */}
              <p style={{
                color: 'rgba(232, 241, 245, 0.75)',
                lineHeight: '1.7',
                marginBottom: '2rem',
                fontSize: '1rem'
              }}>
                {project.description}
              </p>

              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.375rem 0.875rem',
                      backgroundColor: 'rgba(232, 241, 245, 0.05)',
                      border: '1px solid rgba(232, 241, 245, 0.15)',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      color: 'rgba(232, 241, 245, 0.7)',
                      fontWeight: '500'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.link}
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
                View Project
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </a>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{
          marginTop: '6rem',
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '8px',
          backgroundColor: 'rgba(212, 175, 55, 0.03)'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontFamily: "'Crimson Text', Georgia, serif",
            color: '#d4af37',
            marginBottom: '1rem'
          }}>
            Interested in Collaboration?
          </h2>
          <p style={{
            color: 'rgba(232, 241, 245, 0.7)',
            fontSize: '1.125rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            I'm always open to discussing new projects at the intersection of computational and experimental biology.
          </p>
          <a
            href="/research"
            style={{
              display: 'inline-block',
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
            View Research
          </a>
        </div>
      </div>
    </Layout>
  )
}