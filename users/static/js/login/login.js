$(document).ready(function(){
    console.log('Login JS')
    var Login = {
        Init: function(config) {
            this.config = config;
            this.BindEvents();
        },
        BindEvents: function() {
            let $this = this.config;

                $this.btn_login.on('click', this.Login);

        },
        Login: async () => {
            let $self = Login.config;
            $data = $self.form_login.serializeArray();
            console.log($data[0].value)

            $payload = {
                url : '/sample/',
                payload: $data
            }
            const $common = new Common($payload)
            $common.Sample()
            $common.ApiData()

            // $response = await fetch('http://localhost:8000/sample/')
            // $data = await $response.json()
            // console.log('Response: ' + $response)
            // console.log('data: ' + JSON.stringify($data))
            // console.log('link: ' + window.location.origin)
        }
    }

    Login.Init({
         btn_login          : $('#btn-login')
        ,form_login         : $('#form-login')
    })
})