import { useState } from 'react'
import {
  Meta,
  Layout,
  PostCard,
  SidebarWidget,
  Categories,
  Skeleton,
} from '../components'
import { getPosts, getBackgroundImage, getCategories } from '../services'
import FeaturedPosts from '../carousel/FeaturedPosts'

const Home = ({ posts, backgroundImage, categories }) => {
  const [visible, setVisible] = useState(4)
  const [displayedPosts, setDisplayedPosts] = useState(posts)

  const showMorePosts = () => {
    visible < posts.length && setVisible(prev => prev + 4)
  }

  // GET KEYWORDS FROM ALL BLOG CATEGORIES FOR META KEYWORDS
  const keywords = categories.map(cat => cat.name).toString()
  
  return (
    <Layout bgImg={backgroundImage[0].node.bgImg}>
      <Meta
        title='QL Blog | Home'
        desc='Blog website about technology, web development, and other personal interests'
        keywords={`blog, tech, web development, programming, ${keywords}`}
      />
      <FeaturedPosts />
      <div className='home-container grid grid-cols-1 gap-12 lg:grid-cols-12'>
        <section className='col-span-1 lg:col-span-8'>
          {!displayedPosts ? (
            <Skeleton />
          ) : (
            displayedPosts
              .slice(0, visible)
              .map(post => <PostCard key={post.node.title} post={post.node} />)
          )}
          {visible < displayedPosts.length && (
            <button
              type='button'
              onClick={showMorePosts}
              className='showMoreBtn mb-6 w-full rounded-lg py-2 font-semibold text-gray-100 lg:py-3 lg:text-lg'
            >
              Show More
            </button>
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
        .showMoreBtn {
          background-color: var(--clr-primary);
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  const backgroundImage = await getBackgroundImage()
  const posts = (await getPosts()) || []
  const categories = await getCategories()

  return {
    props: { backgroundImage, posts, categories },
  }
}

export default Home
