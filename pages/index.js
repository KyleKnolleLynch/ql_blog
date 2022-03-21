import Head from 'next/head'
import {
  Layout,
  PostCard,
  SidebarWidget,
  Categories,
  Skeleton,
} from '../components'
import { getPosts, getBackgroundImage } from '../services'
import FeaturedPosts from '../carousel/FeaturedPosts'

const Home = ({ posts, backgroundImage }) => {
  return (
    <Layout bgImg={backgroundImage[0].node.bgImg}>
      <Head>
        <title>QL Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FeaturedPosts />
      <div className='home-container grid grid-cols-1 gap-12 lg:grid-cols-12'>
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
          <div className='relative grid gap-y-10 lg:sticky lg:top-10'>
            <SidebarWidget />
            <Categories />
          </div>
        </section>
      </div>
      <style jsx>{`
        .home-container {
          color: var(--clr-gray-800);
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  const backgroundImage = await getBackgroundImage()
  const posts = (await getPosts()) || []

  return {
    props: { backgroundImage, posts },
  }
}

export default Home
