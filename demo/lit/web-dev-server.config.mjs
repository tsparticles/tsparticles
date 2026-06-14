export default {
  open: true,
  watch: true,
  nodeResolve: true,
  appIndex: 'dev/index.html',
  // in a monorepo you need to set the root dir to resolve modules
  rootDir: '../../',
  middleware: [
    function redirectRoot(ctx, next) {
      if (ctx.url === "/") {
        ctx.redirect("/demo/lit/dev/");
        return;
      }
      return next();
    },
  ],
};
