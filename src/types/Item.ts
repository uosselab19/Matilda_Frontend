import { SortOrderOption } from './Database';

export const ItemSortKey = {
  ID: 'ID',
  TITLE: 'TITLE',
  PRICE: 'PRICE',
  TITLE_PRICE_0: 'TITLEPRICE0',
  TITLE_PRICE_1: 'TITLEPRICE1'
} as const;

export type ItemSortKeyOption = typeof ItemSortKey[keyof typeof ItemSortKey];

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

export interface UpdateItem {
  itemNum: number;
  title?: string;
  description?: string;
  price?: number;
}

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
  memberNum:number;
  memberThumbImgUrl: string;
  stateCode: string;
}

export interface ChangeItem {
  buyerNum: number;
  option: string;
  price: number;
  tokenId: number;
  tokenUri: string;
  transactionHash: string;
}