var mongodb = require("mongodb");

var mongoClient = mongodb.MongoClient;

var url = "mongodb+srv://toanhuuvuong:toanhuuvuong123456@toandb-lttzl.azure.mongodb.net/test?retryWrites=true&w=majority/";

module.exports = 
{
	// ------------------------------------------------- BASE PRODUCT QUERIES
	insertProduct: function(newProduct, callback)
	{
		mongoClient.connect(url, function(err, db)
		{
			if(err) throw err;

			var dbo = db.db("ToanDB");

			dbo.collection("Product").insertOne(newProduct, function(err, result)
			{
				if(err) throw err;

				db.close();

				return callback(new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						resolve(result);
					}, 1);
				}));
			});
		});
	},
	getListProductByQuery: function(query, callback, options = {})
	{
		this.getPromiseByQuery(query, function(promise)
		{
			promise.then(function(value)
			{
				return callback(value);
			});
		}, options);
	},
	getPromiseByQuery: function(query, callback, options = {})
	{
		mongoClient.connect(url, function(err, db)
		{
			if(err) throw err;

			var dbo = db.db("ToanDB");

			dbo.collection("Product").find(query).sort(options).toArray(function(err, result)
			{
				if(err) throw err;

				db.close();

				return callback(new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						resolve(result);
					}, 1);
				}));
			});
		});
	}
};