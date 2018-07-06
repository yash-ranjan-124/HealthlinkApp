



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
            $$("#HomeToHireCoach-button").on("click", function () {

                list(["userhome-page", "listProgram-page", "heartCare-page", "arthritisCare-page", "programToHome", "TAtoAC", "AAtoAC", "LAtoAC"]).removeElements();
                $$("#appTitle").html("Find Coach");
                list(["hireCoach-page"]).showElements();

            });
            $$("#findCoach-link").on("click", function () {

                list(["userhome-page", "selectCoach-page", "listProgram-page", "heartCare-page", "arthritisCare-page", "programToHome", "TAtoAC", "AAtoAC", "LAtoAC"]).removeElements();
                $$("#appTitle").html("Find Coach");
                list(["hireCoach-page"]).showElements();

            });
            $$("#homePage-link").on("click", function () {

                list(["hireCoach-page", "selectCoach-page", "listProgram-page", "heartCare-page", "arthritisCare-page", "programToHome", "TAtoAC", "AAtoAC", "LAtoAC"]).removeElements();
                $$("#appTitle").html(programName);
                list(["userhome-page"]).showElements();


            });
            $$("#listProgram-button").on('click', function () {

                list(["hireCoach-page", "selectCoach-page", "userhome-page", "heartCare-page", "arthritisCare-page", "TAtoAC", "AAtoAC", "LAtoAC"]).removeElements();
                $$("#appTitle").html("Arthritis Care");
                list(["listProgram-page", "programToHome"]).showElements();
            });

            $$("#backToHome-button").on("click", function () {

                list(["hireCoach-page", "selectCoach-page", "listProgram-page", "heartCare-page", "arthritisCare-page", "programToHome", "TAtoAC", "AAtoAC", "LAtoAC"]).removeElements();
                $$("#appTitle").html(programName);
                list(["userhome-page"]).showElements();
            });
            $$("#selectToFindCoach-button").on("click", function () {
                list(["userhome-page", "selectCoach-page", "heartCare-page", "arthritisCare-page", "listProgram-page", "programToHome", "TAtoAC", "AAtoAC", "LAtoAC"]).removeElements();
                $$("#appTitle").html("Find Coach");
                list(["hireCoach-page"]).showElements();
            });




            $$("#aboutArthritis-button").on("click", function () {
                list(["userhome-page", "selectCoach-page", "arthritisCare-page", "listProgram-page", "hireCoach-page", "heartCare-page", "treatArthritis-page", "livingArthritis-page", "TAtoAC", "programToHome", "LAtoAC"]).removeElements();

                $$("#appTitle").html("About Arthritis");
                list(["aboutArthritis-page", "AAtoAC"]).showElements();


            });
            $$("#treatArthritis-button").on("click", function () {
                list(["userhome-page", "selectCoach-page", "arthritisCare-page", "listProgram-page", "hireCoach-page", "heartCare-page", "aboutArthritis-page", "livingArthritis-page", "AAtoAC", "programToHome", "LAtoAC"]).removeElements();

                $$("#appTitle").html("Treatments & Doctor Partnership");
                list(["treatArthritis-page", "TAtoAC"]).showElements();


            });
            $$("#livingArthritis-button").on("click", function () {
                list(["userhome-page", "selectCoach-page", "arthritisCare-page", "listProgram-page", "hireCoach-page", "heartCare-page", "aboutArthritis-page", "treatArthritis-page", "AAtoAC", "programToHome", "TAtoAC"]).removeElements();

                $$("#appTitle").html("Living with Arthritis");
                list(["livingArthritis-page", "LAtoAC"]).showElements();


            });


            $$("#programToHome").on("click", function () {
                list(["selectCoach-page", "arthritisCare-page", "listProgram-page", "hireCoach-page", "heartCare-page", "aboutArthritis-page", "treatArthritis-page", "AAtoAC", "programToHome", "TAtoAC", "LAtoAC"]).removeElements();

                $$("#appTitle").html("Living with Arthritis");
                list(["userhome-page"]).showElements();
            });
            $$("#AAtoAC").on("click", function () {
                list(["userhome-page", "selectCoach-page", "arthritisCare-page", "listProgram-page", "hireCoach-page", "heartCare-page", "aboutArthritis-page", "treatArthritis-page", "AAtoAC", "TAtoAC", "LAtoAC"]).removeElements();

                $$("#appTitle").html("Living with Arthritis");
                list(["listProgram-page", "programToHome"]).showElements();
            });
            $$("#TAtoAC").on("click", function () {
                list(["userhome-page", "selectCoach-page", "arthritisCare-page", "listProgram-page", "hireCoach-page", "heartCare-page", "aboutArthritis-page", "treatArthritis-page", "AAtoAC", "TAtoAC", "LAtoAC"]).removeElements();

                $$("#appTitle").html("Living with Arthritis");
                list(["listProgram-page", "programToHome"]).showElements();

            });
            $$("#LAtoAC").on("click", function () {
                list(["userhome-page", "selectCoach-page", "arthritisCare-page", "listProgram-page", "hireCoach-page", "heartCare-page", "aboutArthritis-page", "treatArthritis-page", "AAtoAC", "TAtoAC", "LAtoAC"]).removeElements();

                $$("#appTitle").html("Living with Arthritis");
                list(["listProgram-page", "programToHome"]).showElements();

            });

            $$("#logout-link").on("click", function () {
                commonLib.deleteCookie('type');
                commonLib.deleteCookie('acc_tkn');
                window.location.href = "/" + PROGRAM_NAME + "/login";
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
                            $$("#userhome-page").css("display", "none");
                            $$("#hireCoach-page").css("display", "none");
                            $$("#appTitle").html("Book Care Coach");
                            $$("#selectCoach-page").css("display", "block");
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


