



var HomeLib = function () {
    return ({
        init: function () {
            var device = commonLib.detectDevice();
            var isAndroid = device == "android" ? true : false;
            var isIOS = device == "ios" ? true : false;
            this.changeNavBarAsPerDevice(isIOS, isAndroid);
            let apptitle = $$("#appTitle").html();

            $$("#list-button").on("click", function () {
                $$("#home-content").css("display", "none");
                $$("#clienlist-content").css("display", "block");
                $$("#appTitle").html("Patients List")
            });
            $$("#client-link").on("click", function () {
                $$("#home-content").css("display", "none");
                $$("#clienlist-content").css("display", "block");
                $$("#appTitle").html("Patients List")
            });
            $$("#home-button").on("click", function () {
                $$("#clienlist-content").css("display", "none");
                $$("#home-content").css("display", "block");
                $$("#appTitle").html(apptitle)
            });
            $$("#home-link").on("click", function () {
                $$("#clienlist-content").css("display", "none");
                $$("#home-content").css("display", "block");
                $$("#appTitle").html(apptitle);
            });
            $$("#logout-link").on("click", function () {
                commonLib.deleteCookie('type');
                commonLib.deleteCookie('acc_tkn');
                console.log("mc");
                window.location.href = "/" + PROGRAM_NAME + "/login";
            });
        },
        changeNavBarAsPerDevice(isIOS, isAndroid) {
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
                    $$("#appTitle").addClass("sliding");

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
        }


    });

}();


