import {Input, Directive, OnInit} from '@angular/core';

@Directive ({
  selector: '[appNgInit]',
  exportAs: 'ngInit'
})
export class NgInitDirective implements OnInit {
  @Input() public ngInit: any;

  public ngOnInit() {
    if (this.ngInit) {
      this.ngInit();
    }
  }
}
