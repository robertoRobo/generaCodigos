CodeGenerator = require('node-code-generator');
randomize = require('randomatic');
User = require('../models/codigo')
/*generator =  new CodeGenerator();*/

pattern = '0Aa0';
length = 6;
options = {};


module.exports = function(app){
	app.post('/codigo',(req,res) =>{
        
        //console.log("code: "+codes[0]);
        var userData = {
            codeGene: "1rwPq",
            id_usuario: req.body.id_usu
          };
        User.getCode(userData,(err,data) =>{
			res.json(data);
		});
    });
    app.put('/codigo',(req,res) =>{
        codes = randomize(pattern,length);
        //console.log("code: "+codes[0]);
        var userData = {
            codeGene: "1rwPq",//codes,
            id_usuario: req.body.id_usu
          };
        User.InsertCode(userData,(err,data) =>{
            //console.log(data.length)
            res.json(data);
         
		});
    });
    
}