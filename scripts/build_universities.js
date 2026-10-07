const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Ensure destination directories exist
const UNIS_DIR = path.join(__dirname, '../public/images/unis');
fs.mkdirSync(UNIS_DIR, { recursive: true });

// Copy local images for existing ones
const localMap = {
  aus: {
    main: '/images/AUS/campus.jpg',
    gallery: [
      '/images/AUS/campus.jpg',
      '/images/AUS/American-University-of-Sharjah-AUS-5-Inside-AUS-Library.jpg',
      '/images/AUS/c914a4adaef66ce0d989ef4dc27eabba.jpg'
    ]
  },
  nyuad: {
    main: '/images/NYUAD/campus.jpg',
    gallery: [
      '/images/NYUAD/campus.jpg',
      '/images/NYUAD/nyuad+arts+center.webp',
      '/images/NYUAD/image.jpg'
    ]
  },
  'heriot-watt': {
    main: '/images/heriot-watt/campus.webp',
    gallery: [
      '/images/heriot-watt/campus.webp',
      '/images/heriot-watt/new-campus.webp',
      '/images/heriot-watt/classroom.webp'
    ]
  },
  birmingham: {
    main: '/images/birmingham/campus.jpg',
    gallery: [
      '/images/birmingham/campus.jpg',
      '/images/birmingham/exterior.jpg',
      '/images/birmingham/gallery.webp'
    ]
  },
  khalifa: {
    main: '/images/khalifa/campus.jpg',
    gallery: [
      '/images/khalifa/campus.jpg',
      '/images/khalifa/campus-night.jpg',
      '/images/khalifa/library.jpg'
    ]
  },
  uowd: {
    main: '/images/uowd/campus.jpg',
    gallery: [
      '/images/uowd/campus.jpg',
      '/images/uowd/campus-facade.jpg',
      '/images/uowd/studies.jpg'
    ]
  },
  cud: {
    main: '/images/cud/campus.jpg',
    gallery: [
      '/images/cud/campus.jpg',
      '/images/cud/hero.jpg',
      '/images/cud/campus-walk.webp'
    ]
  },
  uaeu: {
    main: '/images/uaeu/campus.webp',
    gallery: [
      '/images/uaeu/campus.webp',
      '/images/uaeu/gulfnews.avif',
      '/images/uaeu/web.webp'
    ]
  },
  uos: {
    main: '/images/uos/campus.jpg',
    gallery: [
      '/images/uos/campus.jpg',
      '/images/uos/campus-2.jpg',
      '/images/uos/dining-hall.webp'
    ]
  },
  rit: {
    main: '/images/rit/campus.png',
    gallery: [
      '/images/rit/campus.png',
      '/images/rit/entrance.png',
      '/images/rit/library.png'
    ]
  },
  alain: {
    main: '/images/alain/campus.jpg',
    gallery: [
      '/images/alain/campus.jpg',
      '/images/alain/building.jpg',
      '/images/alain/gate.jpg'
    ]
  },
  adu: {
    main: '/images/adu/campus.jpg',
    gallery: [
      '/images/adu/campus.jpg',
      '/images/adu/campus-building.avif',
      '/images/adu/interior.jpg'
    ]
  }
};

console.log('Local map configured with', Object.keys(localMap).length, 'universities.');
