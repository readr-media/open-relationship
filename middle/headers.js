const { app } = require('../configs/config')

const NO_CACHE_HEADERS = {
  'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
  pragma: 'no-cache',
}

const MAX_AGE = 'public, max-age=600'

module.exports = function (req, res, next) {
  if (app.enableCacheControl) {
    res.set('cache-control', MAX_AGE)
  } else {
    res.set(NO_CACHE_HEADERS)
  }
  return next()
}
