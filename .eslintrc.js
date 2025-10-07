module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    plugins: ["react", "react-hooks", "jsx-a11y", "import", "simple-import-sort"],
    rules: {
        "react/react-in-jsx-scope": "off", // not needed with React 17+
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
};
