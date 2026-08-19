import { useEffect, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

const STATUS_JSON_URL =
    'https://raw.githubusercontent.com/TeXlyre/upptime/master/status.json';
const STATUS_URL = 'https://texlyre.org/upptime';

type Overall = 'up' | 'degraded' | 'down';

type Status = {
    status: Overall;
    down: number;
    degraded: number;
};

function label(status: Status): string {
    if (status.status === 'up') {
        return 'All services online';
    }
    const affected = status.down + status.degraded;
    const suffix = affected === 1 ? 'service' : 'services';
    return status.status === 'down'
        ? `${affected} ${suffix} down`
        : `${affected} ${suffix} degraded`;
}

export default function StatusIndicator(): ReactNode {
    const [status, setStatus] = useState<Status | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(STATUS_JSON_URL, { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
            .then((data: Status) => {
                if (['up', 'degraded', 'down'].includes(data?.status)) {
                    setStatus(data);
                }
            })
            .catch(() => undefined);

        return () => controller.abort();
    }, []);

    if (!status) {
        return null;
    }

    return (
        <a
            href={STATUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.status}
        >
            <span className={`${styles.dot} ${styles[status.status]}`} aria-hidden="true" />
            {label(status)}
        </a>
    );
}
