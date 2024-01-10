import { DisplayValue } from '@grafana/data';

export interface StatChangeData {
    displayValue: DisplayValue;
};

export interface Info {
    data?: StatChangeData;
    warning?: string;
};
