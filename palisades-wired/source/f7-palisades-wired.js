// F7: the Palisades fire with its parts separated. The same fire engine as F3 in its vector form,
// but the relief, the hour's air and the dryness of the fuel are modules of their own that the fire
// reads, and a placeholder population of animals reads the fire and flees it. The point is the
// wiring: each part can be replaced or joined by another without touching the fire.

// where: the window every module here works on, and its resolution
const place = { lat_s: 34.0, lat_n: 34.16, lon_w: -118.72, lon_e: -118.46, res_arcsec: 1 };

const run = {
  name: "f7-palisades-wired",
  start: "2025-01-07T18:00:00Z",
  end: "2025-01-12T00:00:00Z",
  seed: 1,
  close_every: "1d",
  snapshot_every: "10d",
  notes: "The Palisades fire with terrain, weather, fuel moisture, fire and animals as separate modules that meet in shared fields; unsuppressed; constants guessed.",
};

// The relief. It owns the grid: every module below takes its cells from these fields.
const ground = { kind: "ground.terrain", params: { place } };

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
    inputs: "world",
    form: "vector",
    cooling: "idle",
    reach_m: 45,
    ignite_scale: 5,
    slope_rate_gain: 20,
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

// Animals on the wildland, a placeholder population, leaving ground the fire reaches.
const animals = { kind: "fauna.flee", params: { density_km2: 20, mortality: 0.1 } };

// What the scenario is made of, in order. The order is the order of sections on the run page,
// and it settles which of two modules hears an event first when their priorities are equal.
export { run, ground, weather, moisture, fire, animals, suppression, obs, seen, structures, record, audit };
