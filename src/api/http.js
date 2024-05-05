import axios from "axios"

export default class http {
    static post(endPont, payload) {
        return axios.post(`http://snake-and-ladder.test/api/${endPont}`, payload)
    }
}
