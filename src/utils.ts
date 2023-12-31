import { DataFrame, DisplayValue, FieldType, GrafanaTheme2 } from '@grafana/data';
import { CURRENT_FIELD, PREVIOUS_FIELD, SERIES, VALUE_INDEX } from 'consts';
import { StatChangeOptions } from 'models.gen';

function validateSeries(series: DataFrame[]): void {
    let errorMessage = '';
    if (series.length === 0) {
        errorMessage = 'No data';
    } else if (series[SERIES].fields.length < 2) {
        errorMessage = 'Data must have at least two fields';
    } else {
        for (const field of series[SERIES].fields) {
            if (field.values.toArray().some(value => value === null)) {
                errorMessage = 'Data must not have null values';
                break;
            } else if (field.type !== FieldType.number) {
                errorMessage = 'Data must be numeric';
                break;
            }
        };
    }

    if (errorMessage) {
        throw new Error(errorMessage);
    }
}

function getValueDifference(series: DataFrame[]): number {
    const previous = series[SERIES].fields[PREVIOUS_FIELD].values.get(VALUE_INDEX);
    const current = series[SERIES].fields[CURRENT_FIELD].values.get(VALUE_INDEX);

    return current - previous;
}

function getColor(series: DataFrame[], options: StatChangeOptions, theme: GrafanaTheme2): string {
    const valueDifference = getValueDifference(series);

    let color: string;
    if (valueDifference > 0) {
        color = options.positive;
    } else if (valueDifference < 0) {
        color = options.negative;
    } else {
        color = options.none;
    }

    return theme.visualization.getColorByName(color);
}

export function getDisplayValue(series: DataFrame[], options: StatChangeOptions, theme: GrafanaTheme2): DisplayValue {
    validateSeries(series);

    const currentValue: number = series[SERIES].fields[CURRENT_FIELD].values.get(VALUE_INDEX);

    return {
        text: currentValue.toString(),
        numeric: currentValue,
        color: getColor(series, options, theme),
        title: series[SERIES].fields[CURRENT_FIELD].name,
    };
}
