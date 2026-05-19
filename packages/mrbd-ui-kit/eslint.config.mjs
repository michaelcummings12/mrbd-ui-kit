import reactHooksPlugin from "eslint-plugin-react-hooks";
import tailwindCanonicalClasses from "eslint-plugin-tailwind-canonical-classes";
import { defineConfig } from "eslint/config";
import baseConfig from "../../eslint.config.mjs";

const eslintConfig = defineConfig([
	...baseConfig,
	{
		plugins: {
			"react-hooks": reactHooksPlugin
		},
		rules: {
			"tailwind-canonical-classes/tailwind-canonical-classes": [
				"warn",
				{
					cssPath: "./src/css/mrbd-theme.css"
				}
			]
		},
		settings: {
			react: { version: "19.2.5" }
		}
	},
	...tailwindCanonicalClasses.configs["flat/recommended"]
]);

export default eslintConfig;
