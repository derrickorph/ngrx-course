import { AfterViewInit, Component } from '@angular/core';
import $ from 'jquery'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    $(function () {
      $.getScript('assets/js/gsap/gsap.min.js');
      $.getScript('assets/js/gsap/ScrollToPlugin.min.js');
      $.getScript('assets/js/gsap/ScrollTrigger.min.js');
      $.getScript('assets/js/vendor.min.js');
      $.getScript('assets/js/common.js');
    });
  }
}