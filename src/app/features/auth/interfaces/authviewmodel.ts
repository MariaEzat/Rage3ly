export interface LoginViewModel {
  mobile: string;
  password: string;
}

export interface RegisterViewModel {
  nationalNumber?: string;
  name: string;
  password: string;
  mobile: string;
  email?: string;
  confirmPassword: string;
}

export interface OtpViewModel {
  token: string;
  otp: string;
}
export interface ResendOtpViewModel {
  token: string;
}
export interface PhoneViewModel {
  mobile: string;
}
export interface ForgetpasswordViewModel {
  userId:string;
  password: string;
  confirmPassword:string;
}

