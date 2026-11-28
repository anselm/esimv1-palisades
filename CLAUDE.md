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
- Since 2026-11-28 (engine 0.4.0) both manifests name data-warehouse products in a `data` table: OpenStreetMap roads
  and place names for the window, and for the cell fire the county's footprints listed under the Palisades fire
  (`buildings/lacounty-palisades-2025/pacific-palisades/2026-11-28`, 13,292 with the inspectors' damage). That
  product is listed in the public store without its bytes, because the county's terms were not read; on canada1 it
  is in the hub's `dataservice/store`, and elsewhere `esim-data build --only lacounty-palisades` makes it. The four
  Rothermel runs kept their digests. All twenty cell-fire runs moved (burned area by a few percent, small counts such as animals caught by much more), because the roads are a
  newer map; the page says so. The record folder under `data/events/palisades-2025/` is unchanged.
