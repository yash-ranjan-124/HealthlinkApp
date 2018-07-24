let mysqlLib = require('./mysqlLibs');
let jwt = require("jwt-simple");
let connection = mysqlLib.getConnection();
let axios = require("axios");

let JWT_SECRET = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');
let JWT_SECRET2 = Buffer.from('fe1a19aVengersbe539tonyStark4b64d14794932', 'hex');

class AppFunctionLib {

    async register(params) {
        let enrollDate = new Date();
        if (params.type == "Care Coach") {
            //params.specs = params.specs.split(",");
            // params.specs = params.specs.join("|");

            let coach_count = await mysqlLib.runQuery("SELECT COUNT(coachId) as count FROM CareCoach WHERE email='" + params.email + "'");
            if (coach_count[0]['count'] < 1) {
                let response = await mysqlLib.insert({
                    tablename: "CareCoach",
                    fields: ["fname", "lname", "email", "pass", "mobile", "specialization", "enrollDate"],
                    values: [connection.escape(params.fname), connection.escape(params.lname), connection.escape(params.email), connection.escape(params.pass), connection.escape(params.Mobile), connection.escape(params.specs), enrollDate.getFullYear() + "-" + enrollDate.getMonth() + "-" + enrollDate.getDate()
                    ]
                });
                return response;
            } else {
                return { error: 1, message: "User Already Exists!!" };
            }

        } else {
            let user_count = await mysqlLib.runQuery("SELECT COUNT(userId) as count FROM User WHERE email='" + params.email + "'");
            console.log(user_count);
            if (user_count[0]['count'] < 1) {
                let response = await mysqlLib.insert({
                    tablename: "User",
                    fields: ["fname", "lname", "email", "pass", "mobile", "enrollDate"],
                    values: [connection.escape(params.fname), connection.escape(params.lname), connection.escape(params.email), connection.escape(params.pass), connection.escape(params.Mobile), enrollDate.getFullYear() + "-" + enrollDate.getMonth() + "-" + enrollDate.getDate()]
                });
                return response;
            } else {
                return { error: 1, message: "User Already Exists!!" };
            }

        }

    }

    async ForceLogin(email, response) {
        try {
            let userId = await mysqlLib.runQuery("SELECT userId FROM User WHERE email='" + email + "'");
            if (userId && userId.length > 0) {
                let token = jwt.encode({ id: userId[0]['userId'] }, JWT_SECRET);
                response.cookie("acc_tkn", token, { maxAge: new Date(Date.now() + 900000), path: "/" });
                response.cookie("type", "patient", { maxAge: new Date(Date.now() + 900000), path: "/" });
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }

    async getUserData(params) {
        let email = params.user_email;
        let pass = params.user_pass;
        let type = params.user_type;
        let userData = {};
        try {
            if (type == "patient") {
                userData = await mysqlLib.runQuery("SELECT userId FROM User WHERE email='" + email + "' AND pass='" + pass + "'");


            }
            if (type == "Care Coach") {
                userData = await mysqlLib.runQuery("SELECT coachId FROM CareCoach WHERE email='" + email + "' AND pass='" + pass + "'");

            }
            console.log(userData);
            return userData;
        } catch (error) {
            console.log(error);
        }


    }
    async getUserDataById(id) {
        if (id) {
            let userData = await mysqlLib.runQuery("SELECT fname,lname,email,mobile FROM User WHERE userId=" + id);
            return userData;
        } else {
            return { error: "1", message: "invalid id" };
        }
    }

    async getAllConditions() {
        try {
            let conditionsData = await mysqlLib.runQuery("SELECT condId,conditionName FROM MedicalConditions ORDER BY conditionName ASC");
            return conditionsData;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserConditions(userId) {
        try {
            let conditionIds = await mysqlLib.runQuery("SELECT condId FROM UserMedicalConditions WHERE userId=" + userId);
            if (conditionIds && conditionIds.length > 0) {
                let conditionsStr = "";
                for (var key in conditionIds) {

                    conditionsStr += (key != conditionIds.length - 1) ? conditionIds[key]['condId'] + "," : conditionIds[key]['condId'];
                }

                let userConditions = await mysqlLib.runQuery("SELECT condId,conditionName FROM MedicalConditions WHERE condId in (" + conditionsStr + ") ORDER BY conditionName ASC");
                let userCondtionsNames = [];
                for (key in userConditions) {

                    userCondtionsNames.push({
                        condId: userConditions[key]['condId'],
                        name: userConditions[key]['conditionName']
                    });
                }

                return userCondtionsNames;

            } else {
                return {};
            }


        } catch (error) {
            console.log(error);
        }
    }

    async getCoach(condIds) {
        try {
            let coachIds = await mysqlLib.runQuery("SELECT DISTINCT(coachId) as coachID FROM CoachForCondition WHERE condId in(" + condIds.toString() + ")");
            if (coachIds && coachIds.length > 0) {
                let coachIDstr = "";
                for (var key in coachIds) {
                    coachIDstr += (key == coachIds.length - 1) ? coachIds[key]['coachID'] : coachIds[key]['coachID'] + ",";
                }

                let coachData = await mysqlLib.runQuery("SELECT coachId,fname,lname,email,mobile,specialization  FROM CareCoach WHERE coachId in (" + coachIDstr + ")");
                return coachData;
            } else {
                let coachData = await mysqlLib.runQuery("SELECT coachId,fname,lname,email,mobile,specialization  FROM CareCoach");
                return coachData;
            }
        } catch (e) {
            console.log(e);
        }


    }

    async bookCoach(userId, coachId) {
        try {
            let count_Data = await mysqlLib.runQuery("SELECT count(userId) as count FROM UserCoach WHERE userId=" + userId + " AND coachId=" + coachId);
            console.log(count_Data[0]['count'] > 0);
            if (count_Data[0]['count'] <= 0) {
                let booking_resp = await mysqlLib.insert({
                    tablename: "UserCoach",
                    fields: ["userId", "coachId"],
                    values: [userId, coachId]
                });
                console.log(booking_resp);
                return booking_resp;
            }
            else {
                return { error: 1, message: "Care Coach Already Booked!!" };
            }

        } catch (error) {
            console.log(error);
        }
    }

    async getCoachData(coachId) {
        try {
            let coachData = await mysqlLib.runQuery("SELECT fname,lname,email,mobile,specialization FROM CareCoach WHERE coachId=" + coachId);
            return coachData;
        } catch (error) {
            console.log(error);
        }
    }

    async getClient(coachId) {
        try {

            let client_ids = await mysqlLib.runQuery("SELECT userId FROM UserCoach WHERE coachId=" + coachId);

            if (client_ids) {

                let clientId_str = "";

                for (let key in client_ids) {

                    clientId_str += key == client_ids.length - 1 ? client_ids[key]['userId'] : client_ids[key]['userId'] + ",";
                }


                let client_data = await mysqlLib.runQuery("SELECT userId,fname,lname,email,mobile,enrollDate FROM User WHERE userId in (" + clientId_str + ")");
                let client_conditions_id = await mysqlLib.runQuery("SELECT userId,condId FROM UserMedicalConditions WHERE userId in(" + clientId_str + ")");
                let conditionsIds = [];
                let userConditionHashMap = {};
                for (let k = 0; k < client_conditions_id.length; k++) {
                    conditionsIds.push(client_conditions_id[k]['condId']);

                }
                let clientConditionData = await mysqlLib.runQuery("SELECT condId,conditionName FROM MedicalConditions WHERE condId in(" + conditionsIds.toString() + ")");
                let conditionHashMap = {};
                for (var j in clientConditionData) {
                    conditionHashMap[clientConditionData[j]['condId']] = clientConditionData[j]['conditionName'];
                }

                for (let i = 0; i < client_conditions_id.length; i++) {
                    if (i == 0) {
                        userConditionHashMap[client_conditions_id[i]['userId']] = [];
                    }
                    else if (client_conditions_id[i]['userId'] != client_conditions_id[i - 1]['userId']) {
                        userConditionHashMap[client_conditions_id[i]['userId']] = [];
                    }
                    client_conditions_id[i]['conditionName'] = conditionHashMap[client_conditions_id[i]['condId']];
                    userConditionHashMap[client_conditions_id[i]['userId']].push({
                        condId: client_conditions_id[i]['condId'],
                        conditionName: client_conditions_id[i]['conditionName']
                    });
                }
                for (var h in client_data) {
                    client_data[h]['conditions'] = userConditionHashMap[client_data[h]['userId']];
                }
                // console.log(userConditionHashMap);
                return client_data;
            } else {

                return { error: 1, message: "No Clients!!" };
            }


        } catch (error) {
            console.log(error);
        }
    }

    async sendEmail(sendTo) {
        let email_data = {
            "sendTo": sendTo,
            "templateData": { "a": 1, "b": 2 },
            "templateName": "abcefg",
            "_id": "123",
            "userid": "xyz"
        };
        try {
            let response = await axios({
                url: "http://54.154.11.104/sendEmail",
                method: "POST",
                data: email_data
            });
            //console.log(response);
            return response.data;

        }
        catch (err) {
            console.log(err);
        }


    }
}


module.exports = new AppFunctionLib();