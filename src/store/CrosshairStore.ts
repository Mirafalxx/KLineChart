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

import TypeOrNull from '../common/TypeOrNull'
import KLineData from '../common/KLineData'
import Crosshair from '../common/Crosshair'
import { UpdateLevel } from '../common/Updater'

import ChartStore from './ChartStore'

export default class CrosshairStore {
  private readonly _chartStore: ChartStore
  private _crosshair: Crosshair = {}

  constructor (chartStore: ChartStore) {
    this._chartStore = chartStore
  }

  /**
     * 设置十字光标点信息
     * @param crosshair
     * @param notInvalidate
     */
  set (crosshair?: Crosshair, notInvalidate?: boolean): CrosshairStore {
    const dataList = this._chartStore.getDataList()
    const cr = crosshair ?? {}
    let realDataIndex: number
    let dataIndex: number
    if (cr.x !== undefined) {
      realDataIndex = this._chartStore.getTimeScaleStore().coordinateToDataIndex(cr.x)
      if (realDataIndex < 0) {
        dataIndex = 0
      } else if (realDataIndex > dataList.length - 1) {
        dataIndex = dataList.length - 1
      } else {
        dataIndex = realDataIndex
      }
    } else {
      realDataIndex = dataList.length - 1
      dataIndex = realDataIndex
    }
    const kLineData: TypeOrNull<KLineData> = dataList[dataIndex]
    const realX = this._chartStore.getTimeScaleStore().dataIndexToCoordinate(realDataIndex)
    const prevCrosshair = { x: this._crosshair.x, y: this._crosshair.y, paneId: this._crosshair.paneId }
    this._crosshair = { ...cr, realX, kLineData, realDataIndex, dataIndex }
    if (
      prevCrosshair.x !== cr.x || prevCrosshair.y !== cr.y || prevCrosshair.paneId !== cr.paneId
    ) {
      if (kLineData !== null) {
        this._chartStore.getChart().crosshairChange(this._crosshair)
      }
      if (!(notInvalidate ?? false)) {
        this._chartStore.getChart().updatePane(UpdateLevel.OVERLAY)
      }
    }
    return this
  }

  /**
   * 重新计算十字光标
   * @param notInvalidate
   */
  recalculate (notInvalidate: boolean): void {
    this.set(this._crosshair, notInvalidate)
  }

  /**
   * 获取crosshair信息
   * @returns
   */
  get (): Crosshair {
    return this._crosshair
  }
}