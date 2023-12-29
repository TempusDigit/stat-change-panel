import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import { StatChangeOptions } from 'models.gen';
import { BigValue, BigValueColorMode, BigValueTextMode, useTheme2 } from '@grafana/ui';
import { getDisplayValue } from 'utils';
import { PanelDataErrorView } from '@grafana/runtime';
import { Info } from 'types';

interface Props extends PanelProps<StatChangeOptions> { }

export const SimplePanel: React.FC<Props> = ({ data, fieldConfig, height, id, options, width }) => {
  const theme = useTheme2();
  const info: Info = useMemo(() => {
    try {
      return { data: getDisplayValue(data.series, options, theme) };
    } catch (e: any) {
      return { warning: e.message };
    }
  }, [data.series, options, theme]);

  if ('warning' in info) {
    return <PanelDataErrorView
      panelId={id}
      fieldConfig={fieldConfig}
      data={data}
      message={info.warning}
    />;
  }

  return <BigValue
    value={info.data}
    colorMode={BigValueColorMode.Value}
    textMode={BigValueTextMode.ValueAndName}
    width={width}
    height={height}
    theme={theme}
  />;
};
