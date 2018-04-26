mysql = require('mysql');
connection = require('./csql')
randomize = require('randomatic');

pattern = '0Aa0';
length = 6;
options = {};

json = '{"result":[]}';

let userModel = {};

userModel.getCode= (userData,callback) =>{
	if (connection) {
		connection.query(`Select * from orden where id_usuario = ${userData.id_usuario}`,
		(err,rows)=>{
			if (rows.length>0) {
				rows = rows[0]
				obj = JSON.parse(json);
				obj['result'].push(rows);

				console.log(obj["result"]);
				callback(null,obj);
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
        connection.query(`Select codigo from orden`,
		(err,rows)=>{
			if (rows) {
				for(i = 0; i<rows.length; i++){
					if(userData.codeGene.localeCompare(rows[i].codigo)==0){
						//console.log("existe: "+userData.codeGene)
						find = true;
					}
				}
				if(find){
					codes = nuevoCodigo(find,rows);
					userData.codeGene = codes;
				}
				console.log("nuevo codigo a insertar: "+userData.codeGene+ " orden: ")
				nuevoElemento(userData,callback,connection);
				//callback(null,rows);
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
userModel.DeleteOrden = (userData,callback) =>{
	if (connection) {
		connection.query(`Select * from orden where codigo = '${userData.codigo}' and realizada <> 1`,
		(err,rows)=>{
			if (rows.length>0) {
				var datos = {
					num_orden: rows[0].num_orden,
					id_usuario: rows[0].id_usuario,
					id_sucursal: rows[0].id_sucursal,
					descripcion: rows[0].descripcion,
					total: rows[0].total,
					codigo: userData.codigo,
					fecha: rows[0].fecha,
					realizada: rows[0].realizada,
					exists: true
				} 
				//rows += `"exists":true`;
				//rows = JSON.stringify(rows[0]);
				//console.log(datos);
				darBaja(datos,callback,connection);
				//callback(null,datos);
			}else{
				callback(null, {
                  "exists": false,
                  codigo: userData.codigo
		        });
			}
		});
	}else{
		callback(null, {
				"msg": "bad things"
			});
	}
}

function nuevoElemento(userData,callback,connection){
	connection.query(`insert into orden(id_usuario,id_sucursal,descripcion,total,codigo,fecha,realizada) values(${userData.id_usuario},${userData.id_sucursal}
		,'${userData.descripcion}',${userData.total},'${userData.codeGene}',NOW(),0)`,
	//connection.query(`Select codigo from orden`,	
	(err,rows)=>{
			if (rows) {
				callback(null,{"exito":true});
			}else{
				callback(null, {
                  "exists": false,
                  codigo: userData.codeGene
		        });
			}
		});
	//callback(null,userData);
}

function darBaja(userData,callback,connection){
	connection.query(`update orden set realizada = 1 where codigo = '${userData.codigo}'`,
	//connection.query(`Select codigo from orden`,	
	(err,rows)=>{
			if (rows) {
				callback(null,userData);
			}else{
				callback(null, {
                  "exists": false,
                  codigo: userData.codeGene
		        });
			}
		});
}


function nuevoCodigo(find,rows){
	codes = ""
	while(find){
		codes = randomize(pattern,length);
		find = false;
		for(i = 0; i<rows.length; i++){
			if(codes.localeCompare(rows[i].codigoQR)==0){
				//console.log("existe: "+userData.codeGene)
				find = true;
			}
		}		
	}
	return codes;
}
module.exports = userModel;