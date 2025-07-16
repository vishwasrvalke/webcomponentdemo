import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/index.ts",
            name: "CustomButton",
            fileName: "custom-button",
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
    define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
    },
});
