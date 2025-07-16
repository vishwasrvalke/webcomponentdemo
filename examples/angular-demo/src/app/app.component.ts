import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'angular-demo';
  clickCount = 0;
  loading = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only load web component in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.loadWebComponent();
    }
  }

  private async loadWebComponent() {
    try {
      // Check if customElements is available before importing
      if (typeof customElements !== 'undefined') {
        await import('webcomponent-lib/custom-button.js' as any);
      }
    } catch (error) {
      console.error('Failed to load web component:', error);
    }
  }

  handleClick() {
    this.clickCount++;
  }

  async handleAsyncClick() {
    this.loading = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.loading = false;
    this.clickCount++;
  }
}
