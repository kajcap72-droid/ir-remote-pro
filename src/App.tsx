import { useState, useEffect, useCallback } from 'react';
import {
  irDatabase, getBrandsByType, getModelsByBrand, getRemote, getDeviceTypeIcon,
  getDeviceTypeLabel, DeviceType, RemoteModel, IRCode
} from './data/irDatabase';
import { irTransmitter } from './services/irTransmitter';
import TVRemote from './components/TVRemote';
import ACRemote from './components/ACRemote';
import LearningModeComponent from './components/LearningMode';
import {
  Tv, Snowflake, Radio, Search, Star, ChevronRight, Wifi, WifiOff,
  Smartphone, BookOpen, Settings, X, Zap, History
} from 'lucide-react';

type AppView = 'home' | 'select-type' | 'select-brand' | 'select-model' | 'remote' | 'learning' | 'favorites' | 'history' | 'about';

interface TransmitLog {
  timestamp: number;
  button: string;
  code: string;
  protocol: string;
  brand: string;
  model: string;
}

const FAVORITES_KEY = 'ir_favorites';
const RECENT_KEY = 'ir_recent';

function App() {
  const [view, setView] = useState<AppView>('home');
  const [selectedType, setSelectedType] = useState<DeviceType>('tv');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedRemote, setSelectedRemote] = useState<RemoteModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentRemotes, setRecentRemotes] = useState<string[]>([]);
  const [transmitLog, setTransmitLog] = useState<TransmitLog[]>([]);
  const [showLog, setShowLog] = useState(false);
  const [irStatus, setIrStatus] = useState('');
  const [lastTransmit, setLastTransmit] = useState<string>('');

  // Load saved data
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem(FAVORITES_KEY);
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      const savedRecent = localStorage.getItem(RECENT_KEY);
      if (savedRecent) setRecentRemotes(JSON.parse(savedRecent));
    } catch {}
    setIrStatus(irTransmitter.getStatus());
  }, []);

  // Save favorites
  const toggleFavorite = useCallback((remoteId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(remoteId)
        ? prev.filter(id => id !== remoteId)
        : [...prev, remoteId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Add to recent
  const addToRecent = useCallback((remoteId: string) => {
    setRecentRemotes(prev => {
      const updated = [remoteId, ...prev.filter(id => id !== remoteId)].slice(0, 10);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Handle transmit
  const handleTransmit = useCallback((code: IRCode) => {
    if (selectedRemote) {
      const log: TransmitLog = {
        timestamp: Date.now(),
        button: code.name,
        code: code.code,
        protocol: code.protocol,
        brand: selectedRemote.brand,
        model: selectedRemote.model,
      };
      setTransmitLog(prev => [log, ...prev].slice(0, 50));
      setLastTransmit(`${code.name} → ${code.code}`);
      setTimeout(() => setLastTransmit(''), 2000);
    }
  }, [selectedRemote]);

  // Select remote
  const selectRemote = (remote: RemoteModel) => {
    setSelectedRemote(remote);
    addToRecent(remote.id);
    setView('remote');
  };

  // Search filter
  const filteredRemotes = searchQuery.trim()
    ? irDatabase.filter(r =>
        r.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Stats
  const totalRemotes = irDatabase.length;
  const totalBrands = new Set(irDatabase.map(r => r.brand)).size;
  const tvCount = irDatabase.filter(r => r.deviceType === 'tv').length;
  const acCount = irDatabase.filter(r => r.deviceType === 'ac').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      {/* Top Status Bar */}
      <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${irTransmitter.isAvailable() ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
            <span className="text-xs text-gray-400">
              {irTransmitter.isAvailable() ? <Wifi size={12} className="inline" /> : <WifiOff size={12} className="inline" />}
              {' '}IR
            </span>
          </div>
          <h1 className="text-sm font-bold text-center flex items-center gap-1.5">
            <Smartphone size={14} className="text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">IR Remote Pro</span>
          </h1>
          <div className="flex items-center gap-2">
            {lastTransmit && (
              <span className="text-[10px] text-green-400 animate-pulse max-w-[80px] truncate">
                📡 {lastTransmit}
              </span>
            )}
            <button onClick={() => setShowLog(!showLog)} className="text-gray-400 hover:text-white">
              <History size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Transmit Log Overlay */}
      {showLog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setShowLog(false)}>
          <div className="max-w-lg mx-auto mt-16 bg-gray-900 rounded-2xl border border-gray-700 max-h-[70vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-bold flex items-center gap-2"><History size={18} /> Historia transmisji</h3>
              <button onClick={() => setShowLog(false)}><X size={20} /></button>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-4">
              {transmitLog.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Brak historii</p>
              ) : (
                <div className="space-y-2">
                  {transmitLog.map((log, i) => (
                    <div key={i} className="p-2 bg-gray-800 rounded-lg text-sm">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{log.button}</span>
                        <span className="text-gray-500 text-xs">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{log.brand} {log.model} • {log.protocol} • {log.code}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-lg mx-auto pb-24">
        {/* ═══════ HOME VIEW ═══════ */}
        {view === 'home' && (
          <div className="px-4 pt-6">
            {/* Hero */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Smartphone size={40} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-1">IR Remote Control</h1>
              <p className="text-gray-400 text-sm">Pilot na podczerwień</p>
              <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
                <span>{totalRemotes} pilotów</span>
                <span>•</span>
                <span>{totalBrands} marek</span>
                <span>•</span>
                <span>{tvCount} TV + {acCount} AC</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Szukaj marki lub modelu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 text-sm outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-2">Wyniki ({filteredRemotes.length})</h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {filteredRemotes.map(r => (
                    <button
                      key={r.id}
                      onClick={() => selectRemote(r)}
                      className="w-full p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl flex items-center gap-3 transition-all text-left"
                    >
                      <span className="text-xl">{getDeviceTypeIcon(r.deviceType)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{r.brand} {r.model}</p>
                        <p className="text-gray-500 text-xs">{getDeviceTypeLabel(r.deviceType)} • {r.protocol}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-600" />
                    </button>
                  ))}
                  {filteredRemotes.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Nie znaleziono</p>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => { setSelectedType('tv'); setView('select-brand'); }}
                className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/20 rounded-2xl flex flex-col items-center gap-2 hover:border-blue-500/40 transition-all active:scale-95"
              >
                <Tv size={32} className="text-blue-400" />
                <span className="text-sm font-bold text-blue-300">Telewizor</span>
                <span className="text-xs text-gray-500">{tvCount} pilotów</span>
              </button>
              <button
                onClick={() => { setSelectedType('ac'); setView('select-brand'); }}
                className="p-4 bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/20 rounded-2xl flex flex-col items-center gap-2 hover:border-cyan-500/40 transition-all active:scale-95"
              >
                <Snowflake size={32} className="text-cyan-400" />
                <span className="text-sm font-bold text-cyan-300">Klimatyzacja</span>
                <span className="text-xs text-gray-500">{acCount} pilotów</span>
              </button>
              <button
                onClick={() => setView('learning')}
                className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/20 rounded-2xl flex flex-col items-center gap-2 hover:border-purple-500/40 transition-all active:scale-95"
              >
                <Radio size={32} className="text-purple-400" />
                <span className="text-sm font-bold text-purple-300">Uczenie IR</span>
                <span className="text-xs text-gray-500">Z pilota fizycznego</span>
              </button>
              <button
                onClick={() => setView('about')}
                className="p-4 bg-gradient-to-br from-gray-600/20 to-gray-800/20 border border-gray-500/20 rounded-2xl flex flex-col items-center gap-2 hover:border-gray-500/40 transition-all active:scale-95"
              >
                <BookOpen size={32} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-300">Informacje</span>
                <span className="text-xs text-gray-500">O aplikacji</span>
              </button>
            </div>

            {/* Favorites */}
            {favorites.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                  <Star size={14} className="text-yellow-400" /> Ulubione
                </h3>
                <div className="space-y-1">
                  {favorites.map(id => {
                    const r = getRemote(id);
                    if (!r) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => selectRemote(r)}
                        className="w-full p-3 bg-gray-800/30 hover:bg-gray-700/50 rounded-xl flex items-center gap-3 transition-all text-left"
                      >
                        <span className="text-lg">{getDeviceTypeIcon(r.deviceType)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{r.brand} {r.model}</p>
                          <p className="text-gray-500 text-xs">{r.protocol}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-600" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent */}
            {recentRemotes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                  <History size={14} /> Ostatnio używane
                </h3>
                <div className="space-y-1">
                  {recentRemotes.slice(0, 5).map(id => {
                    const r = getRemote(id);
                    if (!r) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => selectRemote(r)}
                        className="w-full p-3 bg-gray-800/30 hover:bg-gray-700/50 rounded-xl flex items-center gap-3 transition-all text-left"
                      >
                        <span className="text-lg">{getDeviceTypeIcon(r.deviceType)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{r.brand} {r.model}</p>
                          <p className="text-gray-500 text-xs">{r.protocol}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-600" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* IR Status */}
            <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-yellow-400" />
                <span className="text-sm font-bold text-gray-300">Status IR Blaster</span>
              </div>
              <p className="text-xs text-gray-500">{irStatus}</p>
              <p className="text-xs text-gray-600 mt-1">
                Aplikacja automatycznie wykrywa wbudowany nadajnik IR w telefonie. Na urządzeniach bez IR blastera działa w trybie symulacji.
              </p>
            </div>

            {/* All Types Browse */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 mb-3">Przeglądaj według typu</h3>
              <div className="space-y-1">
                {(['tv', 'ac'] as DeviceType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => { setSelectedType(type); setView('select-brand'); }}
                    className="w-full p-3 bg-gray-800/30 hover:bg-gray-700/50 rounded-xl flex items-center gap-3 transition-all"
                  >
                    <span className="text-xl">{getDeviceTypeIcon(type)}</span>
                    <span className="text-sm text-white flex-1 text-left">{getDeviceTypeLabel(type)}</span>
                    <span className="text-xs text-gray-500">{irDatabase.filter(r => r.deviceType === type).length}</span>
                    <ChevronRight size={16} className="text-gray-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════ SELECT BRAND VIEW ═══════ */}
        {view === 'select-brand' && (
          <div className="px-4 pt-6">
            <button onClick={() => setView('home')} className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1">
              ← Powrót
            </button>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{getDeviceTypeIcon(selectedType)}</span>
              <div>
                <h2 className="text-xl font-bold">{getDeviceTypeLabel(selectedType)}</h2>
                <p className="text-sm text-gray-400">Wybierz markę</p>
              </div>
            </div>
            <div className="space-y-2">
              {getBrandsByType(selectedType).map(brand => {
                const models = getModelsByBrand(brand, selectedType);
                return (
                  <button
                    key={brand}
                    onClick={() => { setSelectedBrand(brand); setView('select-model'); }}
                    className="w-full p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl flex items-center justify-between transition-all active:scale-[0.98]"
                  >
                    <div className="text-left">
                      <p className="text-white font-bold">{brand}</p>
                      <p className="text-xs text-gray-500">{models.length} model(i)</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-600" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════ SELECT MODEL VIEW ═══════ */}
        {view === 'select-model' && (
          <div className="px-4 pt-6">
            <button onClick={() => setView('select-brand')} className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-1">
              ← {selectedBrand}
            </button>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{getDeviceTypeIcon(selectedType)}</span>
              <div>
                <h2 className="text-xl font-bold">{selectedBrand}</h2>
                <p className="text-sm text-gray-400">Wybierz model pilota</p>
              </div>
            </div>
            <div className="space-y-2">
              {getModelsByBrand(selectedBrand, selectedType).map(remote => (
                <button
                  key={remote.id}
                  onClick={() => selectRemote(remote)}
                  className="w-full p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl flex items-center justify-between transition-all active:scale-[0.98]"
                >
                  <div className="text-left">
                    <p className="text-white font-medium">{remote.model}</p>
                    <p className="text-xs text-gray-500">{remote.protocol} • {remote.buttons.length} przycisków</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(remote.id); }}
                      className="p-1"
                    >
                      <Star
                        size={16}
                        className={favorites.includes(remote.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                      />
                    </button>
                    <ChevronRight size={18} className="text-gray-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══════ REMOTE VIEW ═══════ */}
        {view === 'remote' && selectedRemote && (
          <div className="pt-4 pb-8">
            {/* Remote Header */}
            <div className="px-4 flex items-center justify-between mb-4">
              <button onClick={() => setView('select-model')} className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                ← Powrót
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(selectedRemote.id)}
                  className="p-2"
                >
                  <Star
                    size={20}
                    className={favorites.includes(selectedRemote.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}
                  />
                </button>
                <button onClick={() => setShowLog(true)} className="p-2 text-gray-500 hover:text-white">
                  <Settings size={18} />
                </button>
              </div>
            </div>

            {/* Protocol Badge */}
            <div className="flex justify-center mb-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-mono">
                {selectedRemote.protocol} • {selectedRemote.address}
              </span>
            </div>

            {/* Render Remote Based on Type */}
            {selectedRemote.deviceType === 'tv' ? (
              <TVRemote
                buttons={selectedRemote.buttons}
                protocol={selectedRemote.protocol}
                brandName={selectedRemote.brand}
                modelName={selectedRemote.model}
                onTransmit={handleTransmit}
              />
            ) : selectedRemote.deviceType === 'ac' ? (
              <ACRemote
                buttons={selectedRemote.buttons}
                protocol={selectedRemote.protocol}
                brandName={selectedRemote.brand}
                modelName={selectedRemote.model}
                onTransmit={handleTransmit}
              />
            ) : (
              <TVRemote
                buttons={selectedRemote.buttons}
                protocol={selectedRemote.protocol}
                brandName={selectedRemote.brand}
                modelName={selectedRemote.model}
                onTransmit={handleTransmit}
              />
            )}
          </div>
        )}

        {/* ═══════ LEARNING VIEW ═══════ */}
        {view === 'learning' && (
          <div className="pt-6">
            <LearningModeComponent onBack={() => setView('home')} />
          </div>
        )}

        {/* ═══════ ABOUT VIEW ═══════ */}
        {view === 'about' && (
          <div className="px-4 pt-6">
            <button onClick={() => setView('home')} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1">
              ← Powrót
            </button>

            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/20">
                <Smartphone size={48} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-1">IR Remote Control Pro</h1>
              <p className="text-gray-400 text-sm">Wersja 2.0</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-400" /> O aplikacji
                </h3>
                <p className="text-sm text-gray-400">
                  Uniwersalny pilot na podczerwień (IR) z rozbudowaną bazą kodów dla telewizorów i klimatyzatorów.
                  Obsługuje wbudowany nadajnik IR w telefonie oraz tryb uczenia kodów z fizycznego pilota.
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <h3 className="font-bold text-white mb-2">📊 Statystyki bazy</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-gray-700/30 rounded-lg">
                    <p className="text-gray-500 text-xs">Pilotów</p>
                    <p className="text-white font-bold">{totalRemotes}</p>
                  </div>
                  <div className="p-2 bg-gray-700/30 rounded-lg">
                    <p className="text-gray-500 text-xs">Marek</p>
                    <p className="text-white font-bold">{totalBrands}</p>
                  </div>
                  <div className="p-2 bg-gray-700/30 rounded-lg">
                    <p className="text-gray-500 text-xs">TV</p>
                    <p className="text-white font-bold">{tvCount}</p>
                  </div>
                  <div className="p-2 bg-gray-700/30 rounded-lg">
                    <p className="text-gray-500 text-xs">AC</p>
                    <p className="text-white font-bold">{acCount}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <h3 className="font-bold text-white mb-2">📺 Obsługiwane marki TV</h3>
                <div className="flex flex-wrap gap-1">
                  {getBrandsByType('tv').map(b => (
                    <span key={b} className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-xs">{b}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <h3 className="font-bold text-white mb-2">❄️ Obsługiwane marki AC</h3>
                <div className="flex flex-wrap gap-1">
                  {getBrandsByType('ac').map(b => (
                    <span key={b} className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-lg text-xs">{b}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <h3 className="font-bold text-white mb-2">🔧 Obsługiwane protokoły</h3>
                <div className="flex flex-wrap gap-1">
                  {['NEC', 'Samsung', 'Sony SIRC', 'RC5', 'RC6', 'Panasonic', 'Sharp', 'Daikin', 'Mitsubishi', 'LG AC', 'Gree', 'Midea', 'Haier', 'Toshiba AC', 'Fujitsu AC', 'Carrier AC', 'Hitachi AC'].map(p => (
                    <span key={p} className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-xs">{p}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <h3 className="font-bold text-white mb-2">📱 Jak korzystać z IR Blastera</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>1. <strong className="text-gray-300">Telefon z IR blasterem</strong> - aplikacja automatycznie wykrywa i używa wbudowanego nadajnika podczerwieni (Samsung, Xiaomi, Huawei, LG itp.)</p>
                  <p>2. <strong className="text-gray-300">Android WebView</strong> - w przypadku opakowania w natywną aplikację, używa ConsumerIrManager API</p>
                  <p>3. <strong className="text-gray-300">USB IR Blaster</strong> - obsługa zewnętrznych nadajników IR przez WebHID API</p>
                  <p>4. <strong className="text-gray-300">Tryb symulacji</strong> - na urządzeniach bez IR, kody są wyświetlane do użycia z zewnętrznym sprzętem</p>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <h3 className="font-bold text-white mb-2">🎓 Tryb uczenia</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Tryb uczenia pozwala na nagrywanie kodów IR z fizycznego pilota:</p>
                  <p>1. Stwórz nowy profil pilota</p>
                  <p>2. Włącz tryb uczenia</p>
                  <p>3. Skieruj fizyczny pilot na odbiornik IR telefonu</p>
                  <p>4. Naciśnij przycisk na fizycznym pilocie</p>
                  <p>5. Kod zostanie automatycznie rozpoznany i zapisany</p>
                  <p>6. Eksportuj/importuj kody jako plik JSON</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      {(view !== 'remote' && view !== 'learning') && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50 safe-area-bottom">
          <div className="max-w-lg mx-auto px-4 py-2 flex justify-around">
            <button
              onClick={() => setView('home')}
              className={`flex flex-col items-center gap-1 p-2 ${view === 'home' ? 'text-purple-400' : 'text-gray-500'}`}
            >
              <Smartphone size={20} />
              <span className="text-[10px]">Główna</span>
            </button>
            <button
              onClick={() => { setSelectedType('tv'); setView('select-brand'); }}
              className={`flex flex-col items-center gap-1 p-2 ${view === 'select-brand' && selectedType === 'tv' ? 'text-blue-400' : 'text-gray-500'}`}
            >
              <Tv size={20} />
              <span className="text-[10px]">TV</span>
            </button>
            <button
              onClick={() => { setSelectedType('ac'); setView('select-brand'); }}
              className={`flex flex-col items-center gap-1 p-2 ${view === 'select-brand' && selectedType === 'ac' ? 'text-cyan-400' : 'text-gray-500'}`}
            >
              <Snowflake size={20} />
              <span className="text-[10px]">AC</span>
            </button>
            <button
              onClick={() => setView('learning')}
              className="flex flex-col items-center gap-1 p-2 text-gray-500"
            >
              <Radio size={20} />
              <span className="text-[10px]">Ucz się</span>
            </button>
            <button
              onClick={() => setView('about')}
              className={`flex flex-col items-center gap-1 p-2 ${view === 'about' ? 'text-purple-400' : 'text-gray-500'}`}
            >
              <BookOpen size={20} />
              <span className="text-[10px]">Info</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
