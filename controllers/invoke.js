let request = require('request');
const { env } = require('process');
const config = require('../config.json')[env.NODE_ENV]


function invokeToChaincode(req, res, funcType, param) {
	return new Promise(function (resolve, reject) {
		request(
			{
				headers: {
					'content-type': 'application/json',
					authorization: req.headers.authorization,
				},
				uri: `${config.blockchain_api}/channels/${config.channel_name}/chaincodes/mycc`,
				body: {
					peers: config.peer,
					fcn: funcType,
					args: param,
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
	invokeToChaincode,
};
