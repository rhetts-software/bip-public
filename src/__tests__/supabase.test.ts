import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import supabase, { testAudit } from "../lib/modules/supabase.client";

test("Test table query", async () => {
  expect(await testAudit()).greaterThan(0);
});
