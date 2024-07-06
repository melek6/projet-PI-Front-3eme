import * as L from 'leaflet';

// Fix Leaflet's default icon path
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/img/icons/marker-icon-2x.png',
  iconUrl: 'assets/img/icons/marker-icon.png',
  shadowUrl: 'assets/img/icons/marker-shadow.png'
});
