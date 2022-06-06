const headersMiddleware = (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, OPTIONS, DELETE'
  )
  next()
}

module.exports = headersMiddleware;