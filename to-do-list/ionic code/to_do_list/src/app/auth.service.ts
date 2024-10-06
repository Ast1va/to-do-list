
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setSession(authResult: any) {
    localStorage.setItem('user', JSON.stringify(authResult));
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getHomePage(): string {
    const user = this.getUser();
    return user.homePage || '/default-home'; // Default home sayfası
  }
}
