let mysql = require('async-mysql');


    	 let connection;
    	    try{
    	   
		    connection = mysql.connect({
		        	host: "127.0.0.1",
					user: "root",
					password: "crabmakehorsered",
					database: "c9",
					port: 3306
		    });
		    console.log('connected to MySQL');
	    }
	    catch (e) {
	    	console.log(e);
	    	throw(e);
	    }


module.exports = connection;