$(document).ready(function(){

    var Register = {
        Init: function(config) {
            this.config = config
            this.BindEvents();
        },
        BindEvents: function() {
            let $this = this.config;

            $this.btn_save.on('click', this.Save)

            Register.OnPageLoad();
        },
        OnPageLoad: () => {
            toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			}); 
        },
        Save: (e) => {
            //let $route  = (typeof e === 'object') ? e.data.param : e;
            let $self = Register.config,
                $clean_data = {},
                $base_host  = $.trim($self.wrapper.attr('data-host'));

            $.each($self.form_register.serializeArray(), function(){
                if(this.value == ''){
                    $required = $self.form_register.find(`[name="${this.name}"]`)
                    iziToast.warning({
                        title: '',
                        message: `Fill out the required fields`,
                        position:'topRight',
                        closeOnClick: true,
                        timeout: 2500,
                    })

                    $required.focus()
                    $clean_data = {}
                    return false;

                } else{
                    $clean_data[this.name] = this.value;
                }
            });

            var length_of_object = Object.keys($clean_data).length

            if (length_of_object != 0){
                if ($clean_data.password1 == $clean_data.password2){
                    
                    $payload = {
                        url: '/save/',
                        method_type: 'POST',
                        payload: $clean_data
                    }

                    console.log($clean_data)
                    
                    const $common = new Common($payload);
                    $common.ApiData()
                    .then(data => {
                        console.log(data)
                    
                        if (data.err_code == 0){
                            toast.fire({
                                icon: 'warning',
                                title: ' ' + data.result
                            }) 
                        } else{
                            toast.fire({
                                icon: 'success',
                                title: ' ' + data.result
                            }) 
                            iziToast.show({
                                theme: 'light',
                                icon: 'icon-person',
                                title: ``,
                                message: 'You will be redirected to our login page',
                                position: 'center',
                                progressBarColor: 'rgb(255, 154, 0)',
                                zindex: 1051,
                                timeout: 5000,
                                close: false,
                                overlay: true,
                                drag: false,
                                displayMode: 'once',
                                buttons: [
                                    [`<button>Ok</button>`, function (instance, toast) {
                                        window.location.replace($base_host + '/');
                                    }, true],
                                    ],
                                    onOpening: function(instance, toast){
                                    },
                                    onClosing: function(instance, toast, closedBy){ 
                                        window.location.replace($base_host + '/');
                                    }
                            }); 
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

                } else{
                    toast.fire({
                        icon: 'warning',
                        title: ' Password does not match'
                    }) 
                }
            }

        }
    }

    Register.Init({
         btn_save           : $('#btn-save')
        ,form_register      : $('#form-register')
        ,wrapper            : $('.wrapper')
    })
})