import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    register(user: User) {
        return this.http.post(`http://localhost:4000/user/register`, user);
    }

    getById() {
        return this.http.get<User>(`http://localhost:4000/user/getById`);
    }
}