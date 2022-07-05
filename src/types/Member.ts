import { SelectItem } from './Item';
import { SelectContract } from './Contract';

export interface SelectMember {
  boughtContracts?: [SelectContract];
  createdAt?: string;
  description?: string;
  email?: string;
  id?: string;
  items?: [SelectItem];
  memberNum?: 0;
  nickname?: string;
  password?: string;
  profileImg?: string;
  soldContracts?: [SelectContract];
  thumbProfileImg?: string;
  walletAddress?: string;
}
