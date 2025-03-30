import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  imports: [CommonModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  type = input<'text' | 'number' | 'password'>('text');
  name = input.required<string>();
  placeholder = input<string>();
  ghostText = input<string>();
  label = input<string>();
  invalid = input<boolean>(false);
  errorMesaage = input<string | null>();
  disabled = signal<boolean>(false);

  public value = '';

  // Use strict typings for the callbacks
  public onChange: (value: string) => void = () => undefined;
  public onTouched: () => void = () => undefined;

  // Event handler for input changes
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
  }

  // ControlValueAccessor interface methods
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
    // this.disabled = isDisabled;
  }
}
