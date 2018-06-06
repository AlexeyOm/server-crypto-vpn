var express = require('express');
var router = express.Router();
let connection = require('../mysql');

router.get('/:ID', async function(req, res, next) {
  
	try{
		const ID = req.params.ID;
		let files = [];
		let devices;
		let status;

		let connect = await connection;
		let result = await connect.query(`SELECT status, devices FROM Invoices WHERE ID="${ID}"`);
		console.log(status);
		if(result.length === 0) {
			status = 'invalid';
		} else {
			status = result[0].status;
			devices = result[0].devices;
			files = Array(devices).fill('').map( (elem, ind) => `${ID}_${ind}.ovpn`);
		}
		
	  res.json({status, files});

  } catch(e) {
  	console.log(e);
  }
});

module.exports = router;