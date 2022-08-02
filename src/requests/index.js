import Axios from 'axios'
import { getUser } from '../helpers'

const user = getUser()
export const axios = Axios.create({
    headers: {
        Authorization: `Bearer ${user?.token}`
    }
})