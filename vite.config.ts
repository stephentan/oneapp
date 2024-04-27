import { addRoutesFolder } from "remix-routes-folder";
import { cjsInterop } from "vite-plugin-cjs-interop";
import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";

// import remixRoutes from "vite-plugin-remix-routes";
const modules = ["core-module", "storeadmin-module", "admin-module"];
function getNewKey(key: string, prefix: string) {
  const newKey = key.substring(prefix.length + 1);
  if (newKey === "routes") {
    return key;
  }
  return newKey;
}
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  optimizeDeps: {
    include: ["chart.js"],
  },
  plugins: [
    remix({
      routes: () => {
        const routeResult = {};
        for (const module of modules) {
          const moduleRoutes = addRoutesFolder(`modules/${module}/routes`, {
            urlPath: "/",
          });
          const keys = Object.keys(moduleRoutes) || [];
          for (const key of keys) {
            const prefix = `modules/${module}`;
            routeResult[getNewKey(key, prefix)] = {
              ...moduleRoutes[key],
              parentId: moduleRoutes[key].parentId?.startsWith("modules")
                ? getNewKey(moduleRoutes[key].parentId, prefix)
                : moduleRoutes[key].parentId,
              id: moduleRoutes[key].id?.startsWith("modules")
                ? getNewKey(moduleRoutes[key].id, prefix)
                : moduleRoutes[key].id,
            };
          }
        }
        return routeResult;
      },
    }),
    tsconfigPaths(),
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: ["react-color", "lodash"],
    }),
  ],
});
