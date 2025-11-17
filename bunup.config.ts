import { defineConfig } from "bunup";

export default defineConfig({
	entry: ["src/index.ts", "generated/index.ts"],
	format: ["esm"],
	outDir: "dist",
	dts: {
		splitting: true,
	},
	clean: true,
});
