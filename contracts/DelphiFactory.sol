pragma solidity >=0.5.7;

import "./interfaces/IERC20.sol";
import "./DelphiLiquidityFund.sol";

contract DelphiFactory {
    address[] public allFunds;

    event FundCreated(address fund, uint256);

    constructor() public {}

    function createFund(uint256 token) external returns (address fund) {
        bytes32 salt = keccak256(abi.encodePacked(token));
        bytes memory bytecode = type(DelphiLiquidityFund).creationCode;
        assembly {
            fund := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }
        IDelphiLiquidityFund(fund).initialize();
        allFunds.push(fund);
        emit FundCreated(fund, allFunds.length);
    }

    function getAllFunds() external view returns (address[] memory) {
        return allFunds;
    }
}
