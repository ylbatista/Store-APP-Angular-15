export type rol = "USER" | "ADMIN";

export interface User {
  id?:       string;
  userName: string;
  pwd:      string;
  rol?:      string;
  rememberMe: boolean;
}

export interface UserResponse {

  token:      string;
  tokenType:  string;
  rol:        string;

  name:       string;
  username:   string;
  last_name?: string;


}

export interface UserRegister {

  userName:  string;
  pwd:       string;
  pwd2?:     string;
  nombre:    string;
  apellido:  string;
  direccion: string;
}

export interface AllUsers {
  id:        string,
  pwd:       string,
  nombre:    string,
  apellido:  string,
  direccion: string,
  rol:       string,
  userName?: string,
}
