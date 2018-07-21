import Visualization from 'zeppelin-vis'
import AdvancedTransformation from 'zeppelin-tabledata/advanced-transformation'

import { SimpleCardParameter, renderSimpleCard, } from './cards/simple.js'

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
          parameter: SimpleCardParameter,
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
