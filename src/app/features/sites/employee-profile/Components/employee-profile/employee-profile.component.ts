import { Component } from '@angular/core';
import { FeatureEnum } from 'src/app/shared/models/enum/feature.enum';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent {

    featureEnum = FeatureEnum;

  hasFeature(value: FeatureEnum) {
      return SharedService.featureList.some(i => i == value);
    }
}
