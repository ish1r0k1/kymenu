import { User } from "../models/auth.model";

export class CheckSession {
  static type = '[Auth] CheckSession'
}

export class LoginWithGoogle {
  static type = '[Auth] LoginWithGoogle'
}

export class Logout {
  static type = '[Auth] Logout'
}

export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess'
}

export class LoginRedirect {
  static type = '[Auth] LoginRedirect'
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess'
  constructor(public user: User) {}
}

export class LoginFaild {
  static type = '[Auth] LoginFaild'
  constructor(public error: any) {}
}
