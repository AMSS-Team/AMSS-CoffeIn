import { UsersService } from './users.service';
import * as http from "@angular/common/http";
import {getAuth} from "@firebase/auth";


jest.mock('@angular/common/http')
jest.mock('@firebase/auth')

describe('UsersService', () => {
  let fixture: UsersService;

  beforeEach(() => {
    jest.mock('@firebase/auth');
    var httParam: http.HttpHandler;
    const param = new http.HttpClient(httParam!);
    fixture = new UsersService(param);
  });

    it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should call followUser', () => {
    const spy = jest.spyOn(fixture, 'followUser');
    fixture.followUser("test");
    expect(spy).toHaveBeenCalled();
  });

  it('should call unfollowUser', () => {
    const spy = jest.spyOn(fixture, 'unfollowUser');
    fixture.unfollowUser("test");
    expect(spy).toHaveBeenCalled();
  });

  it('should call findByEmail', () => {
    const spy = jest.spyOn(fixture, 'findByEmail');
    fixture.findByEmail("olive.olive.30@example.com");
    expect(spy).toHaveBeenCalled();
  });

});
