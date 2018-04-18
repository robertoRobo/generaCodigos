mysql = require('mysql');
connection = require('./csql')

let userModel = {};

userModel.getCode= (userData,callback) =>{
	if (connection) {
        console.log(`\'${userData.codeGene.toString()}'`)
		connection.query(`Select code from codigos where code = `+`\'${userData.codeGene}'`,
		(err,rows)=>{
			if (rows) {
				callback(null,rows);
			}else{
				callback(null, {
                  "exists": false,
                  codigo: userData.codeGene
		        });
			}
		});
		}else{
			callback(null, {
		          "msg": "bad things"
		        });
		}
	}
module.exports = userModel;