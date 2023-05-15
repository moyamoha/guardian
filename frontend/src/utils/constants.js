const isDevMode = process.env.NODE_ENV === 'development'

export const BACKEND_BASE_URL = isDevMode ? 'http://localhost:5000' : 'https://vartija-backend.onrender.com'