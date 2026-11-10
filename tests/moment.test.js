import test from "node:test";
import assert from "node:assert/strict";
import { buildMoment, momentWarning, to24Hour } from "../src/lib/moment.js";

test("to24Hour converts the 12 hour clock", () => {
  assert.equal(to24Hour("12", "AM"), 0);
  assert.equal(to24Hour("12", "PM"), 12);
  assert.equal(to24Hour("1", "AM"), 1);
  assert.equal(to24Hour("1", "PM"), 13);
  assert.equal(to24Hour("11", "PM"), 23);
});

test("to24Hour rejects hours outside 1 to 12", () => {
  assert.equal(to24Hour("0", "AM"), null);
  assert.equal(to24Hour("13", "PM"), null);
  assert.equal(to24Hour("", "AM"), null);
});

test("buildMoment joins date and time in 24 hour format", () => {
  assert.equal(buildMoment("2026-03-23", "4", "44", "PM"), "2026-03-23T16:44");
  assert.equal(buildMoment("2026-03-23", "12", "05", "AM"), "2026-03-23T00:05");
  assert.equal(buildMoment("2026-03-23", "12", "00", "PM"), "2026-03-23T12:00");
});

test("buildMoment returns an empty string when a part is missing", () => {
  assert.equal(buildMoment("", "4", "44", "PM"), "");
  assert.equal(buildMoment("2026-03-23", "", "44", "PM"), "");
  assert.equal(buildMoment("2026-03-23", "4", "", "PM"), "");
});

test("momentWarning asks for years between 1900 and 2026", () => {
  assert.equal(momentWarning("2027-01-01", "4", "44"), "Pon un año entre 1900 y 2026");
  assert.equal(momentWarning("1899-12-31", "4", "44"), "Pon un año entre 1900 y 2026");
  assert.equal(momentWarning("2026-12-31", "4", "44"), "");
  assert.equal(momentWarning("1900-01-01", "4", "44"), "");
});

test("momentWarning points out incomplete or out of range time", () => {
  assert.equal(momentWarning("", "", ""), "");
  assert.equal(momentWarning("2026-03-23", "", ""), "Completa el día, la fecha, el año y la hora.");
  assert.equal(momentWarning("2026-03-23", "13", "10"), "Pon una hora entre 1 y 12.");
  assert.equal(momentWarning("2026-03-23", "10", "75"), "Pon minutos entre 0 y 59.");
});
