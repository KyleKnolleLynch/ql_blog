import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

// GET ALL POSTS
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
            }
            createdAt
            slug
            title
            snippet
            featuredImage {
              url
              width
              height
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

// GET SINGLE POSTS
export const getPostDetails = async slug => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          avatar {
            url
          }
        }
        createdAt
        slug
        title
        snippet
        featuredImage {
          url
          width
          height
        }
        categories {
          name
          slug
        }
        body {
          raw
        }
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug })

  return result.post
}

// GET RECENT POSTS
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

// GET RELATED POSTS
export const getRelatedPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, { categories, slug })

  return result.posts
}

// GET CATEGORIES POSTS
export const getCategoriesPosts = async slug => {
  const query = gql`
    query GetCategoriesPosts($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
            }
            createdAt
            slug
            title
            snippet
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.postsConnection.edges
}

// GET FEATURED POSTS
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts() {
      posts(where: {featuredPost: true}) {
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

// GET CATEGORIES
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.categories
}

// SUBMIT COMMENTS
export const submitComment = async obj => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json()
}

// GET COMMENTS
export const getComments = async slug => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.comments
}
