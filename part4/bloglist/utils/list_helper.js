const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const dummy = {
    "likes": 0
  }
  return blogs.length === 0
    ? {}
    : blogs.reduce((max, blog) => {
      return max.likes > blog.likes
        ? max
        : blog
    }, dummy)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authorMap = new Map();

  blogs.forEach(blog => {
    if (!authorMap.has(blog.author)) {
      authorMap.set(blog.author, 1)
    }
    else {
      const count = authorMap.get(blog.author)
      authorMap.set(blog.author, count + 1)
    }
  })

  let maxAuthor = {
    "author": "",
    "blogs": 0
  }

  authorMap.forEach((value, key, map) => {
    if (value > maxAuthor.blogs) {
      maxAuthor.author = key
      maxAuthor.blogs = value
    }
  })

  return maxAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authorMap = new Map();

  blogs.forEach(blog => {
    if (!authorMap.has(blog.author)) {
      authorMap.set(blog.author, blog.likes)
    }
    else {
      const count = authorMap.get(blog.author)
      authorMap.set(blog.author, count + blog.likes)
    }
  })

  let maxAuthor = {
    "author": "",
    "likes": 0
  }

  authorMap.forEach((value, key, map) => {
    if (value > maxAuthor.likes) {
      maxAuthor.author = key
      maxAuthor.likes = value
    }
  })

  return maxAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}