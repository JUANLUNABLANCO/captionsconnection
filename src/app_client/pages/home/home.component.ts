import {
    HostListener,
    Component,
    ElementRef,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
// import { Subject, fromEvent } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
@HostListener('scroll', ['$event'])
export class HomeComponent {
    @ViewChild('Slide01') Slide01: ElementRef; // referencia al elemento que contiene este identificador #Slide01
    constructor(private router: Router, private renderer: Renderer2) {}
    // ####### navigate to lp_channel page
    goTo(url: string): void {
        this.router.navigate([url]); // 'lp_channel'
    }
    addClassToSection() {
        console.log(this.Slide01.nativeElement);
        // this.renderer.addClass(this.Slide01.nativeElement, '');
        // this.renderer.addClass(this.Slide01.nativeElement, '');
    }

    // getYPosition(e: Event): string {
    //     // return (e.target as Element).scrollTop;
    //     return typeof (e.target as Element).scrollTop;
    // }
}
