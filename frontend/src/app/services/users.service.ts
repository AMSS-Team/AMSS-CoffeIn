import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {defer, from, map, Observable, switchMap} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {getAuth} from "@firebase/auth";
import {CheckInModel} from "../models/checkIn";

import {ToastrService} from "ngx-toastr";
import {ListCheckinsDto} from "../models/listCheckinsDto";
import {ResultListCheckinsDto} from "../models/resultListCheckinsDto";
import {CreateCheckInDto} from "../models/CreateCheckInDto";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFirestore, private http: HttpClient, private toastr: ToastrService) {
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

  public followUser(userId: string){
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.post(`${environment.apiUrl}/follow/` + userId,null,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }

  public findByEmail(email: string): Observable<{data:User} | null> {
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.post<{data:User}>(`${environment.apiUrl}/follow/search`, { email }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }


  public checkIn(userId: string, checkInModel: CreateCheckInDto): Observable<{data: CheckInModel}> {
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.post<{data: CheckInModel}>(`${environment.apiUrl}/location/checkin`, checkInModel, {
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


  public getCheckIns(listCheckInDto: ListCheckinsDto): Observable<{data: ResultListCheckinsDto}> {
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.post<{ data: ResultListCheckinsDto }>(`${environment.apiUrl}/location/checkin/list`, listCheckInDto, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      })
    );
  }

  public getFriends():Observable<{ data: [User] }> {
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.get<{ data: [User] }>(`${environment.apiUrl}/follow/following`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }));
  }

  public deteleCheckIn(){
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.delete(`${environment.apiUrl}/location/checkin`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }));
  }
}
