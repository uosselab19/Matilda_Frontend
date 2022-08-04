export interface InsertMember {
  id?: string;
  password?: string;
  nickname?: string;
  email?: string;
}

export interface UpdateMember {
  password?: string;
  nickname?: string;
  email?: string;
  profileImg?: string;
  walletAddress?: string;
  description?: string;
}

export interface SigninMember {
  id: string;
  password: string;
}

export interface SelectMember {
  createdAt?: string;
  description?: string;
  email?: string;
  id?: string;
  memberNum?: 0;
  nickname?: string;
  presetList?: [
    {
      additionalProp1?: 0;
      additionalProp2?: 0;
      additionalProp3?: 0;
    }
  ];
  profileImg?: string;
  thumbProfileImg?: string;
  walletAddress?: string;
}

export interface userInfo {
  id: string;
  num:number;
  role: string;
  iat: number;
  exp: number;
  token: string;
}