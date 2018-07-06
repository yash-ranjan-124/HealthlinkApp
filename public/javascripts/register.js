var registerLib = function(){
    return({
        init:function(){
            var device = commonLib.detectDevice();
            var isAndroid = device == "android" ? true : false;
            var isIOS = device == "ios" ? true : false;
            var current = this;
            $$("#reg_button").on("click",function(){
                current.registerUser();
            });
            $$("#type").on("change paste keyup", function() {
                console.log("changed");
                if($("#type").val() == "Care Coach"){
                    $$("#spec_li").css("display","block");
                }else{
                    $$("#spec_li").css("display","none");
                }
             });
             $$("#toLoginPage-btn").on('click',function(){
                window.location.href = "/"+PROGRAM_NAME+"/login";
             });
           
        },
        validateFormData:function(formData){
         
            var firstname = formData[0]['value'];
            var lastname = formData[1]['value'];
            var email = formData[2]['value'];
            var pass = formData[3]['value'];
            var cpass = formData[4]['value'];
            var mobile = formData[5]['value'];
            var type = formData[6]['value'];
            var name_regex= /^[a-zA-Z]*$/;
            var email_regex=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            var mobile_regex=/^(\+\d{1,3}[- ]?)?\d{10}$/;
            
            console.log(email_regex.test(email_regex));
            if(!firstname || firstname == "" || !name_regex.test(firstname)){
                App.dialog.create({
                    title:"error",
                    text:"Invalid Firstname!!",
                    buttons:[{text:"close"}],
                    verticalButtons: true
                }).open();
                return false;
            }
            else if(!lastname || lastname == "" || !name_regex.test(lastname)){
                App.dialog.create({
                    title:"error",
                    text:"Invalid Lastname!!",
                    buttons:[{text:"close"}],
                    verticalButtons: true
                }).open();
                return false;
            }
            else if(!email || email == "" || !email_regex.test(email)){
                App.dialog.create({
                    title:"error",
                    text:"Invalid email!!",
                    buttons:[{text:"close"}],
                    verticalButtons: true
                }).open();
                return false;
            }
            else if(!pass || !cpass || cpass!=pass || cpass == "" || pass == ""){
                App.dialog.create({
                    title:"error",
                    text:"Passwords not matching!!!!",
                    buttons:[{text:"close"}],
                    verticalButtons: true
                }).open();
                return false;
            }
            else if(!mobile || !mobile_regex.test(mobile)){
                App.dialog.create({
                    title:"error",
                    text:"Invalid mobile number!!!!",
                    buttons:[{text:"close"}],
                    verticalButtons: true
                }).open();
                return false;
            }
            
            else if(!type){
                App.dialog.create({
                    title:"error",
                    text:"Invalid Type!!",
                    buttons:[{text:"close"}],
                    verticalButtons: true
                }).open();
                return false;
            }else{
                return true;
            }
            
        },
        registerUser:function(){
            
            var formData = $("#register_form").serializeArray();
            var valid = this.validateFormData(formData);
            console.log(valid);
            if(valid){
                $.ajax({
                    url:"/"+PROGRAM_NAME+"/register",
                    type:"POST",
                    dataType:"JSON",
                    async:true,
                    data:formData,
                    beforeSend:function(){
                        App.dialog.preloader("Registering...!!");
                    },
                    error:function(jxhr,exception){
                        console.log(jxhr.status);
                        console.log(exception);
                    },
                    success:function(res){
                        App.dialog.close();
                        if(res && res.error == 1){
                            App.dialog.create({
                                title:"Success",
                                text:res.message,
                                buttons:[{
                                    text:"close"
                                }],
                                verticalButtons:true
                            }).open();
                        }else{
                            App.dialog.create({
                                title:"Success",
                                text:"User Registered Successfully!!",
                                buttons:[{
                                    text:"close"
                                }],
                                verticalButtons:true
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