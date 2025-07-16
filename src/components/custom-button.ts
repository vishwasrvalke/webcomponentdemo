/**
 * Custom Button Web Component
 * A reusable button component that can be used across different frameworks
 */

export interface ButtonProps {
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    loading?: boolean;
}

export class CustomButton extends HTMLElement {
    private button!: HTMLButtonElement;
    private loadingSpinner!: HTMLSpanElement;

    static get observedAttributes() {
        return ["variant", "size", "disabled", "loading"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.setupEventListeners();
    }

    private render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --primary-color: #2563eb;
          --primary-hover: #1d4ed8;
          --secondary-color: #6b7280;
          --secondary-hover: #4b5563;
          --danger-color: #dc2626;
          --danger-hover: #b91c1c;
          --disabled-color: #d1d5db;
          --text-color: white;
          --border-radius: 0.375rem;
          --transition: all 0.2s ease-in-out;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: inherit;
          font-weight: 500;
          text-decoration: none;
          border: none;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: var(--transition);
          outline: none;
          position: relative;
          overflow: hidden;
        }

        .button:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }

        /* Variants */
        .button--primary {
          background-color: var(--primary-color);
          color: var(--text-color);
        }

        .button--primary:hover:not(:disabled) {
          background-color: var(--primary-hover);
        }

        .button--secondary {
          background-color: var(--secondary-color);
          color: var(--text-color);
        }

        .button--secondary:hover:not(:disabled) {
          background-color: var(--secondary-hover);
        }

        .button--danger {
          background-color: var(--danger-color);
          color: var(--text-color);
        }

        .button--danger:hover:not(:disabled) {
          background-color: var(--danger-hover);
        }

        /* Sizes */
        .button--small {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .button--medium {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        }

        .button--large {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        /* States */
        .button:disabled {
          background-color: var(--disabled-color);
          color: #9ca3af;
          cursor: not-allowed;
        }

        .button--loading {
          cursor: not-allowed;
        }

        /* Loading spinner */
        .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Ripple effect */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
          transform: scale(0);
          animation: ripple 0.6s linear;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      </style>
      
      <button class="button button--primary button--medium" type="button">
        <span class="spinner" style="display: none;"></span>
        <slot></slot>
      </button>
    `;

        this.button = this.shadowRoot.querySelector(".button")!;
        this.loadingSpinner = this.shadowRoot.querySelector(".spinner")!;

        this.updateButton();
    }

    private setupEventListeners() {
        this.button.addEventListener("click", (e) => {
            if (this.disabled || this.loading) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            this.createRipple(e);

            // Dispatch custom event
            this.dispatchEvent(
                new CustomEvent("button-click", {
                    detail: {
                        timestamp: Date.now(),
                        variant: this.variant,
                        size: this.size,
                    },
                    bubbles: true,
                })
            );
        });
    }

    private createRipple(event: MouseEvent) {
        const button = this.button;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    private updateButton() {
        if (!this.button) return;

        // Update classes
        this.button.className = `button button--${this.variant} button--${this.size}`;

        if (this.loading) {
            this.button.classList.add("button--loading");
        }

        // Update disabled state
        this.button.disabled = this.disabled || this.loading;

        // Update loading spinner
        if (this.loading) {
            this.loadingSpinner.style.display = "block";
        } else {
            this.loadingSpinner.style.display = "none";
        }
    }

    // Getters
    get variant(): "primary" | "secondary" | "danger" {
        return (this.getAttribute("variant") as any) || "primary";
    }

    get size(): "small" | "medium" | "large" {
        return (this.getAttribute("size") as any) || "medium";
    }

    get disabled(): boolean {
        return this.hasAttribute("disabled");
    }

    get loading(): boolean {
        return this.hasAttribute("loading");
    }

    // Setters
    set variant(value: "primary" | "secondary" | "danger") {
        this.setAttribute("variant", value);
    }

    set size(value: "small" | "medium" | "large") {
        this.setAttribute("size", value);
    }

    set disabled(value: boolean) {
        if (value) {
            this.setAttribute("disabled", "");
        } else {
            this.removeAttribute("disabled");
        }
    }

    set loading(value: boolean) {
        if (value) {
            this.setAttribute("loading", "");
        } else {
            this.removeAttribute("loading");
        }
    }

    attributeChangedCallback(
        _name: string,
        oldValue: string,
        newValue: string
    ) {
        if (oldValue !== newValue) {
            this.updateButton();
        }
    }

    connectedCallback() {
        this.updateButton();
    }
}

// Register the custom element only in browser environment
if (typeof window !== "undefined" && typeof customElements !== "undefined") {
    customElements.define("custom-button", CustomButton);
}
