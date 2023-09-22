import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="footer">
      Developed in angular and nx by
      <a href="https://twitter.com/@ravi_devrani">Ravindra Devrani</a>
    </div>
  `,
  styles: [
    `
      :host {
        text-align: center;
        padding: 20px 0px;
        font-size: 16px;
        margin-top: auto;
      }

      a {
        color: black;
      }
    `,
  ],
})
export class FooterComponent {}
