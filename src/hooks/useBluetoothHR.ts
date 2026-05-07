import { useCallback, useRef } from 'react';
import { useHRStore } from '../stores/hrStore';

const HEART_RATE_SERVICE = 'heart_rate';
const HEART_RATE_MEASUREMENT = 'heart_rate_measurement';

export function useBluetoothHR() {
  const { bpm, isConnected, deviceName, setBpm, setConnected, setDisconnected } = useHRStore();
  const deviceRef = useRef<BluetoothDevice | null>(null);
  const charRef = useRef<BluetoothRemoteGATTCharacteristic | null>(null);

  const isSupported = typeof navigator !== 'undefined' && 'bluetooth' in navigator;

  const connect = useCallback(async () => {
    if (!isSupported) {
      throw new Error('Web Bluetooth is not supported in this browser.');
    }

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [HEART_RATE_SERVICE] }],
    });

    device.addEventListener('gattserverdisconnected', () => {
      setDisconnected();
      deviceRef.current = null;
      charRef.current = null;
    });

    const server = await device.gatt!.connect();
    const service = await server.getPrimaryService(HEART_RATE_SERVICE);
    const characteristic = await service.getCharacteristic(HEART_RATE_MEASUREMENT);

    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      const value = (event.target as BluetoothRemoteGATTCharacteristic).value!;
      const flags = value.getUint8(0);
      const rate = flags & 0x01 ? value.getUint16(1, true) : value.getUint8(1);
      setBpm(rate);
    });

    await characteristic.startNotifications();
    deviceRef.current = device;
    charRef.current = characteristic;
    setConnected(device.name ?? 'Heart Rate Monitor');
  }, [isSupported, setBpm, setConnected, setDisconnected]);

  const disconnect = useCallback(() => {
    charRef.current?.stopNotifications();
    deviceRef.current?.gatt?.disconnect();
    charRef.current = null;
    deviceRef.current = null;
    setDisconnected();
  }, [setDisconnected]);

  return { bpm, isConnected, deviceName, connect, disconnect, isSupported };
}
