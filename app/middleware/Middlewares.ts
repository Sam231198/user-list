import express from 'express'
import cors from 'cors'

const middleware = express()

/**
 * Configrurando a chamada dos middleware
 */
middleware.use(cors())
middleware.use(express.json())

export default middleware