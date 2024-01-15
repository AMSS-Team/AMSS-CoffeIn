import { FriendsTabComponent } from './friends-tab.component';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';
import { User } from '../../models/user';
import * as http from "@angular/common/http";

describe('FriendsTabComponent', () => {
  let component: FriendsTabComponent;
  let usersService: UsersService;
  let friends: User;
  let friendsList: User[]=[];
  

  beforeEach(() => {
    jest.mock('@firebase/auth');
    var httParam: http.HttpHandler;
    const param = new http.HttpClient(httParam!);
    usersService = new UsersService(param);
    component = new FriendsTabComponent(usersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the `getFriends` method on initialization', () => {
    const spy = jest.spyOn(usersService, 'getFriends').mockReturnValue(of({ data: [friends] }));
    // get all the friends retuned in friendsList
    usersService.getFriends().subscribe(({data: friends}) => {
      friendsList = friends;
    });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call the `searchUser` method', () => {
    const spy = jest.spyOn(usersService, 'findByEmail').mockReturnValue(of({ data: friends }));
    component.searchUser('test@email.com');
    expect(spy).toHaveBeenCalledWith('test@email.com');
  });

  it('should call the `populateFriends` method', () => {
    const spy = jest.spyOn(usersService, 'getFriends').mockReturnValue(of({ data: [friends] }));
    component.populateFriends();
    expect(spy).toHaveBeenCalled();
  });

  it('should return `true` if the user is followed', () => {
    const user: User = {
      uid: '123', email: 'test@email.com', following: ['123'],
      invites: []
    };
    component.friends = [user];
    const result = component.isUserFollowed(user);
    expect(result).toBe(true);
  });

  it('should return `false` if the user is not followed', () => {
    const user: User = {
      uid: '123', email: 'test@email.com', following: [],
      invites: []
    };
    component.friends = [];
    const result = component.isUserFollowed(user);
    expect(result).toBe(false);
  });
});