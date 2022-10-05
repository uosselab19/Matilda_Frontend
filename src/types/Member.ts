export interface InsertMember {
  id?: string;
  password?: string;
  nickname?: string;
  email?: string;
}

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

export interface UpdateMemberKlaytn {
  walletAddress: string;
  walletPrivateKey: string;
}

export interface SigninMember {
  id: string;
  password: string;
}

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

export interface UserInfo {
  id: string;
  num:number;
  role: string;
  iat: number;
  exp: number;
  refreshToken: string;
  accessToken: string;
  address: string;
  privateKey: string;
}