import { Stat } from './stat';
import { User } from './user';

/**
 * Battle
 */
export class Battle {
  private: boolean;
  owner: User;
  createdAt: Date;
  members: Stat[];
}
