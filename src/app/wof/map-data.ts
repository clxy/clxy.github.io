import * as turf from '@turf/turf'

export interface MapDataPoint {
  /** 标题 */
  title: string

  /** 坐标 [经度, 纬度] 或者用对象表示，这里采用对象形式 */
  coordinate: {
    lng: number
    lat: number
  }

  /** 距离下个坐标的步数 */
  stepsToNext?: number

  /** True:真实坐标，False:计算坐标 */
  isReal?: boolean
}

export class MapDataLine {
  title: string
  list: MapDataPoint[]
  order: number

  constructor(title: string = '', list: MapDataPoint[] = [], order: number = 0) {
    this.title = title
    this.list = list
    this.order = order
  }

  /**
   * 修复路径
   */
  public fix(): MapDataLine {
    const list = this.list

    for (let i = 0, len = list.length; i < len; i++) {
      const current = list[i]
      current.isReal = true
      if (i === len - 1) break

      const next = list[i + 1]
      next.isReal = true
      const steps = current.stepsToNext || 1
      if (steps <= 1) continue

      const fixList = this.fixStepItem(current, next)
      list.splice(i + 1, 0, ...fixList)
    }

    return this
  }

  /**
   * 利用 turf 顺着连线产生等距分割的中间点
   * @param current 当前点
   * @param next 下一个点
   */
  private fixStepItem(current: MapDataPoint, next: MapDataPoint): MapDataPoint[] {
    const newList: MapDataPoint[] = []

    const steps = current.stepsToNext || 1
    if (steps <= 1) return newList

    const line = turf.lineString([
      [current.coordinate.lng, current.coordinate.lat],
      [next.coordinate.lng, next.coordinate.lat]
    ])

    const totalLength = turf.length(line, { units: 'kilometers' })
    const stepDistance = totalLength / steps

    for (let j = 1; j < steps; j++) {
      const pt = turf.along(line, stepDistance * j, { units: 'kilometers' })
      newList.push({
        title: current.title,
        coordinate: {
          lng: pt.geometry.coordinates[0],
          lat: pt.geometry.coordinates[1]
        },
        isReal: false
      })
    }

    return newList
  }
}
