import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-field-error-display",
  templateUrl: "./field-error-display.component.html",
  styleUrls: ["./field-error-display.component.scss"]
})
export class FieldErrorDisplayComponent implements OnInit {

  @Input() requiredMsg: string | undefined;
  @Input() patternMsg: string | undefined;
  @Input() controlError: any;

  constructor() { }

  ngOnInit(): void {
  }

}
