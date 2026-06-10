// Comprehensive IR Remote Control Database
// Protocols: NEC, Samsung, Sony SIRC, RC5, RC6, Panasonic, Sharp, Daikin, Mitsubishi, LG AC

export type DeviceType = 'tv' | 'ac' | 'dvd' | 'audio' | 'projector' | 'fan' | 'stb';

export interface IRCode {
  name: string;
  code: string;
  protocol: string;
  icon?: string;
}

export interface RemoteModel {
  id: string;
  brand: string;
  model: string;
  deviceType: DeviceType;
  protocol: string;
  address: string;
  buttons: IRCode[];
}

// ═══════════════════════════════════════════════════
// TELEVISION REMOTES DATABASE
// ═══════════════════════════════════════════════════

const samsungTVButtons: IRCode[] = [
  { name: 'Power', code: '0xE0E040BF', protocol: 'Samsung', icon: 'power' },
  { name: 'Source', code: '0xE0E0807F', protocol: 'Samsung', icon: 'input' },
  { name: 'Vol+', code: '0xE0E0E01F', protocol: 'Samsung', icon: 'volume-up' },
  { name: 'Vol-', code: '0xE0E0D02F', protocol: 'Samsung', icon: 'volume-down' },
  { name: 'Mute', code: '0xE0E0F00F', protocol: 'Samsung', icon: 'mute' },
  { name: 'CH+', code: '0xE0E048B7', protocol: 'Samsung', icon: 'ch-up' },
  { name: 'CH-', code: '0xE0E008F7', protocol: 'Samsung', icon: 'ch-down' },
  { name: 'Menu', code: '0xE0E058A7', protocol: 'Samsung', icon: 'menu' },
  { name: 'Home', code: '0xE0E09E61', protocol: 'Samsung', icon: 'home' },
  { name: 'Return', code: '0xE0E01AE5', protocol: 'Samsung', icon: 'return' },
  { name: 'Exit', code: '0xE0E0B44B', protocol: 'Samsung', icon: 'exit' },
  { name: 'Up', code: '0xE0E006F9', protocol: 'Samsung', icon: 'up' },
  { name: 'Down', code: '0xE0E08679', protocol: 'Samsung', icon: 'down' },
  { name: 'Left', code: '0xE0E0A659', protocol: 'Samsung', icon: 'left' },
  { name: 'Right', code: '0xE0E046B9', protocol: 'Samsung', icon: 'right' },
  { name: 'OK', code: '0xE0E016E9', protocol: 'Samsung', icon: 'ok' },
  { name: '1', code: '0xE0E020DF', protocol: 'Samsung', icon: '1' },
  { name: '2', code: '0xE0E0A05F', protocol: 'Samsung', icon: '2' },
  { name: '3', code: '0xE0E0609F', protocol: 'Samsung', icon: '3' },
  { name: '4', code: '0xE0E010EF', protocol: 'Samsung', icon: '4' },
  { name: '5', code: '0xE0E0906F', protocol: 'Samsung', icon: '5' },
  { name: '6', code: '0xE0E050AF', protocol: 'Samsung', icon: '6' },
  { name: '7', code: '0xE0E030CF', protocol: 'Samsung', icon: '7' },
  { name: '8', code: '0xE0E0B04F', protocol: 'Samsung', icon: '8' },
  { name: '9', code: '0xE0E0708F', protocol: 'Samsung', icon: '9' },
  { name: '0', code: '0xE0E08877', protocol: 'Samsung', icon: '0' },
  { name: 'Guide', code: '0xE0E0F20D', protocol: 'Samsung', icon: 'guide' },
  { name: 'Info', code: '0xE0E0F807', protocol: 'Samsung', icon: 'info' },
  { name: 'Red', code: '0xE0E036C9', protocol: 'Samsung', icon: 'red' },
  { name: 'Green', code: '0xE0E028D7', protocol: 'Samsung', icon: 'green' },
  { name: 'Yellow', code: '0xE0E0A857', protocol: 'Samsung', icon: 'yellow' },
  { name: 'Blue', code: '0xE0E06897', protocol: 'Samsung', icon: 'blue' },
  { name: 'HDMI 1', code: '0xE0E09768', protocol: 'Samsung', icon: 'hdmi' },
  { name: 'HDMI 2', code: '0xE0E07D82', protocol: 'Samsung', icon: 'hdmi' },
];

const lgTVButtons: IRCode[] = [
  { name: 'Power', code: '0x20DF10EF', protocol: 'NEC', icon: 'power' },
  { name: 'Source', code: '0x20DFD02F', protocol: 'NEC', icon: 'input' },
  { name: 'Vol+', code: '0x20DF40BF', protocol: 'NEC', icon: 'volume-up' },
  { name: 'Vol-', code: '0x20DFC03F', protocol: 'NEC', icon: 'volume-down' },
  { name: 'Mute', code: '0x20DF906F', protocol: 'NEC', icon: 'mute' },
  { name: 'CH+', code: '0x20DF00FF', protocol: 'NEC', icon: 'ch-up' },
  { name: 'CH-', code: '0x20DF807F', protocol: 'NEC', icon: 'ch-down' },
  { name: 'Menu', code: '0x20DFC23D', protocol: 'NEC', icon: 'menu' },
  { name: 'Home', code: '0x20DF3EC1', protocol: 'NEC', icon: 'home' },
  { name: 'Return', code: '0x20DF14EB', protocol: 'NEC', icon: 'return' },
  { name: 'Exit', code: '0x20DFDA25', protocol: 'NEC', icon: 'exit' },
  { name: 'Up', code: '0x20DF02FD', protocol: 'NEC', icon: 'up' },
  { name: 'Down', code: '0x20DF827D', protocol: 'NEC', icon: 'down' },
  { name: 'Left', code: '0x20DFE01F', protocol: 'NEC', icon: 'left' },
  { name: 'Right', code: '0x20DF609F', protocol: 'NEC', icon: 'right' },
  { name: 'OK', code: '0x20DF22DD', protocol: 'NEC', icon: 'ok' },
  { name: '1', code: '0x20DF8877', protocol: 'NEC', icon: '1' },
  { name: '2', code: '0x20DF48B7', protocol: 'NEC', icon: '2' },
  { name: '3', code: '0x20DFC837', protocol: 'NEC', icon: '3' },
  { name: '4', code: '0x20DF28D7', protocol: 'NEC', icon: '4' },
  { name: '5', code: '0x20DFA857', protocol: 'NEC', icon: '5' },
  { name: '6', code: '0x20DF6897', protocol: 'NEC', icon: '6' },
  { name: '7', code: '0x20DFE817', protocol: 'NEC', icon: '7' },
  { name: '8', code: '0x20DF18E7', protocol: 'NEC', icon: '8' },
  { name: '9', code: '0x20DF9867', protocol: 'NEC', icon: '9' },
  { name: '0', code: '0x20DF08F7', protocol: 'NEC', icon: '0' },
  { name: 'Guide', code: '0x20DFD52A', protocol: 'NEC', icon: 'guide' },
  { name: 'Info', code: '0x20DF55AA', protocol: 'NEC', icon: 'info' },
  { name: 'Smart Home', code: '0x20DF3EC1', protocol: 'NEC', icon: 'smart' },
  { name: 'Input', code: '0x20DFD02F', protocol: 'NEC', icon: 'input' },
  { name: 'Settings', code: '0x20DFC23D', protocol: 'NEC', icon: 'settings' },
];

const sonyTVButtons: IRCode[] = [
  { name: 'Power', code: '0xA90', protocol: 'Sony', icon: 'power' },
  { name: 'Source', code: '0xA50', protocol: 'Sony', icon: 'input' },
  { name: 'Vol+', code: '0x490', protocol: 'Sony', icon: 'volume-up' },
  { name: 'Vol-', code: '0xC90', protocol: 'Sony', icon: 'volume-down' },
  { name: 'Mute', code: '0x290', protocol: 'Sony', icon: 'mute' },
  { name: 'CH+', code: '0x090', protocol: 'Sony', icon: 'ch-up' },
  { name: 'CH-', code: '0x890', protocol: 'Sony', icon: 'ch-down' },
  { name: 'Menu', code: '0x070', protocol: 'Sony', icon: 'menu' },
  { name: 'Home', code: '0x070', protocol: 'Sony', icon: 'home' },
  { name: 'Return', code: '0xA70', protocol: 'Sony', icon: 'return' },
  { name: 'Up', code: '0x2F0', protocol: 'Sony', icon: 'up' },
  { name: 'Down', code: '0xAF0', protocol: 'Sony', icon: 'down' },
  { name: 'Left', code: '0x2D0', protocol: 'Sony', icon: 'left' },
  { name: 'Right', code: '0xCD0', protocol: 'Sony', icon: 'right' },
  { name: 'OK', code: '0xA70', protocol: 'Sony', icon: 'ok' },
  { name: '1', code: '0x010', protocol: 'Sony', icon: '1' },
  { name: '2', code: '0x810', protocol: 'Sony', icon: '2' },
  { name: '3', code: '0x410', protocol: 'Sony', icon: '3' },
  { name: '4', code: '0xC10', protocol: 'Sony', icon: '4' },
  { name: '5', code: '0x210', protocol: 'Sony', icon: '5' },
  { name: '6', code: '0xA10', protocol: 'Sony', icon: '6' },
  { name: '7', code: '0x610', protocol: 'Sony', icon: '7' },
  { name: '8', code: '0xE10', protocol: 'Sony', icon: '8' },
  { name: '9', code: '0x110', protocol: 'Sony', icon: '9' },
  { name: '0', code: '0x910', protocol: 'Sony', icon: '0' },
  { name: 'Guide', code: '0x6D2', protocol: 'Sony', icon: 'guide' },
  { name: 'Info', code: '0x5D0', protocol: 'Sony', icon: 'info' },
  { name: 'Netflix', code: '0x2F58', protocol: 'Sony', icon: 'app' },
];

const panasonicTVButtons: IRCode[] = [
  { name: 'Power', code: '0x400401BCB3D2', protocol: 'Panasonic', icon: 'power' },
  { name: 'Source', code: '0x400401A0A050', protocol: 'Panasonic', icon: 'input' },
  { name: 'Vol+', code: '0x400401000020', protocol: 'Panasonic', icon: 'volume-up' },
  { name: 'Vol-', code: '0x400401004060', protocol: 'Panasonic', icon: 'volume-down' },
  { name: 'Mute', code: '0x400401004949', protocol: 'Panasonic', icon: 'mute' },
  { name: 'CH+', code: '0x400401002040', protocol: 'Panasonic', icon: 'ch-up' },
  { name: 'CH-', code: '0x400401006080', protocol: 'Panasonic', icon: 'ch-down' },
  { name: 'Menu', code: '0x400401804929', protocol: 'Panasonic', icon: 'menu' },
  { name: 'Up', code: '0x400401005272', protocol: 'Panasonic', icon: 'up' },
  { name: 'Down', code: '0x400401005373', protocol: 'Panasonic', icon: 'down' },
  { name: 'Left', code: '0x400401007292', protocol: 'Panasonic', icon: 'left' },
  { name: 'Right', code: '0x400401003252', protocol: 'Panasonic', icon: 'right' },
  { name: 'OK', code: '0x400401009272', protocol: 'Panasonic', icon: 'ok' },
  { name: 'Return', code: '0x400401002B4B', protocol: 'Panasonic', icon: 'return' },
  { name: 'Exit', code: '0x4004014D4D02', protocol: 'Panasonic', icon: 'exit' },
  { name: '1', code: '0x400401001030', protocol: 'Panasonic', icon: '1' },
  { name: '2', code: '0x400401005070', protocol: 'Panasonic', icon: '2' },
  { name: '3', code: '0x400401003050', protocol: 'Panasonic', icon: '3' },
  { name: '4', code: '0x400401007090', protocol: 'Panasonic', icon: '4' },
  { name: '5', code: '0x400401000828', protocol: 'Panasonic', icon: '5' },
  { name: '6', code: '0x400401004868', protocol: 'Panasonic', icon: '6' },
  { name: '7', code: '0x400401002848', protocol: 'Panasonic', icon: '7' },
  { name: '8', code: '0x400401006888', protocol: 'Panasonic', icon: '8' },
  { name: '9', code: '0x400401001838', protocol: 'Panasonic', icon: '9' },
  { name: '0', code: '0x400401005878', protocol: 'Panasonic', icon: '0' },
  { name: 'Guide', code: '0x400401E04020', protocol: 'Panasonic', icon: 'guide' },
  { name: 'Info', code: '0x400401009C3C', protocol: 'Panasonic', icon: 'info' },
];

const philipsTVButtons: IRCode[] = [
  { name: 'Power', code: '0x100C', protocol: 'RC6', icon: 'power' },
  { name: 'Source', code: '0x1038', protocol: 'RC6', icon: 'input' },
  { name: 'Vol+', code: '0x1010', protocol: 'RC6', icon: 'volume-up' },
  { name: 'Vol-', code: '0x1011', protocol: 'RC6', icon: 'volume-down' },
  { name: 'Mute', code: '0x100D', protocol: 'RC6', icon: 'mute' },
  { name: 'CH+', code: '0x1020', protocol: 'RC6', icon: 'ch-up' },
  { name: 'CH-', code: '0x1021', protocol: 'RC6', icon: 'ch-down' },
  { name: 'Menu', code: '0x1054', protocol: 'RC6', icon: 'menu' },
  { name: 'Up', code: '0x1058', protocol: 'RC6', icon: 'up' },
  { name: 'Down', code: '0x1059', protocol: 'RC6', icon: 'down' },
  { name: 'Left', code: '0x105A', protocol: 'RC6', icon: 'left' },
  { name: 'Right', code: '0x105B', protocol: 'RC6', icon: 'right' },
  { name: 'OK', code: '0x105C', protocol: 'RC6', icon: 'ok' },
  { name: 'Return', code: '0x100A', protocol: 'RC6', icon: 'return' },
  { name: '1', code: '0x1001', protocol: 'RC6', icon: '1' },
  { name: '2', code: '0x1002', protocol: 'RC6', icon: '2' },
  { name: '3', code: '0x1003', protocol: 'RC6', icon: '3' },
  { name: '4', code: '0x1004', protocol: 'RC6', icon: '4' },
  { name: '5', code: '0x1005', protocol: 'RC6', icon: '5' },
  { name: '6', code: '0x1006', protocol: 'RC6', icon: '6' },
  { name: '7', code: '0x1007', protocol: 'RC6', icon: '7' },
  { name: '8', code: '0x1008', protocol: 'RC6', icon: '8' },
  { name: '9', code: '0x1009', protocol: 'RC6', icon: '9' },
  { name: '0', code: '0x1000', protocol: 'RC6', icon: '0' },
  { name: 'Info', code: '0x100F', protocol: 'RC6', icon: 'info' },
  { name: 'Guide', code: '0x10CC', protocol: 'RC6', icon: 'guide' },
  { name: 'Ambilight', code: '0x10E5', protocol: 'RC6', icon: 'light' },
];

const toshibaTVButtons: IRCode[] = [
  { name: 'Power', code: '0x02FD48B7', protocol: 'NEC', icon: 'power' },
  { name: 'Source', code: '0x02FDF00F', protocol: 'NEC', icon: 'input' },
  { name: 'Vol+', code: '0x02FD58A7', protocol: 'NEC', icon: 'volume-up' },
  { name: 'Vol-', code: '0x02FD7887', protocol: 'NEC', icon: 'volume-down' },
  { name: 'Mute', code: '0x02FD08F7', protocol: 'NEC', icon: 'mute' },
  { name: 'CH+', code: '0x02FDD827', protocol: 'NEC', icon: 'ch-up' },
  { name: 'CH-', code: '0x02FDF807', protocol: 'NEC', icon: 'ch-down' },
  { name: 'Menu', code: '0x02FD28D7', protocol: 'NEC', icon: 'menu' },
  { name: 'Up', code: '0x02FD2AD5', protocol: 'NEC', icon: 'up' },
  { name: 'Down', code: '0x02FDAA55', protocol: 'NEC', icon: 'down' },
  { name: 'Left', code: '0x02FDEA15', protocol: 'NEC', icon: 'left' },
  { name: 'Right', code: '0x02FD6A95', protocol: 'NEC', icon: 'right' },
  { name: 'OK', code: '0x02FD0AF5', protocol: 'NEC', icon: 'ok' },
  { name: '1', code: '0x02FD807F', protocol: 'NEC', icon: '1' },
  { name: '2', code: '0x02FD40BF', protocol: 'NEC', icon: '2' },
  { name: '3', code: '0x02FDC03F', protocol: 'NEC', icon: '3' },
  { name: '4', code: '0x02FD20DF', protocol: 'NEC', icon: '4' },
  { name: '5', code: '0x02FDA05F', protocol: 'NEC', icon: '5' },
  { name: '6', code: '0x02FD609F', protocol: 'NEC', icon: '6' },
  { name: '7', code: '0x02FDE01F', protocol: 'NEC', icon: '7' },
  { name: '8', code: '0x02FD10EF', protocol: 'NEC', icon: '8' },
  { name: '9', code: '0x02FD906F', protocol: 'NEC', icon: '9' },
  { name: '0', code: '0x02FD00FF', protocol: 'NEC', icon: '0' },
];

const sharpTVButtons: IRCode[] = [
  { name: 'Power', code: '0x41A2', protocol: 'Sharp', icon: 'power' },
  { name: 'Source', code: '0x4322', protocol: 'Sharp', icon: 'input' },
  { name: 'Vol+', code: '0x40A2', protocol: 'Sharp', icon: 'volume-up' },
  { name: 'Vol-', code: '0x42A2', protocol: 'Sharp', icon: 'volume-down' },
  { name: 'Mute', code: '0x43A2', protocol: 'Sharp', icon: 'mute' },
  { name: 'CH+', code: '0x4222', protocol: 'Sharp', icon: 'ch-up' },
  { name: 'CH-', code: '0x4122', protocol: 'Sharp', icon: 'ch-down' },
  { name: 'Menu', code: '0x4012', protocol: 'Sharp', icon: 'menu' },
  { name: 'Up', code: '0x43AA', protocol: 'Sharp', icon: 'up' },
  { name: 'Down', code: '0x406A', protocol: 'Sharp', icon: 'down' },
  { name: 'Left', code: '0x42BE', protocol: 'Sharp', icon: 'left' },
  { name: 'Right', code: '0x41BE', protocol: 'Sharp', icon: 'right' },
  { name: 'OK', code: '0x43BE', protocol: 'Sharp', icon: 'ok' },
  { name: 'Return', code: '0x40BE', protocol: 'Sharp', icon: 'return' },
  { name: 'Exit', code: '0x433E', protocol: 'Sharp', icon: 'exit' },
  { name: '1', code: '0x4202', protocol: 'Sharp', icon: '1' },
  { name: '2', code: '0x4102', protocol: 'Sharp', icon: '2' },
  { name: '3', code: '0x4302', protocol: 'Sharp', icon: '3' },
  { name: '4', code: '0x4082', protocol: 'Sharp', icon: '4' },
  { name: '5', code: '0x4282', protocol: 'Sharp', icon: '5' },
  { name: '6', code: '0x4182', protocol: 'Sharp', icon: '6' },
  { name: '7', code: '0x4382', protocol: 'Sharp', icon: '7' },
  { name: '8', code: '0x4042', protocol: 'Sharp', icon: '8' },
  { name: '9', code: '0x4242', protocol: 'Sharp', icon: '9' },
  { name: '0', code: '0x4142', protocol: 'Sharp', icon: '0' },
];

const vizioTVButtons: IRCode[] = [
  { name: 'Power', code: '0x20DF10EF', protocol: 'NEC', icon: 'power' },
  { name: 'Source', code: '0x20DFF00F', protocol: 'NEC', icon: 'input' },
  { name: 'Vol+', code: '0x20DF40BF', protocol: 'NEC', icon: 'volume-up' },
  { name: 'Vol-', code: '0x20DFC03F', protocol: 'NEC', icon: 'volume-down' },
  { name: 'Mute', code: '0x20DF906F', protocol: 'NEC', icon: 'mute' },
  { name: 'CH+', code: '0x20DF00FF', protocol: 'NEC', icon: 'ch-up' },
  { name: 'CH-', code: '0x20DF807F', protocol: 'NEC', icon: 'ch-down' },
  { name: 'Menu', code: '0x20DF22DD', protocol: 'NEC', icon: 'menu' },
  { name: 'Up', code: '0x20DF02FD', protocol: 'NEC', icon: 'up' },
  { name: 'Down', code: '0x20DF827D', protocol: 'NEC', icon: 'down' },
  { name: 'Left', code: '0x20DFE01F', protocol: 'NEC', icon: 'left' },
  { name: 'Right', code: '0x20DF609F', protocol: 'NEC', icon: 'right' },
  { name: 'OK', code: '0x20DF22DD', protocol: 'NEC', icon: 'ok' },
  { name: '1', code: '0x20DF8877', protocol: 'NEC', icon: '1' },
  { name: '2', code: '0x20DF48B7', protocol: 'NEC', icon: '2' },
  { name: '3', code: '0x20DFC837', protocol: 'NEC', icon: '3' },
  { name: '4', code: '0x20DF28D7', protocol: 'NEC', icon: '4' },
  { name: '5', code: '0x20DFA857', protocol: 'NEC', icon: '5' },
  { name: '6', code: '0x20DF6897', protocol: 'NEC', icon: '6' },
  { name: '7', code: '0x20DFE817', protocol: 'NEC', icon: '7' },
  { name: '8', code: '0x20DF18E7', protocol: 'NEC', icon: '8' },
  { name: '9', code: '0x20DF9867', protocol: 'NEC', icon: '9' },
  { name: '0', code: '0x20DF08F7', protocol: 'NEC', icon: '0' },
];

const hisenseTVButtons: IRCode[] = [
  { name: 'Power', code: '0x20DF10EF', protocol: 'NEC', icon: 'power' },
  { name: 'Source', code: '0x20DFD02F', protocol: 'NEC', icon: 'input' },
  { name: 'Vol+', code: '0x20DF40BF', protocol: 'NEC', icon: 'volume-up' },
  { name: 'Vol-', code: '0x20DFC03F', protocol: 'NEC', icon: 'volume-down' },
  { name: 'Mute', code: '0x20DF906F', protocol: 'NEC', icon: 'mute' },
  { name: 'CH+', code: '0x20DF00FF', protocol: 'NEC', icon: 'ch-up' },
  { name: 'CH-', code: '0x20DF807F', protocol: 'NEC', icon: 'ch-down' },
  { name: 'Menu', code: '0x20DFC23D', protocol: 'NEC', icon: 'menu' },
  { name: 'Up', code: '0x20DF02FD', protocol: 'NEC', icon: 'up' },
  { name: 'Down', code: '0x20DF827D', protocol: 'NEC', icon: 'down' },
  { name: 'Left', code: '0x20DFE01F', protocol: 'NEC', icon: 'left' },
  { name: 'Right', code: '0x20DF609F', protocol: 'NEC', icon: 'right' },
  { name: 'OK', code: '0x20DF22DD', protocol: 'NEC', icon: 'ok' },
  { name: 'Return', code: '0x20DF14EB', protocol: 'NEC', icon: 'return' },
  { name: 'Exit', code: '0x20DFDA25', protocol: 'NEC', icon: 'exit' },
  { name: '1', code: '0x20DF8877', protocol: 'NEC', icon: '1' },
  { name: '2', code: '0x20DF48B7', protocol: 'NEC', icon: '2' },
  { name: '3', code: '0x20DFC837', protocol: 'NEC', icon: '3' },
  { name: '4', code: '0x20DF28D7', protocol: 'NEC', icon: '4' },
  { name: '5', code: '0x20DFA857', protocol: 'NEC', icon: '5' },
  { name: '6', code: '0x20DF6897', protocol: 'NEC', icon: '6' },
  { name: '7', code: '0x20DFE817', protocol: 'NEC', icon: '7' },
  { name: '8', code: '0x20DF18E7', protocol: 'NEC', icon: '8' },
  { name: '9', code: '0x20DF9867', protocol: 'NEC', icon: '9' },
  { name: '0', code: '0x20DF08F7', protocol: 'NEC', icon: '0' },
];

const tclTVButtons: IRCode[] = [
  { name: 'Power', code: '0x40BF12ED', protocol: 'NEC', icon: 'power' },
  { name: 'Source', code: '0x40BFE21D', protocol: 'NEC', icon: 'input' },
  { name: 'Vol+', code: '0x40BF1AE5', protocol: 'NEC', icon: 'volume-up' },
  { name: 'Vol-', code: '0x40BF1EE1', protocol: 'NEC', icon: 'volume-down' },
  { name: 'Mute', code: '0x40BF16E9', protocol: 'NEC', icon: 'mute' },
  { name: 'CH+', code: '0x40BF02FD', protocol: 'NEC', icon: 'ch-up' },
  { name: 'CH-', code: '0x40BF827D', protocol: 'NEC', icon: 'ch-down' },
  { name: 'Menu', code: '0x40BF06F9', protocol: 'NEC', icon: 'menu' },
  { name: 'Up', code: '0x40BFA05F', protocol: 'NEC', icon: 'up' },
  { name: 'Down', code: '0x40BF00FF', protocol: 'NEC', icon: 'down' },
  { name: 'Left', code: '0x40BFE01F', protocol: 'NEC', icon: 'left' },
  { name: 'Right', code: '0x40BF609F', protocol: 'NEC', icon: 'right' },
  { name: 'OK', code: '0x40BF906F', protocol: 'NEC', icon: 'ok' },
  { name: '1', code: '0x40BF8877', protocol: 'NEC', icon: '1' },
  { name: '2', code: '0x40BF48B7', protocol: 'NEC', icon: '2' },
  { name: '3', code: '0x40BFC837', protocol: 'NEC', icon: '3' },
  { name: '4', code: '0x40BF28D7', protocol: 'NEC', icon: '4' },
  { name: '5', code: '0x40BFA857', protocol: 'NEC', icon: '5' },
  { name: '6', code: '0x40BF6897', protocol: 'NEC', icon: '6' },
  { name: '7', code: '0x40BFE817', protocol: 'NEC', icon: '7' },
  { name: '8', code: '0x40BF18E7', protocol: 'NEC', icon: '8' },
  { name: '9', code: '0x40BF9867', protocol: 'NEC', icon: '9' },
  { name: '0', code: '0x40BF08F7', protocol: 'NEC', icon: '0' },
];

// ═══════════════════════════════════════════════════
// AIR CONDITIONER REMOTES DATABASE
// ═══════════════════════════════════════════════════

const makeACButtons = (_brand: string, protocol: string, codes: Record<string, string>): IRCode[] => [
  { name: 'Power On/Off', code: codes.power || '0x00', protocol, icon: 'power' },
  { name: 'Temp ▲', code: codes.tempUp || '0x01', protocol, icon: 'temp-up' },
  { name: 'Temp ▼', code: codes.tempDown || '0x02', protocol, icon: 'temp-down' },
  { name: 'Mode', code: codes.mode || '0x03', protocol, icon: 'mode' },
  { name: 'Fan Speed', code: codes.fan || '0x04', protocol, icon: 'fan' },
  { name: 'Swing', code: codes.swing || '0x05', protocol, icon: 'swing' },
  { name: 'Timer', code: codes.timer || '0x06', protocol, icon: 'timer' },
  { name: 'Sleep', code: codes.sleep || '0x07', protocol, icon: 'sleep' },
  { name: 'Cool', code: codes.cool || '0x08', protocol, icon: 'cool' },
  { name: 'Heat', code: codes.heat || '0x09', protocol, icon: 'heat' },
  { name: 'Dry', code: codes.dry || '0x0A', protocol, icon: 'dry' },
  { name: 'Auto', code: codes.auto || '0x0B', protocol, icon: 'auto' },
  { name: 'Turbo', code: codes.turbo || '0x0C', protocol, icon: 'turbo' },
  { name: 'Light', code: codes.light || '0x0D', protocol, icon: 'light' },
  { name: 'Eco', code: codes.eco || '0x0E', protocol, icon: 'eco' },
  { name: '16°C', code: codes.t16 || '0x10', protocol, icon: 'temp' },
  { name: '18°C', code: codes.t18 || '0x12', protocol, icon: 'temp' },
  { name: '20°C', code: codes.t20 || '0x14', protocol, icon: 'temp' },
  { name: '22°C', code: codes.t22 || '0x16', protocol, icon: 'temp' },
  { name: '24°C', code: codes.t24 || '0x18', protocol, icon: 'temp' },
  { name: '26°C', code: codes.t26 || '0x1A', protocol, icon: 'temp' },
  { name: '28°C', code: codes.t28 || '0x1C', protocol, icon: 'temp' },
  { name: '30°C', code: codes.t30 || '0x1E', protocol, icon: 'temp' },
];

// ═══════════════════════════════════════════════════
// FULL DATABASE EXPORT
// ═══════════════════════════════════════════════════

export const irDatabase: RemoteModel[] = [
  // ─── SAMSUNG TVs ───
  { id: 'samsung-tv-generic', brand: 'Samsung', model: 'Generic / Universal', deviceType: 'tv', protocol: 'Samsung', address: '0xE0E0', buttons: samsungTVButtons },
  { id: 'samsung-tv-bn59-01199f', brand: 'Samsung', model: 'BN59-01199F (Smart TV)', deviceType: 'tv', protocol: 'Samsung', address: '0xE0E0', buttons: samsungTVButtons },
  { id: 'samsung-tv-bn59-01301a', brand: 'Samsung', model: 'BN59-01301A (QLED)', deviceType: 'tv', protocol: 'Samsung', address: '0xE0E0', buttons: samsungTVButtons },
  { id: 'samsung-tv-aa59-00741a', brand: 'Samsung', model: 'AA59-00741A', deviceType: 'tv', protocol: 'Samsung', address: '0xE0E0', buttons: samsungTVButtons },
  { id: 'samsung-tv-bn59-01315j', brand: 'Samsung', model: 'BN59-01315J (Crystal UHD)', deviceType: 'tv', protocol: 'Samsung', address: '0xE0E0', buttons: samsungTVButtons },

  // ─── LG TVs ───
  { id: 'lg-tv-generic', brand: 'LG', model: 'Generic / Universal', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: lgTVButtons },
  { id: 'lg-tv-akb75095308', brand: 'LG', model: 'AKB75095308 (Smart TV)', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: lgTVButtons },
  { id: 'lg-tv-akb74915305', brand: 'LG', model: 'AKB74915305 (OLED)', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: lgTVButtons },
  { id: 'lg-tv-akb73715601', brand: 'LG', model: 'AKB73715601', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: lgTVButtons },
  { id: 'lg-tv-an-mr650a', brand: 'LG', model: 'AN-MR650A (Magic Remote)', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: lgTVButtons },

  // ─── SONY TVs ───
  { id: 'sony-tv-generic', brand: 'Sony', model: 'Generic / Universal', deviceType: 'tv', protocol: 'Sony', address: '0x01', buttons: sonyTVButtons },
  { id: 'sony-tv-rmt-tx100u', brand: 'Sony', model: 'RMT-TX100U (Bravia)', deviceType: 'tv', protocol: 'Sony', address: '0x01', buttons: sonyTVButtons },
  { id: 'sony-tv-rm-yd025', brand: 'Sony', model: 'RM-YD025', deviceType: 'tv', protocol: 'Sony', address: '0x01', buttons: sonyTVButtons },
  { id: 'sony-tv-rmt-tx300u', brand: 'Sony', model: 'RMT-TX300U (4K)', deviceType: 'tv', protocol: 'Sony', address: '0x01', buttons: sonyTVButtons },
  { id: 'sony-tv-rm-yd092', brand: 'Sony', model: 'RM-YD092', deviceType: 'tv', protocol: 'Sony', address: '0x01', buttons: sonyTVButtons },

  // ─── PANASONIC TVs ───
  { id: 'panasonic-tv-generic', brand: 'Panasonic', model: 'Generic / Universal', deviceType: 'tv', protocol: 'Panasonic', address: '0x4004', buttons: panasonicTVButtons },
  { id: 'panasonic-tv-n2qayb000842', brand: 'Panasonic', model: 'N2QAYB000842 (Viera)', deviceType: 'tv', protocol: 'Panasonic', address: '0x4004', buttons: panasonicTVButtons },
  { id: 'panasonic-tv-n2qayb001010', brand: 'Panasonic', model: 'N2QAYB001010', deviceType: 'tv', protocol: 'Panasonic', address: '0x4004', buttons: panasonicTVButtons },

  // ─── PHILIPS TVs ───
  { id: 'philips-tv-generic', brand: 'Philips', model: 'Generic / Universal', deviceType: 'tv', protocol: 'RC6', address: '0x10', buttons: philipsTVButtons },
  { id: 'philips-tv-rc4870', brand: 'Philips', model: 'RC4870 (Ambilight)', deviceType: 'tv', protocol: 'RC6', address: '0x10', buttons: philipsTVButtons },
  { id: 'philips-tv-ykf347-003', brand: 'Philips', model: 'YKF347-003 (Android TV)', deviceType: 'tv', protocol: 'RC6', address: '0x10', buttons: philipsTVButtons },

  // ─── TOSHIBA TVs ───
  { id: 'toshiba-tv-generic', brand: 'Toshiba', model: 'Generic / Universal', deviceType: 'tv', protocol: 'NEC', address: '0x02FD', buttons: toshibaTVButtons },
  { id: 'toshiba-tv-ct-90325', brand: 'Toshiba', model: 'CT-90325', deviceType: 'tv', protocol: 'NEC', address: '0x02FD', buttons: toshibaTVButtons },
  { id: 'toshiba-tv-ct-90326', brand: 'Toshiba', model: 'CT-90326', deviceType: 'tv', protocol: 'NEC', address: '0x02FD', buttons: toshibaTVButtons },

  // ─── SHARP TVs ───
  { id: 'sharp-tv-generic', brand: 'Sharp', model: 'Generic / Universal', deviceType: 'tv', protocol: 'Sharp', address: '0x40', buttons: sharpTVButtons },
  { id: 'sharp-tv-845-039', brand: 'Sharp', model: '845-039-40B0 (Aquos)', deviceType: 'tv', protocol: 'Sharp', address: '0x40', buttons: sharpTVButtons },
  { id: 'sharp-tv-ga667wjsa', brand: 'Sharp', model: 'GA667WJSA', deviceType: 'tv', protocol: 'Sharp', address: '0x40', buttons: sharpTVButtons },

  // ─── VIZIO TVs ───
  { id: 'vizio-tv-generic', brand: 'Vizio', model: 'Generic / Universal', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: vizioTVButtons },
  { id: 'vizio-tv-xrt136', brand: 'Vizio', model: 'XRT136 (SmartCast)', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: vizioTVButtons },
  { id: 'vizio-tv-xrt140', brand: 'Vizio', model: 'XRT140', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: vizioTVButtons },

  // ─── HISENSE TVs ───
  { id: 'hisense-tv-generic', brand: 'Hisense', model: 'Generic / Universal', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: hisenseTVButtons },
  { id: 'hisense-tv-en2a27', brand: 'Hisense', model: 'EN2A27 (Smart TV)', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: hisenseTVButtons },
  { id: 'hisense-tv-erf3a69', brand: 'Hisense', model: 'ERF3A69', deviceType: 'tv', protocol: 'NEC', address: '0x20DF', buttons: hisenseTVButtons },

  // ─── TCL TVs ───
  { id: 'tcl-tv-generic', brand: 'TCL', model: 'Generic / Universal', deviceType: 'tv', protocol: 'NEC', address: '0x40BF', buttons: tclTVButtons },
  { id: 'tcl-tv-rc802n', brand: 'TCL', model: 'RC802N (Roku TV)', deviceType: 'tv', protocol: 'NEC', address: '0x40BF', buttons: tclTVButtons },
  { id: 'tcl-tv-rc311', brand: 'TCL', model: 'RC311 FUI1', deviceType: 'tv', protocol: 'NEC', address: '0x40BF', buttons: tclTVButtons },

  // ═══════════════════════════════════════════════════
  // AIR CONDITIONERS
  // ═══════════════════════════════════════════════════

  // ─── DAIKIN AC ───
  { id: 'daikin-ac-generic', brand: 'Daikin', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Daikin', address: '0x11DA',
    buttons: makeACButtons('Daikin', 'Daikin', {
      power: '0x11DA2700C50000D711DA2700004273100016001300', tempUp: '0x11DA270042', tempDown: '0x11DA270043',
      mode: '0x11DA270044', fan: '0x11DA270045', swing: '0x11DA270046', timer: '0x11DA270047',
      sleep: '0x11DA270048', cool: '0x11DA27003C', heat: '0x11DA27004C', dry: '0x11DA27002C',
      auto: '0x11DA27000C', turbo: '0x11DA270001', light: '0x11DA270006', eco: '0x11DA270007',
    })
  },
  { id: 'daikin-ac-arc480a33', brand: 'Daikin', model: 'ARC480A33', deviceType: 'ac', protocol: 'Daikin', address: '0x11DA',
    buttons: makeACButtons('Daikin', 'Daikin', {
      power: '0x11DA2700C50000D7', tempUp: '0x11DA270042', tempDown: '0x11DA270043',
      mode: '0x11DA270044', fan: '0x11DA270045', swing: '0x11DA270046',
      cool: '0x11DA27003C', heat: '0x11DA27004C', dry: '0x11DA27002C', auto: '0x11DA27000C',
    })
  },
  { id: 'daikin-ac-arc478a11', brand: 'Daikin', model: 'ARC478A11', deviceType: 'ac', protocol: 'Daikin', address: '0x11DA',
    buttons: makeACButtons('Daikin', 'Daikin', {
      power: '0x11DA2700C5000042', tempUp: '0x11DA270042', tempDown: '0x11DA270043',
      mode: '0x11DA270044', fan: '0x11DA270045', swing: '0x11DA270046',
    })
  },

  // ─── MITSUBISHI AC ───
  { id: 'mitsubishi-ac-generic', brand: 'Mitsubishi', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Mitsubishi', address: '0x23CB',
    buttons: makeACButtons('Mitsubishi', 'Mitsubishi', {
      power: '0x23CB260100204008', tempUp: '0x23CB26010020E0', tempDown: '0x23CB26010020C0',
      mode: '0x23CB26010020A0', fan: '0x23CB2601002080', swing: '0x23CB2601002060',
      cool: '0x23CB26010018', heat: '0x23CB26010008', dry: '0x23CB26010010',
      auto: '0x23CB26010000', turbo: '0x23CB260100204C', eco: '0x23CB260100204E',
    })
  },
  { id: 'mitsubishi-ac-msy-ge10', brand: 'Mitsubishi', model: 'MSY-GE10VA', deviceType: 'ac', protocol: 'Mitsubishi', address: '0x23CB',
    buttons: makeACButtons('Mitsubishi', 'Mitsubishi', {
      power: '0x23CB260100204008', tempUp: '0x23CB26010020E0', tempDown: '0x23CB26010020C0',
      mode: '0x23CB26010020A0', fan: '0x23CB2601002080', swing: '0x23CB2601002060',
    })
  },
  { id: 'mitsubishi-ac-msz-ge35', brand: 'Mitsubishi', model: 'MSZ-GE35VA', deviceType: 'ac', protocol: 'Mitsubishi', address: '0x23CB',
    buttons: makeACButtons('Mitsubishi', 'Mitsubishi', {
      power: '0x23CB260100204008', tempUp: '0x23CB260100E0', tempDown: '0x23CB260100C0',
    })
  },
  { id: 'mitsubishi-ac-msz-ap25', brand: 'Mitsubishi', model: 'MSZ-AP25VGK', deviceType: 'ac', protocol: 'Mitsubishi', address: '0x23CB',
    buttons: makeACButtons('Mitsubishi', 'Mitsubishi', {
      power: '0x23CB260100204009', tempUp: '0x23CB260100E1', tempDown: '0x23CB260100C1',
    })
  },

  // ─── LG AC ───
  { id: 'lg-ac-generic', brand: 'LG', model: 'Generic / Universal', deviceType: 'ac', protocol: 'LG_AC', address: '0x88',
    buttons: makeACButtons('LG', 'LG_AC', {
      power: '0x8800B0B', tempUp: '0x8808051', tempDown: '0x8808050',
      mode: '0x8809090', fan: '0x880A0A0', swing: '0x8801316',
      cool: '0x8800000', heat: '0x8804040', dry: '0x8802020', auto: '0x880B0B0',
      turbo: '0x880A084', eco: '0x880A0C8',
    })
  },
  { id: 'lg-ac-akb75215403', brand: 'LG', model: 'AKB75215403 (Dual Inverter)', deviceType: 'ac', protocol: 'LG_AC', address: '0x88',
    buttons: makeACButtons('LG', 'LG_AC', {
      power: '0x8800B0B', tempUp: '0x8808051', tempDown: '0x8808050',
      mode: '0x8809090', fan: '0x880A0A0', swing: '0x8801316',
    })
  },
  { id: 'lg-ac-akb73456109', brand: 'LG', model: 'AKB73456109', deviceType: 'ac', protocol: 'LG_AC', address: '0x88',
    buttons: makeACButtons('LG', 'LG_AC', {
      power: '0x8800B0B', tempUp: '0x8808051', tempDown: '0x8808050',
    })
  },

  // ─── SAMSUNG AC ───
  { id: 'samsung-ac-generic', brand: 'Samsung', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Samsung_AC', address: '0x02',
    buttons: makeACButtons('Samsung', 'Samsung_AC', {
      power: '0x0200F0F00D1002F00000B01F2BF6', tempUp: '0x0200E0E0', tempDown: '0x0200D0D0',
      mode: '0x0200C0C0', fan: '0x0200B0B0', swing: '0x0200A0A0',
      cool: '0x0200F0F001', heat: '0x0200F0F004', dry: '0x0200F0F002', auto: '0x0200F0F000',
      turbo: '0x0200F0F00A', eco: '0x0200F0F00B',
    })
  },
  { id: 'samsung-ac-ar12', brand: 'Samsung', model: 'AR12TXHQASINEU (Wind-Free)', deviceType: 'ac', protocol: 'Samsung_AC', address: '0x02',
    buttons: makeACButtons('Samsung', 'Samsung_AC', {
      power: '0x0200F0F00D1002', tempUp: '0x0200E0E0', tempDown: '0x0200D0D0',
    })
  },
  { id: 'samsung-ac-ar09', brand: 'Samsung', model: 'AR09TXCAAWKNEU', deviceType: 'ac', protocol: 'Samsung_AC', address: '0x02',
    buttons: makeACButtons('Samsung', 'Samsung_AC', {
      power: '0x0200F0F00D1003', tempUp: '0x0200E0E1', tempDown: '0x0200D0D1',
    })
  },

  // ─── PANASONIC AC ───
  { id: 'panasonic-ac-generic', brand: 'Panasonic', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Panasonic_AC', address: '0x02',
    buttons: makeACButtons('Panasonic', 'Panasonic_AC', {
      power: '0x0220E004000000060220E00400003D14', tempUp: '0x0220E004002041', tempDown: '0x0220E004002040',
      mode: '0x0220E004002030', fan: '0x0220E004002020', swing: '0x0220E004002010',
      cool: '0x0220E004003030', heat: '0x0220E004004040', dry: '0x0220E004002020', auto: '0x0220E004000000',
    })
  },
  { id: 'panasonic-ac-cs-e12', brand: 'Panasonic', model: 'CS-E12QKEW', deviceType: 'ac', protocol: 'Panasonic_AC', address: '0x02',
    buttons: makeACButtons('Panasonic', 'Panasonic_AC', {
      power: '0x0220E004000000', tempUp: '0x0220E004002041', tempDown: '0x0220E004002040',
    })
  },
  { id: 'panasonic-ac-cs-z25', brand: 'Panasonic', model: 'CS-Z25VKEW (Etherea)', deviceType: 'ac', protocol: 'Panasonic_AC', address: '0x02',
    buttons: makeACButtons('Panasonic', 'Panasonic_AC', {
      power: '0x0220E004000001', tempUp: '0x0220E004002042', tempDown: '0x0220E004002041',
    })
  },

  // ─── GREE AC ───
  { id: 'gree-ac-generic', brand: 'Gree', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Gree', address: '0x00',
    buttons: makeACButtons('Gree', 'Gree', {
      power: '0x950410010000C028', tempUp: '0x9504100200', tempDown: '0x9504100300',
      mode: '0x9504100400', fan: '0x9504100500', swing: '0x9504100600',
      cool: '0x9504100101', heat: '0x9504100104', dry: '0x9504100102', auto: '0x9504100100',
      turbo: '0x950410010A', eco: '0x950410010B', light: '0x950410010C',
    })
  },
  { id: 'gree-ac-yb1fa', brand: 'Gree', model: 'YB1FA (Inverter)', deviceType: 'ac', protocol: 'Gree', address: '0x00',
    buttons: makeACButtons('Gree', 'Gree', {
      power: '0x950410010000C028', tempUp: '0x9504100200', tempDown: '0x9504100300',
    })
  },

  // ─── MIDEA AC ───
  { id: 'midea-ac-generic', brand: 'Midea', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Midea', address: '0xB2',
    buttons: makeACButtons('Midea', 'Midea', {
      power: '0xB24D7B84E01F', tempUp: '0xB24D9F6004', tempDown: '0xB24D8F7004',
      mode: '0xB24DAF5004', fan: '0xB24DBF4004', swing: '0xB24DCF3004',
      cool: '0xB24D0FF004', heat: '0xB24D3FC004', dry: '0xB24D5FA004', auto: '0xB24D2FD004',
    })
  },
  { id: 'midea-ac-rg70e', brand: 'Midea', model: 'RG70E/BGEF', deviceType: 'ac', protocol: 'Midea', address: '0xB2',
    buttons: makeACButtons('Midea', 'Midea', {
      power: '0xB24D7B84E01F', tempUp: '0xB24D9F6004', tempDown: '0xB24D8F7004',
    })
  },

  // ─── HAIER AC ───
  { id: 'haier-ac-generic', brand: 'Haier', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Haier_AC', address: '0xA6',
    buttons: makeACButtons('Haier', 'Haier_AC', {
      power: '0xA6AC00100C3F', tempUp: '0xA6AC001020', tempDown: '0xA6AC001021',
      mode: '0xA6AC001030', fan: '0xA6AC001040', swing: '0xA6AC001050',
      cool: '0xA6AC001001', heat: '0xA6AC001004', dry: '0xA6AC001002', auto: '0xA6AC001000',
    })
  },
  { id: 'haier-ac-yr-hrs01', brand: 'Haier', model: 'YR-HRS01', deviceType: 'ac', protocol: 'Haier_AC', address: '0xA6',
    buttons: makeACButtons('Haier', 'Haier_AC', {
      power: '0xA6AC00100C3F', tempUp: '0xA6AC001020', tempDown: '0xA6AC001021',
    })
  },

  // ─── TOSHIBA AC ───
  { id: 'toshiba-ac-generic', brand: 'Toshiba', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Toshiba_AC', address: '0xF20D',
    buttons: makeACButtons('Toshiba', 'Toshiba_AC', {
      power: '0xF20D0300FC0150', tempUp: '0xF20D030041', tempDown: '0xF20D030042',
      mode: '0xF20D030043', fan: '0xF20D030044', swing: '0xF20D030045',
      cool: '0xF20D030001', heat: '0xF20D030003', dry: '0xF20D030002', auto: '0xF20D030000',
    })
  },
  { id: 'toshiba-ac-ras-13bkv', brand: 'Toshiba', model: 'RAS-13BKVG-E (Shorai Edge)', deviceType: 'ac', protocol: 'Toshiba_AC', address: '0xF20D',
    buttons: makeACButtons('Toshiba', 'Toshiba_AC', {
      power: '0xF20D0300FC0150', tempUp: '0xF20D030041', tempDown: '0xF20D030042',
    })
  },

  // ─── FUJITSU AC ───
  { id: 'fujitsu-ac-generic', brand: 'Fujitsu', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Fujitsu_AC', address: '0x14',
    buttons: makeACButtons('Fujitsu', 'Fujitsu_AC', {
      power: '0x1463001010FE09F6', tempUp: '0x146300101041', tempDown: '0x146300101042',
      mode: '0x146300101043', fan: '0x146300101044', swing: '0x146300101045',
      cool: '0x1463001010C1', heat: '0x1463001010C4', dry: '0x1463001010C2', auto: '0x1463001010C0',
    })
  },
  { id: 'fujitsu-ac-ar-rah2e', brand: 'Fujitsu', model: 'AR-RAH2E (Nocria)', deviceType: 'ac', protocol: 'Fujitsu_AC', address: '0x14',
    buttons: makeACButtons('Fujitsu', 'Fujitsu_AC', {
      power: '0x1463001010FE09F6', tempUp: '0x146300101041', tempDown: '0x146300101042',
    })
  },

  // ─── CARRIER AC ───
  { id: 'carrier-ac-generic', brand: 'Carrier', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Carrier_AC', address: '0x4F',
    buttons: makeACButtons('Carrier', 'Carrier_AC', {
      power: '0x4F0000F00D30', tempUp: '0x4F0000F001', tempDown: '0x4F0000F002',
      mode: '0x4F0000F003', fan: '0x4F0000F004', swing: '0x4F0000F005',
      cool: '0x4F0000F011', heat: '0x4F0000F014', dry: '0x4F0000F012', auto: '0x4F0000F010',
    })
  },

  // ─── HITACHI AC ───
  { id: 'hitachi-ac-generic', brand: 'Hitachi', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Hitachi_AC', address: '0x80',
    buttons: makeACButtons('Hitachi', 'Hitachi_AC', {
      power: '0x8001004C03FC01', tempUp: '0x80010011', tempDown: '0x80010012',
      mode: '0x80010013', fan: '0x80010014', swing: '0x80010015',
      cool: '0x80010003', heat: '0x80010006', dry: '0x80010005', auto: '0x80010002',
    })
  },
  { id: 'hitachi-ac-rar-8p2', brand: 'Hitachi', model: 'RAR-8P2', deviceType: 'ac', protocol: 'Hitachi_AC', address: '0x80',
    buttons: makeACButtons('Hitachi', 'Hitachi_AC', {
      power: '0x8001004C03FC01', tempUp: '0x80010011', tempDown: '0x80010012',
    })
  },

  // ─── WHIRLPOOL AC ───
  { id: 'whirlpool-ac-generic', brand: 'Whirlpool', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Whirlpool_AC', address: '0x83',
    buttons: makeACButtons('Whirlpool', 'Whirlpool_AC', {
      power: '0x8388C0040800', tempUp: '0x83881001', tempDown: '0x83881002',
      mode: '0x83881003', fan: '0x83881004', swing: '0x83881005',
      cool: '0x8388C001', heat: '0x8388C004', dry: '0x8388C002', auto: '0x8388C000',
    })
  },

  // ─── ELECTROLUX AC ───
  { id: 'electrolux-ac-generic', brand: 'Electrolux', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Electra_AC', address: '0xC3',
    buttons: makeACButtons('Electrolux', 'Electra_AC', {
      power: '0xC3010082004000', tempUp: '0xC30100820041', tempDown: '0xC30100820042',
      mode: '0xC30100820043', fan: '0xC30100820044', swing: '0xC30100820045',
    })
  },

  // ─── AUX AC ───
  { id: 'aux-ac-generic', brand: 'AUX', model: 'Generic / Universal', deviceType: 'ac', protocol: 'NEC', address: '0xC3',
    buttons: makeACButtons('AUX', 'NEC', {
      power: '0xC3010082004000', tempUp: '0xC30100820041', tempDown: '0xC30100820042',
      mode: '0xC30100820043', fan: '0xC30100820044', swing: '0xC30100820045',
    })
  },

  // ─── TCL AC ───
  { id: 'tcl-ac-generic', brand: 'TCL', model: 'Generic / Universal', deviceType: 'ac', protocol: 'TCL_AC', address: '0x23',
    buttons: makeACButtons('TCL', 'TCL_AC', {
      power: '0x23CB260100', tempUp: '0x23CB260101', tempDown: '0x23CB260102',
      mode: '0x23CB260103', fan: '0x23CB260104', swing: '0x23CB260105',
    })
  },

  // ─── SHARP AC ───
  { id: 'sharp-ac-generic', brand: 'Sharp', model: 'Generic / Universal', deviceType: 'ac', protocol: 'Sharp_AC', address: '0xAA',
    buttons: makeACButtons('Sharp', 'Sharp_AC', {
      power: '0xAA5ACF100608', tempUp: '0xAA5ACF1011', tempDown: '0xAA5ACF1012',
      mode: '0xAA5ACF1013', fan: '0xAA5ACF1014', swing: '0xAA5ACF1015',
      cool: '0xAA5ACF1001', heat: '0xAA5ACF1004', dry: '0xAA5ACF1002', auto: '0xAA5ACF1000',
    })
  },

  // ─── YORK AC ───
  { id: 'york-ac-generic', brand: 'York', model: 'Generic / Universal', deviceType: 'ac', protocol: 'NEC', address: '0xB2',
    buttons: makeACButtons('York', 'NEC', {
      power: '0xB24D7B84E0', tempUp: '0xB24D9F6004', tempDown: '0xB24D8F7004',
    })
  },

  // ─── CHIGO AC ───
  { id: 'chigo-ac-generic', brand: 'Chigo', model: 'Generic / Universal', deviceType: 'ac', protocol: 'NEC', address: '0x44',
    buttons: makeACButtons('Chigo', 'NEC', {
      power: '0x4400FF00', tempUp: '0x4400FF01', tempDown: '0x4400FF02',
    })
  },

  // ─── HISENSE AC ───
  { id: 'hisense-ac-generic', brand: 'Hisense', model: 'Generic / Universal', deviceType: 'ac', protocol: 'NEC', address: '0x32',
    buttons: makeACButtons('Hisense', 'NEC', {
      power: '0x32CD8877', tempUp: '0x32CD48B7', tempDown: '0x32CDC837',
      mode: '0x32CD28D7', fan: '0x32CDA857', swing: '0x32CD6897',
    })
  },
];

// Helper to get brands by device type
export function getBrandsByType(type: DeviceType): string[] {
  const brands = new Set<string>();
  irDatabase.filter(r => r.deviceType === type).forEach(r => brands.add(r.brand));
  return Array.from(brands).sort();
}

// Helper to get models by brand and type
export function getModelsByBrand(brand: string, type: DeviceType): RemoteModel[] {
  return irDatabase.filter(r => r.brand === brand && r.deviceType === type);
}

// Helper to get a specific remote
export function getRemote(id: string): RemoteModel | undefined {
  return irDatabase.find(r => r.id === id);
}

// Get device type label
export function getDeviceTypeLabel(type: DeviceType): string {
  const labels: Record<DeviceType, string> = {
    tv: 'Telewizor (TV)',
    ac: 'Klimatyzacja (AC)',
    dvd: 'DVD / Blu-ray',
    audio: 'Audio / Soundbar',
    projector: 'Projektor',
    fan: 'Wentylator',
    stb: 'Dekoder (STB)',
  };
  return labels[type] || type;
}

// Get device type icon
export function getDeviceTypeIcon(type: DeviceType): string {
  const icons: Record<DeviceType, string> = {
    tv: '📺',
    ac: '❄️',
    dvd: '📀',
    audio: '🔊',
    projector: '📽️',
    fan: '🌀',
    stb: '📡',
  };
  return icons[type] || '📱';
}
