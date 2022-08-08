pragma solidity >0.5.0;
//SPDX-License-Identifier: UNLICENSED

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract PictureNFT is ERC721Full {
  event PhotoUploaded(uint256 indexed tokenId, bytes photo, string title, string category, string description, uint256 timestamp);
  struct PhotoData {
    uint256 tokenId; // Unique token id
    address[] ownerHistory; // History of all previous owners
    bytes photo; // Image source encoded in uint 8 array format
    string title; // Title of photo
    string category; // Location where photo is taken
    string description; // Short description about the photo
    uint256 timestamp; // Uploaded time
  }
  mapping(uint256 => PhotoData) private _photoList;

  struct Picture {
    string author;
    string dateCreated;
  }

  mapping(uint256 => Picture) Pictures;
  mapping(string => uint256) pictureIdsCreated;

  constructor(string memory name, string memory symbol) public ERC721Full(name, symbol) {}

  function mintNFT(
    string memory title,
    string memory _author,
    string memory _dateCreated,
    string memory _tokenURI,
    bytes memory photo,
    string memory category,
    string memory description
  ) public {
    uint256 tokenId = totalSupply().add(1); //전체 토큰의 개수 +1
    Pictures[tokenId] = Picture(_author, _dateCreated);
    pictureIdsCreated[title] = tokenId;

    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, _tokenURI);
    address[] memory ownerHistory;

    PhotoData memory newPhotoData = PhotoData({
      tokenId: tokenId,
      ownerHistory: ownerHistory,
      photo: photo,
      title: title,
      category: category,
      description: description,
      timestamp: now
    });

    _photoList[tokenId] = newPhotoData;
    _photoList[tokenId].ownerHistory.push(msg.sender);

    emit PhotoUploaded(tokenId, photo, title, category, description, now);
  }

  function transferOwnership(uint256 tokenId, address to)
    public
    returns (
      uint256,
      address,
      address,
      address
    )
  {
    safeTransferFrom(msg.sender, to, tokenId);
    uint256 ownerHistoryLength = _photoList[tokenId].ownerHistory.length;
    return (
      _photoList[tokenId].tokenId,
      //original owner
      _photoList[tokenId].ownerHistory[0],
      //previous owner, length cannot be less than 2
      _photoList[tokenId].ownerHistory[ownerHistoryLength - 2],
      //current owner
      _photoList[tokenId].ownerHistory[ownerHistoryLength - 1]
    );
  }

  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public {
    super.transferFrom(from, to, tokenId);
    _photoList[tokenId].ownerHistory.push(to);
  }

  function getTotalPhotoCount() public view returns (uint256) {
    return totalSupply();
  }

  function getNFT(uint256 _tokenId) public view returns (string memory, string memory) {
    return (Pictures[_tokenId].author, Pictures[_tokenId].dateCreated);
  }

  function isTokenAlreadyCreated(string memory title) public view returns (bool) {
    return pictureIdsCreated[title] != 0 ? true : false;
  }

  function getPhoto(uint256 tokenId)
    public
    view
    returns (
      uint256,
      address[] memory,
      bytes memory,
      string memory,
      string memory,
      string memory,
      uint256
    )
  {
    return (
      _photoList[tokenId].tokenId,
      _photoList[tokenId].ownerHistory,
      _photoList[tokenId].photo,
      _photoList[tokenId].title,
      _photoList[tokenId].category,
      _photoList[tokenId].description,
      _photoList[tokenId].timestamp
    );
  }
}
