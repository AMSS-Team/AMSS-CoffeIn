import { FriendListItemComponent } from './friend-list-item.component';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';
import { User } from '../../models/user';
import * as http from "@angular/common/http";
import { MapService } from '../../services/map.service';
import * as toast from 'ngx-toastr';
import { ToastToken, ToastrService } from 'ngx-toastr';
import { CheckInModel } from '../../models/checkIn';
import { ResultListCheckinsDto } from '../../models/resultListCheckinsDto';

describe('FriendsTabComponent', () => {
  let component: FriendListItemComponent;
  let usersService: UsersService;
  let mapService: MapService;
  let friends: User;
  let friendsList: User[]=[];
  let res: ResultListCheckinsDto;
  let toastService: ToastrService;

  

  beforeEach(() => {
    jest.mock('@firebase/auth');
    jest.mock('ngx-toastr');
    var httParam: http.HttpHandler;
    const param = new http.HttpClient(httParam!);
    usersService = new UsersService(param);
    mapService = new MapService(toastService, usersService);

    component = new FriendListItemComponent(usersService, mapService, toastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleFollowUnfollow', () => {
    it('should call follow if not followed, and call unfollow if followed', () => {
      const followSpy = jest.spyOn(component, 'follow').mockImplementation();
      const unfollowSpy = jest.spyOn(component, 'unfollow').mockImplementation();

      component.followed = false;
      component.handleFollowUnfollow();
      expect(followSpy).toHaveBeenCalled();

      component.followed = true;
      component.handleFollowUnfollow();
      expect(unfollowSpy).toHaveBeenCalled();
    });
  });

  describe('follow', () => {
    it('should call followUser on usersService, deleteAllMarkers on mapService, and pinCheckIn on mapService', () => {
      const followSpy = jest.spyOn(usersService, 'followUser').mockReturnValue(of({}));
      const deleteSpy = jest.spyOn(mapService, 'deleteAllMarkers').mockImplementation(() => {});
      const pinSpy = jest.spyOn(mapService, 'pinCheckIn').mockImplementation(() => {});

      component.user = {
        uid: '1',
        email: 'test@email.com', following: [],
      invites: []
      
    };
      component.follow();

      expect(followSpy).toHaveBeenCalledWith('1');
      expect(deleteSpy).toHaveBeenCalled();
      expect(pinSpy).toHaveBeenCalled();
    });
  });

  describe('onInvite', () => {
    it('should call inviteUser on usersService and show success toast', () => {
      const spy = jest.spyOn(usersService, 'inviteUser').mockReturnValue(of({}));
      component.user = {
        uid: '1',
        email: 'test@email.com', following: [],
      invites: []
      
    };

      component.onInvite();

      expect(spy).toHaveBeenCalledWith('1');
    });
  });

  describe('unfollow', () => {
    it('should call unfollowUser on usersService', () => {
      const followSpy = jest.spyOn(usersService, 'unfollowUser').mockReturnValue(of({}));
      component.user = {
        uid: '1',
        email: 'test@email.com', following: [],
      invites: []
      
    };
      component.unfollow();

      expect(followSpy).toHaveBeenCalledWith('1');
    });
  });
  // do the same for method showStatusDetails:

  describe('showStatusDetails', () => {
    it('should call the `showStatusDetails` method on initialization', () => {
        const spy = jest.spyOn(usersService, 'getCheckIns').mockReturnValue(of({ data: res }));
        
        component.user = {
          uid: '1',
          email: 'test@email.com', following: [],
        invites: []
        
      };
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith({"userIds": ["1"]});
      });

    it('should call the `showStatusDetails` method', () => {
      const spy2 = jest.spyOn(component, 'showStatusDetails').mockImplementation();
      component.showStatusDetails();
      expect(spy2).toHaveBeenCalledWith();
    });

  });
});