// ##### ng
import { Component, TemplateRef } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ChannelService } from '../../services/Channel.service';
import { Observable } from 'rxjs';

// ##### ngx-bootstrap
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

interface ErrorValidator {
    [s: string]: boolean;
}

@Component({
    selector: 'app-lpchannel',
    templateUrl: './lpchannel.component.html',
    styleUrls: ['./lpchannelComponent.sass'],
})
export class LpchannelComponent {
    title = 'Captions Connection';
    modalRef: BsModalRef;
    // config = {
    //   animated: true
    // };
    // ###################### FORM
    dataFromServer = {};
    registered = false;
    errorRegistered = false;
    channelForm: FormGroup;
    // channelName: string;

    constructor(
        private modalService: BsModalService,
        private fb: FormBuilder,
        private channelService: ChannelService
    ) {
        this.creatingForm();
    }
    creatingForm(): void {
        this.channelForm = this.fb.group({
            clientEmail: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$"
                    ),
                ],
            ],
            channelName: [
                '',
                [Validators.required, Validators.minLength(3)],
                Validators.pattern('^[a-zA-Z0-9.-_$#@%&ñÑáéíóúÁÉÍÓÚ]{3,}$'),
                this.checkChannelExist.bind(this),
            ],
            channelLanguage: ['', Validators.required],
            channelCategory: ['', Validators.required],
            clientInterestingNow: [false, []],
        }); // this.checkChannelExist.bind(this)
    }
    // colorear los bordes del campo
    campoNoValido(nombreCampo: string): boolean {
        return (
            this.getError(nombreCampo).invalid &&
            (this.getError(nombreCampo).touched ||
                this.getError(nombreCampo).dirty)
        );
    }
    campoValido(nombreCampo: string): boolean {
        return (
            this.getError(nombreCampo).valid &&
            (this.getError(nombreCampo).touched ||
                this.getError(nombreCampo).dirty)
        );
    }
    // control errores
    hasErrorRequired(nombreCampo: string): boolean {
        return this.getError(nombreCampo).hasError('required');
    }
    invalidEmail(): boolean {
        return this.getError('clientEmail').hasError('pattern');
    }
    invalidName(): boolean {
        return this.getError('channelName').hasError('notAvailable');
    }
    invalidPatternName(): boolean {
        return this.getError('channelName').hasError('pattern');
    }
    // simplificamos el html
    getError(controlName: string): any {
        return this.channelForm.get(controlName);
    }
    checkChannelExist(
        control: AbstractControl
    ): Promise<ErrorValidator> | Observable<ErrorValidator> {
        console.log('control value: ', control.value);
        return new Promise((resolve, reject) => {
            this.channelService.checkChannelNameExists(control.value).subscribe(
                (result: any) => {
                    this.dataFromServer = result.isChannelNameAvailable;
                    if (this.dataFromServer === true) {
                        resolve(null); // no hay errores
                    } else {
                        resolve({ notAvailable: true }); // si hay erores
                    }
                },
                (error) => {
                    console.log(error);
                    // HASK: tratamiento de errores desde el servidor
                }
            );
        });
    }
    saveData(): void {
        // console.log(this.channelForm.value);
        this.channelService.addChannelClient(this.channelForm.value).subscribe(
            (apiData) => {
                this.dataFromServer = apiData;
                console.log('dataFromServer: ', this.dataFromServer);
                // TODO: recibida la respuesta y cerrado el form, este se inhabilita y se redirecciona al inicio de la página
                this.deleteForm();
                this.closeModal(1);
                this.registered = true; // para el alert de exito
                this.errorRegistered = false;
            },
            (err) => {
                console.log(err.error);
                this.errorRegistered = true; // para el alert de error
                this.registered = false;
            }
        );
    }
    deleteForm(): void {
        // TODO: preguntar si está seguro de querer borrar el formulario con un alert o tooltip
        this.channelForm.reset({
            channelCategory: '',
            channelLanguage: '',
        });
    }
    // ###################### FORM
    // ###################### MODAL
    openModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template); // .show(template, this.config);
        this.deleteForm();
    }
    // HASK: MIRAR TODO ESTO DE LOS MODALES EN https://valor-software.com/ngx-bootstrap/#/modals
    // HASK: XQ LO DEL modalId no me cuadraba bien
    closeModal(modalId?: number): void {
        this.modalService.hide(modalId);
    }
    // ###################### MODAL
}
