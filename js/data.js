// ISRO Mission & Tracked LEO Object Profiles (Project NETRA / MOSDAC / Bhuvan / Bhoonidhi)
const ISRO_DATA = {
  impacts: [
    'MOSDAC Cyclone & Monsoon Alert satellites forced offline in Low Earth Orbit!',
    'NavIC regional navigation & UPI timing relays disrupted by orbital shrapnel!',
    'Bhuvan & Bhoonidhi Earth-observation crop & flood monitoring halted!'
  ],
  leoObjects: [
    {
      name: 'Cartosat-3 (ISRO)',
      type: 'green',
      dist: 0.42,
      angle: 0.8,
      speed: 0.008,
      alt: '509 km',
      vel: '7.61 km/s',
      note: 'High-resolution Earth observation satellite supporting Bhuvan & Bhoonidhi.'
    },
    {
      name: 'RISAT-2BR1 (ISRO)',
      type: 'green',
      dist: 0.52,
      angle: 2.5,
      speed: 0.007,
      alt: '576 km',
      vel: '7.57 km/s',
      note: 'All-weather radar imaging satellite for agriculture & disaster response.'
    },
    {
      name: 'Oceansat-3 (ISRO)',
      type: 'green',
      dist: 0.66,
      angle: 4.4,
      speed: 0.006,
      alt: '742 km',
      vel: '7.48 km/s',
      note: 'Ocean color & cyclone tracking mission archived on ISRO MOSDAC.'
    },
    {
      name: 'PSLV-C37 Spent Stage',
      type: 'yellow',
      dist: 0.48,
      angle: 1.7,
      speed: 0.0075,
      alt: '520 km',
      vel: '7.60 km/s',
      note: 'Inactive upper rocket body monitored under Project NETRA & DFSM 2030.'
    },
    {
      name: 'COSMOS-1408 Fragment',
      type: 'red',
      dist: 0.45,
      angle: 3.6,
      speed: 0.009,
      alt: '485 km',
      vel: '7.63 km/s',
      note: 'High-velocity debris fragment posing close-approach collision risk.'
    },
    {
      name: 'FENGYUN-1C Debris',
      type: 'red',
      dist: 0.78,
      angle: 5.5,
      speed: 0.0055,
      alt: '850 km',
      vel: '7.43 km/s',
      note: 'Dense LEO debris cloud tracked continuously by IS4OM Bengaluru.'
    }
  ]
};
