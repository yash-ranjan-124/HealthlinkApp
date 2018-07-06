

module.exports = {
    "apps": [
      {
    
        "name": "SimplePrograms",
        "script": "./bin/www",
        "error_file"      : __dirname+"/"+"../logs/programs/err.log",
        "out_file"        : __dirname+"/"+"../logs/programs/out.log",
        "watch": true,
        "merge_logs": true,
        "exec_mode"  : "cluster",
        "instances" :2,
        "log_date_format" : "YYYY-MM-DD HH:mm:ss.SSS",
        "env": {
            "PORT": 3001,
            "NODE_ENV": "development"
        },
        "env_production": {
            "PORT": 6060,
            "NODE_ENV": "production"
        }
      }
    ]
  }
