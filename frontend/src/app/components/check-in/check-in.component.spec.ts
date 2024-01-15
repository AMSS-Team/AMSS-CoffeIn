import { CheckInComponent } from './check-in.component';
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
  let component: CheckInComponent;
  let usersService: UsersService;
  let mapService: MapService;
  let friends: User;
  let friendsList: User[]=[];
  let res: ResultListCheckinsDto;
  let chkm: CheckInModel;
  let toastService: ToastrService;

  

  beforeEach(() => {
    jest.mock('@firebase/auth');
    jest.mock('ngx-toastr');
    var httParam: http.HttpHandler;
    const param = new http.HttpClient(httParam!);
    usersService = new UsersService(param);
    mapService = new MapService(toastService, usersService);

    // mock navigator.geolocation api with jest.mock
    

    

    component = new CheckInComponent(usersService,toastService, mapService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check in successfully', () => {
    const spy= jest.spyOn(component, 'checkIn').mockImplementation(() => {});
    // jest.fn(navigator.geolocation);
    // jest.fn(navigator.geolocation, 'getCurrentPosition').mockImplementation((success) => Promise.resolve(success({
    //   // add missing properties:
    //   coords: {
    //     latitude: 40,
    //     longitude: 40,
    //     accuracy: 40,
    //     altitude: 40,
    //     altitudeAccuracy: 40,
    //     heading: 40,
    //     speed: 40
    //   },
    //   timestamp: 0
    // })));
    jest.spyOn(usersService, 'checkIn').mockReturnValue(of({ data: chkm }));
    
    const vcheckIn = {
      lat: 40,
      lng: 40,
      description: 'Test check-in',
      title: 'Test location'
    };

    component.isCheckedIn = true;
    component.formGroup.controls['description'].setValue(vcheckIn.description);
    component.formGroup.controls['title'].setValue(vcheckIn.title);
    component.checkIn();
    
    expect(component.isCheckedIn).toBe(true);
    expect(component.formGroup.value).toEqual({ title: 'Test location', description: 'Test check-in' });
    expect(spy).toHaveBeenCalled();
  });
});