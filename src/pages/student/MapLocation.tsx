import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

// Fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position }: { position: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function MapLocation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const language = useStore(state => state.language);
  const isArabic = language === 'ar';
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setError(err.message);
        // Fallback to a default location (e.g., Cairo University)
        setPosition([30.0276, 31.2049]);
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full pb-32">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors group"
        >
          <ArrowLeft className={isArabic ? "rotate-180" : "group-hover:-translate-x-1"} />
        </button>
        <h2 className="text-3xl font-black">{t('Map Location')}</h2>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-sm">
          {error} - Showing default location.
        </div>
      )}

      <div className="flex-grow bg-secondary rounded-2xl shadow-card border border-border overflow-hidden relative z-0">
        {position ? (
          <MapContainer center={position} zoom={15} scrollWheelZoom={true} className="w-full h-full min-h-[400px]">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
}
