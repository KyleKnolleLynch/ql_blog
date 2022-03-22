import { useRouter } from 'next/router'
import { Layout, PostCard, Categories, Skeleton } from '../../components'
import { getBackgroundImage, getCategories, getCategoriesPosts } from '../../services'

const PostsCategories = ({ posts, backgroundImage }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <Skeleton />
      </Layout>
    )
  }

  return (
    <Layout bgImg={backgroundImage[0].node.bgImg}>
      <div className='postsCategories-container grid grid-cols-1 gap-12 lg:grid-cols-12'>
        <section className='col-span-1 lg:col-span-8'>
          {!posts ? (
            <Skeleton />
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
  const backgroundImage = await getBackgroundImage()
  const posts = await getCategoriesPosts(params.slug)

  return {
    props: { posts, backgroundImage },
  }
}

export async function getStaticPaths() {
  const categories = await getCategories()

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
