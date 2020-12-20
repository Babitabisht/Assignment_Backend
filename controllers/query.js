const request = require('request');
const { env } = require('process');
let peerName;
const config = require('../config.json')[env.NODE_ENV];

function query(req, res, funcType, args) {
	peerName = config.peer;
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
