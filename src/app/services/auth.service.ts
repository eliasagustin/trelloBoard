import type {  UserResponse } from '@supabase/supabase-js'

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

import { BehaviorSubject, from } from 'rxjs';



import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null);
  
  constructor(private router: Router) { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    const user = this.supabase.auth.getUser().then((datos) => {
      //console.log('success, user: ', datos.data.user);
      this._currentUser.next(datos.data.user);
      if(datos.data.user) {
        this._currentUser.next(datos.data.user);
      } else {
        this._currentUser.next(false);
      }
      return datos.data.user
      //console.log('error: ', datos.error?.message);
    })
    .catch((error) => {
      console.log('error: ', error);
      return error
    })

    this.supabase.auth.onAuthStateChange((event, session) => {
      // console.log('event: ', event);
      // console.log('session: ', session);
      
      if (event == 'SIGNED_IN'){
        this._currentUser.next(session!.user)
      } else {
        this._currentUser.next(false);
        this.router.navigateByUrl('/', { replaceUrl: true });
      }
    });
  }
  // Borrar
  // public async getUser1(): Promise<User | null> {
  //   const data = await this.supabase.auth.getUser();
  //   return data.data.user
  // }
  // public async getUser2(): Promise<string | any> {
  //   const data = await (await this.supabase.auth.getUser()).data.user?.email;
  //   return data
  // }

  signInWithEmail(email: string){
    return this.supabase.auth.signInWithOtp({
      email,
    });
  }

  logout() {
    this.supabase.auth.signOut();
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

}
