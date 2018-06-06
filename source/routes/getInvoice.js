let express = require('express');
let router = express.Router();

let wallet = require('../../config/config').wallet;

let uuidv4 = require('uuid/v4');
let connection = require('../mysql');
let bodyParser = require ('body-parser');



const calculateSum = (num, term) => {
return num*term;	
};

const calculateExpiration = () => {
	return Date.now() + 1000*60*15;
};


router.post('/', async function(req, res, next) {
  	
	try{

		let rows;
		    
		console.log(req.body);

		let body = JSON.parse(Object.keys(req.body));
		//let body = JSON.parse(req.body);
		
		//let body = req.body;
		//console.log(req.body);

		let connect = await connection;

		
		let tags = await connect.query(`SELECT tag FROM Invoices`);
		

		let tag;

	  do {
	  	tag = Math.floor(Math.random()*4294967295);
	  }
	  while(~tags.indexOf(tag));
		        

		const sum = calculateSum(body.devices, body.term);
		const uuid = uuidv4();
		const expiration = calculateExpiration();
		const invoice = {wallet,
						 tag,
						 sum,
						 expiration,
						 uuid
		};
		
		rows = await connect.query(`INSERT INTO Invoices (ID, wallet, tag, sum, expiration, email, devices, term)
										VALUES ("${invoice.uuid}",
												"${invoice.wallet}",
												"${invoice.tag}",
												${invoice.sum},
												${expiration},
												"${body.email}",
												"${body.devices}",
												"${body.term}");`);
		

		console.log(rows);
		if(rows.affectedRows === 1) {
			res.json(invoice);
		} else {
			res.send(501);
		}
	} catch(e) {
		console.log(e);
		res.send(502);
	}
});

module.exports = router;