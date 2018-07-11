let mysql = require("mysql");

class MysqlLib {
    constructor() {
        this.hostname = "healthlink-program.c9yf7rqtpbpf.us-east-2.rds.amazonaws.com",
            this.username = "rescuehealthlink",
            this.password = "!.=i(%78Ba#:-(g",
            this.database = "Healthlink_programs";
        this.connection = mysql.createConnection({
            host: this.hostname,
            user: this.username,
            password: this.password,
            database: this.database,
            port: 3306
        });

        /** this.connection.connect(function(err) {
             if (err) {
               console.error('error connecting: ' + err.stack);
               return;
             }
            
             console.log('connected as id ' + this.connection.threadId);
           });**/

    }
    getConnection() {
        return this.connection;
    }

    runQuery(query) {

        if (query == undefined && query == "") {
            return { error: 1, message: "undefined query" };
        }
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

    }

    insert(params) {
        let insert_field = params.fields;
        let values = params.values;
        let query = "INSERT INTO " + params.tablename + " (" + insert_field.toString() + ") VALUES(" + values.toString() + ")";
        console.log(query);
        return new Promise((resolve, reject) => {
            this.connection.query(query, function (err, res) {
                if (err) {
                    reject(err);
                } else {

                    resolve({ error: 0, message: "inserted" });
                }
            });
        });

    }

    delete(params) {

    }

    update(params) {

    }



}

module.exports = new MysqlLib();
