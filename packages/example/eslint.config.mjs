import nextPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tailwindCanonicalClasses from "eslint-plugin-tailwind-canonical-classes";
import { defineConfig } from "eslint/config";
import baseConfig from "../../eslint.config.mjs";

const eslintConfig = defineConfig([
	...baseConfig,
	{
		plugins: {
			"@next/next": nextPlugin,
			"react-hooks": reactHooksPlugin
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
			"tailwind-canonical-classes/tailwind-canonical-classes": [
				"warn",
				{
					cssPath: "./app/globals.css"
				}
			],
			"@next/next/no-img-element": "off"
		},
		settings: {
			react: { version: "19.2.5" }
		}
	},
	...tailwindCanonicalClasses.configs["flat/recommended"]
]);

export default eslintConfig;
