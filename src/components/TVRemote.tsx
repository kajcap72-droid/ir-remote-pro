import React from 'react';
import { IRCode } from '../data/irDatabase';
import { irTransmitter } from '../services/irTransmitter';
import {
  Power, VolumeX, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Home, ArrowLeft, Menu, Info, Settings, Circle, X
} from 'lucide-react';

interface TVRemoteProps {
  buttons: IRCode[];
  protocol: string;
  brandName: string;
  modelName: string;
  onTransmit: (code: IRCode) => void;
}

const TVRemote: React.FC<TVRemoteProps> = ({ buttons, protocol, brandName, modelName, onTransmit }) => {
  const getButton = (name: string): IRCode | undefined => buttons.find(b => b.name === name);

  const handlePress = (btn: IRCode | undefined) => {
    if (!btn) return;
    onTransmit(btn);
    irTransmitter.transmit(protocol, btn.code, irTransmitter.getFrequency(protocol));
  };

  const RemoteBtn: React.FC<{
    btn: IRCode | undefined;
    children: React.ReactNode;
    className?: string;
    color?: string;
  }> = ({ btn, children, className = '', color = 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500' }) => (
    <button
      onClick={() => handlePress(btn)}
      disabled={!btn}
      className={`${color} text-white rounded-xl flex items-center justify-center transition-all duration-150 
        active:scale-95 active:shadow-inner disabled:opacity-30 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl ${className}`}
    >
      {children}
    </button>
  );

  const numBtns = ['1','2','3','4','5','6','7','8','9','0'];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-4 px-4">
        <h2 className="text-lg font-bold text-white">{brandName}</h2>
        <p className="text-sm text-gray-400">{modelName}</p>
      </div>

      {/* Remote Body */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-5 shadow-2xl border border-gray-700/50 mx-2">
        {/* Top Row - Power & Source */}
        <div className="flex justify-between mb-5">
          <RemoteBtn btn={getButton('Power')} color="bg-red-600 hover:bg-red-500 active:bg-red-400" className="w-14 h-14">
            <Power size={22} />
          </RemoteBtn>
          <RemoteBtn btn={getButton('Source')} color="bg-blue-600 hover:bg-blue-500 active:bg-blue-400" className="w-14 h-14">
            <span className="text-xs font-bold">SRC</span>
          </RemoteBtn>
          <RemoteBtn btn={getButton('Mute')} color="bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-400" className="w-14 h-14">
            <VolumeX size={20} />
          </RemoteBtn>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {numBtns.slice(0, 9).map(n => (
            <RemoteBtn key={n} btn={getButton(n)} className="h-12">
              <span className="text-lg font-bold">{n}</span>
            </RemoteBtn>
          ))}
          <RemoteBtn btn={getButton('Info')} className="h-12" color="bg-gray-600 hover:bg-gray-500">
            <Info size={18} />
          </RemoteBtn>
          <RemoteBtn btn={getButton('0')} className="h-12">
            <span className="text-lg font-bold">0</span>
          </RemoteBtn>
          <RemoteBtn btn={getButton('Guide')} className="h-12" color="bg-gray-600 hover:bg-gray-500">
            <span className="text-[10px] font-bold">GUIDE</span>
          </RemoteBtn>
        </div>

        {/* Volume & Channel */}
        <div className="flex justify-between items-center mb-5 px-2">
          {/* Volume */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-400 mb-1">VOL</span>
            <RemoteBtn btn={getButton('Vol+')} className="w-14 h-10" color="bg-gray-600 hover:bg-gray-500">
              <ChevronUp size={20} />
            </RemoteBtn>
            <RemoteBtn btn={getButton('Vol-')} className="w-14 h-10" color="bg-gray-600 hover:bg-gray-500">
              <ChevronDown size={20} />
            </RemoteBtn>
          </div>

          {/* Menu */}
          <RemoteBtn btn={getButton('Menu')} className="w-12 h-12" color="bg-indigo-600 hover:bg-indigo-500">
            <Menu size={20} />
          </RemoteBtn>

          {/* Channel */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-400 mb-1">CH</span>
            <RemoteBtn btn={getButton('CH+')} className="w-14 h-10" color="bg-gray-600 hover:bg-gray-500">
              <ChevronUp size={20} />
            </RemoteBtn>
            <RemoteBtn btn={getButton('CH-')} className="w-14 h-10" color="bg-gray-600 hover:bg-gray-500">
              <ChevronDown size={20} />
            </RemoteBtn>
          </div>
        </div>

        {/* D-Pad Navigation */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative w-48 h-48">
            {/* Up */}
            <button
              onClick={() => handlePress(getButton('Up'))}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-gray-600 hover:bg-gray-500 active:bg-gray-400 
                rounded-t-2xl flex items-center justify-center text-white transition-all active:scale-95"
            >
              <ChevronUp size={24} />
            </button>
            {/* Down */}
            <button
              onClick={() => handlePress(getButton('Down'))}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-gray-600 hover:bg-gray-500 active:bg-gray-400 
                rounded-b-2xl flex items-center justify-center text-white transition-all active:scale-95"
            >
              <ChevronDown size={24} />
            </button>
            {/* Left */}
            <button
              onClick={() => handlePress(getButton('Left'))}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-gray-600 hover:bg-gray-500 active:bg-gray-400 
                rounded-l-2xl flex items-center justify-center text-white transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            {/* Right */}
            <button
              onClick={() => handlePress(getButton('Right'))}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-gray-600 hover:bg-gray-500 active:bg-gray-400 
                rounded-r-2xl flex items-center justify-center text-white transition-all active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
            {/* OK Center */}
            <button
              onClick={() => handlePress(getButton('OK'))}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-600 hover:bg-blue-500 
                active:bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg 
                transition-all active:scale-95 shadow-lg"
            >
              OK
            </button>
            {/* Ring decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-gray-600/30 rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between px-4 mb-4">
          <RemoteBtn btn={getButton('Home')} className="w-12 h-10" color="bg-gray-600 hover:bg-gray-500">
            <Home size={18} />
          </RemoteBtn>
          <RemoteBtn btn={getButton('Return')} className="w-12 h-10" color="bg-gray-600 hover:bg-gray-500">
            <ArrowLeft size={18} />
          </RemoteBtn>
          <RemoteBtn btn={getButton('Exit')} className="w-12 h-10" color="bg-gray-600 hover:bg-gray-500">
            <X size={18} />
          </RemoteBtn>
          <RemoteBtn btn={getButton('Settings')} className="w-12 h-10" color="bg-gray-600 hover:bg-gray-500">
            <Settings size={18} />
          </RemoteBtn>
        </div>

        {/* Color Buttons */}
        <div className="flex justify-center gap-3 mb-2">
          <RemoteBtn btn={getButton('Red')} className="w-10 h-6 rounded-lg" color="bg-red-500 hover:bg-red-400">
            <Circle size={8} fill="currentColor" />
          </RemoteBtn>
          <RemoteBtn btn={getButton('Green')} className="w-10 h-6 rounded-lg" color="bg-green-500 hover:bg-green-400">
            <Circle size={8} fill="currentColor" />
          </RemoteBtn>
          <RemoteBtn btn={getButton('Yellow')} className="w-10 h-6 rounded-lg" color="bg-yellow-500 hover:bg-yellow-400">
            <Circle size={8} fill="currentColor" />
          </RemoteBtn>
          <RemoteBtn btn={getButton('Blue')} className="w-10 h-6 rounded-lg" color="bg-blue-500 hover:bg-blue-400">
            <Circle size={8} fill="currentColor" />
          </RemoteBtn>
        </div>

        {/* IR LED Indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-3 h-3 rounded-full bg-purple-400/60 animate-pulse" title="IR LED" />
        </div>
      </div>
    </div>
  );
};

export default TVRemote;
