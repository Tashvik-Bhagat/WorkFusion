import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dropdownVisible = false;
  lastScrollTop = 0;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeDropdown() {
    this.dropdownVisible = false;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const currentScroll = window.scrollY;

    // Show or hide navbar based on scroll direction
    if (currentScroll > this.lastScrollTop) {
      // Scrolling down - hide navbar
      navbar.classList.remove('show');
      navbar.classList.add('hide');
    } else {
      // Scrolling up - show navbar
      navbar.classList.remove('hide');
      navbar.classList.add('show');
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
