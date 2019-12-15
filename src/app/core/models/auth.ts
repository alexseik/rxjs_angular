export interface RequestAuth {
  email: string;
  password: string;
}

export interface Auth {
  name: string;
  token: string;
}

export interface AccessToken {
  access_token: string;
}
