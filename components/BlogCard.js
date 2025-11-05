
import Link from 'next/link'
import { format } from 'date-fns'

export default function BlogCard({ post }) {
  return (
    <Link href={`/chronicles/${post.id}`}>
      <div className="bg-navy/30 border border-moonlight/10 rounded-lg p-6 hover:border-gold/30 transition-all hover:transform hover:scale-105 h-full flex flex-col">
        <h2 className="text-2xl font-serif font-semibold mb-3 text-bronze">
          {post.title}
        </h2>
        
        <time className="text-sm text-moonlight/60 mb-4">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </time>
        
        {post.excerpt && (
          <p className="text-moonlight/80 mb-4 flex-grow">
            {post.excerpt}
          </p>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-navy-light text-sm rounded-full text-moonlight/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-4 text-gold hover:text-bronze transition-colors inline-flex items-center gap-2">
          Read more <span>→</span>
        </div>
      </div>
    </Link>
  )
}