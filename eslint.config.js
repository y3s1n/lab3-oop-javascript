export default [
    
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                console: "readonly",
                process: "readonly"
            }
        },
        rules: {
            //possible Errors
            "no-unused-vars": ["error", {"argsIgnorePattern": "^_"}],
            "no-console": "warn",
            "no-undef": "error",

            //Best Practices
            "eqeqeq": ["error", "always"],
            "no-eval": "error",
            "no-implied-eval": "error",
            "prefer-const": "error",

            // Stylistic Issues
            "indent": ["error", 2],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "comma-dangle": ["error", "never"],
            "no-trailing-spaces": "error",
            "eol-last": ["error", "always"],

            // ES6
            "arrow-spacing": "error",
            "no-var": "error",
            "prefer-arrow-callback": "warn",
            "prefer-template": "warn"
        }
    },
    {
        files: ["test/**/*.js"],
        rules: {
            "no-console": "off"
        }
    }
];