import test from "node:test";
import assert from "node:assert/strict";
import { accountTarget } from "../src/constellation/accountStar.js";

test("guests go to the login page", () => {
  assert.deepEqual(accountTarget(null), { to: "/entrar", label: "Entrar" });
});

test("logged in users go to the profile", () => {
  assert.deepEqual(accountTarget({ id: 1, name: "Luna" }), { to: "/perfil", label: "Perfil" });
});
