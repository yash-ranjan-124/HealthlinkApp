



var HomeLib = function () {
    return ({
        init: function () {
            list.fn.removeElements = function () {
                let args_arr = this.myArg;
                args_arr.forEach(element => {
                    $$("#" + element).css("display", "none");
                });

            };
            list.fn.showElements = function () {
                let args_arr = this.myArg;
                args_arr.forEach(element => {
                    $$("#" + element).css("display", "block");
                });

            };
            var device = commonLib.detectDevice();
            var isAndroid = device == "android" ? true : false;
            var isIOS = device == "ios" ? true : false;
            this.changeNavBarAsPerDevice(isIOS, isAndroid);
            var mainView = App.views.create('.view-main');
            console.log(App);
            App.smartSelect.create();
            this.bindEventsToElements();


        },
        bindEventsToElements: function () {
            var programName = $$("#appTitle").html();
            var current = this;

            /*------home page tile functionalities--------------------*/
            $$("#requestCoach-button").on("click", function () {
                list(["userHome-page", "program-page", "selectCoach-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html("Request Care Coach");
                list(["hireCoach-page"]).showElements();
            });
            $$("#aboutUs-button").on("click", function () {
                list(["userHome-page", "program-page", "selectCoach-page", "hireCoach-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html("About");
                list(["about-page"]).showElements();
            });
            $$("#prgms-button").on("click", function () {
                list(["userHome-page", "hireCoach-page", "selectCoach-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html("Our Programs");
                list(["program-page"]).showElements();
            });
            $$("#htip-button").on("click", function () {
                list(["userHome-page", "hireCoach-page", "selectCoach-page", "program-page", "about-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html("Tips");
                list(["htip-page"]).showElements();
            });
            $$("#askQ-button").on("click", function () {
                list(["userHome-page", "hireCoach-page", "selectCoach-page", "program-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html("Queries");
                list(["askQ-page"]).showElements();
            });
            $$("#contact-button").on("click", function () {
                list(["userHome-page", "hireCoach-page", "selectCoach-page", "program-page", "about-page", "htip-page", "askQ-page"]).removeElements();
                $("#appTitle").html("Contact Us");
                list(["contact-page"]).showElements();
            });

            /*----------------------------------------------------------*/


            /*------home page side link functionalities--------------------*/
            $$("#requestCoach-link").on("click", function () {
                list(["userHome-page", "program-page", "selectCoach-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html("Request Care Coach");
                list(["hireCoach-page"]).showElements();
            });

            $$("#home-link").on("click", function () {
                list(["hireCoach-page", "selectCoach-page", "program-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html(programName);
                list(["userHome-page"]).showElements();
            });
            $$("#logout-link").on("click", function () {
                commonLib.deleteCookie('type');
                commonLib.deleteCookie('acc_tkn');
                window.location.href = "/" + PROGRAM_NAME + "/login";
            });
            /*----------------------------------------------------------*/






            /*--------care coach page functionalities--------------*/
            $$("#backToHome-button").on("click", function () {
                list(["hireCoach-page", "selectCoach-page", "program-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html(programName);
                list(["userHome-page"]).showElements();
            });
            $$("#height").on("click", function () {
                $$("#alert-box").css("display", "none");
            });

            $$("#weight").on("click", function () {
                $$("#alert-box").css("display", "none");
            });

            $$("#conditions").on("click", function () {
                $$("#alert-box").css("display", "none");
            });
            $$("#FindtoSelectCoach-button").on("click", function () {
                current.findCoach();
            });
            $$("#selectToFindCoach-button").on("click", function () {
                list(["userHome-page", "selectCoach-page", "program-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                $("#appTitle").html("Request Care Coach");
                list(["hireCoach-page"]).showElements();
            });

            /*--------------------------------------------------------------*/

        },
        changeNavBarAsPerDevice: function (isIOS, isAndroid) {
            if (isAndroid) {
                // Change class
                console.log("android");
                $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
                // And move Navbar into Page
                $$('.view .navbar').prependTo('.view .page');
                $$("#appTitle").css('position', '');
                $$("#appTitle").css("left", " ");
                if ($$("#appTitle").hasClass('center')) {
                    $$("#appTitle").removeClass('center');
                    $$("#appTitle").removeClass('sliding');
                    $$("#appTitle").addClass('title');
                    $$("#appTit").addClass("sliding");

                }
            }
            if (isIOS) {
                console.log("ios");
                $$("#appTitle").css('position', 'absolute');
                $$("#appTitle").css("left", " 5rem");
                if ($$("#appTitle").hasClass('title')) {
                    $$("#appTitle").removeClass('title');
                    $$("#appTitle").removeClass('sliding');
                    $$("#appTitle").addClass('center');
                    $$("#appTitle").addClass("sliding");
                }
            }
        },
        validateFindCoachData: function (formData) {
            var floatPattern = /^-?\d+(?:[.,]\d*?)?$/;
            var intPattern = /\d/
            if (!formData['height'] || formData['height'] == "" || !floatPattern.test(formData['height']) || !intPattern.test(formData['height'])) {
                $$("#alert-box div").html("Invalid Height!!");
                $$("#alert-box").css("display", "block");
                return false;
            }
            else if (!formData['weight'] || formData['weight'] == "" || !floatPattern.test(formData['weight']) || !intPattern.test(formData['weight'])) {
                $$("#alert-box div").html("Invalid Weight!!");
                $$("#alert-box").css("display", "block");
                return false;
            }
            else if (!formData['conditions'] || formData['conditions'].length == 0) {
                $$("#alert-box div").html("No conditions Selected!!");
                $$("#alert-box").css("display", "block");
                return false;
            } else {
                return true;
            }


        },
        findCoach: function () {
            var formData = $("#findCoach-form").serializeArray();
            var mainFormData = {};
            mainFormData.height = formData[0].value;
            mainFormData.weight = formData[1].value;

            conditions = [];
            for (var i = 2; i <= formData.length - 1; i++) {
                conditions.push(formData[i].value);
            }
            mainFormData.conditions = conditions;
            var isValid = this.validateFindCoachData(mainFormData);
            if (isValid) {
                $.ajax({
                    url: "/" + PROGRAM_NAME + "/findCoach",
                    type: "POST",
                    dataType: "JSON",
                    data: mainFormData,
                    async: true,
                    beforeSend: function () {
                        App.dialog.preloader("Loading...!");
                    },
                    error: function (jxhr, exception) {
                        console.log(jxhr);
                        console.log(exception);

                    },
                    success: function (res) {
                        App.dialog.close();
                        if (!res.error && res.error != 1) {
                            // console.log(res);

                            list(["hireCoach-page", "program-page", "about-page", "htip-page", "askQ-page", "contact-page"]).removeElements();
                            $$("#appTitle").html("Book Care Coach");
                            list(["selectCoach-page"]).showElements();
                            $$("#coach-container li").remove(elem);
                            var elem = "";
                            for (key in res) {
                                elem += '<li class="accordion-item">';
                                elem += '<a href="#" class="item-link item-content">';
                                elem += '<div class="item-media"><i class="f7-icons">person</i></div>';
                                elem += '<div class="item-inner">';
                                elem += '<div class="item-title">';
                                elem += '<div class="item-header">Name</div>';
                                elem += '| ' + res[key].fname + " " + res[key].lname;
                                elem += '</div>';
                                elem += '<div class="item-after">Details</div>';
                                elem += '</div>';
                                elem += '</a>';
                                elem += '<div class="accordion-item-content">';
                                elem += '<div class="block">';
                                elem += '<div class="list no-hairlines">';
                                elem += '<h3 style="color:#ff0000">Speciality</h3>';
                                elem += '<ol>';
                                var specs = res[key].specialization.split(",");
                                for (var k in specs) {
                                    elem += '<li>';
                                    elem += specs[k];
                                    elem += '</li>';
                                }

                                elem += '</ol>';
                                elem += '<button class="button button-fill button-raise color-green" onclick="HomeLib.bookCoach(' + res[key]['coachId'] + ')" >Book</button>';
                                elem += '<div class="clbox"></div></div> </div></div></li>';
                            }
                            elem += '<li class="accordion-item clbox"></li>';

                            $$("#coach-container").append(elem);



                        } else {
                            App.dialog.create({
                                title: "Error",
                                text: "Unable to find coach!!",
                                buttons: [{ text: "close" }],
                                verticalButtons: true,
                            }).open();
                        }
                    }
                });

            } else {
                return false;
            }

        },
        bookCoach: function (id) {
            //console.log(id);
            $.ajax({
                url: "/" + PROGRAM_NAME + "/bookCoach",
                type: "POST",
                dataType: "JSON",
                data: {
                    "coachId": id
                },
                async: true,
                beforeSend: function () {
                    App.dialog.preloader("Booking..!!");
                },
                error: function (jxhr, exception) {
                    console.log(jxhr.status);
                    console.log(exception);
                },
                success: function (res) {
                    App.dialog.close();
                    if (res && res.error == 0) {
                        App.dialog.create({
                            title: "Success",
                            text: "Coach Booked Successfully!!",
                            buttons: [{ text: "close" }],
                            verticalButtons: true,
                        }).open();

                    } else {
                        App.dialog.create({
                            title: "Error",
                            text: res.message,
                            buttons: [{ text: "close" }],
                            verticalButtons: true,
                        }).open();

                    }

                }

            });
        }



    });

}();


