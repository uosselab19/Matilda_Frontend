// 현재 마틸다 프론트엔드에서는 사용되지 않는 타입들
// 코드를 집어넣으면 구현 가능하도록 타입 지정을 해두었고
// 백엔드에서도 관련 코드가 이미 구현이 되어 있었으나
// 디자인의 착오로 구현되지 못 한 기능으로 남은 코드

export const SortOrder = {
  ASC: 'ASC',
  DESC: 'DESC'
} as const;

export type SortOrderOption = typeof SortOrder[keyof typeof SortOrder];
