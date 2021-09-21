import {createStorageStoreImpl, StorageItem, StorageManagerHandlerHelpers, StorageStore} from 'react-modular-store';
import {useEffect} from 'react';

export {StorageStore};

export type StorageStoreConfig<T> = {
    storage: StorageItem<T>,
    saveBehavior: keyof typeof storageManagerHandler,
};

const storageManagerHandler = {
    manual<T extends {}>(options: StorageManagerHandlerHelpers<T>) {
    },

    onWrite<T extends {}>({save, valueState}: StorageManagerHandlerHelpers<T>) {
        useEffect(() => {
            save(valueState);
        }, [valueState]);
    },
} as const;

export const createStorageStore = <T extends {}>(
    defaultValue: T,
    {storage, saveBehavior}: StorageStoreConfig<T>,
): StorageStore<T> => createStorageStoreImpl(defaultValue, {
    storage,
    storageManagerHandler: storageManagerHandler[saveBehavior],
});
