module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-typescript',
        'airbnb/hooks',
        'airbnb',
        'prettier',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    ignorePatterns: ['.eslintrc.js', 'craco.config.js'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
    rules: {
        'linebreak-style': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
        'import/prefer-default-export': 'off',
        'no-param-reassign': ['error', { props: false }],
        'react/function-component-definition': 'off',
        'import/no-unresolved': 'off',
        'react/self-closing-comp': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react/require-default-props': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                trailingComma: 'all',
            },
        ],
        'import/extensions': 'off',
    },
};
