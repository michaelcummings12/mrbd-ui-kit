import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importXPlugin from "eslint-plugin-import-x";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
	{
		plugins: {
			"import-x": importXPlugin,
			"@typescript-eslint": tsPlugin
		},
		rules: {
			"import-x/first": "error",
			"padding-line-between-statements": ["error", { blankLine: "never", prev: "import", next: "import" }]
		}
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { jsx: true }
			}
		}
	},
	globalIgnores(["**/.next/**", "**/dist/**", "**/*.next-env.d.ts"])
]);

export default eslintConfig;
