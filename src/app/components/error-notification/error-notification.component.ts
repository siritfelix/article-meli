import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-error-notification',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error-notification.component.html',
    styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnInit {
    errorMessage: string | null = null;

    constructor(private errorService: ErrorService) { }

    ngOnInit(): void {
        this.errorService.getError().subscribe(message => {
            this.errorMessage = message;
        });
    }

    clearError(): void {
        this.errorService.clearError();
    }
}