$(document).ready(function(){
    var Login = {
        Init: function(config) {
            this.config = config;
            this.BindEvents();
        },
        BindEvents: function() {
            let $this = this.config;

                $this.btn_login.on('click', this.Login);

            Login.OnPageLoad();
        },
        OnPageLoad: () => {
            toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			}); 
        },
        Login: async () => {
            let $self = Login.config,
                $clean_data = {},
                $full_url = window.location.href,
                $base_host  = $.trim($self.wrapper.attr('data-host')),
                $next = $full_url.replace($base_host, '');
                
            $.each($self.form_login.serializeArray(), function(){
                $clean_data[this.name] = this.value;
            });

            const sleep = m => new Promise(r => setTimeout(r, m))

            $clean_data['next'] = $next

            console.log($clean_data)

            $payload = {
                url : '/submit/',
                method_type: 'POST',
                payload: $clean_data
            }

            const $common = new Common($payload)
            $common.ApiData()
            .then(async data => {
                if(data.err_code == 1){
                    toast.fire({
                        icon: 'success',
                        title: 'Success!'
                    }) 
                    await sleep(800)
                    if(data.next == null) {
                        console.log($base_host + '/backoffice/')
                        window.location.replace($base_host + '/backoffice/');
                    } else{
                        console.log($base_host + data.next)
                        window.location.replace($base_host + data.next);
                    }
                } else if(data.err_code == 0){
                    toast.fire({
                        icon: 'warning',
                        title: ' ' + data.Result
                    }) 
                    console.log(data.Result)
                } else{
                    console.log('Unknown Error Occur')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    Login.Init({
         btn_login          : $('#btn-login')
        ,form_login         : $('#form-login')
        ,wrapper            : $('.wrapper')
    })
})