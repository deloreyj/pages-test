import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer);

app.get("/", async (c) => {
  const now = new Date().toISOString();
  await c.env.PAGES_TEST_KV_NAMESPACE.put(now, now);
  const items = await c.env.PAGES_TEST_KV_NAMESPACE.list();
  return c.render(
    <h1>
      Hello new! {c.env.MY_VAR} {JSON.stringify(items, null, 2)}
    </h1>,
  );
});

export default app;
