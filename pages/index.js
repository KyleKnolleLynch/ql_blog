import Head from 'next/head'
import { Layout, PostCard, SidebarWidget, Categories } from '../components'
import { getPosts } from '../services'

const Home = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>QL Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home-container grid grid-cols-1 gap-12 lg:grid-cols-12">
        <section className="posts-container col-span-1 rounded-t-lg lg:col-span-8 lg:rounded-none">
          {!posts ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.node.title} post={post.node} />
            ))
          )}
        </section>
        <section className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky">
            <SidebarWidget />
            <Categories />
          </div>
        </section>
      </div>
      <style jsx>{`
        .home-container {
          color: var(--clr-gray-800);
        }

        .posts-container {
          background-color: var(--clr-gray-100);
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: { posts },
  }
}

export default Home
