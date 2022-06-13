// scrolling
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, TemplateRef, OnInit } from '@angular/core';
// ##### ngx-bootstrap
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// ##### servicios propios
import { ChannelService } from '../../../services/channel.service';
import { DisplayService } from '../../../services/display.service';

interface ErrorValidator {
    [s: string]: boolean;
}

@Component({
    selector: 'app-lp_youtuber',
    templateUrl: './lp_youtuber.component.html',
    styleUrls: ['./lp_youtuber.component.css'],
})
export class LpYoutuberComponent implements OnInit {
    title = 'Captions Connection';
    // errorMessage = null;
    // modalRef: BsModalRef;
    // // config = {
    // //     animated: true,
    // // };
    // // ###################### FORM
    // dataFromServer = {};
    // registered = false;
    // errorRegistered = false;
    // channelForm: FormGroup;
    // channelName: string;
    // ###################### alerts
    // @ViewChild('wrapper01') wrapper01: ElementRef; // $('#wrapper01)

    constructor(
        // private modalService: BsModalService,
        // private fb: FormBuilder,
        // private channelService: ChannelService, // private renderer: Renderer2
        private scroller: ViewportScroller,
        private router: Router, // scrolling
        private displayService: DisplayService
    ) {
        // this.creatingForm();
    }
    ngOnInit(): void {
        // this.router.navigate(['/']);
        this.displayService.setNavigationVisibility(false);
        this.displayService.setFooterVisibility(false);
    }
    ngOnDestroy(): void {
        this.displayService.setNavigationVisibility(true);
        this.displayService.setFooterVisibility(true);
    }
    scrollTo(section: string): void {
        console.log('in: ' + section);
        this.scroller.scrollToAnchor(section);
    }
    nothing(): void {}
    // creatingForm(): void {
    //     this.channelForm = this.fb.group({
    //         clientEmail: [
    //             '',
    //             [
    //                 Validators.required,
    //                 Validators.pattern(
    //                     "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$"
    //                 ),
    //             ],
    //         ],
    //         channelName: [
    //             '',
    //             [
    //                 Validators.required,
    //                 Validators.minLength(3),
    //                 Validators.pattern('^[a-zA-Z0-9.-_$#@%&ñÑáéíóúÁÉÍÓÚ]{3,}$'),
    //             ],
    //             this.checkChannelExist.bind(this),
    //             ,
    //         ],
    //         channelLanguage: ['', Validators.required],
    //         channelCategory: ['', Validators.required],
    //         clientInterestingNow: ['false', []],
    //     }); // this.checkChannelExist.bind(this)
    // }
    // // colorear los bordes del campo
    // campoNoValido(nombreCampo: string): boolean {
    //     return (
    //         this.getError(nombreCampo).invalid &&
    //         (this.getError(nombreCampo).touched ||
    //             this.getError(nombreCampo).dirty)
    //     );
    // }
    // campoValido(nombreCampo: string): boolean {
    //     return (
    //         this.getError(nombreCampo).valid &&
    //         (this.getError(nombreCampo).touched ||
    //             this.getError(nombreCampo).dirty)
    //     );
    // }
    // // control errores
    // hasErrorRequired(nombreCampo: string): boolean {
    //     return this.getError(nombreCampo).hasError('required');
    // }
    // invalidEmail(): boolean {
    //     return this.getError('clientEmail').hasError('pattern');
    // }
    // invalidName(): boolean {
    //     return this.getError('channelName').hasError('notAvailable');
    // }
    // invalidPatternName(): boolean {
    //     return this.getError('channelName').hasError('pattern');
    // }
    // // simplificamos el html
    // getError(controlName: string): any {
    //     return this.channelForm.get(controlName);
    // }
    // checkChannelExist(
    //     control: AbstractControl
    // ): Promise<ErrorValidator> | Observable<ErrorValidator> {
    //     console.log('control value: ', control.value);
    //     return new Promise((resolve, reject) => {
    //         this.channelService.checkChannelNameExists(control.value).subscribe(
    //             (result: any) => {
    //                 this.dataFromServer = result.isChannelNameAvailable;
    //                 if (this.dataFromServer === true) {
    //                     resolve(null); // no hay errores
    //                 } else {
    //                     resolve({ notAvailable: true }); // si hay erores
    //                 }
    //             },
    //             (error) => {
    //                 // HASK: LOS MENSAJES DE ERROR DEBEN SER INTERCEPTADOS POR UN HTTPINTERCEPTOR, PARA QUE
    //                 // NO SE MUESTREN EN EL NAVEGADOR, ADEMÁS PUEDES CONTROLAR EL HTTP O HTTPS DEPENDIENDO DE SI ESTAS EN
    //                 // PRODUCCION O DESARROLLO VER: https://medium.com/@nicowernli/angular-captura-todos-los-errores-de-httpclient-mediante-un-httpinterceptor-2cead03bb654
    //                 console.log(error);
    //                 this.errorMessage =
    //                     '¡Servidor no funciona!: No hay conexión.'; // error.message
    //                 // HASK: LOS MENSAJES DE ERROR DEBEN SER INTERCEPTADOS POR UN HTTPINTERCEPTOR, PARA QUE
    //                 // NO SE MUESTREN EN EL NAVEGADOR, ADEMÁS PUEDES CONTROLAR EL HTTP O HTTPS DEPENDIENDO DE SI ESTAS EN
    //                 // PRODUCCION O DESARROLLO VER: https://medium.com/@nicowernli/angular-captura-todos-los-errores-de-httpclient-mediante-un-httpinterceptor-2cead03bb654
    //             }
    //         );
    //     });
    // }
    // saveData(): void {
    //     console.log(this.channelForm.value);
    //     this.channelService.addChannelClient(this.channelForm.value).subscribe(
    //         (apiData) => {
    //             this.dataFromServer = apiData;
    //             console.log('dataFromServer: ', this.dataFromServer);
    //             // TODO: recibida la respuesta y cerrado el form, este se inhabilita y se redirecciona al inicio de la página
    //             this.deleteForm();
    //             this.closeModal();
    //             this.registered = true; // para el alert de exito
    //             this.errorRegistered = false;
    //             // this.openWrapper();
    //         },
    //         (error) => {
    //             // HASK: LOS MENSAJES DE ERROR DEBEN SER INTERCEPTADOS POR UN HTTPINTERCEPTOR, PARA QUE
    //             // NO SE MUESTREN EN EL NAVEGADOR, ADEMÁS PUEDES CONTROLAR EL HTTP O HTTPS DEPENDIENDO DE SI ESTAS EN
    //             // PRODUCCION O DESARROLLO VER: https://medium.com/@nicowernli/angular-captura-todos-los-errores-de-httpclient-mediante-un-httpinterceptor-2cead03bb654

    //             console.log(error);
    //             this.errorMessage =
    //                 'Servidor no funciona!: Intentando Grabar sin conexión'; // error.message
    //             this.errorRegistered = true; // para el alert de error
    //             this.registered = false;

    //             // HASK: LOS MENSAJES DE ERROR DEBEN SER INTERCEPTADOS POR UN HTTPINTERCEPTOR, PARA QUE
    //             // NO SE MUESTREN EN EL NAVEGADOR, ADEMÁS PUEDES CONTROLAR EL HTTP O HTTPS DEPENDIENDO DE SI ESTAS EN
    //             // PRODUCCION O DESARROLLO VER: https://medium.com/@nicowernli/angular-captura-todos-los-errores-de-httpclient-mediante-un-httpinterceptor-2cead03bb654
    //         }
    //     );
    // }
    // deleteForm(): void {
    //     this.channelForm.reset({
    //         channelCategory: '',
    //         channelLanguage: '',
    //     });
    //     this.registered = false;
    //     this.errorRegistered = false;
    //     this.errorMessage = null;
    // }
    // // ###################### FORM
    // // ###################### MODAL
    // openModal(template: TemplateRef<any>): void {
    //     this.deleteForm();
    //     this.modalRef = this.modalService.show(template); // .show(template, this.config);
    // }
    // // HASK: MIRAR TODO ESTO DE LOS MODALES EN https://valor-software.com/ngx-bootstrap/#/modals
    // // HASK: XQ LO DEL modalId no me cuadraba bien
    // closeModal(): void {
    //     this.modalRef.hide();
    // }
    // // ###################### MODAL
    // // ###################### ALERT
    // // openWrapper() {
    // //     // this.renderer.removeClass(this.wrapper01.nativeElement, 'wrapper-close');
    // // }
    // closeWrapper() {
    //     this.registered = false;
    //     this.errorRegistered = false;
    //     // this.renderer.addClass(this.wrapper01.nativeElement, 'wrapper-close');
    // }
}
