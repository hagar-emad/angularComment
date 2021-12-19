export interface User{
  ID:string|undefined,
  email: string;
  password: string;
  firstName:string;
  lastName:string;
  security?:string;
  country:string;
  city:string;
  jobTitle:string;
  company:string;
  employmentType:string;
  // repeatedPassword?: string;
}
