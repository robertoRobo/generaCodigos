mysql = require('mysql');
connection = require('./csql')

let userModel = {};

userModel.getCode= (userData,callback) =>{
	if (connection) {
		connection.query(`Select codigoQR,id_usuario from code1 where id_usuario = `+`${userData.id_usuario}`,
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
userModel.InsertCode= (userData,callback) =>{
    if (connection) {
        console.log("insert"+`${userData.id_usuario} ${userData.codeGene}`)
      
        //connection.query(`Select codigoQR,id_usuario from code1 where id_usuario = `+`${userData.id_usuario}`,
        connection.query(`insert into code1 values("${userData.codeGene}",3131)`,
        (err,result)=>{
            if (result) {
				callback(null,{"exito":true});
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