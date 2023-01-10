// 멤버정보를 데이터베이스에 넣을 때 사용되는 타입
export interface InsertMember {
  id?: string;
  password?: string;
  nickname?: string;
  email?: string;
}

// 멤버정보를 수정하기 위해 사용되는 타입
export interface UpdateMember {
  memberNum: number;
  password?: string;
  nickname?: string;
  email?: string;
  clothesList?: [{}];
  profileImg?: string;
  walletAddress?: string;
  description?: string;
}

// 클레이튼과 멤버정보를 연동하기 위해 사용되는 타입
export interface UpdateMemberKlaytn {
  walletAddress: string;
  walletPrivateKey: string;
}

// 로그인을 위해 사용되는 타입
export interface SigninMember {
  id: string;
  password: string;
}

// 액시오스로부터 멤버정보를 불러올 때 사용되는 타입
export interface SelectMember {
  memberNum: number;
  createdAt?: string;
  description?: string;
  email?: string;
  id?: string;
  nickname?: string;
  clothesList?: [{}];
  profileImg?: string;
  thumbProfileImg?: string;
  walletAddress?: string;
}

// 쿠키를 위해 사용되는 타입
export interface UserInfo {
  id: string;
  num: number;
  role: string;
  iat: number;
  exp: number;
  refreshToken: string;
  accessToken: string;
  address: string;
  privateKey: string;
}
