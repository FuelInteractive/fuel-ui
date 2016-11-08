import {Pipe} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({name: "safeStyle"})
export class SafeStylePipe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}