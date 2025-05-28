const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (request.method !== 'GET') {
    let decodedToken
    try {
      decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    } catch(error) {
      console.log(error)
      return response.status(401).json({ error: 'token invalid' })
    }

    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }

    request.user = await User.findById(decodedToken.id)
  }

  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}

