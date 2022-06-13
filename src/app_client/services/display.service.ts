import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DisplayService {
    showNavigation$;
    showFooter$;

    public constructor() {
        this.showNavigation$ = this.showNavigation.asObservable();
        this.showFooter$ = this.showFooter.asObservable();
    }
    private showNavigation: Subject<boolean> = new Subject<boolean>();

    private showFooter: Subject<boolean> = new Subject<boolean>();

    public setNavigationVisibility(visible: boolean): void {
        this.showNavigation.next(visible);
    }

    public setFooterVisibility(visible: boolean): void {
        this.showFooter.next(visible);
    }
}
