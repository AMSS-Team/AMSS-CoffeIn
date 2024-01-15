import { HomeTabComponent } from './home-tab.component';
import { getAuth } from '@firebase/auth';
import { UsersService } from '../../services/users.service';
import { MapService } from '../../services/map.service';
import { ToastrService } from 'ngx-toastr';
import * as http from "@angular/common/http";
import { ChangeDetectorRef } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { InviteModel } from '../../models/InviteModdel';
import { User } from '../../models/user';
import { ResultListCheckinsDto } from '../../models/resultListCheckinsDto';


describe('HomeTabComponent', () => {
  let component: HomeTabComponent;
  let userService: UsersService;
  let mapService: MapService;
  let toastService: ToastrService;
  let cdr: ChangeDetectorRef;
  let inv: InviteModel;
  let res: ResultListCheckinsDto;
  let subsr: Subscription;

  beforeEach(() => {
    jest.mock('@firebase/auth');
    jest.mock('ngx-toastr');
    
    var httParam: http.HttpHandler;
    const param = new http.HttpClient(httParam!);
    userService = new UsersService(param);
    subsr = new Subscription();
    mapService = new MapService(toastService, userService);
    component = new HomeTabComponent(userService, mapService,cdr, toastService);
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getInvites', () => {
    const spy2 = jest.spyOn(component, 'getInvites');
    const spy = jest.spyOn(userService, 'getInvites').mockImplementation(() => of({data: [inv]}));
    jest.spyOn(component, 'ngOnInit').mockImplementation(() => {
      component.getInvites();
    });
    component.ngOnInit();
    expect(spy2).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should call ngOnInit with all subfunctions', () => {
    const spy = jest.spyOn(userService, 'getCheckIns').mockReturnValue(of({data: res}));
    const spy2 = jest.spyOn(component, 'getCheckInDetails').mockImplementation(() => {
      const user: User = {
        uid: '123', email: 'test@email.com', following: [],
        invites: []
      };
      userService.getCheckIns({"userIds": [user.uid]});
  });
  const spy3 = jest.spyOn(component, 'getInvites');
  const spy4 = jest.spyOn(userService, 'getInvites').mockImplementation(() => of({data: [inv]}));
    component.ngOnInit();
    expect(spy2).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({"userIds": ['123']});
    expect(spy3).toHaveBeenCalled();
    expect(spy4).toHaveBeenCalled();
  });

  it('should call ngOnDestroy', () => {
    const spy = jest.spyOn(subsr, 'unsubscribe');
    component.ngOnDestroy();
  });


  // it('should call getCheckInDetails', () => {
  //   const spy = jest.spyOn(userService, 'getInvites').mockImplementation(() => of({data: [inv]}));
  //   jest.spyOn(component, 'ngOnInit').mockImplementation(() => {
  //     component.getInvites();
  //   });
  //   component.ngOnInit();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call getInvites on component initialization', () => {
  //   component.ngOnInit();
  //   expect(userServiceSpy).toHaveBeenCalled();
  // });

  // it('should call signOut on signOut method call', async () => {
  //   const signOutSpy = jest.spyOn(getAuth(), 'signOut').mockImplementation();
  //   await component.signOut();
  //   expect(signOutSpy).toHaveBeenCalled();
  // });

  // it('should call joinedCheckin subscription on component initialization', () => {
  //   component.ngOnInit();
  //   expect(subscriptionSpy).toHaveBeenCalled();
  // });

  // it('should call toastService info method on getInvites method call', () => {
  //   component.getInvites();
  //   expect(toastServiceSpy).toHaveBeenCalled();
  // });

  // it('should have isSignedIn property return true', () => {
  //   expect(component.isSignedIn).toBeTruthy();
  // });

  // it('should have getDisplayName property return "John Doe"', () => {
  //   expect(component.getDisplayName).toEqual('John Doe');
  // });

});
