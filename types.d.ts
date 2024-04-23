import { LoyaltyAccount, LoyaltyProgram, Location } from 'square';

export interface User {
  uid: string;
  given_name: string;
  family_name: string;
  email_address: string;
  phone_number: string;
  birthday: string;
}

export interface Loyalty {
  program: LoyaltyProgram;
  account: LoyaltyAccount;
  location: Location;
}
