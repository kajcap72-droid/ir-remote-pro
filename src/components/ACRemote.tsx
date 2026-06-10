import React, { useState } from 'react';
import { IRCode } from '../data/irDatabase';
import { irTransmitter } from '../services/irTransmitter';
import {
  Power, ChevronUp, ChevronDown, Wind, Snowflake, Sun, Droplets, Zap,
  Timer, Moon, Lightbulb, Leaf, RotateCcw, Thermometer
} from 'lucide-react';

interface ACRemoteProps {
  buttons: IRCode[];
  protocol: string;
  brandName: string;
  modelName: string;
  onTransmit: (code: IRCode) => void;
}

const ACRemote: React.FC<ACRemoteProps> = ({ buttons, protocol, brandName, modelName, onTransmit }) => {
  const [temperature, setTemperature] = useState(24);
  const [mode, setMode] = useState<'cool' | 'heat' | 'dry' | 'auto' | 'fan'>('cool');
  const [fanSpeed, setFanSpeed] = useState(1);
  const [isOn, setIsOn] = useState(false);
  const [swingOn, setSwingOn] = useState(false);

  const getButton = (name: string): IRCode | undefined => buttons.find(b => b.name === name);

  const handlePress = (btn: IRCode | undefined, action?: () => void) => {
    if (!btn) return;
    onTransmit(btn);
    irTransmitter.transmit(protocol, btn.code, irTransmitter.getFrequency(protocol));
    if (action) action();
  };

  const modeConfig = {
    cool: { icon: Snowflake, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Chłodzenie' },
    heat: { icon: Sun, color: 'text-orange-400', bg: 'bg-orange-500/20', label: 'Grzanie' },
    dry: { icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/20', label: 'Osuszanie' },
    auto: { icon: RotateCcw, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Auto' },
    fan: { icon: Wind, color: 'text-gray-400', bg: 'bg-gray-500/20', label: 'Wentylator' },
  };

  const currentMode = modeConfig[mode];
  const ModeIcon = currentMode.icon;

  const fanSpeeds = ['Cicho', 'Niski', 'Średni', 'Wysoki', 'Turbo'];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-4 px-4">
        <h2 className="text-lg font-bold text-white">{brandName}</h2>
        <p className="text-sm text-gray-400">{modelName}</p>
      </div>

      {/* Remote Body */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-5 shadow-2xl border border-gray-700/50 mx-2">
        {/* Display */}
        <div className={`${isOn ? 'bg-gray-900/80' : 'bg-gray-900/40'} rounded-2xl p-4 mb-5 border ${isOn ? 'border-blue-500/30' : 'border-gray-700/30'} transition-all`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center gap-2 ${isOn ? currentMode.color : 'text-gray-600'}`}>
              <ModeIcon size={20} />
              <span className="text-sm font-medium">{currentMode.label}</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
          </div>
          <div className="flex items-center justify-center">
            <span className={`text-6xl font-light ${isOn ? 'text-white' : 'text-gray-600'}`}>{temperature}</span>
            <span className={`text-2xl ml-1 ${isOn ? 'text-gray-400' : 'text-gray-600'}`}>°C</span>
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>Wiatr: {fanSpeeds[fanSpeed]}</span>
            <span>Swing: {swingOn ? 'ON' : 'OFF'}</span>
          </div>
        </div>

        {/* Power Button */}
        <div className="flex justify-center mb-5">
          <button
            onClick={() => handlePress(getButton('Power On/Off'), () => setIsOn(!isOn))}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg
              ${isOn ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
          >
            <Power size={32} />
          </button>
        </div>

        {/* Temperature Controls */}
        <div className="flex items-center justify-center gap-6 mb-5">
          <button
            onClick={() => handlePress(getButton('Temp ▼'), () => setTemperature(Math.max(16, temperature - 1)))}
            className="w-16 h-16 bg-blue-600/80 hover:bg-blue-500 active:bg-blue-400 rounded-2xl flex items-center justify-center text-white transition-all active:scale-95 shadow-lg"
          >
            <ChevronDown size={28} />
          </button>
          <div className="flex flex-col items-center">
            <Thermometer size={20} className="text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Temperatura</span>
          </div>
          <button
            onClick={() => handlePress(getButton('Temp ▲'), () => setTemperature(Math.min(30, temperature + 1)))}
            className="w-16 h-16 bg-red-600/80 hover:bg-red-500 active:bg-red-400 rounded-2xl flex items-center justify-center text-white transition-all active:scale-95 shadow-lg"
          >
            <ChevronUp size={28} />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="mb-5">
          <p className="text-xs text-gray-400 text-center mb-2">Tryb pracy</p>
          <div className="flex justify-center gap-2">
            {(Object.keys(modeConfig) as Array<keyof typeof modeConfig>).map((m) => {
              const config = modeConfig[m];
              const Icon = config.icon;
              const modeBtn = getButton(m.charAt(0).toUpperCase() + m.slice(1));
              return (
                <button
                  key={m}
                  onClick={() => handlePress(modeBtn || getButton('Mode'), () => setMode(m))}
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95
                    ${mode === m ? config.bg + ' ring-2 ring-white/20' : 'bg-gray-700/50 hover:bg-gray-600/50'}`}
                >
                  <Icon size={16} className={mode === m ? config.color : 'text-gray-400'} />
                  <span className={`text-[8px] mt-0.5 ${mode === m ? config.color : 'text-gray-500'}`}>
                    {config.label.slice(0, 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fan Speed */}
        <div className="mb-5">
          <p className="text-xs text-gray-400 text-center mb-2">Prędkość wentylatora</p>
          <div className="flex items-center justify-center gap-2">
            <Wind size={16} className="text-gray-400" />
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handlePress(getButton('Fan Speed'), () => setFanSpeed(speed))}
                  className={`w-10 h-8 rounded-lg text-[10px] font-bold transition-all active:scale-95
                    ${fanSpeed === speed ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                >
                  {speed === 0 ? 'A' : speed}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button
            onClick={() => handlePress(getButton('Swing'), () => setSwingOn(!swingOn))}
            className={`h-12 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95
              ${swingOn ? 'bg-purple-500/30 text-purple-400' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
          >
            <Wind size={16} className={swingOn ? 'animate-pulse' : ''} />
            <span className="text-[9px] mt-1">Swing</span>
          </button>
          <button
            onClick={() => handlePress(getButton('Timer'))}
            className="h-12 rounded-xl bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center text-gray-400 transition-all active:scale-95"
          >
            <Timer size={16} />
            <span className="text-[9px] mt-1">Timer</span>
          </button>
          <button
            onClick={() => handlePress(getButton('Sleep'))}
            className="h-12 rounded-xl bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center text-gray-400 transition-all active:scale-95"
          >
            <Moon size={16} />
            <span className="text-[9px] mt-1">Sen</span>
          </button>
          <button
            onClick={() => handlePress(getButton('Turbo'))}
            className="h-12 rounded-xl bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center text-gray-400 transition-all active:scale-95"
          >
            <Zap size={16} />
            <span className="text-[9px] mt-1">Turbo</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-2">
          <button
            onClick={() => handlePress(getButton('Light'))}
            className="h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-1 text-gray-400 transition-all active:scale-95"
          >
            <Lightbulb size={14} />
            <span className="text-[9px]">Światło</span>
          </button>
          <button
            onClick={() => handlePress(getButton('Eco'))}
            className="h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-1 text-gray-400 transition-all active:scale-95"
          >
            <Leaf size={14} />
            <span className="text-[9px]">Eco</span>
          </button>
          <button
            onClick={() => handlePress(getButton('Auto'))}
            className="h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center gap-1 text-gray-400 transition-all active:scale-95"
          >
            <RotateCcw size={14} />
            <span className="text-[9px]">Auto</span>
          </button>
        </div>

        {/* Temperature Presets */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 text-center mb-2">Szybkie ustawienia temp.</p>
          <div className="flex justify-center gap-1 flex-wrap">
            {[16, 18, 20, 22, 24, 26, 28, 30].map(t => (
              <button
                key={t}
                onClick={() => handlePress(getButton(`${t}°C`), () => setTemperature(t))}
                className={`w-9 h-8 rounded-lg text-[10px] font-bold transition-all active:scale-95
                  ${temperature === t ? 'bg-blue-500 text-white' : 'bg-gray-700/60 text-gray-400 hover:bg-gray-600'}`}
              >
                {t}°
              </button>
            ))}
          </div>
        </div>

        {/* IR LED */}
        <div className="flex justify-center mt-4">
          <div className="w-3 h-3 rounded-full bg-purple-400/60 animate-pulse" title="IR LED" />
        </div>
      </div>
    </div>
  );
};

export default ACRemote;
