mysql = require('mysql');
connection = require('./csql')
randomize = require('randomatic');

pattern = '0Aa0';
length = 6;
options = {};

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
userModel.InsertCode = (userData,callback) =>{
    if (connection) {
        //console.log("insert"+`${userData.id_usuario} ${userData.codeGene}`)
		var find = false;
        connection.query(`Select codigoQR,id_usuario from code1`,
		(err,rows)=>{
			if (rows) {
				for(i = 0; i<rows.length; i++){
					if(userData.codeGene.localeCompare(rows[i].codigoQR)==0){
						//console.log("existe: "+userData.codeGene)
						find = true;
					}
				}
				if(find){
					codes = nuevoCodigo(find,rows);
					userData.codeGene = codes;
				}
				console.log("nuevo codigo a insertar: "+userData.codeGene+ " orden: "+)
				nuevoElemento(userData,callback);
				///callback(null,rows);
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

function nuevoElemento(userData,callback){
	callback(null,{"prueba":true});
}

function nuevoCodigo(find,rows){
	codes = ""
	while(find){
		codes = randomize(pattern,length);
		find = false;
		for(i = 0; i<rows.length; i++){
			if(codes.localeCompare(rows[i].codigoQR)==0){
				console.log("existe: "+userData.codeGene)
				find = true;
			}
		}		
	}
	return codes;
}
module.exports = userModel;