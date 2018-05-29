let express = require('express');
let router = express.Router();
let fs = require('fs');


router.get('/:filename', function(req, res, next) {

	const uuidv4RegEx = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}_[0-9].ovpn$/;

	if(!uuidv4RegEx.exec(req.params.filename)) res.send(404);
	fs.access('./ovpns/' + req.params.filename, fs.constants.F_OK, (err) => {
		if(err) res.send(404);
	});
	res.download('./ovpns/' + req.params.filename);
});

module.exports = router;