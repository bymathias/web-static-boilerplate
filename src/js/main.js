/*! main.js */

import add from './modules/add'

console.log('Env vars (APP_URL) =>', process.env.APP_URL)
console.log('Env vars (APP_API_URL) =>', process.env.APP_API_URL)
console.log('Environment =>', process.env.PRODUCTION ? 'production' : 'development')
console.log('Module (add) =>', add(3, 5))
