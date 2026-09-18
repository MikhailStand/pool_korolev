import { useEffect, useRef } from 'react';
import L from 'leaflet';
import deliveryZoneLngLat from './delivery-zone.json';

const retroLocation: L.LatLngTuple = [55.920827, 37.86405];
const deliveryZone: L.LatLngTuple[] = deliveryZoneLngLat.map(([lng, lat]) => [lat, lng]);

export function RetroMap({ showDeliveryZone = false }: { showDeliveryZone?: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = mapRef.current;
    if (!element) return;

    let map: L.Map | null = null;
    let resizeObserver: ResizeObserver | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || map) return;
      observer.disconnect();

      map = L.map(element, { zoomControl: false, scrollWheelZoom: false, attributionControl: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      L.control.zoom({ position: 'topright', zoomInTitle: 'Приблизить', zoomOutTitle: 'Отдалить' }).addTo(map);
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

      if (showDeliveryZone) {
        const zone = L.polygon(deliveryZone, { color: '#166849', weight: 3, fillColor: '#76c594', fillOpacity: 0.32 }).addTo(map);
        map.fitBounds(zone.getBounds(), { padding: [28, 28] });
      } else {
        map.setView(retroLocation, 17);
      }

      const marker = L.marker(retroLocation, {
        icon: L.divIcon({ className: 'retro-venue-marker', html: '<span>Р</span>', iconSize: [44, 44], iconAnchor: [22, 44] }),
        title: 'Кафе и бильярд «Ретро»',
        alt: 'Кафе и бильярд «Ретро»',
      }).addTo(map);
      marker.bindTooltip('Кафе и бильярд «Ретро»', { permanent: true, direction: 'top', offset: [0, -42], className: 'retro-venue-tooltip' });
      marker.bindPopup('<strong>Кафе и бильярд «Ретро»</strong><br>Королёв, Полевой проезд, 4А');
      marker.on('popupopen', () => marker.closeTooltip());
      marker.on('popupclose', () => marker.openTooltip());

      resizeObserver = new ResizeObserver(() => map?.invalidateSize());
      resizeObserver.observe(element);
      requestAnimationFrame(() => map?.invalidateSize());
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      resizeObserver?.disconnect();
      map?.remove();
    };
  }, [showDeliveryZone]);

  return <div ref={mapRef} className="retro-map" role="region" aria-label={showDeliveryZone ? 'Карта зоны доставки кафе Ретро' : 'Кафе Ретро на карте Королёва'} />;
}
