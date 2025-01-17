/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { OverlayTemplate } from '../../component/Overlay'
import { isFunction, isValid } from '../../common/utils/typeChecks'
import { LineType } from '../../common/Options'

const dircetionAnnotation: OverlayTemplate = {
  name: 'dircetionAnnotation',
  totalStep: 2,
  styles: {
    text: {
      borderSize: 1,
      borderRadius: 10,
      borderColor: '#1677FF',
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: '#1677FF'
    },
    line: { style: LineType.Dashed }
  },
  createPointFigures: ({ overlay, coordinates }) => {
    let text
    if (isValid(overlay.extendData)) {
      if (!isFunction(overlay.extendData)) {
        text = overlay.extendData ?? ''
      } else {
        text = overlay.extendData(overlay)
      }
    }
    const startX = coordinates[0].x
    const startY = coordinates[0].y - 6
    const lineEndY = startY - 50
    const arrowEndY = lineEndY - 5
    return [
      {
        type: 'lineg',
        attrs: {
          coordinates: [
            { x: startX, y: startY },
            { x: startX, y: lineEndY + 30 }
          ]
        },
        ignoreEvent: true
      },
      // треугольник
      // {
      //   type: 'polygon',
      //   attrs: {
      //     coordinates: [
      //       { x: startX, y: lineEndY },
      //       { x: startX - 4, y: arrowEndY },
      //       { x: startX + 4, y: arrowEndY }
      //     ]
      //   },
      //   ignoreEvent: true
      // },
      // текст внутри квадрата
      {
        type: 'text',
        attrs: {
          x: startX,
          y: arrowEndY + 50,
          text: text ?? '',
          align: 'center',
          baseline: 'bottom'
        },
        ignoreEvent: true
      }
    ]
  }
}

export default dircetionAnnotation
