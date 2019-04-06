pragma solidity ^0.5.2;

import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Candidate is Ownable {
    using SafeMath for uint256;
    
    mapping(bytes => uint256) internal voteCount;

    constructor() public {

    }

    function vote(bytes memory candidateName) public {
        voteCount[candidateName] = voteCount[candidateName].add(1); 
    }

    function getVoteCount(bytes memory candidateName) public view returns (uint256) {
        return voteCount[candidateName); 
    }
}
