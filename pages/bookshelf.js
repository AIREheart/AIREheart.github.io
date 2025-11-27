// pages/bookshelf.js
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

export default function Bookshelf() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch books data
    fetch('/books.json')
      .then(res => res.json())
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading books:', error)
        // Fallback to sample data if fetch fails
        setBooks(sampleBooks)
        setLoading(false)
      })
  }, [])

  const booksPerShelf = 5
  const shelves = []
  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf))
  }

  return (
    <Layout title="Bookshelf">
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem'
      }}>
        {/* Header */}
        <header style={{
          marginBottom: '4rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '700',
            color: '#d4af37',
            marginBottom: '1rem',
            lineHeight: '1.1'
          }}>
            Aaisha's Digital Library
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: 'rgba(232, 241, 245, 0.7)',
            lineHeight: '1.7',
            marginBottom: '1rem'
          }}>
            Literary standouts I'd recommend in a heartbeat 
            
          </p>
          <a
            href="https://www.goodreads.com/user/show/13691462-aaisha"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#cd7f32',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#d4af37'}
            onMouseLeave={(e) => e.target.style.color = '#cd7f32'}
          >
            View my never-ending TBR and more on Goodreads →
          </a>
         
          
        </header>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(212, 175, 55, 0.2)',
              borderTop: '4px solid #d4af37',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'rgba(179, 143, 102, 0.3)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            padding: '3rem 2rem',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
          }}>
            {shelves.map((shelf, shelfIndex) => (
              <div
                key={shelfIndex}
                style={{
                  position: 'relative',
                  marginBottom: shelfIndex < shelves.length - 1 ? '4rem' : '0',
                  paddingBottom: '2rem'
                }}
              >
                {/* Books on shelf */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '2rem',
                  padding: '1.5rem 0',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {shelf.map((book, bookIndex) => (
                    <BookItem key={bookIndex} book={book} />
                  ))}
                </div>

                {/* Wooden shelf */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1rem',
                  background: 'linear-gradient(to bottom, rgba(59, 25, 8, 0.8), rgba(59, 25, 8, 0.6))',
                  borderRadius: '0 0 0.5rem 0.5rem',
                  boxShadow: 'inset 0 -2px 5px rgba(0, 0, 0, 0.3)',
                  zIndex: 0
                }}></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p style={{
  marginTop: '4rem',
  textAlign: 'center',
  color: 'rgba(232, 241, 245, 0.6)'
}}>
  Explore my{' '}
  <a href="/mindful-consumptions" style={{ color: '#d4af37' }}>
    other curated sources 💭
  </a>
</p>


      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  )
}

function BookItem({ book }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        width: '140px',
        height: '210px',
        perspective: '1000px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        transform: isFlipped ? 'translateY(-10px) scale(1.05)' : 'translateY(0)',
        zIndex: isFlipped ? 10 : 1
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Book Cover */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        borderRadius: '0.375rem',
        boxShadow: isFlipped 
          ? '0 15px 40px rgba(0, 0, 0, 0.5)' 
          : '0 8px 20px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Front - Cover Image */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: '0.375rem',
          overflow: 'hidden',
          border: '2px solid rgba(232, 241, 245, 0.1)'
        }}>
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.src = `https://placehold.co/140x210/2a3442/e8f1f5?text=${encodeURIComponent(book.title.substring(0, 20))}`
            }}
          />
        </div>

        {/* Back - Review */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, rgba(10, 17, 40, 0.95), rgba(26, 35, 50, 0.95))',
          backdropFilter: 'blur(10px)',
          color: '#e8f1f5',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '0.375rem',
          border: '2px solid rgba(212, 175, 55, 0.3)',
          boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.1)',
          overflow: 'auto'
        }}>
          <h3 style={{
            fontFamily: "'Crimson Text', Georgia, serif",
            fontSize: '1rem',
            fontWeight: '700',
            color: '#d4af37',
            marginBottom: '0.5rem',
            lineHeight: '1.2'
          }}>
            {book.title}
          </h3>
          <p style={{
            fontSize: '0.8rem',
            fontStyle: 'italic',
            color: 'rgba(232, 241, 245, 0.7)',
            marginBottom: '0.75rem'
          }}>
            {book.author}
          </p>
          <p style={{
            fontSize: '0.75rem',
            lineHeight: '1.4',
            color: 'rgba(232, 241, 245, 0.85)',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {book.review}
          </p>
        </div>
      </div>
    </div>
  )
}

// Sample fallback data
const sampleBooks = [
  {
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    cover: "https://placehold.co/140x210/7e3a6c/ffffff?text=Splendid+Suns",
    review: "A powerful story of friendship and resilience in Afghanistan. Beautifully written and deeply moving."
  },
  {
    title: "Beartown",
    author: "Fredrik Backman",
    cover: "https://placehold.co/140x210/2a4b5e/ffffff?text=Beartown",
    review: "A gripping exploration of a small town's identity, community, and the consequences of a single violent act."
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    cover: "https://placehold.co/140x210/d36582/ffffff?text=Circe",
    review: "A captivating retelling of Greek mythology from Circe's perspective. Empowering and beautifully crafted."
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://placehold.co/140x210/3f88c5/ffffff?text=Hail+Mary",
    review: "Brilliant hard sci-fi with humor and heart. A thrilling space adventure with real science."
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://placehold.co/140x210/1a1a2e/ffffff?text=Midnight+Library",
    review: "A thought-provoking exploration of regret, choice, and the infinite possibilities of life."
  }
]
