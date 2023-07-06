import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { splitNsName } from '@angular/compiler';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <button (click)="ReadJson()">click</button>
  `,
})
export class App {
  name = 'Angular';

  // JavaScript source code
  Input1 = {
    HospitalDoctor: [
      {
        HospitalId: {
          Name: 'CIMS Hospital',
          Id: 'ccfd61dd-5645-494d-b535-023dcd7d6cad',
        },
        Id: 'c2a35d38-b27f-4024-8f35-3f52d380d223',
        DoctorId: '326242fb-e8a7-4d57-9dbf-2335220ebb8f',
        DoctorBranch: {
          BranchId: [
            '92c5b7fa-1b87-4e2a-b47b-2c3413f0447c',
            '06155375-2f8c-4a49-a25a-d8c141d13376',
          ],
        },
      },
      {
        HospitalId: {
          Name: 'Sri Krishna Children Hospital',
          Id: 'd9b1a1b7-8ccd-4453-8d9b-04fd200c6c1b',
        },
        Id: 'e5b62f62-8c9f-4c52-a807-6977b228c797',
        DoctorId: '326242fb-e8a7-4d57-9dbf-2335220ebb8f',
        DoctorBranch: {
          BranchId: ['3ba58a8f-066a-46c2-89dd-c2b46d140167'],
        },
      },
    ],
    Name: 'Dr. Shri Krishnan Aiyar',
    DoctorQualification: {
      Qualification: {
        EnumDetailID: [6, 7, 8, 5],
      },
    },
    Speciality: 2,
    IsActive: true,
    AuthenticationType: {
      EnumDetailID: 1,
      Description: 'Genuine',
      Sequence: null,
      ID: 2571,
      EnumID: 2227,
      ParentEnumId: null,
      SystemValue: 'Genuine',
      DisplayValue: 'Genuine',
    },
    Remark:
      "Dr. Shri Krishnan Aiyar is best doctor and provide best treatment , thanks to the nursing staff who's Taking proper care.\n\n",
    EntityLocation: [
      {
        LocationId: {
          CityId: {
            StateID: 2,
            CityName: 'Nellimarla',
            ID: 3387,
          },
          CountryId: null,
          StateId: {
            CountryID: 101,
            StateName: 'Andhra Pradesh',
            ID: 2,
          },
          Pincode: '989 887',
          Address:
            'Sri Krishna School Rd, Saravana Nagar, Koundampalayam, Coimbatore, Tamil Nadu, India',
          Id: '79f36afd-a95c-4418-bcf4-c97961e9ad5f',
          GoogleLocationData:
            'Sri Krishna School Rd, Saravana Nagar, Koundampalayam, Coimbatore, Tamil Nadu, India',
          Longitude: null,
          Lattitude: null,
        },
        PrimaryKeyValue: '326242fb-e8a7-4d57-9dbf-2335220ebb8f',
        AppObjectId: '057c1748-c6d0-4294-9495-33cca69e824f',
        Id: 'f353bef8-fb52-4c9d-9a36-1009da3c5b97',
      },
    ],
    EntityContact: [
      {
        ContactId: {
          SecondaryEmail: null,
          PrimaryEmail: 'krishna@yopmail.com',
          PrimaryContactNumber: '7867867675',
          Id: '180a3720-2ad4-436f-b468-a944f7ee2477',
          SecondaryContactNumber: null,
        },
        IsDefault: null,
        IsRelativeContact: null,
        Id: 'a4cbc7bc-aa65-49ea-a4ed-8f964ffa68d3',
        Status: null,
        AppobjectId: '057c1748-c6d0-4294-9495-33cca69e824f',
        PrimaryKeyValue: '326242fb-e8a7-4d57-9dbf-2335220ebb8f',
      },
    ],
    RegNumber: '8978675',
    ImageId: {
      ID: 97,
      URL: 'https://tab-qa.techextensor.com/AppData/Phoenix/Attachments/Files/20230427061245246_1682575964120.png',
    },
    RecordInfo: {
      IsSystemRecord: null,
      BlueprintId: null,
      BlueprintStatusId: null,
      RecordId: '85096271-33b0-411f-b6c4-d753a895be3d',
      PrimaryKey: '326242fb-e8a7-4d57-9dbf-2335220ebb8f',
    },
    Id: '326242fb-e8a7-4d57-9dbf-2335220ebb8f',
    SrNumber: 'PCS',
    customParams: {
      Id: '326242fb-e8a7-4d57-9dbf-2335220ebb8f',
    },
    isEdit: true,
  };

  Input2 = 'DoctorQualification.Qualification.EnumDetailID';

  ReadJson() {
    console.log('First Input: ', this.Input1);
    console.log('Second Input: ', this.Input2);
    var finalValue = this.ProcessJson(this.Input1, false);
    console.log('Result: ', finalValue);

    var ReverseValue = this.ProcessJson(finalValue, true);
    console.log('Result Reverse: ', ReverseValue);
  }

  verifyPropertyExist(passValue: any, IsReverse: boolean) {
    var isExist = true;
    var SplitString = this.Input2.split('.');
    var currentValue = passValue;
    var maxValue = SplitString.length;
    if (IsReverse == true) {
      maxValue = maxValue - 1;
    }

    if (maxValue > 0) {
      for (var counter = 0; counter < maxValue; counter++) {
        if (isExist == true) {
          if (Array.isArray(currentValue) && currentValue.length > 0) {
            currentValue = currentValue[0];
          }
          if (
            currentValue &&
            currentValue.hasOwnProperty(SplitString[counter])
          ) {
            currentValue = currentValue[SplitString[counter]];
          } else {
            isExist = false;
          }
        }
      }
    }
    return isExist;
  }

  DeleteTheLastObjectProperty(passValue: any) {
    var SplitString = this.Input2.split('.');
    var OldValue;
    if (SplitString.length > 1) {
      var lastValue = SplitString[SplitString.length - 1];
      var currentValue = passValue;

      for (var counter = 0; counter < SplitString.length - 1; counter++) {
        if (currentValue && currentValue.hasOwnProperty(SplitString[counter])) {
          var compareObjCounter = SplitString.length - 2;

          if (counter == compareObjCounter) {
            if (Array.isArray(currentValue[SplitString[counter]][lastValue])) {
              var childValues = [];
              var keyProperty = SplitString[counter];

              for (
                var childCount = 0;
                childCount <
                currentValue[SplitString[counter]][lastValue].length;
                childCount++
              ) {
                var setValue: { [lastValue: string]: any } = {};
                setValue[lastValue] =
                  currentValue[SplitString[counter]][lastValue][childCount];
                childValues.push(setValue);
              }

              currentValue[SplitString[counter]] = childValues;
            } else {
              currentValue[SplitString[counter]] =
                currentValue[SplitString[counter]][lastValue];
            }
          } else {
            OldValue = currentValue;
            currentValue = currentValue[SplitString[counter]];
          }
        }
      }
    }
    return passValue;
  }

  AddThePropertyWithTheObject(passValue: any) {
    var SplitString = this.Input2.split('.');
    var OldValue;
    if (SplitString.length > 1) {
      var lastValue = SplitString[SplitString.length - 1];
      var currentValue = passValue;

      if (SplitString.length == 2) {
        var counter = 0;
        OldValue = currentValue;
        currentValue = currentValue[SplitString[counter]];
        counter++;
        var valueToBeSet: any;
        if (Array.isArray(currentValue)) {
          var finalValue = [];
          for (
            var childCounter = 0;
            childCounter < currentValue.length;
            childCounter++
          ) {
            finalValue.push(currentValue[childCounter][lastValue]);
          }
          valueToBeSet = finalValue;
        } else {
          valueToBeSet = currentValue[SplitString[counter]];
        }
        var keyPropery = SplitString[counter];
        var setValue: { [keyPropery: string]: any } = {};
        setValue[keyPropery] = valueToBeSet;
        OldValue[SplitString[counter - 1]] = setValue;
      } else {
        for (var counter = 0; counter < SplitString.length - 1; counter++) {
          if (counter == SplitString.length - 2) {
            console.log(currentValue);
            var valueToBeSet;
            console.log(SplitString[counter]);
            if (Array.isArray(currentValue[SplitString[counter]])) {
              var finalValue = [];
              for (
                var childCounter = 0;
                childCounter < currentValue[SplitString[counter]].length;
                childCounter++
              ) {
                finalValue.push(
                  currentValue[SplitString[counter]][childCounter][lastValue]
                );
              }
              valueToBeSet = finalValue;
            } else {
              valueToBeSet = currentValue[SplitString[counter]];
            }
            var keyPropery = SplitString[counter];
            var setValue: { [keyPropery: string]: any } = {};
            var finalValueSet: { [lastValue: string]: any } = {};
            finalValueSet[lastValue] = valueToBeSet;
            setValue[keyPropery] = finalValueSet;
            OldValue[SplitString[counter - 1]] = setValue;
          } else {
            OldValue = currentValue;
            currentValue = currentValue[SplitString[counter]];
          }
        }
      }
    }
    return passValue;
  }

  ProcessJson(passValue: any, IsReverse: boolean) {
    if (
      IsReverse == true &&
      this.verifyPropertyExist(passValue, IsReverse) == true
    ) {
      if (Array.isArray(passValue)) {
        for (var counter = 0; counter < passValue.length; counter++) {
          passValue[counter] = this.AddThePropertyWithTheObject(
            passValue[counter]
          );
        }
        return passValue;
      } else {
        return this.AddThePropertyWithTheObject(passValue);
      }
    } else if (
      IsReverse == false &&
      this.verifyPropertyExist(passValue, IsReverse) == true
    ) {
      if (Array.isArray(passValue)) {
        for (var counter = 0; counter < passValue.length; counter++) {
          passValue[counter] = this.DeleteTheLastObjectProperty(
            passValue[counter]
          );
        }
        return passValue;
      } else {
        return this.DeleteTheLastObjectProperty(passValue);
      }
    } else {
      for (const property in passValue) {
        let objType = typeof passValue[property];
        if (objType == 'object') {
          passValue[property] = this.ProcessJson(
            passValue[property],
            IsReverse
          );
        } else if (Array.isArray(passValue[property])) {
          for (
            var counter = 0;
            counter < passValue[property].length;
            counter++
          ) {
            passValue[property][counter] = this.ProcessJson(
              passValue[property][counter],
              IsReverse
            );
          }
        }
      }
    }
    return passValue;
  }
}
bootstrapApplication(App);
