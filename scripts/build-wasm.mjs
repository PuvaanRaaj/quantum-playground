import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync } from "node:fs";
const rustc = spawnSync("rustup", ["which", "--toolchain", "stable", "rustc"], {
  encoding: "utf8",
});
if (rustc.status !== 0)
  throw new Error("Install stable Rust with rustup before building WASM.");
const result = spawnSync(
  "rustup",
  [
    "run",
    "stable",
    "cargo",
    "build",
    "--manifest-path",
    "rust/quantum-core/Cargo.toml",
    "--target",
    "wasm32-unknown-unknown",
    "--release",
  ],
  { stdio: "inherit", env: { ...process.env, RUSTC: rustc.stdout.trim() } },
);
if (result.status !== 0) process.exit(result.status ?? 1);
mkdirSync("public", { recursive: true });
copyFileSync(
  "rust/quantum-core/target/wasm32-unknown-unknown/release/quantum_core.wasm",
  "public/quantum_core.wasm",
);
