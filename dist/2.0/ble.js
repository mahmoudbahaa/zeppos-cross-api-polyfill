import { U as UNSUPPORTED } from './_constants-DnfQ3JJx.js';
export * from '@zos/ble';

const mstBuildProfile = profile => {
	throw new Error(UNSUPPORTED);
};

const mstConnect = (deviceAddress, callback) => {
	throw new Error(UNSUPPORTED);
};

const mstDestroyProfileInstance = profile => {
	throw new Error(UNSUPPORTED);
};

const mstDisconnect = connectId => {
	throw new Error(UNSUPPORTED);
};

const mstGetConnIdByRemoteAddr = deviceAddress => {
	throw new Error(UNSUPPORTED);
};

const mstGetProfileInstance = (profileName, connectId) => {
	throw new Error(UNSUPPORTED);
};

const mstOffAllCb = () => {
	throw new Error(UNSUPPORTED);
};

const mstOnCharaNotification = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnCharaReadComplete = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnCharaValueArrived = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnCharaWriteComplete = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnDescValueArrived = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnDescWriteComplete = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnPrepare = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnServiceChangeBegin = callback => {
	throw new Error(UNSUPPORTED);
};

const mstOnServiceChangeEnd = callback => {
	throw new Error(UNSUPPORTED);
};

const mstPair = connectId => {
	throw new Error(UNSUPPORTED);
};

const mstPrepare = profile => {
	throw new Error(UNSUPPORTED);
};

const mstReadCharacteristic = (profile, uuid) => {
	throw new Error(UNSUPPORTED);
};

const mstReadDescriptor = (profile, uuid, descUUID) => {
	throw new Error(UNSUPPORTED);
};

const mstStartScan = (callback, filter = undefined) => {
	throw new Error(UNSUPPORTED);
};

const mstStopScan = () => {
	throw new Error(UNSUPPORTED);
};

const mstWriteCharacteristic = (profile, uuid, data, length) => {
	throw new Error(UNSUPPORTED);
};

const mstWriteDescriptor = (profile, uuid, descUUID, data, length) => {
	throw new Error(UNSUPPORTED);
};

export { mstBuildProfile, mstConnect, mstDestroyProfileInstance, mstDisconnect, mstGetConnIdByRemoteAddr, mstGetProfileInstance, mstOffAllCb, mstOnCharaNotification, mstOnCharaReadComplete, mstOnCharaValueArrived, mstOnCharaWriteComplete, mstOnDescValueArrived, mstOnDescWriteComplete, mstOnPrepare, mstOnServiceChangeBegin, mstOnServiceChangeEnd, mstPair, mstPrepare, mstReadCharacteristic, mstReadDescriptor, mstStartScan, mstStopScan, mstWriteCharacteristic, mstWriteDescriptor };