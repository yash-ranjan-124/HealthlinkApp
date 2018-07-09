let express = require('express');
let router = express.Router();
let jwt = require("jwt-simple");
let appFunction = require('../libs/appFunctionLib');
let JWT_SECRET = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');
/* GET home page. */
router.get('/program2/home', async (req, res, next) => {

  let program = "program2";
  let data = {};
  console.log(req.cookies['type']);
  if (req.cookies['acc_tkn'] && req.cookies['acc_tkn'] != "" && req.cookies['type'] && req.cookies['type'] == "patient") {
    data.title = "Home";
    data.program = program;
    let token_data = jwt.decode(req.cookies['acc_tkn'], JWT_SECRET);
    let userData = await appFunction.getUserDataById(token_data.id);
    data.user = userData[0];
    let conditions_data = await appFunction.getAllConditions();
    data.allConditions = conditions_data;
    let userConditions = await appFunction.getUserConditions(token_data.id);
    data.user.conditions = userConditions;
    data.theme = "color-theme-blue";
    data.appname = "Care Coach Assistance";

    res.render("user_home", data);

  } else {
    res.redirect("/" + program + "/login");
  }

});



router.post("/program2/findCoach", async (req, res, next) => {
  let postData = req.body;
  let coachData = await appFunction.getCoach(postData['conditions[]']);
  if (coachData) {
    res.send(coachData);

  } else {
    res.json({
      error: 1,
      message: "unable to fetch results"
    });
  }

});

router.post("/program2/bookCoach", async (req, res, next) => {
  let postData = req.body;
  let jwt_data = jwt.decode(req.cookies['acc_tkn'], JWT_SECRET);
  let booking_response = await appFunction.bookCoach(jwt_data['id'], postData["coachId"]);
  if (booking_response) {
    if (booking_response && booking_response.error == 1 && booking_response.message != "Care Coach Allready Booked!!") {
      let email_response = await appFunction.sendEmail("yranjan@in.imshealth.com");
      booking_response['email_response'] = email_response;
    }

    res.send(booking_response);
  } else {
    res.json({
      error: 0,
      message: "unable to book"
    });
  }

});


router.get('/program2/care_home', async (req, res, next) => {
  //let program = req.params.program;
  let data = {};
  data.title = "Home";
  data.program = "program2";
  //console.log(req.cookies['acc_tkn']);
  if (req.cookies['acc_tkn'] && req.cookies['acc_tkn'] != "" && req.cookies['type'] && req.cookies['type'] == "Care Coach") {
    let jwt_data = jwt.decode(req.cookies['acc_tkn'], JWT_SECRET);

    let coachData = await appFunction.getCoachData(jwt_data['id']);
    data.coach = coachData[0];
    let client_data = await appFunction.getClient(jwt_data['id']);
    data.clients = client_data;
    data.theme = "color-theme-red";
    data.appname = "Care Coach Assistance";
    res.render("carecoach_home", data);

  } else {
    res.redirect("/program2/login");
  }



});

router.all("/program2/register", async (req, res, next) => {
  let program_name = req.params.program;
  if (req.method == "POST") {
    let postData = req.body;

    let response = await appFunction.register(postData);
    console.log(response);
    res.send(response);

  }
  else {
    let data = {};
    data.title = "Registration";
    data.program_name = program_name;
    res.render("register", data);

  }
});
router.post("/genToken", async (req, res) => {
  let data = req.body;
  let token = jwt.encode(data, JWT_SECRET2);
  res.json({ token: token });
});


router.get("/program2/registerUser", async (req, res, next) => {
  let program = "program2";
  let data = {};
  data.fname = req.query['fname'];
  data.lname = req.query['lname'];
  data.email = req.query['email'];
  data.mobile = (req.query["mobile"]) ? req.query["mobile"] : 0;
  data.conditions = req.query["conditions"];
  data.program = program;
  let resp_data = {};
  resp_data.program = program;
  resp_data['title'] = "Register User";
  let name_regex = /^[a-zA-Z]*$/;
  let email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let mobile_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  try {
    if (data) {
      if (!data.fname || !name_regex.test(data.fname)) {
        resp_data['message'] = "Undefined or invalid firstname";
        resp_data['error'] = 1;
        res.render("alert", resp_data);
        return false;
      }
      else if (!data.lname || !name_regex.test(data.lname)) {
        resp_data['message'] = "Undefined or invalid lastname";
        resp_data['error'] = 1;
        res.render("alert", resp_data);
        return false;
      }
      else if (!data.email || !email_regex.test(data.email)) {
        resp_data['message'] = "Undefined or invalid email";
        resp_data['error'] = 1;
        res.render("alert", resp_data);
        return false;
      }
      else if (!data.conditions) {
        resp_data['message'] = "Undefined conditions";
        resp_data['error'] = 1;
        res.render("alert", resp_data);
        return false;
      }
      else {
        data.type = "patient";
        data.pass = "ims@123";
        let response = await appFunction.register(data);
        if (response.error == 0) {
          response.message = "User successfully registered!!";
          response.program = program;
          response.title = "Register Users";
          await appFunction.ForceLogin(data.email, res);
          let email_response = await appFunction.sendEmail("yranjan@in.imshealth.com");
          console.log(email_response);
          response.error = 0;
          res.render("alert", response);
        } else {
          await appFunction.ForceLogin(data.email, res);
          res.redirect("/" + program + "/home");
        }


      }
    } else {

      resp_data['message'] = "Undefined or invalid firstname";
      resp_data['error'] = 1;
      res.json(resp_data);
    }


  } catch (err) {
    console.log(err);
  }


});

router.all("/program2/login", async (req, res, next) => {
  let program_name = "program2";
  if (req.method == "POST") {
    let postData = req.body;

    let userData = await appFunction.getUserData(postData);
    if (userData.length != 0 && userData != "") {

      let token = (postData.user_type == "Care Coach") ? jwt.encode({ id: userData[0]['coachId'] }, JWT_SECRET) :
        jwt.encode({ id: userData[0]['userId'] }, JWT_SECRET);
      console.log(token);
      res.cookie("type", postData.user_type, { maxAge: new Date(Date.now() + 900000), path: "/" });
      res.cookie("acc_tkn", token, { maxAge: new Date(Date.now() + 900000), path: "/" });
      res.json({ error: 0, message: "success" });
    } else {
      res.json({ error: 1, message: "invalid" });
    }


  } else {
    if (req.cookies['acc_tkn'] && req.cookies['acc_tkn'] != "" && req.cookies['type'] && req.cookies['type'] == "patient") {
      res.redirect("/" + program_name + "/home");
    } else if (req.cookies['acc_tkn'] && req.cookies['acc_tkn'] != "" && req.cookies['type'] && req.cookies['type'] == "Care Coach") {
      res.redirect("/" + program_name + "/care_home");
    }
    else {
      let data = {};
      data.title = "Login";
      data.program_name = program_name;
      res.render("login", data);
    }

  }
});

module.exports = router;
