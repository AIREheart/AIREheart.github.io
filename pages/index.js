import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl">
          {/* Main heading with animation */}
          <h1 className="text-7xl md:text-9xl font-serif font-bold mb-8 text-gold animate-fade-in">
            Your Name
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-4xl text-moonlight/90 font-serif mb-12 animate-fade-in-delay leading-relaxed">
            Biochemist → Computational Biologist
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-2xl text-moonlight/80 max-w-3xl mx-auto leading-relaxed mb-16 animate-fade-in-delay-2">
            Exploring the intersection of wet lab intuition and computational discovery. 
            Chronicles of transformation, philosophy in algorithms, and the poetry of protein folding.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap animate-fade-in-delay-3">
            <a 
              href="/about" 
              className="px-10 py-4 bg-gold/10 border-2 border-gold hover:bg-gold/20 hover:scale-105 transition-all duration-300 rounded-lg text-gold font-semibold text-lg shadow-lg hover:shadow-gold/20"
            >
              About Me
            </a>
            <a 
              href="/chronicles" 
              className="px-10 py-4 bg-maroon/10 border-2 border-maroon hover:bg-maroon/20 hover:scale-105 transition-all duration-300 rounded-lg text-maroon font-semibold text-lg shadow-lg hover:shadow-maroon/20"
            >
              Chronicles
            </a>
            <a 
              href="/projects" 
              className="px-10 py-4 bg-silver/10 border-2 border-silver hover:bg-silver/20 hover:scale-105 transition-all duration-300 rounded-lg text-silver font-semibold text-lg shadow-lg hover:shadow-silver/20"
            >
              Projects
            </a>
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
        
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out;
        }
        
        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 1.2s ease-out 0.3s forwards;
        }
        
        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 1.2s ease-out 0.6s forwards;
        }
        
        .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fadeIn 1.2s ease-out 0.9s forwards;
        }
      `}</style>
    </Layout>
  )
}