import { PanelPlugin } from '@grafana/data';
import { StatChangeOptions, defaultStatChangeConfig } from 'models.gen';
import { SimplePanel } from './components/StatChangePanel';

export const plugin = new PanelPlugin<StatChangeOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addColorPicker({
      path: 'none',
      name: 'No change color',
      defaultValue: defaultStatChangeConfig.none,
    }).addColorPicker({
      path: 'positive',
      name: 'Positive change color',
      defaultValue: defaultStatChangeConfig.positive,
    }).addColorPicker({
      path: 'negative',
      name: 'Negative change color',
      defaultValue: defaultStatChangeConfig.negative,
    });
});
