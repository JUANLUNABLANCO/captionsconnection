import {
    Component,
    Renderer2,
    ViewChild,
    ElementRef,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'rrss-menu',
    templateUrl: './rrss-menu.element.html',
    styleUrls: ['./rrss-menu.element.sass'],
})
export class RrssMenuElement {
    @ViewChild('rrss_menu') rrssMenu: ElementRef;
    opened: boolean;

    constructor(private renderer: Renderer2) {
        this.opened = false;
    }

    OnInit() {}

    toogleRssMenu() {
        if (this.opened == false) {
            this.renderer.addClass(this.rrssMenu.nativeElement, 'menu-close');
            this.opened = true;
        } else {
            this.renderer.removeClass(
                this.rrssMenu.nativeElement,
                'menu-close'
            );
            this.opened = false;
        }
    }
}
