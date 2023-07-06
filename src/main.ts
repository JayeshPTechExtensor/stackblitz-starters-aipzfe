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
    IsActive: true,
    Name: 'Test hardik',
    InsuranceCaseTypeMaster: {
      CaseTypeId: {
        EnumDetailID: 6,
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

    if (maxValue > 1) {
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

  AddThePropertyWithTheObject(passValue: any) {
    var SplitString = this.Input2.split('.');
    var OldValue;
    if (SplitString.length > 1) {
      var lastValue = SplitString[SplitString.length - 1];
      var currentValue = passValue;
      for (var counter = 0; counter < SplitString.length - 1; counter++) {
        if (counter == SplitString.length - 2 && Array.isArray(currentValue)) {
          var finalValue = [];
          for (
            var childCounter = 0;
            childCounter < currentValue.length;
            childCounter++
          ) {
            finalValue.push(currentValue[childCounter][SplitString[counter]]);
          }
          var keyPropery = SplitString[counter];
          var setValue: { [keyPropery: string]: any } = {};
          var finalValueSet: { [lastValue: string]: any } = {};
          finalValueSet[lastValue] = finalValue;
          setValue[keyPropery] = finalValueSet;
          OldValue[SplitString[counter - 1]] = setValue;
        } else if (counter == SplitString.length - 2) {
          var keyPropery = SplitString[counter];
          var setValue: { [keyPropery: string]: any } = {};
          var finalValueSet: { [lastValue: string]: any } = {};
          finalValueSet[lastValue] = currentValue[SplitString[counter]];
          setValue[keyPropery] = finalValueSet;
          OldValue[SplitString[counter - 1]] = setValue;
        } else {
          OldValue = currentValue;
          currentValue = currentValue[SplitString[counter]];
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
      // console.log('Yes This is called.');
      this.AddThePropertyWithTheObject(passValue);
    } else if (
      IsReverse == false &&
      this.verifyPropertyExist(passValue, IsReverse) == true
    ) {
      return this.DeleteTheLastObjectProperty(passValue);
    } else {
      for (const property in passValue) {
        let objType = typeof passValue[property];
        if (objType == 'object') {
          passValue[property] = this.ProcessJson(
            passValue[property],
            IsReverse
          );
        }
      }
    }
    return passValue;
  }
}
bootstrapApplication(App);
