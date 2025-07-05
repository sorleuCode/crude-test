
const  WHITELIST_DOMAINS = [
    "http://localhost:5173",
    "https://crude-client.vercel.app"
]

 const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(null, true)


  },

  optionsSuccessStatus: 200,

  credentials: true
}

module.exports =corsOptions