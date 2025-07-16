import "./components/custom-button.ts";
import "./style.css";

// Demo application
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1>Custom Button Web Component Demo</h1>
    <p>This demonstrates a reusable web component that works across frameworks.</p>
    
    <div class="demo-section">
      <h2>Variants</h2>
      <div class="button-group">
        <custom-button variant="primary">Primary Button</custom-button>
        <custom-button variant="secondary">Secondary Button</custom-button>
        <custom-button variant="danger">Danger Button</custom-button>
      </div>
    </div>

    <div class="demo-section">
      <h2>Sizes</h2>
      <div class="button-group">
        <custom-button size="small">Small</custom-button>
        <custom-button size="medium">Medium</custom-button>
        <custom-button size="large">Large</custom-button>
      </div>
    </div>

    <div class="demo-section">
      <h2>States</h2>
      <div class="button-group">
        <custom-button disabled>Disabled</custom-button>
        <custom-button loading>Loading</custom-button>
      </div>
    </div>

    <div class="demo-section">
      <h2>Interactive Example</h2>
      <custom-button id="interactive-btn">Click me!</custom-button>
      <p id="click-count">Clicks: 0</p>
    </div>
  </div>
`;

// Add interactivity to the demo
let clickCount = 0;
const interactiveBtn = document.querySelector("#interactive-btn");
const clickCountElement = document.querySelector("#click-count");

interactiveBtn?.addEventListener("button-click", () => {
    clickCount++;
    if (clickCountElement) {
        clickCountElement.textContent = `Clicks: ${clickCount}`;
    }
});
