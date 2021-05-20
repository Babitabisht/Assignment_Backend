const request = require('request');
const { env } = require('process');
const config = require('../config.json')[env.NODE_ENV];
const jwt = require('jsonwebtoken');
let peerName;

function query(req, res, funcType, args) {
	peerName = config.peer;
	let token=	jwt.sign({
		exp: Math.floor(Date.now() / 1000) + (60 * 60),
		username: "Jim",
		orgName: "Org1",
	  }, 'thisismysecret');

req.headers.authorization = `Bearer ${token}`;	  
	return new Promise(function (resolve, reject) {
		request(
			{
				headers: {
					'content-type': 'application/json',
					authorization: req.headers.authorization,
				},

				uri: `${config.blockchain_api}/queryChaincode/${config.channel_name}/chaincodes/mycc`,
				body: {
					args: args,
					fcn: funcType,
					peer: [peerName],
				},
				json: true,
				method: 'POST',
			},
			function (err, response, body) {
				console.log(body);
				if (err) {
					reject({ success: false, message: 'there  is something wrong' });
				} else {
					resolve(body);
				}
			}
		);
	});
}

module.exports = {
	query,
};
