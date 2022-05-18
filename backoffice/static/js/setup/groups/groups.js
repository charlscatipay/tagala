$(document).ready(function(){
    var Groups = {
        Init: function(config){
            this.config = config;
            this.BindEvents();
        },
        BindEvents: function(){
            var $this = this.config;

            $this.btn_search.on('click', {param:1}, this.Search)
            $this.btn_new.on('click', {param:1}, this.OpenModal)
            $this.btn_clear.on('click', {param:1}, this.Clear)
        },
        Search: async (e, data) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e
                $data = {};
            
            switch($route){
                case 1:
                    $data['SearchValue'] = $self.form_search.find('[name=in-search]').val()
                    $data['csrfmiddlewaretoken'] = $self.form_search.find('[name=csrfmiddlewaretoken]').val()

                    let $params = new URLSearchParams();

                    $params.append('SearchValue', $self.form_search.find('[name=in-search]').val().trim())
                    
                    $payload = {
                        url : '/backoffice/group/search/?' + $params,
                        method_type: 'GET',
                        payload: $data
                    }            

                    const $common = new Common($payload)
                    $common.ApiData()
                    .then(async data => {
                        console.log(data)
                    }).catch(err => {
                        console.log(err)
                    })
                    // Groups.CallAjax('/backoffice/get/search/', $data, 1, 'GET')
                break;
                case 2:
                    console.log(data)
                break;
            }
        },
        OpenModal: (e,data) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e;
            console.log('Open Modal')
        },
        Clear: (e,data) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e;
            console.log('Clear')
        },
        CallAjax: function(url, data, route, method_type){
            var $self       = Groups.config, timer, data_object = {},
                $base_host  = $.trim($self.content_wrapper.attr('data-host')),
                $url        =  $base_host + url;
            console.log($url)
            $.ajax({
                type: method_type,
                url: $url,
                data: data,
                dataType:'json',
                beforeSend: function(){
                    timer && clearTimeout(timer);
                    timer = setTimeout(function()
                    {
                        $("body").addClass("loading"); 
                    },
                    1000);                    
                    //DISABLE BUTTON
                },
                complete: function(){
                    clearTimeout(timer);
                    $("body").removeClass("loading"); 
                    //ENABLE BUTTON                        
                },                
                success: function(evt){ 
                    if(evt){
                        switch(route){
                            case 1: Groups.Search(2, evt); break; 
                        }    
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log('error: ' + textStatus + ': ' + errorThrown);
                }
            }); 
        }//end sa callajax 
    }

    Groups.Init({
        content_wrapper             : $('.content-wrapper'),
        btn_search                  : $('#btn-search'),
        btn_new                     : $('#btn-new'),
        btn_clear                   : $('#btn-clear'),

        form_search                 : $('#form-search')
    })
})