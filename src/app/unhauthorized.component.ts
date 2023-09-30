import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-unhauthorized",
  standalone: true,
  imports: [],
  template: ` <h1 style="color:red">Unauthorized</h1> `,
  styles: [
    `
      :host {
        margin: 15px 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnhauthorizedComponent {}
