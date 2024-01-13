import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {getAuth} from "@firebase/auth";
import {CheckInModel} from "../../models/checkIn";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {resolve} from "@angular/compiler-cli";
import {MapService} from "../../services/map.service";
import {ListCheckinsDto} from "../../models/listCheckinsDto";
import {CreateCheckInDto} from "../../models/CreateCheckInDto";

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  @Output("getCheckInDetails") getCheckInDetails: EventEmitter<any> = new EventEmitter();

  uid: string = "";
  isCheckedIn: boolean = false;

  formGroup: FormGroup = new FormGroup({
    'title' : new FormControl(""),
    'description': new FormControl("")
  });

  ngOnInit(): void { }

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private mapService: MapService
  ) {}


  public checkIn() {
    const user = getAuth().currentUser;

    if (user != null) {
      navigator.geolocation.getCurrentPosition(resp => {
        let latitude = resp.coords.latitude;
        let longitude = resp.coords.longitude;

        let checkIn: CreateCheckInDto = {
          lat: latitude,
          lng: longitude,
          description: this.formGroup.value.description,
          title: this.formGroup.value.title
        };
        this.isCheckedIn = true;
        console.log(checkIn);
        this.usersService.deteleCheckIn();
        this.mapService.deleteMarker();
        this.usersService.checkIn(user.uid, checkIn).subscribe(() => {
          this.toastr.success("Check in successful!");
          this.mapService.addMarker(latitude, longitude, this.formGroup.value.title, true, [user.displayName!], [user.uid], user.uid);
          this.formGroup.reset();
          this.getCheckInDetails.emit();
        });
      });

    }
  }



}
