// F2: the Palisades fire, Los Angeles, January 2025, as a hindcast. Rothermel's spread
// model on the 30 m terrain of the Santa Monica Mountains with fuel from land cover and
// the hour's wind from the ERA5 archive, ignited where and when the record says, run with
// no suppression; the incident's mapped perimeters score the burned area as they were
// current. The window takes in the final perimeter with a margin on every side; the sea
// is water and does not burn.

// where: the window every module here works on, and its resolution
const place = { lat_s: 34.0, lat_n: 34.16, lon_w: -118.72, lon_e: -118.46, res_arcsec: 1 };

const run = {
  name: "f2-palisades-2025",
  start: "2025-01-07T18:00:00Z",
  end: "2025-01-12T00:00:00Z",
  seed: 1,
  close_every: "1d",
  snapshot_every: "10d",   // a snapshot holds every cell's progress in 32 directions, 335 MB as JSON; none inside a four-day run
  notes: "The Palisades fire's first four days under reanalysis wind, unsuppressed; scored against NIFC's daily perimeters. Fuel parameters recalled from Scott and Burgan 2005 and not yet checked; the reanalysis under-reads Santa Ana gusts.",
};

// The parts of the ground and the air, each a module of its own, the same ones the cell engine
// reads in F3. They stand before the fire because it takes the ground from them when the run starts.
const ground = { kind: "ground.terrain", params: { place } };
const cover = { kind: "ground.cover", params: { place } };
// the hour's wind, temperature and humidity from the ERA5 archive: one 25 km point for the whole window
const weather = {
  kind: "weather.surface",
  params: { place, source: "era5", start: "2025-01-06T00:00:00Z", end: "2025-01-14T00:00:00Z" },
};
const moisture = { kind: "fuel.moisture", params: {} };

// Animals on the wildland, a placeholder population that runs from the front.
const animals = { kind: "fauna.flee", params: { density_km2: 20 } };

const fire = {
  kind: "fire.rothermel",
  params: {
    place,
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

const suppression = {
  kind: "fire.suppression",
  params: {
    place,
    mode: "off",
    line_width_m: 30,
  },
};

// What the scenario is made of, in order. The order is the order of sections on the run page,
// and it settles which of two modules hears an event first when their priorities are equal.
export { run, ground, cover, weather, moisture, fire, animals, obs, seen, structures, record, suppression, audit };
