import { useEffect, useState } from 'react';

let busy = false;
let stopHandler = null;
const listeners = new Set();

function emit() {
    listeners.forEach((fn) => fn(busy));
}

export function acquireCompileLock(onStop) {
    busy = true;
    stopHandler = onStop || null;
    emit();
}

export function releaseCompileLock() {
    busy = false;
    stopHandler = null;
    emit();
}

export function stopCompile() {
    if (stopHandler) stopHandler();
}

export function useCompileLock() {
    const [value, setValue] = useState(busy);
    useEffect(() => {
        listeners.add(setValue);
        setValue(busy);
        return () => listeners.delete(setValue);
    }, []);
    return value;
}