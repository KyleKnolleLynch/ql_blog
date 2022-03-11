import Head from 'next/head'
import { Layout, PostCard, SidebarWidget, Categories } from '../components'

const posts = [
  { title: 'Post One', snippet: 'This is post number one' },
  { title: 'Post Two', snippet: 'This is post number two' },
]

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>QL Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 text-gray-800">
        <section className="col-span-1 lg:col-span-8 bg-gray-100">
          {!posts ? (
            <p>Loading...</p>
          ) : (
            posts.map((post) => <PostCard key={post.title} post={post} />)
          )}
        </section>
        <section className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky">
            <SidebarWidget />
            <Categories />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Home
