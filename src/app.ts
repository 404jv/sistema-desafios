import 'express-async-errors'
import express, { type NextFunction, type Request, type Response } from 'express'
import { routes } from './routes'
import { AppError } from './errors/AppError'

const app = express()
app.use(express.json())
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message
    })
  }
  // if (error instanceof z.ZodError) {
  //   return response.status(400).json({
  //     message: error.issues[0].message
  //   })
  // }
  return response.status(500).json({
    error: 'error',
    message: `Internal server error: ${error.message}`
  })
}
)

export { app }
