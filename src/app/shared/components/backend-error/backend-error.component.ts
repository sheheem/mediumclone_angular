import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorResponse } from '../../types/backendError.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backend-error',
  templateUrl: './backend-error.component.html',
  styleUrls: ['./backend-error.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorComponent implements OnInit {

  @Input() errorMessage: BackendErrorResponse = {};

  backendErrors: string[] = [];

  ngOnInit(): void {
      this.backendErrors = Object.keys(this.errorMessage).map((backend) => {
        const messages  = this.errorMessage[backend].join(' ');
        return `${messages}`
      })
  }

}
