import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {defer, from, map, Observable, switchMap} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {getAuth} from "@firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFirestore, private http: HttpClient) {
  }

  public getFollowed(): Observable<User[]> {
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.get<User[]>(`${environment.apiUrl}/follow/following`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      })
    );
  }

  public findByEmail(email: string): Observable<User | null> {
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.post<User>(`${environment.apiUrl}/follow/search`, { email }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }
}
