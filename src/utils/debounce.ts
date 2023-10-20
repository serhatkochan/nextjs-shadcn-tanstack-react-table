const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): (...funcArgs: Parameters<T>) => void => {
    let debounceTimer: NodeJS.Timeout | undefined;
    return (...args: Parameters<T>) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => func(...args), delay);
    };
};

export { debounce };
