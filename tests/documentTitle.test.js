import test from "node:test";
import assert from "node:assert/strict";
import { titleForPath } from "../src/hooks/useDocumentTitle.js";

test("known routes have their own title", () => {
  assert.match(titleForPath("/"), /AstroIA/);
  assert.match(titleForPath("/observar"), /esta noche/i);
  assert.match(titleForPath("/carta"), /Carta celeste/);
  assert.match(titleForPath("/perfil"), /perfil/i);
});

test("object pages share a generic title", () => {
  const title = titleForPath("/objeto/orion");
  assert.match(title, /Objeto celeste/);
});

test("unknown routes fall back to the site title", () => {
  const title = titleForPath("/ruta-inexistente");
  assert.match(title, /AstroIA/);
  assert.equal(title, titleForPath("/"));
});
