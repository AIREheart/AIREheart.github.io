import Layout from '../../components/Layout'
import BlogCard from '../../components/BlogCard'
import { getSortedPostsData } from '../../lib/posts'
import { useState } from 'react'

export default function Chronicles({ allPostsData }) {
  const [selectedTag, setSelectedTag] = useState(null)
  
  // Get all unique tags
  const allTags = [...new Set(allPostsData.flatMap(post => post.tags || []))]
  
  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? allPostsData.filter(post => post.tags?.includes(selectedTag))
    : allPostsData

  return (
    <Layout title="Chronicles">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-6xl font-serif font-bold mb-4 text-gold">Chronicles</h1>
        <p className="text-xl text-moonlight/70 mb-12">
          Thoughts on the journey from bench to bytes
        </p>
        
        {allTags.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedTag === null
                  ? 'bg-gold text-midnight'
                  : 'bg-navy-light text-moonlight/70 hover:bg-navy-light/80'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedTag === tag
                    ? 'bg-gold text-midnight'
                    : 'bg-navy-light text-moonlight/70 hover:bg-navy-light/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <p className="text-center text-moonlight/50 text-lg py-12">
            No posts found with this tag.
          </p>
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
