#!/usr/bin/env node
/**
 * Simple dev-only API to persist resources into src/lib/resources.ts
 * NOTE: This mutates files in your repository. Use only locally and with VCS committed.
 */
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RES_PATH = path.join(__dirname, "..", "src", "lib", "resources.ts");

function formatResource(obj) {
  // simple string formatting matching the existing file style
  const escape = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return (
    `{
      id: "${escape(obj.id)}",
      title: "${escape(obj.title)}",
      semester: "${escape(obj.semester || "")}",
      type: "${escape(obj.type)}",
      driveUrl: "${escape(obj.driveUrl)}",
      uploadedBy: "${escape(obj.uploadedBy || "")}",
    },\n`
  );
}

app.post("/add-resource", (req, res) => {
  const { moduleSlug, resource } = req.body || {};
  if (!moduleSlug || !resource || !resource.id || !resource.title || !resource.driveUrl) {
    return res.status(400).json({ ok: false, message: "moduleSlug, resource.id, title and driveUrl are required" });
  }

  let content;
  try {
    content = fs.readFileSync(RES_PATH, "utf8");
  } catch (e) {
    console.error("Failed to read resources.ts", e);
    return res.status(500).json({ ok: false, message: "Failed to read resources file" });
  }

  const moduleKeyPattern = new RegExp("(^\\s*)" + moduleSlug.replace(/[-\\/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\s*:\\s*\\[", "m");
  const formatted = formatResource(resource);

  if (moduleKeyPattern.test(content)) {
    // insert right after the opening bracket of the module array
    content = content.replace(moduleKeyPattern, (match, p1) => `${match}\n${p1}    ${formatted}`);
  } else {
    // insert a new module block before the closing '};' of the resources object
    const insertIndex = content.lastIndexOf("};");
    if (insertIndex === -1) {
      return res.status(500).json({ ok: false, message: "Unexpected resources.ts format" });
    }
    const moduleBlock = `  ${moduleSlug}: [\n    ${formatted}  ],\n\n`;
    content = content.slice(0, insertIndex) + moduleBlock + content.slice(insertIndex);
  }

  try {
    fs.writeFileSync(RES_PATH, content, "utf8");
  } catch (e) {
    console.error("Failed to write resources.ts", e);
    return res.status(500).json({ ok: false, message: "Failed to write resources file" });
  }

  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
  console.log(`This server will modify: ${RES_PATH}`);
});
