module.exports = {
  "extends": "plugin:vue/recommended",
  "rules": {
    "arrow-parens": ["error", "always"],
    "block-spacing": ["error", "always"],
    "brace-style": 0, /* some unimportant lines are better in a single line as a small unit. */
    "curly": 0,
    "indent": ["error", 2],
    "linebreak-style": 0,
    "max-len": [0, 400, 4, {"ignoreUrls": true}], /* svgs are large and that's ok */
    "new-cap": 0,
    "no-invalid-this": 0,
    "no-multi-spaces": 0,
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-useless-escape": "error",
    "no-var": 0,
    "object-curly-spacing": ["error", "always"],
    "spaced-comment": ["error", "always", { "markers": ["="] }],
    "vue/html-self-closing": 0, /* self closing tags might cause problems with some libraries */
    "vue/no-multi-spaces": 0, /* doesn't work well indenting with spaces */
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true,
      }
    }],
    "semi": 2,
    "valid-jsdoc": [2, {
      "matchDescription": "^([A-Z]|[`\\d_])[\\s\\S]*[.?!`]$",
      "prefer": {
        "return": "return"
      },
      "requireReturn": false,
      "requireParamDescription": true,
      "requireReturnDescription": false,
      "requireReturnType": true,
    }],
  },
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module"
  },
  "env": {
    "es6": true
  }
};
