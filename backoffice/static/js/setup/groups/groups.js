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
            $this.btn_close.on('click', {param:1}, this.CloseModal)
            $this.btn_save.on('click', {param: 1}, this.Save)

            Groups.OnPageLoad();
        },
        OnPageLoad: () => {
            var $self = Groups.config;
            
            toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            }); 

            $self.in_search.focus();
        },
        Search: async (e, data) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e
                $clean_data = {};
            
            switch($route){
                case 1:
                    $.each($self.form_search.serializeArray(), function(){
                        $clean_data[this.name] = this.value;
                    });

                    let $params = new URLSearchParams();

                    $params.append('SearchValue', $self.form_search.find('[name=in-search]').val().trim())

                    var $url = '/backoffice/group/search/?' + $params
                    
                    $payload = {
                        url : $url,
                        method_type: 'GET',
                        payload: $clean_data
                    }            

                    const $common = new Common($payload)
                    $common.ApiData()
                    .then(async data => {
                        Groups.Search(2, data.Data)
                    }).catch(err => {
                        toast.fire({
                            icon: 'danger',
                            title: `&nbsp; ${err}`
                        })
                    })
                break;
                case 2:
                    Groups.Clear(1)
                    if(data.length == 0){
                        toast.fire({
                            icon: 'warning',
                            title: `&nbsp; No Result Found`
                        })
                    }else{
                        data_details = (data.length == 1) ? ['Result', data.length] : ['Results', data.length];

                        toast.fire({
                            icon: 'success',
                            title: `&nbsp; ${data_details[1]} ${data_details[0]} Found`
                        })

                        $txt = ''
                        for(var i = 0; i < data.length; i++){
                            $status = (data[i]['ReferenceTableStatusID'] == '1') ? ['bg-success', '', 'checked', 'Active'] : ['bg-danger', 'disabled', '', 'Inactive']
                            $txt += `
                                        <tr id='${data[i]['GroupID']}'>
                                            <td>${data[i]['GroupName']}</td>
                                            <td>${data[i]['GroupCode']}</td>
                                            <td>
                                                <span class="badge ${$status[0]}">${ $status[3] }</span>
                                            </td>
                                            <td scope="row" data-label="ACTION" class="w-15">
                                                <label class="switch ">
                                                    <input type="checkbox" ${$status[2]} class="lbl-switch" data-statusid="${data[i]['ReferenceTableStatusID']}"  data-id="${data[i]['GroupID']}">
                                                    <span class="slider round"></span>
                                                </label>
                                                <button type='button' class="btn btn-edit p-0" ${$status[1]} data-charge-id="${data[i]['GroupID']}" data-group-name="${data[i]['GroupName']}">
                                                    <i class="fa fa-edit fa-lg"></i>
                                                </button> 														                                          
                                            </td>
                                        </tr>
                            `
                        }
                        $self.tbl_groups.append($txt)
                    }
                break;
            }
        },
        Save: (e, data) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e,
                $clean_data = {};

            switch($route){
                case 1:
                    $.each($self.modal_form_groups.serializeArray(), function(){
                        $clean_data[this.name] = this.value;
                    });

                    if($self.btn_save.attr('data-action') == 'new'){
                        $payload = {
                            url : '/backoffice/group/new/',
                            method_type: 'POST',
                            payload: $clean_data
                        }
    
                        const $common = new Common($payload)
                        $common.ApiData()
                        .then(async data => {
                            console.log(data['Result'])
                            if(data['Result'] == 0){
                                toast.fire({
                                    icon: 'warning',
                                    title: `&nbsp; ${data.ErrorMessage}`
                                })
                            }else{
                                Groups.Save(2, data)
                            }
                        }).catch(err => {
                            toast.fire({
                                icon: 'warning',
                                title: `&nbsp; ${err}`
                            })
                        })

                    }

                break;
                case 2:
                    toast.fire({
                        icon: 'success',
                        title: `&nbsp; successfully added`
                    })
                    console.log('test')
                    Groups.CloseModal(1)
                    console.log('test2')
                    $self.tbl_groups.empty()
                    console.log('test3')
                    $status = (data['Data']['ReferenceTableStatusID'] == '1') ? ['bg-success', '', 'checked', 'Active'] : ['bg-danger', 'disabled', '', 'Inactive']
                    $txt += `
                                <tr id='${data['Data']['GroupID']}'>
                                    <td>${data['Data']['GroupName']}</td>
                                    <td>${data['Data']['GroupCode']}</td>
                                    <td>
                                        <span class="badge ${$status[0]}">${ $status[3] }</span>
                                    </td>
                                    <td scope="row" data-label="ACTION" class="w-15">
                                        <label class="switch ">
                                            <input type="checkbox" ${$status[2]} class="lbl-switch" data-statusid="${data['Data']['ReferenceTableStatusID']}"  data-id="${data['Data']['GroupID']}">
                                            <span class="slider round"></span>
                                        </label>
                                        <button type='button' class="btn btn-edit p-0" ${$status[1]} data-charge-id="${data['Data']['GroupID']}" data-group-name="${data['Data']['GroupName']}">
                                            <i class="fa fa-edit fa-lg"></i>
                                        </button> 														                                          
                                    </td>
                                </tr>
                    `
                    $self.tbl_groups.append($txt)
                break;
            }
        },
        OpenModal: (e,data) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e;

            switch($route){
                case 1:
                    $self.modal_groups.modal('show')
                    $self.modal_groups.find('.modal-title > span').text('Enter New Group');
                    $self.btn_save.attr('data-action', 'new')
                break;
            }
        },
        CloseModal: (e) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e;
            
            switch($route){
                case 1:
                    $self.modal_form_groups[0].reset()
                    $self.modal_groups.modal('hide')
                    $self.btn_save.removeAttr('data-action')
                    console.log('Close Modal')
                break;
            }
        },
        Clear: (e) => {
            var $self = Groups.config,
                $route = (typeof(e) == 'object') ? e.data.param : e;
            
            switch($route){
                case 1:
                    $self.tbl_groups.empty()
                break;
            }
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
        btn_save                    : $('#btn-save'),
        btn_close                   : $('.btn-close'),

        in_search                   : $('#in-search'),

        form_search                 : $('#form-search'),
        tbl_groups                  : $('#tbl-groups'),
        modal_groups                : $('#modal-groups'),
        modal_form_groups           : $('#modal-form-groups'),
    })
})