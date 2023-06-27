import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent implements OnInit {

  private _disabled = true;
  @Input() set disabled(val) {
    this._disabled = val;
    if (!val) {
      this.inputRef.nativeElement.value = '';
      const timeout = setTimeout(() => {
        this.inputRef.nativeElement.focus();
        clearTimeout(timeout);
      }, 100);
    }
  }
  get disabled() {
    return this._disabled;
  }

  @Output() typing = new EventEmitter();

  @ViewChild('input') inputRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyup(e) {
    this.typing.emit({
      value: e.target.value,
      key: e.key
    });
  }

  onKeydownSpace(e) {
    if (!e.target.value || e.target.value.endsWith(' ')) {
      // Not allowing more than one space
      e.preventDefault();
      return;
    }
  }

  restrictKeys(e) {
    // Not allowing enter key
    e.preventDefault();
    return;
  }
}
