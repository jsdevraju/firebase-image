import { ChangeEvent, FormSubmit } from "react";
import * as FireAuth from 'firebase/auth'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IRegister {
  username: string;
  email: string;
  password: string;
  cf_password: string;
}

export interface ILogin {
  email: string;
  password: string;
}


export interface IAuth extends FireAuth.User{}

export interface IProfile {
  fullname: string,
  email: string,
  address: string,
  phone: string,
  website: string,
  about: string,
}
export interface ICollection {
  id?: string,
  email?: string,
  title?: string,
  photos?: string,
  createAt?: string,
}
