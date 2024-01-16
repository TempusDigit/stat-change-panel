export interface StatChangeOptions {
    none: string;
    positive: string;
    negative: string;
}

export const defaultStatChangeConfig: StatChangeOptions = {
    none: 'gray',
    positive: 'green',
    negative: 'red',
};
