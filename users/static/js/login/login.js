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
        Login: () => {
            let $self = Login.config;
            $data = $self.form_login.serializeArray();
            $cleaned_data = $.each($data)
            console.log($data)
        }
    }

    Login.Init({
         btn_login          : $('#btn-login')
        ,form_login         : $('#form-login')
    })
})