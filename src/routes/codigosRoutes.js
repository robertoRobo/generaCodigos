CodeGenerator = require('node-code-generator');
randomize = require('randomatic');
User = require('../models/codigo')
/*generator =  new CodeGenerator();*/

pattern = '0Aa0';
length = 6;
options = {};


module.exports = function(app){
	app.get('/codigo',(req,res) =>{
        codes = randomize(pattern,length);
        //console.log("code: "+codes[0]);
        var userData = {
            codeGene: "1rwPq",
            id_usuario: 3131
          };
        User.getCode(userData,(err,data) =>{
			res.json(data);
		});
    });
    app.post('/codigo',(req,res) =>{
        codes = randomize(pattern,length);
        //console.log("code: "+codes[0]);
        var userData = {
            codeGene: "1rwPq",
            id_usuario: 3131
          };
        User.InsertCode(userData,(err,data) =>{
			res.json(data);
		});
    });
    
}