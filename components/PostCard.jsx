const PostCard = ({ post }) => {
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.snippet}</p>
        </article>
    )
}
export default PostCard