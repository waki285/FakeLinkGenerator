const { context } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const { copy: copyPlugin } = require("esbuild-plugin-copy");
const { default: postcss } = require("postcss");
const tailwindcss = require("tailwindcss");
const TailwindSettings = require("./tailwind.config.js");
const postcssPresetEnv = require("postcss-preset-env");

const isDev = process.argv.includes("--dev") || process.env.NODE_ENV === "development";

(async () => {
  const ctx = await context({
    entryPoints: ["src/js/client.tsx"],
    bundle: true,
    minify: isDev,
    sourcemap: isDev ? "linked":false,
    legalComments: "none",
    target: "ES2021",
    outdir: "dist",
    platform: "browser",
    tsconfig: "tsconfig.json",
    external: ["tailwindcss", "autoprefixer"],
    logLevel: "info",
    loader: {
      ".webp": "file",
    },
    plugins: [
      sassPlugin({
        type: "style",
        filter: /\.s(c|a)ss$/,
        async transform(source, resolveDir) {
          const { css } = await postcss([tailwindcss(TailwindSettings), require("autoprefixer"), require("cssnano"), postcssPresetEnv]).process(source, { from: undefined });
          return css;
        }
      }),
      copyPlugin({
        resolveFrom: "cwd",
        assets: [
          { from: "src/assets/icon.png", to: "dist/icon.png" },
          { from: "public/**/*", to: "dist/" }
        ]
      }),
    ]
  });

  process.on("beforeExit", () => {
    ctx.dispose();
  });

  if (!isDev) {
    await ctx.rebuild();
    process.exit(0);
  }

  await ctx.watch();
  const { host, port } = await ctx.serve({
    servedir: "dist",
  });

})();