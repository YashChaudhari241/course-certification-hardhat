// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Certify {
    address immutable i_owner;
    mapping(address => uint8) public authorities; // used to store authorities
    mapping(address => uint8) public issuers; // used to store authorities
    mapping(address => Certificate[]) certificates;
    error Certify__OutOfIndex();
    struct Certificate {
        string id;
        address issuedTo;
        address issuedBy;
        uint issuedAt;
        bool isRevoked;
        string encryptedData;
    }

    constructor(address owner) {
        i_owner = owner;
        authorities[owner] = 1;
    }

    modifier onlyAuthorities() {
        require(
            authorities[msg.sender] == 1 || msg.sender == i_owner,
            "Not an Authority"
        );
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == i_owner, "Only owners can call this function");
        _;
    }
    modifier onlyIssuer() {
        require(
            issuers[msg.sender] == 1,
            "Only issuers can call this function"
        );
        _;
    }

    function addAuthority(address newAuthority) external onlyAuthorities {
        authorities[newAuthority] = 1;
    }

    function removeAuthority(address existingAuthority) external onlyOwner {
        authorities[existingAuthority] = 0;
    }

    function addIssuer(address newIssuer) external onlyAuthorities {
        issuers[newIssuer] = 1;
    }

    function removeIssuer(address existingIssuer) external onlyAuthorities {
        issuers[existingIssuer] = 0;
    }

    function issueCertificate(Certificate memory newCert) external onlyIssuer {
        newCert.issuedAt = block.timestamp;
        newCert.issuedBy = msg.sender;
        certificates[newCert.issuedTo].push(newCert);
    }

    function revokeCertificate(address user, uint index) external onlyIssuer {
        if (certificates[user].length <= index) {
            revert Certify__OutOfIndex();
        }
        certificates[user][index].isRevoked = true;
    }

    function getAuthorityStatus() external view returns (uint) {
        return authorities[msg.sender];
    }

    function getAllCertificates(
        address user
    ) external view returns (Certificate[] memory) {
        return certificates[user];
    }

    function getCertificate(
        address user,
        uint index
    ) external view returns (Certificate memory) {
        if (certificates[user].length <= index) {
            revert Certify__OutOfIndex();
        }
        return certificates[user][index];
    }
}
