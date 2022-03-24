$(document).ready(function(){
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
            let $self = Login.config,
                $clean_data = {};
                
            $.each($self.form_login.serializeArray(), function(){
                $clean_data[this.name] = this.value;
            });
            console.log($clean_data)

            $payload = {
                url : '/submit/',
                method_type: 'POST',
                payload: $clean_data
            }

            const $common = new Common($payload)
            $common.ApiData()
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    Login.Init({
         btn_login          : $('#btn-login')
        ,form_login         : $('#form-login')
    })
})