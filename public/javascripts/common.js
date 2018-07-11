
var commonLib = function () {
    return ({
        init: function () {
            var device = this.detectDevice();
            var isIOS = (device == "ios") ? true : false;
            var isAndroid = (device == "android") ? true : false;
            var list = function (arg) { // core constructor
                // ensure to use the `new` operator
                if (!(this instanceof list))
                    return new list(arg);
                // store an argument for this example
                this.myArg = arg;
                //..
            };

            // create `fn` alias to `prototype` property
            list.fn = list.prototype = {
                init: function () {/*...*/ }
                //...
            };
            window.list = list;
            console.log(isAndroid);
            TEMPLATE7.global = {
                android: isAndroid,
                ios: isIOS
            };

            var App = new FRAMEWORK7({
                // Enable Material theme for Android device only
                material: isAndroid ? true : false,
                // Enable Template7 pages
                template7Pages: true,
                routes: [
                    {
                        path: '/hirecoach/',
                        pageName: 'HireCoach',

                    }, {
                        path: '/about/',
                        pageName: 'about'
                    }
                ]
            });
            window.App = App;
            this.injectStyle(isIOS, isAndroid);

        },
        detectDevice() {
            if (FRAMEWORK7.prototype.device.android) {
                return "android";
            } else if (FRAMEWORK7.prototype.device.ios) {
                return "ios";
            } else {
                return "other";
            }
        },
        injectStyle: function (isIOS, isAndroid) {
            if (isAndroid) {
                console.log(isAndroid);
            } else if (isIOS) {
                $("#aboutUs-button").removeClass("bg-color-red");
                $("#aboutUs-button").addClass("ios-bg-red");

                $("#prgms-button").removeClass("bg-color-blue");
                $("#prgms-button").addClass("ios-bg-blue");

                $("#requestCoach-button").removeClass("bg-color-blue");
                $("#requestCoach-button").addClass("ios-bg-blue");

                $("#htip-button").removeClass("bg-color-red");
                $("#htip-button").addClass("ios-bg-red");

                $("#askQ-button").removeClass("bg-color-red");
                $("#askQ-button").addClass("ios-bg-red");

                $("#contact-button").removeClass("bg-color-blue");
                $("#contact-button").addClass("ios-bg-blue");


            } else {
                console.log("other");
            }

        },
        setCookie: function (cname, value, expiry) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expiry = "; expires=" + date.toUTCString();
            }
            document.cookie = cname + "=" + (value || "") + expiry + "; path=/";
        },
        deleteCookie: function (cname) {
            document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            console.log(document.cookie);

        },
        getCookie: function (cname) {
            var nameEQ = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        validateEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    });
}();