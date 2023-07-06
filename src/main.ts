import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

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
    IsActive: true,
    Name: 'Test hardik',
    InsuranceCaseTypeMaster: {
      CaseTypeId: {
        EnumDetailID: [6, 7, 8],
      },
    },
    NameOfICManager: 'HHH',
    RegisteredOffice: '123',
    Designation: {
      EnumDetailID: 1,
    },
    GSTNumber: 'sadasdsadsa',
    InsuranceTPAMaster: [
      {
        Id: '',
        TPAName: 'dsadsa',
      },
      {
        Id: '',
        TPAName: 'asdsa ',
      },
    ],
    Commment: '',
    EntityLocation: [
      {
        State: '',
        City: '',
        PinCode: '',
        Address: '',
        LocationId: {
          StateId: {
            ID: 1,
          },
          CityId: {
            ID: 6756,
          },
          Pincode: '123 123',
          Address: 'sadas sadsa d ',
          Id: '',
        },
        AppobjectId: '937057CA-5FA3-4871-A1D3-5EA6715C0937',
        Id: '',
        AppObjectId: '62213C2B-313E-4643-B343-F42E50131835',
      },
    ],
    EntityContact: [
      {
        AppobjectId: '62213C2B-313E-4643-B343-F42E50131835',
        ContactId: {
          Id: '',
          PrimaryEmail: 'dad@dd.com',
          PrimaryContactNumber: '3432432442',
        },
        Id: '',
      },
    ],
    TATTarget: 1111,
    SuccessTarget: 22,
    ProductsHandled: 3244,
  };

  Input2 = 'InsuranceCaseTypeMaster.CaseTypeId.EnumDetailID';

  ReadJson() {
    console.log('First Input: ', this.Input1);
    console.log('Second Input: ', this.Input2);
    var finalValue = this.ProcessJson(this.Input1);
    console.log('Result: ', finalValue);
  }

  verifyPropertyExist(passValue: any) {
    var isExist = true;
    var SplitString = this.Input2.split('.');
    var currentValue = passValue;
    if (SplitString.length > 1) {
      for (var counter = 0; counter < SplitString.length; counter++) {
        if (isExist == true) {
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
      console.log('lastvalue', lastValue);
      var currentValue = passValue;
      for (var counter = 0; counter < SplitString.length - 1; counter++) {
        if (currentValue && currentValue.hasOwnProperty(SplitString[counter])) {
          var compareObjCounter = SplitString.length - 2;
          if (counter == compareObjCounter) {
            if (Array.isArray(currentValue[SplitString[counter]][lastValue])) {
              var childValues = [];
              var keyProperty = SplitString[counter];
              console.log(keyProperty);
              console.log(currentValue[SplitString[counter]][lastValue].length);
              for (
                var childCount = 0;
                childCount <
                currentValue[SplitString[counter]][lastValue].length;
                childCount++
              ) {
                var setValue: { [keyProperty: string]: any } = {};
                setValue[keyProperty] =
                  currentValue[SplitString[counter]][lastValue][childCount];
                childValues.push(setValue);
              }
              OldValue[SplitString[counter - 1]] = childValues;
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

  ProcessJson(passValue: any) {
    if (this.verifyPropertyExist(passValue) == true) {
      return this.DeleteTheLastObjectProperty(passValue);
    } else {
      for (const property in passValue) {
        let objType = typeof passValue[property];
        // console.log(`${property}: ${passValue[property]}`);
        if (objType == 'object') {
          passValue[property] = this.ProcessJson(passValue[property]);
        }
      }
    }
    return passValue;
  }
}
bootstrapApplication(App);
