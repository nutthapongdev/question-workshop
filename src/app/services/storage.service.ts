import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public static readonly USER_KEY = 'user-auth';

  clean(): void {
    sessionStorage.clear();
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(StorageService.USER_KEY);
    sessionStorage.setItem(StorageService.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(StorageService.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public getUserFullName(): string {
    const userAuthData = sessionStorage.getItem(StorageService.USER_KEY);
    if (userAuthData) {
      const userAuth = JSON.parse(userAuthData);
      return userAuth.data.fullName;
    }
    return '';
  }

  public getToken(): string {
    const userAuthData = sessionStorage.getItem(StorageService.USER_KEY);
    if (userAuthData) {
      const userAuth = JSON.parse(userAuthData);
      return userAuth.data.accessToken;
    }
    return '';
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(StorageService.USER_KEY) !== null;
  }
}
