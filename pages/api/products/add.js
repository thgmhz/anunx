import nextConnect from 'next-connect'
import { post } from '../../../src/controllers/products'

const route = nextConnect()

route.post(post)

export default route

export const config = {
  api: {
    bodyParser: false
  }
}