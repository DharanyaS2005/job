// lib/cors.js
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: 'https://job-ebon.vercel.app',
  credentials: true,
})

export default cors
