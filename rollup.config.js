import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const AutoGeneratedComment = `
/**
 * Auto-generated by rollup
*/
`.trim();

export default {
  input: "src/index.ts",
  output: {
    dir: ".",
    format: "cjs",
  },
  plugins: [
    typescript({
      tsconfig: false,
      target: "es2020",
      allowSyntheticDefaultImports: true,
    }),
    resolve({
      moduleDirectories: ["src"],
    }),
    {
      name: "plugin-auto-generated-comment",
      async generateBundle(options, bundle) {
        bundle["index.js"].code =
          AutoGeneratedComment + "\n\n" + bundle["index.js"].code;
      },
    },
  ],
};