let mysql = require('async-mysql');


    	 let connection;
    	    try{
    	   
		    connection = mysql.connect({
		        	host: "localhost",
					user: "alexeyom",
					password: "",
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