connection = mysql.createConnection({
	host:'192.168.56.101',
	user:'root',
	password: 'roberto123',
	database: 'taqueria'
});
module.exports = connection;