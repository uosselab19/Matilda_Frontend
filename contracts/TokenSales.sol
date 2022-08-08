pragma solidity >0.5.0;
//SPDX-License-Identifier: UNLICENSED

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract TokenSales {
  ERC721Full public nftAddress;
  mapping(uint256 => uint256) public tokenPrice;

  constructor(address _tokenAddress) public {
    nftAddress = ERC721Full(_tokenAddress);
  }

  function setForSale(uint256 _tokenId, uint256 _price) public {
    address tokenOwner = nftAddress.ownerOf(_tokenId);

    tokenPrice[_tokenId] = _price;
  }

  function purchaseToken(uint256 _tokenId) public payable {
    uint256 price = tokenPrice[_tokenId];
    address tokenSeller = nftAddress.ownerOf(_tokenId);

    address payable payableTokenSeller = address(uint256(tokenSeller));
    payableTokenSeller.transfer(msg.value);
    nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId);
    tokenPrice[_tokenId] = 0;
  }

  function removeTokenOnSale(uint256[] memory tokenIds) public {
    for (uint256 i = 0; i < tokenIds.length; i++) {
      uint256 tokenId = tokenIds[i];
      address tokenSeller = nftAddress.ownerOf(tokenId);

      tokenPrice[tokenId] = 0;
    }
  }
}
