CodeGenerator = require('node-code-generator');
randomize = require('randomatic');
User = require('../models/codigo')
/*generator =  new CodeGenerator();*/

pattern = '0Aa0';
length = 6;
options = {};


module.exports = function(app){
	app.post('/codigo',(req,res) =>{//regresa las ordenes de un usuario X
        
        //console.log("code: "+codes[0]);
        var userData = {
            id_usuario: req.body.id_usu
          };
        
        User.getCode(userData,(err,data) =>{
          //console.log(data)
			res.json(data);
		});
    });
    app.put('/codigo',(req,res) =>{
        codes = randomize(pattern,length);
        //console.log("code: "+codes[0]);
        var userData = {
            codeGene: codes,
            id_usuario: req.body.id_usu,
            id_sucursal: req.body.sucursal,
            descripcion: req.body.desc,
            total: req.body.tot

            //numOrden: req.body.orden
          };
        User.InsertCode(userData,(err,data) =>{
            //console.log(data.length)
            res.json(data);
          });
    });
    app.put('/baja',(req,res) =>{
      //console.log("code: "+codes[0]);
      var userData = {
          codigo: req.body.code
      };
      //console.log(userData.codigo);
      User.DeleteOrden(userData,(err,data) =>{
          console.log(data)
          res.json(data);
        });
  });
    
}