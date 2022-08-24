pragma solidity >=0.4.22 <0.9.0;

contract Minting {
  event mint(address Address, bytes picture);

  struct Data {
    uint256 tokenId; // Unique token id
    address minter; // Fir of all previous owners
    bytes picture; // Image source encoded in uint 8 array format
    string title; // Title of photo
    string category; // Location where photo is taken
    string description; // Short description about the photo
    uint256 timestamp; // Uploaded time
  }

  Data public data;
  
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
}
