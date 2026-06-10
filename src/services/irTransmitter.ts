// IR Transmitter Service
// Handles communication with phone's built-in IR blaster
// Supports: Android ConsumerIR API via WebView bridge, Web IR API (experimental)

export interface IRTransmitResult {
  success: boolean;
  method: string;
  message: string;
}

class IRTransmitterService {
  private hasIR: boolean = false;
  private method: string = 'none';

  constructor() {
    this.detectIRCapability();
  }

  private detectIRCapability() {
    // Check Android WebView bridge (most common for phone IR blasters)
    if (typeof (window as any).AndroidIR !== 'undefined') {
      this.hasIR = true;
      this.method = 'android_bridge';
      return;
    }

    // Check for ConsumerIR via Android JS interface
    if (typeof (window as any).ConsumerIrManager !== 'undefined') {
      this.hasIR = true;
      this.method = 'consumer_ir';
      return;
    }

    // Check for generic IR bridge
    if (typeof (window as any).IRBlaster !== 'undefined') {
      this.hasIR = true;
      this.method = 'ir_blaster';
      return;
    }

    // WebHID API for USB IR transmitters
    if ('hid' in navigator) {
      this.method = 'webhid_possible';
    }

    // Fallback - simulation mode
    this.method = 'simulation';
  }

  isAvailable(): boolean {
    return this.hasIR;
  }

  getMethod(): string {
    return this.method;
  }

  getStatus(): string {
    if (this.hasIR) {
      return `IR Blaster wykryty (${this.method})`;
    }
    return 'Tryb symulacji - brak IR blastera';
  }

  async transmit(protocol: string, code: string, frequency: number = 38000): Promise<IRTransmitResult> {
    console.log(`[IR TX] Protocol: ${protocol}, Code: ${code}, Freq: ${frequency}Hz`);

    try {
      // Method 1: Android WebView Bridge
      if (typeof (window as any).AndroidIR !== 'undefined') {
        (window as any).AndroidIR.transmit(frequency, code);
        return { success: true, method: 'android_bridge', message: 'Kod IR wysłany przez Android IR Blaster' };
      }

      // Method 2: ConsumerIR Manager
      if (typeof (window as any).ConsumerIrManager !== 'undefined') {
        const pattern = this.codeToPattern(code, protocol);
        (window as any).ConsumerIrManager.transmit(frequency, pattern);
        return { success: true, method: 'consumer_ir', message: 'Kod IR wysłany przez ConsumerIR' };
      }

      // Method 3: Generic IR Blaster
      if (typeof (window as any).IRBlaster !== 'undefined') {
        (window as any).IRBlaster.send(JSON.stringify({ protocol, code, frequency }));
        return { success: true, method: 'ir_blaster', message: 'Kod IR wysłany przez IR Blaster' };
      }

      // Simulation mode - vibrate as feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }

      return {
        success: true,
        method: 'simulation',
        message: `Symulacja: ${protocol} ${code} @ ${frequency}Hz`
      };
    } catch (error) {
      return {
        success: false,
        method: this.method,
        message: `Błąd: ${error instanceof Error ? error.message : 'Nieznany błąd'}`
      };
    }
  }

  // Convert hex code to IR timing pattern (NEC protocol example)
  private codeToPattern(hexCode: string, protocol: string): number[] {
    const pattern: number[] = [];
    const code = parseInt(hexCode, 16);

    if (protocol === 'NEC' || protocol === 'Samsung') {
      // NEC protocol: 9ms leader pulse, 4.5ms space
      pattern.push(9000, 4500);

      for (let i = 31; i >= 0; i--) {
        pattern.push(560); // mark
        if ((code >> i) & 1) {
          pattern.push(1690); // space for 1
        } else {
          pattern.push(560); // space for 0
        }
      }
      pattern.push(560); // final mark
    } else if (protocol === 'Sony') {
      // Sony SIRC: 2.4ms leader, 0.6ms space
      pattern.push(2400, 600);
      for (let i = 11; i >= 0; i--) {
        if ((code >> i) & 1) {
          pattern.push(1200, 600);
        } else {
          pattern.push(600, 600);
        }
      }
    } else {
      // Generic pattern
      pattern.push(9000, 4500);
      for (let i = 31; i >= 0; i--) {
        pattern.push(560);
        pattern.push((code >> i) & 1 ? 1690 : 560);
      }
      pattern.push(560);
    }

    return pattern;
  }

  // Get protocol frequency
  getFrequency(protocol: string): number {
    const frequencies: Record<string, number> = {
      'NEC': 38000,
      'Samsung': 38000,
      'Samsung_AC': 38000,
      'Sony': 40000,
      'RC5': 36000,
      'RC6': 36000,
      'Panasonic': 37000,
      'Panasonic_AC': 37000,
      'Sharp': 38000,
      'Sharp_AC': 38000,
      'Daikin': 38000,
      'Mitsubishi': 38000,
      'LG_AC': 38000,
      'Gree': 38000,
      'Midea': 38000,
      'Haier_AC': 38000,
      'Toshiba_AC': 38000,
      'Fujitsu_AC': 38000,
      'Carrier_AC': 38000,
      'Hitachi_AC': 38000,
      'Whirlpool_AC': 38000,
      'Electra_AC': 38000,
      'TCL_AC': 38000,
    };
    return frequencies[protocol] || 38000;
  }
}

export const irTransmitter = new IRTransmitterService();
