// Contract를 불러오기 위해 사용하는 타입.
// 거래 내역 등에서 활용함
export interface SelectContract {
  buyerNickName: string;
  itemTitle: string;
  price: 0;
  sellerNickName: string;
  stateCode: string;
}
