import Visualization from 'zeppelin-vis'
import AdvancedTransformation from 'zeppelin-tabledata/advanced-transformation'

import { renderSimpleCard, } from './cards/simple.js'

export default class ZeppelinNumber extends Visualization {

  constructor(targetEl, config) {
    super(targetEl, config)

    const spec = {
      charts: {
        'simple': {
          transform: { method: 'raw', },
          sharedAxis: false,
          axis: {
            'main title': { dimension: 'single', axisType: 'key', },
            'secondary title': { dimension: 'single', axisType: 'aggregator', },
          },
          parameter: {
            'fontColor': { valueType: 'string', defaultValue: 'black', description: 'font color', },
            'fontSize': { widget: 'option', valueType: 'string', defaultValue: 'medium', description: 'font size', optionValues: ['small', 'medium', 'large',], },
            'alignment': { widget: 'option', valueType: 'string', defaultValue: 'center', description: 'alignment', optionValues: ['left', 'right', 'center',], },
            'iconName': { valueType: 'string', defaultValue: '', description: 'font awesome icon name. Ex: users' },
            'showTitle': { widget: 'checkbox', valueType: 'boolean', defaultValue: true, description: 'show title', },
            'prefix': { valueType: 'string', defaultValue: '', description: 'prefix', },
            'suffix': { valueType: 'string', defaultValue: '', description: 'suffix', },
          },
        }
      },
    }
    this.transformation = new AdvancedTransformation(config, spec)
  }

  render(data) {
    const {
      chartChanged, parameterChanged,
      chart, parameter, column, transformer,
    } = data

    const rows = transformer()

    let content = ''
    try {
      if (chart === 'simple') {
        content = renderSimpleCard(rows, column, parameter)
      }
    } catch (error) {
      console.error(error)
    }

    this.targetEl.html(content)
  }

  getTransformation() {
    return this.transformation
  }

}
