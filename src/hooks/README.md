# hooks
리액트 컴포넌트 함수 내에서 사용하는 함수를 담은 파일
해당 기능은 반드시 JSX를 생성하는 리액트 컴포넌트 함수 내에서 실행되어야 합니다.
반드시 hooks는 useHook 과 같은 모양으로 활용됩니다.

## 설명
useCategory - 컴포넌트 내에 카테고리가 필요할 때 사용
useForm - form을 사용해야 할 때 사용. 유효성 검사 등의 기능이 추가됨.
useItems - Items를 사용해야 할 때 사용. pagination 등의 기능을 활용하기 위해 사용.