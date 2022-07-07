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

export interface LoginMember {
  id:string;
  password: string;
}