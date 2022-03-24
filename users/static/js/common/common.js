class Common{
    constructor(data){
        this.data = data;
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
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRFToken': $data.payload.csrfmiddlewaretoken //para ma basa ni Django ang Token
            }; 
            
            $options = {method: $data.method_type, headers: $headers, body: $payload}

        let response = await fetch($url, $options);
        if (response.status >= 200 && response.status <= 204){

            let return_data = await response.json();
            let errorCode = return_data.errorCode;

            return return_data
        } else {
            console.log(`something wrong, the server code: ${response.status}`);
        } 
    }
}