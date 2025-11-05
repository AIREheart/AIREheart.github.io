import Layout from '../components/Layout'

const projects = [
  {
    title: 'Protein Structure Predictor',
    description: 'ML model for predicting protein folding patterns from sequence data',
    tags: ['Python', 'PyTorch', 'Bioinformatics'],
    link: '#',
  },
  {
    title: 'RNA-seq Pipeline',
    description: 'Automated workflow for differential gene expression analysis',
    tags: ['Python', 'Nextflow', 'Docker'],
    link: '#',
  },
  {
    title: 'Interactive Metabolic Network',
    description: 'D3.js visualization of pathway interactions',
    tags: ['JavaScript', 'D3.js', 'Systems Biology'],
    link: '#',
  },
]

export default function Projects() {
  return (
    <Layout title="Projects">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-6xl font-serif font-bold mb-4 text-gold">Projects</h1>
        <p className="text-xl text-moonlight/70 mb-12">
          Computational explorations in biology and beyond
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-navy/30 border border-moonlight/10 rounded-lg p-6 hover:border-gold/30 transition-all hover:transform hover:scale-105"
            >
              <h3 className="text-2xl font-serif font-semibold mb-3 text-bronze">
                {project.title}
              </h3>
              <p className="text-moonlight/80 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-navy-light text-sm rounded-full text-moonlight/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="text-gold hover:text-bronze transition-colors inline-flex items-center gap-2"
              >
                View Project <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}