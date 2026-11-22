# esimv1-palisades

Project-specific orientation only. House policy (devlog, git, UX, writing, deploy) comes from the
harness and is not repeated here.

## What this is

The Palisades fire of January 2025 as two esimv1 scenarios that share one record: `palisades-2025` on the Rothermel spread model, and `palisades-cells` on esimv1's own cell fire engine.

## Where things are

- Two project folders and one shared record at the top (`data/events/palisades-2025`); the engine looks for a record
  inside the project folder, then beside it, then in its own `data/events`.
- After changing a manifest: `esim project update ./palisades-cells --manifest manifests/f3-palisades-cells.js`, then
  rerun the variants. Runs are deterministic and not in git.
- On canada1 the working clone is `~/projects/2026/earth-simulator-1/scenarios/esimv1-palisades`, with the two project
  folders linked into the hub's `projects/anselm/`. History and facts before 22 November 2026: `anselm/esimv1`, `CLAUDE.md` and `devlog/`.

