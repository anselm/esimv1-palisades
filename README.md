# esimv1-palisades

The Palisades fire of January 2025, modelled twice and read against the mapped record.

- `palisades-2025/` runs the Rothermel spread model. It is the baseline. Shown at
  [/anselm/palisades-2025](https://esimv1.exe.xyz/anselm/palisades-2025).
- `palisades-cells/` runs esimv1's own fire engine: a heat budget on one-arcsecond cells
  with buildings, roads, hourly wind, spotting and suppression. Shown at
  [/anselm/palisades-cells](https://esimv1.exe.xyz/anselm/palisades-cells).
- `data/events/palisades-2025/` is the record both are read against: mapped perimeters,
  satellite detections, the incident's lines and reports. Its README names each source.
- `manifests/` holds the two manifests as written; each project folder has the resolved copy.

Each project's README says what the model gets right and wrong. Neither is a forecast.

## Run it

This is content for [esimv1](https://github.com/anselm/esimv1): the description, the
manifest, the record the model is read against, and the page. It holds no code. With a
built [esimv1-core](https://github.com/anselm/esimv1-core) (0.3.0 or newer):

```
ESIM_ROOT=/path/to/esimv1-core /path/to/esimv1-core/target/release/esim project run ./<project folder> --variant <name>
```

Runs land in the project folder's `runs/`, which is not in git: a run is rebuilt from its
manifest and seed. The hub shows this scenario at the addresses given above by keeping a
clone of this repository and linking the project folders into its `projects/`.

Free and open source, MIT. The records in `data/events/` keep their publishers' terms,
which each folder's README names.
