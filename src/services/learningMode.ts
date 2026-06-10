// IR Learning Mode Service
// Allows capturing IR codes from physical remotes

export interface LearnedCode {
  id: string;
  name: string;
  code: string;
  protocol: string;
  frequency: number;
  rawData?: number[];
  timestamp: number;
  deviceType: string;
  brand: string;
}

export interface LearnedRemote {
  id: string;
  name: string;
  brand: string;
  deviceType: string;
  codes: LearnedCode[];
  createdAt: number;
}

const STORAGE_KEY = 'ir_learned_remotes';

class LearningModeService {
  private isLearning: boolean = false;
  private currentCallback: ((code: LearnedCode) => void) | null = null;

  // Start learning mode
  startLearning(callback: (code: LearnedCode) => void): boolean {
    this.isLearning = true;
    this.currentCallback = callback;

    // Try to use Android IR receiver if available
    if (typeof (window as any).AndroidIR !== 'undefined') {
      try {
        (window as any).AndroidIR.startLearning();
        return true;
      } catch (e) {
        console.error('Failed to start Android IR learning:', e);
      }
    }

    // Set up listener for incoming IR codes
    window.addEventListener('ir-code-received', this.handleIRCodeReceived as EventListener);

    return true;
  }

  // Stop learning mode
  stopLearning(): void {
    this.isLearning = false;
    this.currentCallback = null;

    if (typeof (window as any).AndroidIR !== 'undefined') {
      try {
        (window as any).AndroidIR.stopLearning();
      } catch (e) {
        console.error('Failed to stop Android IR learning:', e);
      }
    }

    window.removeEventListener('ir-code-received', this.handleIRCodeReceived as EventListener);
  }

  isInLearningMode(): boolean {
    return this.isLearning;
  }

  private handleIRCodeReceived = (event: CustomEvent) => {
    if (this.currentCallback && event.detail) {
      const code: LearnedCode = {
        id: `learned_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: event.detail.name || 'Nieznany przycisk',
        code: event.detail.code || '0x0000',
        protocol: event.detail.protocol || 'Unknown',
        frequency: event.detail.frequency || 38000,
        rawData: event.detail.rawData,
        timestamp: Date.now(),
        deviceType: 'custom',
        brand: 'Custom',
      };
      this.currentCallback(code);
    }
  };

  // Simulate receiving an IR code (for testing / demo)
  simulateReceive(name: string): LearnedCode {
    const code: LearnedCode = {
      id: `learned_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      code: '0x' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0'),
      protocol: 'NEC',
      frequency: 38000,
      rawData: this.generateRandomPattern(),
      timestamp: Date.now(),
      deviceType: 'custom',
      brand: 'Custom',
    };
    return code;
  }

  private generateRandomPattern(): number[] {
    const pattern: number[] = [9000, 4500];
    for (let i = 0; i < 32; i++) {
      pattern.push(560);
      pattern.push(Math.random() > 0.5 ? 1690 : 560);
    }
    pattern.push(560);
    return pattern;
  }

  // Save learned remotes to localStorage
  saveRemotes(remotes: LearnedRemote[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remotes));
    } catch (e) {
      console.error('Failed to save learned remotes:', e);
    }
  }

  // Load learned remotes from localStorage
  loadRemotes(): LearnedRemote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load learned remotes:', e);
      return [];
    }
  }

  // Delete a learned remote
  deleteRemote(remoteId: string): LearnedRemote[] {
    const remotes = this.loadRemotes();
    const filtered = remotes.filter(r => r.id !== remoteId);
    this.saveRemotes(filtered);
    return filtered;
  }

  // Export learned codes as JSON
  exportCodes(remotes: LearnedRemote[]): string {
    return JSON.stringify(remotes, null, 2);
  }

  // Import learned codes from JSON
  importCodes(json: string): LearnedRemote[] {
    try {
      const data = JSON.parse(json);
      if (Array.isArray(data)) {
        return data as LearnedRemote[];
      }
      return [];
    } catch (e) {
      console.error('Failed to import codes:', e);
      return [];
    }
  }
}

export const learningMode = new LearningModeService();
