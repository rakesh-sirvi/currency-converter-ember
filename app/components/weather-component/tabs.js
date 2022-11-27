import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import {
  _getMinMaxTemp,
  _getPrecipitation,
  _getRelativeHumidity,
} from './utils/utility';

export default class TabsComponent extends Component {
  @tracked currentOption = 'temperature';

  @tracked minMaxTemps;

  @tracked precipitation;

  @tracked relativeHumidity;

  @action
  changeCurrentOption(newOption) {
    this.currentOption = newOption;
  }

  @action
  updateData() {
    this.minMaxTemps = _getMinMaxTemp(this.args.temperatures);
    this.precipitation = _getPrecipitation(this.args.precipitation);
    this.relativeHumidity = _getRelativeHumidity(this.args.relative_humidity);
  }
}
