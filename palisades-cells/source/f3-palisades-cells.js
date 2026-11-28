// F3: the Palisades fire on our own engine, as separate parts that meet in shared maps and one
// shared table: the relief, land cover, roads, buildings, the hour's air, the dryness of the fuel,
// the fire (a heat budget on cells), and a placeholder population of animals that flees it. Every
// constant of the fire is a guess, declared so; the mapped perimeters and the inspected structures
// score it. Nobody fights the fire. Until 26 November 2026 the fire module loaded all of this itself;
// the results are the same.

// where: the window every module here works on, and its resolution
const place = { lat_s: 34.0, lat_n: 34.16, lon_w: -118.72, lon_e: -118.46, res_arcsec: 1 };

// what: the products of the data warehouse this scenario reads (https://data.earthlight.cloud), each named by
// its address there. A product never changes once made, so these lines fix the bytes a run reads. The county's
// footprints are listed in the public store without their bytes; `esim-data build --only lacounty-palisades`
// makes them from the county's own service, into a store ESIM_DATA_STORES names.
const data = {
  roads: "roads/osm/pacific-palisades/2026-11-27",
  names: "names/osm/pacific-palisades/2026-11-28",
  buildings: "buildings/lacounty-palisades-2025/pacific-palisades/2026-11-28",
};

const run = {
  name: "f3-palisades-cells",
  start: "2025-01-07T18:00:00Z",
  end: "2025-01-12T00:00:00Z",
  seed: 1,
  close_every: "1d",
  snapshot_every: "10d",
  notes: "The Palisades fire with terrain, weather, fuel moisture, fire and animals as separate modules that meet in shared fields; unsuppressed; constants guessed.",
};

// The relief. It owns the grid: every module below takes its cells from these fields.
const ground = { kind: "ground.terrain", params: { place } };

// What covers each cell, the major roads, and every building: its outline, height and what the
// inspectors found. The buildings are a shared table of things, not a map.
const cover = { kind: "ground.cover", params: { place } };
const roads = { kind: "roads.major", params: { place, data } };
const buildings = { kind: "built.footprints", params: { place, data } };

// The air at the ground each hour, from NOAA's 3 km analysis.
const weather = {
  kind: "weather.surface",
  params: { place, source: "hrrr", start: "2025-01-07T18:00:00Z", end: "2025-01-12T00:00:00Z" },
};

// How dry the dead fuel is, from that air.
const moisture = { kind: "fuel.moisture", params: {} };

const fire = {
  kind: "fire.cells",
  params: {
    place,
    data,
    inputs: "world",
    ignition_time: "2025-01-07T18:30:00Z",
    ignition_lat: 34.0723,
    ignition_lon: -118.5451,
  },
};

const obs = {
  kind: "obs.perimeters",
  params: {
    place,
    incident: "Palisades",
    year: 2025,
    irwin: "{A7EA5D21-F882-44B8-BF64-44AB11059DC1}",
  },
};

// What three satellites saw burning, pass by pass: NOAA's VIIRS 375 m fire detections, cut to the
// window by data/events/palisades-2025/viirs/fetch.py. The first pass is 76 minutes after the
// ignition and there are four on the first afternoon, hours before the first mapped perimeter.
const seen = {
  kind: "obs.hotspots",
  params: {
    place,
    file: "palisades-2025/viirs/hotspots.csv",
    series: "seen",
    land_only: true,
    start: "2025-01-07T18:00:00Z",
    end: "2025-01-12T00:00:00Z",
    every: "1h",
    frame_res_arcsec: 3,
  },
};

const structures = {
  kind: "obs.dins",
  params: {
    place,
    service: "https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/DINS_2025_Palisades_Public_View/FeatureServer/0",
    key: "cal-fire-dins/2025-palisades",
  },
};

const record = {
  kind: "obs.record",
  params: {
    place,
    files: ["palisades-2025/nifc/palisades-event-points.geojson", "palisades-2025/nifc/palisades-event-lines.geojson"],
    time_field: "CreateDate",
  },
};

const audit = {
  scores: [["sim.acres", "obs.acres"]],
};

// What people did to the fire. Off as written: nobody fights it. A variant sets mode to
// "resources", and the engines, dozers, hand crews and helicopters that CAL FIRE's status reports
// count then hold the fire's edge hour by hour, wherever it moves slowly enough to be held. The
// reports count no resources before 13:20 on 8 January, local time, so nothing is held before then.
const suppression = {
  kind: "fire.suppression",
  params: {
    place,
    mode: "off",
    line_width_m: 30,
    reports: "palisades-2025/calfire/updates.csv",
    reports_tz_offset_h: -8,
  },
};

// Animals on the wildland, a placeholder population that runs from the front.
const animals = { kind: "fauna.flee", params: { density_km2: 20 } };

// What the scenario is made of, in order. The order is the order of sections on the run page,
// and it settles which of two modules hears an event first when their priorities are equal.
export { run, ground, cover, roads, buildings, weather, moisture, fire, animals, suppression, obs, seen, structures, record, audit };
