import { Injectable, Inject } from '@angular/core';
import { MY_USER_TOKEN } from '../injection-tokens/tokens';

@Injectable()
export class UsersService {
  constructor(@Inject(MY_USER_TOKEN) userToken: string) { 
    console.log("El servicio ha sido instanciado", userToken)
  }
  
  getUsers(){
    console.log('Se obtuvieron los usuarios de la base de datos real');
    return['Juan', 'Josue', 'Maria', 'Ana'];
  }
}
