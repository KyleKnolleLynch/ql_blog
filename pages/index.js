import Head from 'next/head'
import { PostCard, SidebarWidget, Categories } from '../components'

const posts = [
  { title: 'Post One', snippet: 'This is post number one' },
  { title: 'Post Two', snippet: 'This is post number two' },
]

const Home = () => {
  return (
    <div className="mb-8 px-2 pt-5 sm:container sm:mx-auto sm:px-10">
      <Head>
        <title>QL Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <section className="col-span-1 lg:col-span-8">
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
      </main>

      <footer className="mt-auto flex h-24 items-center justify-center border-t">
        <p>Footer</p>
      </footer>
    </div>
  )
}

export default Home
