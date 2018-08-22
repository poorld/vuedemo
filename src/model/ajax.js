import axios from 'axios'

var sendAjax = {
    post(url,params){
        console.log("url="+url)
        console.log("params="+params)
        console.log(params)
        return axios({
            method: 'POST',
            url,
            data: params
        })
    },
    request(method,url,data){
        console.log(data)
        return axios({
            method,
            url,
            data,
        })
    }
}



export default sendAjax;