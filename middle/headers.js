const NO_CACHE_HEADERS = {
  'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
  pragma: 'no-cache',
}

module.exports = function (req, res, next) {
  const hostname = req.hostname
  const url = req.url

  res.set(NO_CACHE_HEADERS)
  console.log('[HEADER]url:', url, 'hostname:', hostname)
  return next()
}
