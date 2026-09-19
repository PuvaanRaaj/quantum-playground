import { spawnSync } from "node:child_process";
const rustc = spawnSync("rustup", ["which", "--toolchain", "stable", "rustc"], {
  encoding: "utf8",
});
if (rustc.status !== 0) throw new Error("Install stable Rust with rustup.");
const result = spawnSync(
  "rustup",
  [
    "run",
    "stable",
    "cargo",
    "test",
    "--manifest-path",
    "rust/quantum-core/Cargo.toml",
    "--lib",
  ],
  { stdio: "inherit", env: { ...process.env, RUSTC: rustc.stdout.trim() } },
);
process.exit(result.status ?? 1);
