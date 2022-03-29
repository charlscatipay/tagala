$(document).ready(function(){
    var Base = {
        Init: function(config) {
            this.config = config
            this.BindEvents();
        },
        BindEvents: function() {
            let $this = this.config;

                $this.btn_logout.on('click', this.Logout);
        },
        Logout: () => {
            let $self = Base.config,
                $clean_data = {},
                $base_host  = $.trim($self.wrapper.attr('data-host'));
            console.log('LOGOUT')    
            $.each($self.form_logout.serializeArray(), function(){
                $clean_data[this.name] = this.value;
            });

            $payload = {
                url: '/logout/',
                method_type: 'POST',
                payload: $clean_data
            }

            const $common = new Common($payload)
            $common.ApiData()
            .then(data => {
                console.log(data)
                window.location.replace($base_host + '/');
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    Base.Init({
         btn_logout     : $('#btn-logout')
        ,form_logout    : $('#form-logout')
        ,wrapper        : $('.wrapper')
    })

})