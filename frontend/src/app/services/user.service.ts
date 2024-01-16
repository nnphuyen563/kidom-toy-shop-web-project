import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_URL, USER_LOGIN_URL, USER_REGISETER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService: ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(USER_URL);
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);

          if (user.isAdmin) {
            this.toastrService.success(
              `Chào mừng admin trở lại!`,
              'Đăng nhập thành công'
            );
            
            return;
          }

          this.toastrService.success(
            `Chào bạn ${user.name} tới Kidom`,
            'Đăng nhập thành công'
          );
        },
        error: (errorRes) => {
          this.toastrService.error(errorRes.error, 'Đăng nhập thất bại');
        }
      })
    );
  } 

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISETER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Chào bạn ${user.name} tới Kidom`,
            'Đăng ký thành công'
          );
        },
        error: (errorRes) => {
          this.toastrService.error(errorRes.error, 'Đăng ký thất bại');
        }
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
