import { AfterViewInit, Component } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit{
 ngAfterViewInit(): void {
     $(function () {
       $.getScript('assets/js/gsap/gsap.min.js');
       $.getScript('assets/js/gsap/ScrollToPlugin.min.js');
       $.getScript('assets/js/gsap/ScrollTrigger.min.js');
       $.getScript('assets/js/vendor.min.js');
       $.getScript('assets/js/common.js');
     })
  }
}
