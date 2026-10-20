import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapCameraChangedEvent
} from '@vis.gl/react-google-maps';
import { INSTITUTE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Phone,
  Clock,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';

const BENGAL_INSTITUTE_LOCATION = {
  lat: 23.9038,
  lng: 89.1235,
};

export const CampusGoogleMap: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const [openInfoWindow, setOpenInfoWindow] = useState(true);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  const googleMapsUrl =
    INSTITUTE_INFO.googleMapsUrl || 'https://maps.app.goo.gl/VUxBM8qDHkSxwKUH7';

  if (!apiKey) {
    return (
      <div className="relative aspect-[4/3] rounded-xl bg-slate-950 border border-slate-700/80 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-10 h-10 text-emerald-400 mb-3 animate-bounce" />
        <h4 className="text-white font-bold text-base mb-1">
          {isBn ? 'জনতা ব্যাংক ভবন, সিঙ্গার মোড়' : 'Janata Bank Building, Singer Mor'}
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mb-4">
          {isBn
            ? 'আজিজুর রহমান সুপার মার্কেট, ১ম তলা, এন এস রোড, কুষ্টিয়া।'
            : 'Azizur Rahman Super Market, 1st Floor, NS Road, Kushtia.'}
        </p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'Google Maps অ্যাপে খুলুন' : 'Open in Google Maps'}</span>
        </a>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl group bg-slate-950">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={BENGAL_INSTITUTE_LOCATION}
          defaultZoom={16}
          mapId="DEMO_MAP_ID"
          mapTypeId={mapType}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          className="w-full h-full"
        >
          {/* Main Campus Pin */}
          <AdvancedMarker
            position={BENGAL_INSTITUTE_LOCATION}
            title={isBn ? INSTITUTE_INFO.nameBn : INSTITUTE_INFO.nameEn}
            onClick={() => setOpenInfoWindow((prev) => !prev)}
          >
            <Pin
              background="#10b981"
              borderColor="#064e3b"
              glyphColor="#ffffff"
            />
          </AdvancedMarker>

          {/* Interactive InfoWindow */}
          {openInfoWindow && (
            <InfoWindow
              position={BENGAL_INSTITUTE_LOCATION}
              onCloseClick={() => setOpenInfoWindow(false)}
              pixelOffset={[0, -32]}
            >
              <div className="p-1 max-w-[260px] text-slate-900 text-left">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 border-b border-slate-200 pb-1 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {isBn ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট' : 'Bengal Computer Training Inst.'}
                  </span>
                </div>
                <h5 className="font-black text-xs text-slate-950 leading-tight">
                  {isBn
                    ? 'আজিজুর রহমান সুপার মার্কেট (জনতা ব্যাংক ভবন)'
                    : 'Azizur Rahman Super Market (Janata Bank)'}
                </h5>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  {isBn
                    ? '১ম তলা, সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া-৭০০০'
                    : '1st Floor, Singer Mor, NS Road, Kushtia-7000'}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${INSTITUTE_INFO.phone1}`}
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{INSTITUTE_INFO.phone1}</span>
                  </a>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold inline-flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{isBn ? 'দিকনির্দেশনা' : 'Directions'}</span>
                  </a>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Top Floating Control Bar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
        <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[11px] text-white flex items-center gap-2 pointer-events-auto shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold hidden xs:inline">
            {isBn ? 'লাইভ গুগল ম্যাপ' : 'Live Google Map'}
          </span>
          <span className="text-emerald-400 font-mono text-[10px] font-bold">
            সিঙ্গার মোড়, কুষ্টিয়া
          </span>
        </div>

        {/* Map Type Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 p-1 rounded-lg pointer-events-auto shadow-lg text-[10px]">
          <button
            type="button"
            onClick={() => setMapType('roadmap')}
            className={`px-2 py-0.5 rounded font-semibold transition-all ${
              mapType === 'roadmap'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {isBn ? 'ম্যাপ' : 'Map'}
          </button>
          <button
            type="button"
            onClick={() => setMapType('hybrid')}
            className={`px-2 py-0.5 rounded font-semibold transition-all ${
              mapType === 'hybrid'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {isBn ? 'স্যাটেলাইট' : 'Satellite'}
          </button>
        </div>
      </div>

      {/* Bottom Floating Action Link to Google Maps App */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2.5 left-2.5 right-2.5 py-2 px-3 rounded-lg bg-slate-900/95 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-between border border-slate-700 transition-all shadow-xl group-hover:border-emerald-500 cursor-pointer pointer-events-auto"
      >
        <span className="flex items-center gap-1.5 text-emerald-300 group-hover:text-white">
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? 'Google Maps অ্যাপে ডিরেকশন ও ট্রাফিক দেখুন' : 'Open Directions in Google Maps App'}</span>
        </span>
        <span className="text-[11px] font-mono text-slate-300 group-hover:text-white">
          কুষ্টিয়া-৭০০০ ↗
        </span>
      </a>
    </div>
  );
};
