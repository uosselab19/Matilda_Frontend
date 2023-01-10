// 아이템의 거래내역을 담은 타입
export interface Histories {
  buyerNickName?: string;
  buyerNum?: number;
  createdAt: number;
  historyNum: number;
  itemNum: number;
  itemTitle: string;
  price?: number;
  sellerNickName: string;
  sellerNum: number;
  stateCode: string;
  transactionHash?: string;
}
