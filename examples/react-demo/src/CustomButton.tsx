import React, { useEffect, useRef } from "react";
import "webcomponent-lib/dist/custom-button.js";

interface CustomButtonProps {
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    onClick?: (event: CustomEvent) => void;
}

// React wrapper component for the web component
const CustomButton: React.FC<CustomButtonProps> = ({
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    children,
    onClick,
}) => {
    const buttonRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (button && onClick) {
            button.addEventListener("button-click", onClick as EventListener);
            return () => {
                button.removeEventListener(
                    "button-click",
                    onClick as EventListener
                );
            };
        }
    }, [onClick]);

    return React.createElement(
        "custom-button",
        {
            ref: buttonRef,
            variant,
            size,
            disabled: disabled || undefined,
            loading: loading || undefined,
        },
        children
    );
};

export default CustomButton;
