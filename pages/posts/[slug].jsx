import { useRouter } from 'next/router'
import { getPosts, getPostDetails, getBackgroundImage } from '../../services'
import { Meta, Layout, PostDetails, Categories, Author, SidebarWidget, Comments, CommentsForm, Skeleton } from '../../components'

const FullPost = ({ post, backgroundImage }) => {
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
            <Meta
                title={post.title}
                desc={post.snippet}
                keywords={post.categories.map(cat => cat.name).toString()}
            />
            <div className="posts-container grid grid-cols-1 gap-12 lg:grid-cols-12">
                <section className='col-span-1 lg:col-span-8'>
                    <PostDetails post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </section>
                <section className='col-span-1 lg:col-span-4'>
                    <div className="relative lg:sticky lg:top-10 grid gap-y-10">
                        <SidebarWidget
                            slug={post.slug}
                            categories={post.categories.map(cat => cat.slug)}
                        />
                        <Categories categories={post.categories.map(cat => cat)} />
                    </div>
                </section>
            </div>
            <style jsx>{`
        .posts-container {
          color: var(--clr-gray-800);
        }
      `}</style>
        </Layout>
    )
}

export default FullPost

export async function getStaticProps({ params }) {
    const backgroundImage = await getBackgroundImage()
    const post = (await getPostDetails(params.slug)) || []

    return {
        props: { post, backgroundImage }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true
    }
}
