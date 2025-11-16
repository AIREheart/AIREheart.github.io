import Layout from '../../components/Layout'
import { getSortedPostsData } from '../../lib/posts'
import { format } from 'date-fns'
import { useState } from 'react'
import Link from 'next/link'

export default function Chronicles({ allPostsData }) {
  const [selectedTag, setSelectedTag] = useState(null)
  
  const allTags = [...new Set(allPostsData.flatMap(post => post.tags || []))]
  const filteredPosts = selectedTag
    ? allPostsData.filter(post => post.tags?.includes(selectedTag))
    : allPostsData

  return (
    <Layout title="Chronicles">
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem'
      }}>
        {/* Header */}
        <header style={{
          marginBottom: '4rem',
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
            Chronicles
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            color: 'rgba(232, 241, 245, 0.7)',
            lineHeight: '1.7'
          }}>
            thoughts and tensors 🖲️
          </p>
        </header>
        
        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div style={{
            marginBottom: '4rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <button
              onClick={() => setSelectedTag(null)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: '500',
                transition: 'all 0.3s',
                backgroundColor: selectedTag === null ? '#d4af37' : 'rgba(232, 241, 245, 0.05)',
                color: selectedTag === null ? '#0a1128' : 'rgba(232, 241, 245, 0.7)',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: selectedTag === null ? '#d4af37' : 'rgba(232, 241, 245, 0.2)'
              }}
              onMouseEnter={(e) => {
                if (selectedTag !== null) {
                  e.target.style.backgroundColor = 'rgba(232, 241, 245, 0.1)'
                  e.target.style.color = '#e8f1f5'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTag !== null) {
                  e.target.style.backgroundColor = 'rgba(232, 241, 245, 0.05)'
                  e.target.style.color = 'rgba(232, 241, 245, 0.7)'
                }
              }}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  transition: 'all 0.3s',
                  backgroundColor: selectedTag === tag ? '#d4af37' : 'rgba(232, 241, 245, 0.05)',
                  color: selectedTag === tag ? '#0a1128' : 'rgba(232, 241, 245, 0.7)',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderColor: selectedTag === tag ? '#d4af37' : 'rgba(232, 241, 245, 0.2)'
                }}
                onMouseEnter={(e) => {
                  if (selectedTag !== tag) {
                    e.target.style.backgroundColor = 'rgba(232, 241, 245, 0.1)'
                    e.target.style.color = '#e8f1f5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTag !== tag) {
                    e.target.style.backgroundColor = 'rgba(232, 241, 245, 0.05)'
                    e.target.style.color = 'rgba(232, 241, 245, 0.7)'
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        
        {/* Posts List - Editorial Style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/chronicles/${post.id}`} style={{ textDecoration: 'none' }}>
              <article
                style={{
                  padding: '2.5rem 0',
                  borderBottom: '1px solid rgba(232, 241, 245, 0.1)',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '1.5rem'
                  e.currentTarget.querySelector('h2').style.color = '#d4af37'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0'
                  e.currentTarget.querySelector('h2').style.color = '#cd7f32'
                }}
              >
                {/* Date */}
                <time style={{
                  fontSize: '0.875rem',
                  color: 'rgba(232, 241, 245, 0.5)',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '1rem'
                }}>
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
                
                {/* Title */}
                <h2 style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontWeight: '600',
                  color: '#cd7f32',
                  marginBottom: '1rem',
                  lineHeight: '1.3',
                  transition: 'color 0.3s'
                }}>
                  {post.title}
                </h2>
                
                {/* Excerpt */}
                {post.excerpt && (
                  <p style={{
                    color: 'rgba(232, 241, 245, 0.75)',
                    lineHeight: '1.7',
                    fontSize: '1.0625rem',
                    marginBottom: '1.5rem',
                    maxWidth: '700px'
                  }}>
                    {post.excerpt}
                  </p>
                )}
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.625rem',
                    marginTop: '1.25rem'
                  }}>
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.375rem 0.875rem',
                          backgroundColor: 'rgba(232, 241, 245, 0.05)',
                          border: '1px solid rgba(232, 241, 245, 0.15)',
                          borderRadius: '4px',
                          fontSize: '0.8125rem',
                          color: 'rgba(232, 241, 245, 0.6)',
                          fontWeight: '500'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(232, 241, 245, 0.5)'
          }}>
            <p style={{ fontSize: '1.125rem' }}>
              No posts found with this tag.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}