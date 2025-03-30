import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-code-input',
  imports: [CommonModule, InputOtpModule, FormsModule],
  templateUrl: './code-input.component.html',
  styleUrl: './code-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true,
    },
  ],
})
export class CodeInputComponent implements ControlValueAccessor {
  type = input<'text' | 'number' | 'password'>('number');
  name = input.required<string>();
  placeholder = input<string>();
  ghostText = input<string>();
  label = input<string>();
  invalid = input<boolean>(false);
  errorMesaage = input<string | null>();
  codeInputclass = input<string>('');
  size = input<'small' | 'large'>('small');
  disabled = signal<boolean>(false);
  length = input<number>(4);

  public value = '';

  public onChange: (value: string) => void = () => undefined;
  public onTouched: () => void = () => undefined;

  onInput(event: Event): void {
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
