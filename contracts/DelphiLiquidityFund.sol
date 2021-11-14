pragma solidity >=0.5.7;

import "./interfaces/IDelphiLiquidityFund.sol";

contract DelphiLiquidityFund is IDelphiLiquidityFund {
    address factory;

    mapping(address => uint256) public balances;

    constructor() public {
        factory = msg.sender;
    }

    function initialize() external {
        require(msg.sender == factory, "Delphi FORBIDDEN");
    }

    function addBalance(uint256 amount) public {
        balances[msg.sender] += amount;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
