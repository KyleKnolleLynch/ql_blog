import { useRouter } from 'next/router'
import { Layout, PostCard, Categories } from '../../components'
import { getCategories, getCategoriesPosts } from '../../services'

const PostsCategories = ({ posts }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <Layout>
      <div className='postsCategories-container grid grid-cols-1 gap-12 lg:grid-cols-12'>
        <section className='col-span-1 lg:col-span-8'>
          {!posts ? (
            <p>Loading...</p>
          ) : (
            posts.map(post => (
              <PostCard key={post.node.title} post={post.node} />
            ))
          )}
        </section>
        <section className='col-span-1 lg:col-span-4'>
          <div className='relative top-0 grid gap-y-10 lg:sticky'>
            <Categories />
          </div>
        </section>
      </div>
      <style jsx>{`
        .postsCategories-container {
          color: var(--clr-gray-800);
        }
      `}</style>
    </Layout>
  )
}

export default PostsCategories

export async function getStaticProps({ params }) {
  const posts = await getCategoriesPosts(params.slug)

  return {
    props: { posts },
  }
}

export async function getStaticPaths() {
  const categories = await getCategories()

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
