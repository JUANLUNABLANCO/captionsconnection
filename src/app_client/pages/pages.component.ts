import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DisplayService } from '../services/display.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
    constructor(private displayService: DisplayService) {}

    showNavigation = true;
    showFooter = true;

    private navDestroyed: Subject<void> = new Subject<void>();
    private footDestroyed: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        this.displayService.showNavigation$
            .pipe(takeUntil(this.navDestroyed))
            .subscribe((visible: boolean) => {
                this.showNavigation = visible;
            });
        this.displayService.showFooter$
            .pipe(takeUntil(this.footDestroyed))
            .subscribe((visible: boolean) => {
                this.showFooter = visible;
            });
    }

    ngOnDestroy(): void {
        this.navDestroyed.next();
        this.footDestroyed.next();
    }
}
