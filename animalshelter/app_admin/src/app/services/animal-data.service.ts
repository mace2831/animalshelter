import { Inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class AnimalDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }
  url = 'http://localhost:3000/api/animals';
  baseUrl = 'http://localhost:3000/api';

  //Login endpoint
  login(user: User, passwd: string): Observable<AuthResponse>{
    return this.handleAuthAPICall('login', user, passwd);
  }

  //register endpoint
  register(user: User, passwd: string) : Observable<AuthResponse>{
    return this.handleAuthAPICall('register', user, passwd);
  }

  handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }

  //get the list of animals from the api

  getAnimals() : Observable<Animal[]>{
     
    return this.http.get<Animal[]>(this.url); 
  }

  addAnimal(formData: Animal) : Observable<Animal>{
    return this.http.post<Animal>(this.url, formData);
  }

  updateAnimal(formData: Animal) : Observable<Animal>{
    return this.http.put<Animal>(this.url + '/' + formData.rec_num, formData)
  }

  getAnimal(rec_num: string) : Observable<Animal[]> {
    return this.http.get<Animal[]>(this.url + '/' + rec_num);
  }

  deleteAnimal(rec_num: string): Observable<any>{
    return this.http.delete(`${this.url}/${rec_num}`);
  }

}
