import React, { useState, useEffect, useCallback } from 'react';
import { learningMode, LearnedRemote, LearnedCode } from '../services/learningMode';
import { irTransmitter } from '../services/irTransmitter';
import {
  Radio, Plus, Trash2, Download, Upload, Play, Square, Edit3, Save, X, Zap, AlertCircle
} from 'lucide-react';

interface LearningModeProps {
  onBack: () => void;
}

const LearningModeComponent: React.FC<LearningModeProps> = ({ onBack }) => {
  const [learnedRemotes, setLearnedRemotes] = useState<LearnedRemote[]>([]);
  const [isLearning, setIsLearning] = useState(false);
  const [currentRemote, setCurrentRemote] = useState<LearnedRemote | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRemoteName, setNewRemoteName] = useState('');
  const [newRemoteBrand, setNewRemoteBrand] = useState('');
  const [newRemoteType, setNewRemoteType] = useState('tv');
  const [editingCodeName, setEditingCodeName] = useState<string | null>(null);
  const [tempCodeName, setTempCodeName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [lastLearnedCode, setLastLearnedCode] = useState<LearnedCode | null>(null);

  useEffect(() => {
    setLearnedRemotes(learningMode.loadRemotes());
  }, []);

  const showStatus = useCallback((msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  }, []);

  const createRemote = () => {
    if (!newRemoteName.trim()) return;
    const remote: LearnedRemote = {
      id: `custom_${Date.now()}`,
      name: newRemoteName,
      brand: newRemoteBrand || 'Custom',
      deviceType: newRemoteType,
      codes: [],
      createdAt: Date.now(),
    };
    const updated = [...learnedRemotes, remote];
    setLearnedRemotes(updated);
    learningMode.saveRemotes(updated);
    setCurrentRemote(remote);
    setShowCreateForm(false);
    setNewRemoteName('');
    setNewRemoteBrand('');
    showStatus('Pilot utworzony!');
  };

  const deleteRemote = (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten pilot?')) return;
    const updated = learningMode.deleteRemote(id);
    setLearnedRemotes(updated);
    if (currentRemote?.id === id) setCurrentRemote(null);
    showStatus('Pilot usunięty');
  };

  const startLearning = () => {
    if (!currentRemote) return;
    setIsLearning(true);
    learningMode.startLearning((code: LearnedCode) => {
      setLastLearnedCode(code);
    });
    showStatus('Tryb uczenia aktywny - skieruj pilot na telefon...');
  };

  const stopLearning = () => {
    setIsLearning(false);
    learningMode.stopLearning();
    showStatus('Tryb uczenia zatrzymany');
  };

  const simulateLearn = () => {
    if (!currentRemote) return;
    const buttonNames = ['Power', 'Vol+', 'Vol-', 'CH+', 'CH-', 'Mute', 'Menu', 'OK', 'Up', 'Down', 'Left', 'Right'];
    const name = prompt('Podaj nazwę przycisku:', buttonNames[currentRemote.codes.length % buttonNames.length]) || 'Button';
    
    const code = learningMode.simulateReceive(name);
    const updatedRemote = {
      ...currentRemote,
      codes: [...currentRemote.codes, code],
    };
    
    const updated = learnedRemotes.map(r => r.id === currentRemote.id ? updatedRemote : r);
    setLearnedRemotes(updated);
    learningMode.saveRemotes(updated);
    setCurrentRemote(updatedRemote);
    setLastLearnedCode(code);
    showStatus(`Przycisk "${name}" nauczony! Kod: ${code.code}`);
  };

  const deleteCode = (codeId: string) => {
    if (!currentRemote) return;
    const updatedRemote = {
      ...currentRemote,
      codes: currentRemote.codes.filter(c => c.id !== codeId),
    };
    const updated = learnedRemotes.map(r => r.id === currentRemote.id ? updatedRemote : r);
    setLearnedRemotes(updated);
    learningMode.saveRemotes(updated);
    setCurrentRemote(updatedRemote);
  };

  const renameCode = (codeId: string) => {
    if (!currentRemote || !tempCodeName.trim()) return;
    const updatedRemote = {
      ...currentRemote,
      codes: currentRemote.codes.map(c => c.id === codeId ? { ...c, name: tempCodeName } : c),
    };
    const updated = learnedRemotes.map(r => r.id === currentRemote.id ? updatedRemote : r);
    setLearnedRemotes(updated);
    learningMode.saveRemotes(updated);
    setCurrentRemote(updatedRemote);
    setEditingCodeName(null);
    setTempCodeName('');
  };

  const transmitCode = (code: LearnedCode) => {
    irTransmitter.transmit(code.protocol, code.code, code.frequency);
    showStatus(`Wysłano: ${code.name} (${code.code})`);
  };

  const exportRemotes = () => {
    const json = learningMode.exportCodes(learnedRemotes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ir_remotes_backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Kody wyeksportowane!');
  };

  const importRemotes = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const json = ev.target?.result as string;
        const imported = learningMode.importCodes(json);
        if (imported.length > 0) {
          const merged = [...learnedRemotes, ...imported];
          setLearnedRemotes(merged);
          learningMode.saveRemotes(merged);
          showStatus(`Zaimportowano ${imported.length} pilot(ów)!`);
        } else {
          showStatus('Błąd importu - nieprawidłowy format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Radio size={20} className="text-purple-400" />
          Tryb Uczenia IR
        </h2>
        <div className="flex gap-2">
          <button onClick={exportRemotes} className="text-gray-400 hover:text-blue-400 transition-colors" title="Eksportuj">
            <Download size={20} />
          </button>
          <button onClick={importRemotes} className="text-gray-400 hover:text-green-400 transition-colors" title="Importuj">
            <Upload size={20} />
          </button>
        </div>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 text-sm text-center animate-pulse">
          {statusMessage}
        </div>
      )}

      {/* IR Hardware Info */}
      <div className="mb-4 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
          <div className="text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-1">Status IR: {irTransmitter.getStatus()}</p>
            <p>Tryb uczenia wymaga odbiornika IR (TSOP38238). W trybie demonstracyjnym możesz symulować naukę kodów i używać ich z bazą danych.</p>
          </div>
        </div>
      </div>

      {/* Remote List or Detail View */}
      {!currentRemote ? (
        <>
          {/* Create New Button */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full mb-4 p-4 bg-purple-600/20 hover:bg-purple-600/30 border-2 border-dashed border-purple-500/40 
              rounded-xl flex items-center justify-center gap-2 text-purple-300 transition-all"
          >
            <Plus size={20} />
            <span>Stwórz nowy pilot (uczenie)</span>
          </button>

          {/* Create Form */}
          {showCreateForm && (
            <div className="mb-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
              <h3 className="text-white font-bold mb-3">Nowy pilot</h3>
              <input
                type="text"
                placeholder="Nazwa pilota (np. TV Salon)"
                value={newRemoteName}
                onChange={(e) => setNewRemoteName(e.target.value)}
                className="w-full mb-2 p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Marka (np. Samsung)"
                value={newRemoteBrand}
                onChange={(e) => setNewRemoteBrand(e.target.value)}
                className="w-full mb-2 p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newRemoteType}
                onChange={(e) => setNewRemoteType(e.target.value)}
                className="w-full mb-3 p-3 bg-gray-700 rounded-lg text-white text-sm outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="tv">📺 Telewizor</option>
                <option value="ac">❄️ Klimatyzacja</option>
                <option value="dvd">📀 DVD / Blu-ray</option>
                <option value="audio">🔊 Audio</option>
                <option value="projector">📽️ Projektor</option>
                <option value="other">📱 Inne</option>
              </select>
              <div className="flex gap-2">
                <button onClick={createRemote} className="flex-1 p-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white text-sm font-bold transition-all">
                  Utwórz
                </button>
                <button onClick={() => setShowCreateForm(false)} className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white text-sm transition-all">
                  Anuluj
                </button>
              </div>
            </div>
          )}

          {/* Remotes List */}
          {learnedRemotes.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Radio size={48} className="mx-auto mb-3 opacity-30" />
              <p>Brak nauczonych pilotów</p>
              <p className="text-sm mt-1">Stwórz nowy pilot i naucz go kodów IR</p>
            </div>
          ) : (
            <div className="space-y-2">
              {learnedRemotes.map(remote => (
                <div
                  key={remote.id}
                  className="p-4 bg-gray-800 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentRemote(remote)}
                      className="flex-1 text-left"
                    >
                      <h3 className="text-white font-bold">{remote.name}</h3>
                      <p className="text-sm text-gray-400">{remote.brand} • {remote.codes.length} przycisków</p>
                    </button>
                    <button
                      onClick={() => deleteRemote(remote.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Remote Detail View */}
          <div className="mb-4">
            <button
              onClick={() => { setCurrentRemote(null); stopLearning(); }}
              className="text-gray-400 hover:text-white text-sm flex items-center gap-1 mb-3"
            >
              ← Powrót do listy
            </button>
            <div className="p-4 bg-gray-800 rounded-xl border border-gray-700/50">
              <h3 className="text-white font-bold text-lg">{currentRemote.name}</h3>
              <p className="text-sm text-gray-400">{currentRemote.brand} • {currentRemote.deviceType}</p>
            </div>
          </div>

          {/* Learning Controls */}
          <div className="flex gap-2 mb-4">
            {!isLearning ? (
              <button
                onClick={startLearning}
                className="flex-1 p-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Radio size={18} />
                Rozpocznij uczenie
              </button>
            ) : (
              <button
                onClick={stopLearning}
                className="flex-1 p-3 bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all animate-pulse"
              >
                <Square size={18} />
                Zatrzymaj uczenie
              </button>
            )}
            <button
              onClick={simulateLearn}
              className="p-3 bg-gray-600 hover:bg-gray-500 rounded-xl text-white flex items-center justify-center gap-1 transition-all text-sm"
              title="Symuluj naukę (demo)"
            >
              <Zap size={16} />
              Demo
            </button>
          </div>

          {/* Last Learned */}
          {lastLearnedCode && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-green-400 text-sm font-bold">Ostatnio nauczony:</p>
              <p className="text-green-300 text-xs">{lastLearnedCode.name}: {lastLearnedCode.code} ({lastLearnedCode.protocol})</p>
            </div>
          )}

          {/* Learned Codes List */}
          {currentRemote.codes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Brak nauczonych kodów</p>
              <p className="text-sm mt-1">Naciśnij "Rozpocznij uczenie" lub "Demo"</p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentRemote.codes.map(code => (
                <div key={code.id} className="p-3 bg-gray-800 rounded-xl border border-gray-700/30 flex items-center gap-3">
                  {/* Transmit Button */}
                  <button
                    onClick={() => transmitCode(code)}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0 transition-all active:scale-95"
                  >
                    <Play size={16} />
                  </button>

                  {/* Code Info */}
                  <div className="flex-1 min-w-0">
                    {editingCodeName === code.id ? (
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={tempCodeName}
                          onChange={(e) => setTempCodeName(e.target.value)}
                          className="flex-1 p-1 bg-gray-700 rounded text-white text-sm outline-none"
                          autoFocus
                        />
                        <button onClick={() => renameCode(code.id)} className="p-1 text-green-400">
                          <Save size={14} />
                        </button>
                        <button onClick={() => setEditingCodeName(null)} className="p-1 text-gray-400">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-white text-sm font-medium truncate">{code.name}</p>
                        <p className="text-gray-500 text-xs truncate">{code.protocol} • {code.code}</p>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => { setEditingCodeName(code.id); setTempCodeName(code.name); }}
                    className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => deleteCode(code.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LearningModeComponent;
