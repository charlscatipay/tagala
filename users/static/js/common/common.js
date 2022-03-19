class Common{
    constructor(data){
        this.data = data;
    }
    Sample = () => {
        console.log('Yes its working from Common!')
        console.log(this.data)
    }
    URLOrigin = () => {
        return window.location.origin
    }
    ApiData = async () => {
        let $data = this.data,
            $options = {},
            $base_host  = this.URLOrigin(),
            $url = $base_host + $data.url,
            $payload = JSON.stringify($data.payload),
            $headers = {
                'Content-type': 'application/json; charset=UTF-8'
            };  
            $options = {method: 'POST', headers: $headers, body: $payload}

        console.log('Data from Module.js: ' + $data)
        console.log('Base HOST: ' + $base_host)
        console.log('URL: ' + $url)
        console.log('Payload from Module.js: ' + $payload)


        let response = await fetch($url, $options); //, $options
        if (response.status >= 200 && response.status <= 204){
            console.log('Server Connected')
        }
    }
}