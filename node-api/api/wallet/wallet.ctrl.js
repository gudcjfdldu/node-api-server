const ethers = require('ethers');

const path = require('path');

const contractABI = [{"constant":true,"inputs":[{"name":"candidateName","type":"bytes"}],"name":"getVoteCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidateName","type":"bytes"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

let contractAddress = "0x8dbAC753c44c92b9f4b64a9afD1D6f73034C803C";
let defaultProvider = ethers.getDefaultProvider('ropsten');

const create_wallet = (req, res) => {
  let randomWallet = ethers.Wallet.createRandom();
  res.status(201).json({
    'resMessage': 'Success Creation new Wallet',
    'walletAddress': randomWallet.address,
    'privateKey': randomWallet.privateKey
  });
}

const candidate_vote = (req, res) => {
  let privateKey = req.body.privateKey;
  let candidate = req.body.candidate;
  
  let wallet = new ethers.Wallet(privateKey, defaultProvider);
  let contract = new ethers.Contract(contractAddress, contractABI, wallet);

  let transPromise = contract.vote(candidate);

  transPromise.then(function(transaction){
    defaultProvider.getTransactionReceipt(transaction.hash).then((receipt) => {
      res.status(201).json({
        'resMessage': 'Success vote to candidate',
	'transactionHash': transaction.hash
      });
    });
  });
}

const get_candidate_info = (req, res) => {
  let privateKey = req.body.privateKey;
  let candidate = req.body.candidate;

  let wallet = new ethers.Wallet(privateKey, defaultProvider);
  let contract = new ethers.Contract(contractAddress, contractABI, wallet);

  let transPromise = contract.getVoteCount(candidate);

  transPromise.then(function(transaction){
    res.status(200).json({
      'resMessage': 'get vote information',
      "voteCount": transaction['_hex'] 
    });
  });
}

module.exports = {
  create_wallet, candidate_vote, get_candidate_info
}
