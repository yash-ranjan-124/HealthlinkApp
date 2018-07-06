var loginLib = function(){
    return({
        init:function(){
            var device = commonLib.detectDevice();
            var isAndroid = device == "android" ? true : false;
            var isIOS = device == "ios" ? true : false;
            this.delegateFunctionalities();
            //var mainView = App.views.create('.view-main');

        },
        delegateFunctionalities:function(){
            var current = this;
            $$("#signin-btn").on("click",function(){
                console.log("triggred login");
                current.loginUser();
            });
        },
        validateFormData:function(formdata){
            console.log(formdata);
            var email = formdata[0].value;
            var pass = formdata[1].value;
            var type = formdata[2].value;
          
            if(!email || !commonLib.validateEmail(email) || email == ""){
                return false;
            }
            else if(!pass || pass == ""){
                return false;
            }
            else if(!type || type == ""){
                return false;
            }else{
                return true;
            }
  
        },
        loginUser:function(){
            //console.log(App);
            var loginFormData = $("#login-form").serializeArray();
            var isValid = this.validateFormData(loginFormData);
            if(isValid){
                $.ajax({
                    url:"/"+PROGRAM+"/login",
                    type:"POST",
                    dataType:"JSON",
                    data:loginFormData,
                    async:true,
                    beforeSend: function() {
                        App.dialog.preloader("Loading...!");
                     },
                    error:function(jqXHR, exception){
                        //callback(jqXHR.status,null);
                        console.log(jqXHR.status);
                        console.log(exception);
                    },
                    success:function(res){
                        console.log(res);
                        if(res.error == 0 && res.message == "success"){
                            App.dialog.close();
                            if(loginFormData[2].value == "Care Coach"){
                                window.location.href = "/"+PROGRAM+"/care_home";
                            }else{
                                window.location.href = "/"+PROGRAM+"/home";
                            }
                            
                        }else{
                            console.log(App);
                            App.dialog.close();
                            App.dialog.create({
                                title:"Error",
                                text:"Invalid Credentials!!",
                                buttons:[{text:"close"}],    
                                verticalButtons: true,
                        }).open();
                        }
                    }
                });
            }else{
                return false;
            }
        }
       
        
    });
}();



