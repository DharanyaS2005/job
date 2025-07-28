// lib/cors.js
import Cors from 'cors'

// Initialize CORS with your allowed origin
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: 'https://job-ebon.vercel.app', // your frontend link on vercel
  credentials: true,
})

export default cors
