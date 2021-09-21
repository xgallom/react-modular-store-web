import {
    applyStorageMixins,
    BaseStorage,
    CachedStorageMixin,
    PrefixedStorageMixin,
    PrefixedStorageOptions,
    Storage,
} from 'react-modular-store';

class LocalStorageImpl<T extends {} = Record<string, any>> implements BaseStorage<T> {
    async getItem<K extends keyof T>(key: K): Promise<T[K] | null> {
        const item = localStorage.getItem(key.toString());
        return item ? JSON.parse(item) : null;
    }

    async setItem<K extends keyof T>(key: K, item: T[K]): Promise<void> {
        return localStorage.setItem(key.toString(), JSON.stringify(item));
    }

    async removeItem(key: keyof T): Promise<void> {
        return localStorage.removeItem(key.toString());
    }
}

export const createLocalStorage = <T extends {} = Record<string, any>>(options?: PrefixedStorageOptions): Storage<T> =>
    applyStorageMixins([
            CachedStorageMixin(),
            ...(options ? [PrefixedStorageMixin(options)] : []),
        ],
        new LocalStorageImpl(),
    );
