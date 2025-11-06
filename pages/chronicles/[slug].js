import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { format } from 'date-fns'
import Link from 'next/link'

export default function Post({ postData }) {
  return (
    <Layout title={postData.title}>
      {/* Article Container - Optimized reading width */}
      <article style={{
        maxWidth: '750px',
        margin: '0 auto',
        padding: '5rem 2rem 4rem'
      }}>
        {/* Header Section */}
        <header style={{
          marginBottom: '4rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          {/* Meta Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <time style={{
              fontSize: '0.875rem',
              color: 'rgba(232, 241, 245, 0.5)',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {format(new Date(postData.date), 'MMMM d, yyyy')}
            </time>
            
            {postData.tags && postData.tags.length > 0 && (
              <>
                <span style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: 'rgba(232, 241, 245, 0.3)',
                  borderRadius: '50%'
                }}></span>
                <div style={{
                  display: 'flex',
                  gap: '0.625rem',
                  flexWrap: 'wrap'
                }}>
                  {postData.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '4px',
                        fontSize: '0.8125rem',
                        color: '#d4af37',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontFamily: "'Crimson Text', Georgia, serif",
            fontWeight: '700',
            color: '#d4af37',
            lineHeight: '1.15',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            {postData.title}
          </h1>
          
          {/* Excerpt/Subtitle if exists */}
          {postData.excerpt && (
            <p style={{
              fontSize: '1.375rem',
              color: 'rgba(232, 241, 245, 0.7)',
              lineHeight: '1.6',
              fontFamily: "'Crimson Text', Georgia, serif",
              fontStyle: 'italic'
            }}>
              {postData.excerpt}
            </p>
          )}
        </header>
        
        {/* Article Content - Enhanced Typography */}
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: 'rgba(232, 241, 245, 0.85)'
          }}
        />
        
        {/* Footer Navigation */}
        <footer style={{
          marginTop: '5rem',
          paddingTop: '3rem',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          <Link
            href="/chronicles"
            style={{
              color: '#d4af37',
              textDecoration: 'none',
              fontSize: '1rem',
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
            <span>←</span> Back to Chronicles
          </Link>
        </footer>
      </article>

      {/* Enhanced Article Styles */}
      <style jsx global>{`
        /* Typography Hierarchy */
        .article-content h1 {
          font-size: 2.5rem;
          font-family: 'Crimson Text', Georgia, serif;
          font-weight: 700;
          color: #d4af37;
          line-height: 1.2;
          margin: 3rem 0 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .article-content h2 {
          font-size: 2rem;
          font-family: 'Crimson Text', Georgia, serif;
          font-weight: 600;
          color: #cd7f32;
          line-height: 1.3;
          margin: 2.5rem 0 1.25rem;
          letter-spacing: -0.01em;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          font-family: 'Crimson Text', Georgia, serif;
          font-weight: 600;
          color: #c0c0c0;
          line-height: 1.4;
          margin: 2rem 0 1rem;
        }
        
        .article-content h4 {
          font-size: 1.25rem;
          font-family: 'Crimson Text', Georgia, serif;
          font-weight: 600;
          color: rgba(232, 241, 245, 0.9);
          line-height: 1.5;
          margin: 1.75rem 0 0.875rem;
        }

        /* Paragraphs */
        .article-content p {
          margin-bottom: 1.75rem;
          line-height: 1.8;
        }

        .article-content p:first-of-type {
          font-size: 1.25rem;
          line-height: 1.7;
          color: rgba(232, 241, 245, 0.9);
        }

        /* Links */
        .article-content a {
          color: #d4af37;
          text-decoration: underline;
          text-decoration-color: rgba(212, 175, 55, 0.3);
          text-underline-offset: 0.25em;
          transition: all 0.3s;
        }
        
        .article-content a:hover {
          color: #cd7f32;
          text-decoration-color: #cd7f32;
        }

        /* Lists */
        .article-content ul,
        .article-content ol {
          margin: 2rem 0 2rem 1.5rem;
          line-height: 1.8;
        }
        
        .article-content li {
          margin-bottom: 0.875rem;
          padding-left: 0.5rem;
        }

        .article-content ul > li::marker {
          color: #d4af37;
        }

        .article-content ol > li::marker {
          color: #d4af37;
          font-weight: 600;
        }

        /* Blockquotes */
        .article-content blockquote {
          margin: 3rem 0;
          padding: 2rem 2rem 2rem 2.5rem;
          border-left: 4px solid #d4af37;
          background: linear-gradient(
            to right,
            rgba(212, 175, 55, 0.05),
            transparent
          );
          font-style: italic;
          color: rgba(232, 241, 245, 0.85);
        }
        
        .article-content blockquote p {
          font-size: 1.25rem;
          line-height: 1.7;
          margin-bottom: 0;
        }

        .article-content blockquote p:last-child {
          margin-bottom: 0;
        }

        /* Code */
        .article-content code {
          background-color: rgba(26, 35, 50, 0.6);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9em;
          color: #e8f1f5;
          font-family: 'Courier New', monospace;
          border: 1px solid rgba(232, 241, 245, 0.1);
        }
        
        .article-content pre {
          background-color: rgba(26, 35, 50, 0.6);
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid rgba(232, 241, 245, 0.1);
          line-height: 1.6;
        }
        
        .article-content pre code {
          background-color: transparent;
          padding: 0;
          border: none;
          font-size: 0.9375rem;
        }

        /* Horizontal Rules */
        .article-content hr {
          border: none;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(212, 175, 55, 0.3),
            transparent
          );
          margin: 3rem 0;
        }

        /* Images */
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2.5rem 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        /* Tables */
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2.5rem 0;
          font-size: 1rem;
        }
        
        .article-content th {
          background-color: rgba(212, 175, 55, 0.1);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #d4af37;
          border-bottom: 2px solid rgba(212, 175, 55, 0.3);
        }
        
        .article-content td {
          padding: 1rem;
          border-bottom: 1px solid rgba(232, 241, 245, 0.1);
        }
        
        .article-content tr:hover {
          background-color: rgba(232, 241, 245, 0.02);
        }

        /* Strong and Emphasis */
        .article-content strong {
          font-weight: 700;
          color: rgba(232, 241, 245, 0.95);
        }
        
        .article-content em {
          font-style: italic;
          color: rgba(232, 241, 245, 0.9);
        }

        /* Special formatting for technical content */
        .article-content .highlight {
          background: linear-gradient(
            to right,
            rgba(212, 175, 55, 0.15),
            transparent
          );
          padding: 1.5rem;
          border-left: 3px solid #cd7f32;
          border-radius: 4px;
          margin: 2rem 0;
        }

        /* Footnotes or asides */
        .article-content aside {
          font-size: 0.9375rem;
          color: rgba(232, 241, 245, 0.6);
          padding: 1.25rem;
          margin: 2rem 0;
          border: 1px solid rgba(232, 241, 245, 0.15);
          border-radius: 6px;
          background: rgba(10, 17, 40, 0.3);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .article-content h1 {
            font-size: 2rem;
            margin: 2rem 0 1rem;
          }
          
          .article-content h2 {
            font-size: 1.625rem;
            margin: 1.75rem 0 1rem;
          }
          
          .article-content h3 {
            font-size: 1.375rem;
          }

          .article-content blockquote {
            padding: 1.5rem 1.5rem 1.5rem 1.75rem;
            margin: 2rem 0;
          }

          .article-content pre {
            padding: 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData,
    },
  }
}