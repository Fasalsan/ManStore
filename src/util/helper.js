import axios from 'axios'
import { Config } from './config'

export default function request(url, method, data) {
    return axios(
        {
            url: Config.base_url + url,
            method: method,
            data: data,
            headers: {},
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
            return false;
        })
}
