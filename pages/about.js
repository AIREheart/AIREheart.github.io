import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="About">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-6xl font-serif font-bold mb-8 text-gold">About Me</h1>
        
        <div className="prose-custom space-y-6">
          <p className="text-xl leading-relaxed">
            A biochemist by training, I've found myself drawn to the elegant mathematics underlying 
            biological systems. My journey from pipettes to Python has been one of discovery—finding 
            that computational tools don't replace wet lab intuition, they amplify it.
          </p>
          
          <h2 className="text-3xl font-serif mt-12 mb-4 text-bronze">Background</h2>
          <p>
            My path began in traditional biochemistry, where I developed a deep appreciation for 
            molecular mechanisms. As I encountered increasingly complex biological questions, I 
            realized the computational approaches offered new lenses for understanding life at scale.
          </p>
          
          <h2 className="text-3xl font-serif mt-12 mb-4 text-bronze">Current Focus</h2>
          <p>
            Now, I'm building expertise in:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Machine learning models for biological sequence analysis</li>
            <li>Bioinformatics pipelines for multi-omics data</li>
            <li>Protein structure prediction and design</li>
            <li>Network analysis of biological systems</li>
          </ul>
          
          <h2 className="text-3xl font-serif mt-12 mb-4 text-bronze">Philosophy</h2>
          <p>
            I believe the best computational biology emerges at the intersection of deep domain 
            knowledge and technical sophistication. Like Janus, we must look both ways—honoring 
            the biochemical reality while embracing computational abstraction.
          </p>
          
          <div className="mt-12 p-6 bg-navy/50 border border-gold/30 rounded-lg">
            <p className="text-sm italic text-moonlight/70">
              "In every walk with nature, one receives far more than he seeks." — John Muir
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}