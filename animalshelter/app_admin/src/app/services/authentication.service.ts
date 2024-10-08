import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { AnimalDataService } from './animal-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
  private animalDataService:AnimalDataService) { }

  authResp: AuthResponse = new AuthResponse();

  public getToken():string{
    let out: any;
    out= this.storage.getItem('animal-token');

    if(!out)
      {
        return '';
      }
    return out;
  }

  public saveToken(token:string):void{
    this.storage.setItem('animal-token', token);
  }

  public logout():void{
    this.storage.removeItem('animal-token');
  }

  public isLoggedIn():boolean{
    const token : string = this.getToken();
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp>(Date.now()/1000);
    }else{
      return false;
    }
  }

  public getCurrentUser():User{
    const token: string = this.getToken();
    const { email, name} = JSON.parse(atob(token.split('.')[1]));
    return{email, name} as User;
  }

  public login(user: User, passwd: string):void{
    this.animalDataService.login(user,passwd)
    .subscribe({
      next: (value: any)=>{
        if(value)
          {
            console.log(value);
            this.authResp=value;
            this.saveToken(this.authResp.token);
          }
      },
      error:(error:any)=>{
        console.log('Error: ' + error);
      }
    })
  }

  public register(user: User, passwd:string):void{
    this.animalDataService.register(user, passwd)
    .subscribe({
      next: (value:any)=>{
        if(value)
          {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
      },
      error: (error: any) =>{
        console.log('Error: ' + error);
      }
    })
  }
}
