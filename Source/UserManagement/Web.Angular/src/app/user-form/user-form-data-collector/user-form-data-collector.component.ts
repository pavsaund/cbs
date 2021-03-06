import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { CommandCoordinator } from '../../services/CommandCoordinator';
import { Command } from '../../services/Command';
import { Guid } from '../../services/Guid';
import { Language } from '../../domain/language.model';
import { Sex } from '../../domain/sex';
import { RegisterDataCollector } from '../../domain/data-collector/RegisterDataCollector';
import { ToastrService } from 'ngx-toastr';
import { ChangeVillage } from '../../domain/data-collector/ChangeVillage';

export const DATA_COLLECTOR_PATH = 'data-collector';

@Component({
    templateUrl: './user-form-data-collector.component.html',
    styleUrls: ['./user-form-data-collector.component.scss']
})
export class UserFormDataCollectorComponent {
    locationSelected = false;
    defaultLat: number = 9.216515;
    defaultLng: number = 45.523637;
    selectedLat: number = this.defaultLat;
    selectedLng: number = this.defaultLng;

    phoneNumberString = '';
    command: RegisterDataCollector = new RegisterDataCollector();
    changeVillageCommand: ChangeVillage = new ChangeVillage();

    languageOptions = [{desc: Language[Language.English], id: Language.English},
                        {desc: Language[Language.French], id: Language.French}];
    sexOptions = [{ desc: Sex[Sex.Male], id: Sex.Male },
                 { desc: Sex[Sex.Female], id: Sex.Female }];

    constructor(
        private router: Router,
        private commandCoordinator: CommandCoordinator,
        private toastr: ToastrService
    ) {
        toastr.toastrConfig.positionClass = 'toast-top-center';
    }

    onLocationSelected(event){
        this.locationSelected = true;
        this.selectedLat = event.coords.lat;
        this.selectedLng = event.coords.lng;
        this.command.gpsLocation.latitude = this.selectedLat;
        this.command.gpsLocation.longitude = this.selectedLng;
    }

    submit() {
        this.command.dataCollectorId = Guid.create();
        this.command.phoneNumbers = this.phoneNumberString.split(',').map(number => number.trim());
        this.commandCoordinator.handle(this.command)
            .then(response => {
                console.log(response);
                if (response.success)  {
                    this.toastr.success('Successfully registered a new data collector!');
                    this.handleChangeVillage();
                    this.router.navigate(['list']);
                } else {
                    if (!response.passedSecurity) { // Security error
                        this.toastr.error('Could not register a new data collector because of security issues');
                    } else {
                        const errors = response.allValidationMessages.join('\n');
                        this.toastr.error('Could not register new data collector:\n' + errors);
                    }
                }
            })
            .catch(response => {
                console.log(response);
                if (!response.passedSecurity) { // Security error
                    this.toastr.error('Could not register a new data collector because of security issues');
                } else {
                    const errors = response.allValidationMessages.join('\n');
                    this.toastr.error('Could not register new data collector:\n' + errors);
                }
            });
    }

    handleChangeVillage() {
        if (this.changeVillageCommand.village != null && this.changeVillageCommand.village !== '') {
            this.changeVillageCommand.dataCollectorId = this.command.dataCollectorId;

            this.commandCoordinator.handle(this.changeVillageCommand)
            .then(response => {
                console.log(response);
                if (response.success)  {
                    this.toastr.success('Successfully added village to data collector!');
                } else {
                    if (!response.passedSecurity) { // Security error
                        this.toastr.error('Could not change village of data collector because of security issues');
                    } else {
                        const errors = response.allValidationMessages.join('\n');
                        this.toastr.error('Could not change village of data collector:\n' + errors);
                    }
                }
            })
            .catch(response => {
                console.log(response);
                if (!response.passedSecurity) { // Security error
                    this.toastr.error('Could not change village of data collector because of security issues');
                } else {
                    const errors = response.allValidationMessages.join('\n');
                    this.toastr.error('Could not change village of data collector:\n' + errors);
                }
            });
        }
    }
}
