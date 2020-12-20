
**Prerequisites**
nodejs v8.15.1

**How to start**
1.   npm i
1.  NODE_ENV=development node app.js


**Requirements**
1. A simple smart contract with two functionality. One should accept a hash and meta data of a file and store in the blockchain. The second functionality is to be able to take a hash of a file and give back the meta data and time at which the hash was registered.
1. Include a feature so that at any time we should be able to retrieve all the registered files and their information.
1. Create an API Server which exposes APIs for these functionality.



**Technology stack**
Hyperledger Fabric ( Single Organization with 3 Peers )
Node.js ( For Rest API server )
Chaincode



**API ENDPOINTS**

 To accept a hash and meta data of a file and store in the blockchain
```
ENDPOINT- http://localhost:3000/api/savefile
METHOD - POST
BODY - requires files for uploading (use formdata in postman)
RESPONSE -
{
    "success": true,
    "message": "Successfully invoked the chaincode Org1 to the channel 'mychannel' for transaction ID: c8617830a9222c7de7cb431f5b660b88b7b1d00cee7e6a9324b8b5d920941e27",
    "myMessage": "Successful operation !"
}

```

 API that takes  hash of a file and give back the meta data and time at which the hash was registered.
```
ENDPOINT - http://localhost:3000/api/getfileInfoByHash/6aaa835598c78266a952c3df5070115e
METHOD - GET

```


 Retrieve all the registered files and their information.
```
ENDPOINT- http://localhost:3000/api/getFilesData
METHOD - GET

```


