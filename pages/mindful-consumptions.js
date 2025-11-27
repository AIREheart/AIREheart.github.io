import Layout from '../components/Layout'
import SnowfallBackground from '../components/SnowfallBackground'

const sources = [
  {
    title: 'Asimov Press',
    category: 'Essays & Substacks',
    url: 'https://press.asimov.com',
    description: 'Brilliant synthesis of biotechnology and culture. Their typography alone taught me how to think about scientific elegance.'
  },
  {
    title: 'The Intrinsic Perspective',
    category: 'Essays & Substacks',
    url: 'https://www.theintrinsicperspective.com/',
    description: "Erik Hoel's explorations of consciousness, neuroscience, and the aristocratic virtues."
  },
  {
    title: 'Lex Fridman Podcast',
    category: 'Podcasts & Media',
    url: 'https://lexfridman.com/podcast',
    description: 'Long-form conversations treating science and philosophy with patience and genuine curiosity.'
  },
  {
    title: 'Nature',
    category: 'Journals',
    url: 'https://www.nature.com/',
    description: 'The benchmark for scientific rigor. Where foundational discoveries still break through the noise.'
  },
  {
    title: 'Cell',
    category: 'Journals',
    url: 'https://www.cell.com/',
    description: 'Where molecular biology meets clinical relevance. Reading Cell is like watching biochemistry become medicine in real time.'
  },
  {
    title: 'Bioinformatics',
    category: 'Journals',
    url: 'https://academic.oup.com/bioinformatics',
    description: 'Computational methods meeting biological questions. Essential for anyone at the intersection of code and cells.'
  },
  {
    title: 'Jenny Odell',
    category: 'Thinkers',
    url: 'https://www.jennyodell.com/',
    description: "On attention, place, and resisting the attention economy. Her work on 'doing nothing' is profoundly active."
  },
  {
    title: 'Wendell Berry',
    category: 'Thinkers',
    url: 'https://www.wendellberry.org/',
    description: 'Poet-farmer-philosopher. His essays on place and community are antibodies against abstraction.'
  },
  {
    title: "Maria Popova's The Marginalian",
    category: 'Essays & Substacks',
    url: 'https://www.themarginalian.org/',
    description: "A cartography of meaning. Maria's curation connects art, science, and philosophy with uncommon grace."
  },
]

export default function MindfulConsumptions() {
  return (
    <Layout 
      title="Mindful Consumptions - Aaisha Ameen"
      backgroundComponent={SnowfallBackground}
    >
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
            color: '#c19608ff',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Mindful Consumptions
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: 'rgba(4, 43, 70, 0.7)',
            lineHeight: '1.7',
            fontStyle: 'italic'
          }}>
            Balancing additive experiences with intention and pivots. Some sources that shape and inform my worldview.
          </p>
        </header>

        {/* Sources List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {sources.map((source, idx) => (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                border: '1px solid rgba(232, 241, 245, 0.1)',
                borderRadius: '8px',
                padding: '2rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(10, 17, 40, 0.3)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(232, 241, 245, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Category tag */}
              <div style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#800020',
                marginBottom: '0.75rem',
                fontWeight: '600'
              }}>
                {source.category}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Crimson Text', Georgia, serif",
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#e8f1f5',
                marginBottom: '1rem',
                lineHeight: '1.3'
              }}>
                {source.title}
              </h3>

              {/* Description */}
              <p style={{
                color: 'rgba(232, 241, 245, 0.7)',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: 0
              }}>
                {source.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  )
}