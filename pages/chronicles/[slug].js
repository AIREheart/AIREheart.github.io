import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { format } from 'date-fns'

export default function Post({ postData }) {
  return (
    <Layout title={postData.title}>
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-gold">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 text-moonlight/60">
            <time dateTime={postData.date}>
              {format(new Date(postData.date), 'MMMM d, yyyy')}
            </time>
            {postData.tags && postData.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {postData.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-navy-light text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>
        
        <div 
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        
        <footer className="mt-16 pt-8 border-t border-gold/30">
          <a
            href="/chronicles"
            className="text-gold hover:text-bronze transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Chronicles
          </a>
        </footer>
      </article>
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