
import { SortOrderOption } from './Database';

// 아이템 정렬을 위해 사용되는 타입
// 미구현상태 (자세한 건 Database.ts 참고)
export const ItemSortKey = {
  ID: 'ID',
  TITLE: 'TITLE',
  PRICE: 'PRICE',
  TITLE_PRICE_0: 'TITLEPRICE0',
  TITLE_PRICE_1: 'TITLEPRICE1'
} as const;
export type ItemSortKeyOption = typeof ItemSortKey[keyof typeof ItemSortKey];

// 액시오스로부터 아이템 불러올 때 사용되는 타입
export interface SelectItem {
  catCode?: string;
  maxPrice?: number;
  memberNum?: number;
  minPrice?: number;
  skip?: number;
  sortKey?: ItemSortKeyOption;
  sortOrder?: SortOrderOption;
  stateCode?: string;
  take?: number;
  title?: string;
}

// 아이템 정보를 바꾸기 위해 사용되는 타입
export interface UpdateItem {
  itemNum: number;
  title?: string;
  description?: string;
  price?: number;
}

// 프론트엔드에서 아이템이 사용될 때 사용되는 타입 (단순)
export interface Item {
  itemNum: number;
  catCode: string;
  price: number;
  title: string;
  imgUrl: string;
  memberThumbImgUrl: string;
  stateCode: string;
  tokenID: number;
}

// 프론트엔드에서 아이템이 사용될 때 사용되는 타입 (상세)
export interface DetailItem {
  itemNum: number;
  catCode: string;
  price: number;
  title: string;
  imgUrl: string;
  objectUrl: string;
  description: string;
  tokenId: number;
  tokenUri: string;
  memberNickName: string;
  memberNum: number;
  memberThumbImgUrl: string;
  stateCode: string;
}

// 뭐더라
export interface ChangeItem {
  buyerNum: number;
  option: string;
  price: number;
  tokenId: number;
  tokenUri: string;
  transactionHash: string;
}
