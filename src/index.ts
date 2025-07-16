// Library entry point for consuming the web component in other frameworks
export { CustomButton } from "./components/custom-button.js";

// Auto-register the component when imported
import "./components/custom-button.js";

// Type definitions for TypeScript consumers
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "custom-button": {
                variant?: "primary" | "secondary" | "danger";
                size?: "small" | "medium" | "large";
                disabled?: boolean;
                loading?: boolean;
                children?: any; // React.ReactNode or similar
                onClick?: (event: CustomEvent) => void;
            };
        }
    }
}

// Make the component available globally
if (typeof window !== "undefined") {
    import("./components/custom-button.js");
}
