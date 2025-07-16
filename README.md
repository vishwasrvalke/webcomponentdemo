# Web Component Demo

This project demonstrates how to create a reusable web component button and use it across different frameworks (React and Angular).

## 🚀 Features

-   **Framework-agnostic Web Component**: Built with vanilla TypeScript
-   **React Integration**: Example React app consuming the web component
-   **Angular Integration**: Example Angular app consuming the web component
-   **Multiple Variants**: Primary, Secondary, Danger button styles
-   **Multiple Sizes**: Small, Medium, Large button sizes
-   **Interactive States**: Disabled, Loading states with animations
-   **Accessibility**: Focus management and keyboard navigation
-   **Customizable**: Easy to extend and modify

## 📁 Project Structure

```
webcomponentdemo/
├── src/
│   ├── components/
│   │   └── custom-button.ts          # Main web component
│   ├── index.ts                      # Library entry point
│   ├── main.ts                       # Demo application
│   └── style.css                     # Demo styles
├── examples/
│   ├── react-demo/                   # React app example
│   │   ├── src/
│   │   │   ├── CustomButton.tsx      # React wrapper component
│   │   │   └── App.tsx               # React demo app
│   │   └── package.json
│   └── angular-demo/                 # Angular app example
│       ├── src/
│       │   └── app/
│       │       ├── app.component.ts  # Angular demo component
│       │       └── app.component.css
│       └── package.json
├── dist/                             # Built web component library
├── package.json
└── vite.config.ts                    # Build configuration
```

## 🛠️ Installation & Development

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Setup

1. **Clone the repository**:

    ```bash
    git clone <your-repo-url>
    cd webcomponentdemo
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5174](http://localhost:5174) to view the web component demo.

### Build Library

To build the web component library:

```bash
npm run build
```

This creates distributable files in the `dist/` directory:

- `custom-button.js` (ES module)
- `custom-button.umd.cjs` (UMD module)

### 🔗 Symlink Architecture

Both React and Angular demos use **symlinks** to consume the web component directly from the root `dist/` folder:

```bash
# Symlinks in demos point to root dist
examples/react-demo/src/dist -> ../../../dist
examples/angular-demo/src/dist -> ../../../dist
```

This ensures:
- ✅ Single source of truth (root dist folder)
- ✅ Automatic updates when rebuilding the main component
- ✅ No duplicate files across demos
- ✅ Consistent versioning across all implementations

## 🔧 React Example

### Setup React Demo

```bash
cd examples/react-demo
npm install
npm start
```

### Usage in React

```tsx
import CustomButton from "./CustomButton";

function App() {
    const handleClick = () => {
        console.log("Button clicked!");
    };

    return (
        <div>
            <CustomButton variant="primary" onClick={handleClick}>
                Click me!
            </CustomButton>
        </div>
    );
}
```

## 🔧 Angular Example

### Setup Angular Demo

```bash
cd examples/angular-demo
npm install
npx ng build
npx serve dist/angular-demo
```

The Angular demo is available at: http://localhost:3000

### Usage in Angular

```typescript
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <custom-button
      variant="primary"
      (button-click)="handleClick()">
      Click me!
    </custom-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Import the compiled web component
    import('../components/custom-button.js');
  }

  handleClick() {
    console.log('Button clicked!');
  }
}

    handleClick() {
        console.log("Button clicked!");
    }
}
```

## 🎨 Web Component API

### Attributes

-   `variant`: `"primary" | "secondary" | "danger"` (default: "primary")
-   `size`: `"small" | "medium" | "large"` (default: "medium")
-   `disabled`: Boolean attribute
-   `loading`: Boolean attribute

### Events

-   `button-click`: Fired when the button is clicked (not disabled/loading)

### Example Usage

```html
<!-- Basic usage -->
<custom-button>Click me!</custom-button>

<!-- With attributes -->
<custom-button variant="danger" size="large" disabled>
    Disabled Button
</custom-button>

<!-- With JavaScript -->
<script>
    const button = document.querySelector("custom-button");
    button.addEventListener("button-click", (event) => {
        console.log("Button clicked!", event.detail);
    });
</script>
```

## 🎨 Styling

The web component uses CSS custom properties for theming:

```css
custom-button {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --secondary-color: #6b7280;
    --danger-color: #dc2626;
    --disabled-color: #d1d5db;
    --border-radius: 0.375rem;
}
```

## 🧪 Testing

Each example application includes its own testing setup:

### React Tests

```bash
cd examples/react-demo
npm test
```

### Angular Tests

```bash
cd examples/angular-demo
npm test
```

## 📦 Distribution

To use the web component in other projects:

1. **Install from npm** (if published):

    ```bash
    npm install your-web-component-package
    ```

2. **Or use the built files**:

    ```html
    <script src="dist/custom-button.umd.cjs"></script>
    ```

3. **Or import as ES module**:
    ```javascript
    import "./dist/custom-button.js";
    ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Resources

-   [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
-   [Custom Elements Spec](https://html.spec.whatwg.org/multipage/custom-elements.html)
-   [React and Web Components](https://react.dev/reference/react-dom/components#custom-html-elements)
-   [Angular Elements](https://angular.dev/guide/elements)
