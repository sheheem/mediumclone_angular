import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  constructor() { }

  setToken(key: string, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error setting token:', e);
    }
  }

  getToken(key: string): unknown {
    try {
      const localStorageData = localStorage.getItem(key);
      return localStorageData ? JSON.parse(localStorageData) : null;
    } catch (e) {
      console.log("Error fetching token:", e);
      return null;
    }
  }
}
