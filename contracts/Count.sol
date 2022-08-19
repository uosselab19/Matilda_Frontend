pragma solidity >=0.4.22 <0.9.0;

contract Count {
  // 컨트랙트의 이름을 "Count"로 합니다.
  uint256 public count = 0; // Declare count variable as uint type and initialize its value to 0.
  address public lastParticipant;

  function plus() public {
    // 'plus'라는 이름의 public 함수를 작성합니다.
    count = count + 1; // 'plus' 함수는 count 변수를 1씩 증가시킵니다.
    lastParticipant = msg.sender; // msg.sender의 값을 lastParticipant에 저장합니다.
  }

  function minus() public {
    // 'minus'라는 이름의 public 함수를 작성합니다.
    count = count - 1; // 'minus' 함수는 count 변수를 1씩 감소시킵니다.
    lastParticipant = msg.sender; // msg.sender의 값을 lastParticipant에 저장합니다.
  }
}
