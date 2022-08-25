// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Count {
  uint public count = 0;
  address public lastParticipant;

  function plus() public {
    count = count + 1;
    lastParticipant = msg.sender; // msg.sender의 값을 lastParticipant에 저장합니다.
  }

  function minus() public {
    count = count - 1;
    lastParticipant = msg.sender; // msg.sender의 값을 lastParticipant에 저장합니다.
  }

  function getCount() public view returns (uint) {
    return count;
  }
}
