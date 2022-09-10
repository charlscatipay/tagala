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

            if($data.method_type == 'GET'){ // importante ni kay kung mag get ka, dapat wala na shay body
                $options = { method: $data.method_type, headers: $headers};
            }else{
                $options = { method: $data.method_type, headers: $headers, body: $payload };
            }

        const sleep = m => new Promise(r => setTimeout(r, m))

        $('body').prepend(`
            <div id="loading" class="d-flex align-items-center justify-content-center" style="z-index: 3000 !important;">
                <img width="80" src="${$base_host + '/static/resource/gif/loading-tagala2.gif'}" alt="loading-tagala">
            </div>
        `)

        let response = await fetch($url, $options);
        await sleep(800)
        
        $('#loading').remove();
        
        if (response.status >= 200 && response.status <= 204){

            let return_data = await response.json();
            let errorCode = return_data.errorCode;

            return return_data
        } else {
            console.log(`something wrong, the server code: ${response.status}`);
        } 
    }
}