import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = '';

  get showError(): boolean {
    return this.control ? this.control.invalid && (this.control.dirty || this.control.touched) : false;
  }
}
