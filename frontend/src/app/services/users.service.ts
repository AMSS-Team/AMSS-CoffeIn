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
import {MapService} from "./map.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFirestore, private http: HttpClient, private toastr: ToastrService) {
  }

  public followUser(userId: string){
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.post(`${environment.apiUrl}/follow/${userId}`,null,{
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
      })
    );
  }

  public unfollowUser(userId: string) {
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.delete(`${environment.apiUrl}/follow/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
    );
  }

  public findByEmail(email: string): Observable<{data:User}> {
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

  public joinCheckIn(targetUid: string){
    const user = getAuth().currentUser;
    return from(user!.getIdToken()).pipe(
      switchMap((token) => {
        return this.http.post(`${environment.apiUrl}/location/checkin/join/` + targetUid, null, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    ));
  }

  public getCurrentCheckIn(){
    const user = getAuth().currentUser;
    let listCheckinsDto: ListCheckinsDto = {
      userIds: [user!.uid],
    }
    let currentCheckIn: CheckInModel | null = null;
    this.getCheckIns(listCheckinsDto).subscribe((checkIns) => {
      if (Object.values(checkIns.data).length > 0)
      {
        (Object.values(checkIns.data)!).forEach((checkIn) => {
          if (checkIn!.timestamp > (new Date().getTime() - 1000 * 60 * 60 * 2)) {
            currentCheckIn = checkIn;
          }
        });
      }
    });
    return currentCheckIn;
  }

}





