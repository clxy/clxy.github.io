<template>
  <div class="relative w-full h-[600px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl bg-gray-50 flex items-center justify-center">
    <div ref="mapContainer" class="absolute inset-0"></div>
    
    <!-- Player Control Bar -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-6 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md px-6 py-4 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-2xl transition-all w-11/12 max-w-3xl ring-1 ring-black/5 dark:ring-white/10 z-10">
      
      <!-- Playback Controls -->
      <div class="flex items-center gap-2">
        <UButton 
          :icon="isPlaying && !isPaused ? 'i-heroicons-pause-16-solid' : 'i-heroicons-play-16-solid'" 
          :color="isPlaying && !isPaused ? 'amber' : 'primary'"
          variant="solid" 
          :ui="{ rounded: 'rounded-full' }"
          size="xl" 
          @click="togglePlay"
          :title="isPlaying && !isPaused ? '暂停' : '播放'"
        />
        <UButton 
          icon="i-heroicons-stop-16-solid" 
          color="gray"
          variant="ghost" 
          :ui="{ rounded: 'rounded-full' }"
          size="xl" 
          @click="stop"
          :disabled="!isPlaying && currentStep === 0"
          title="停止"
        />
      </div>

      <!-- Progress Slider -->
      <div class="flex-grow flex items-center justify-center px-4 w-full">
        <!-- Progress Range Component -->
        <div class="w-full relative flex items-center group">
           <input 
             type="range" 
             v-model="progress" 
             min="0" 
             max="100" 
             step="0.1"
             class="w-full cursor-pointer h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700 transition"
             @input="onProgressChange"
           />
           <div 
             class="absolute left-0 top-0 h-2 bg-primary-500 rounded-lg pointer-events-none" 
             :style="{ width: `${progress}%` }"
           ></div>
        </div>
      </div>

      <!-- Settings -->
      <div class="flex items-center gap-3 border-l border-gray-200 dark:border-gray-700 pl-4 sm:pl-6">
        <USelectMenu 
          v-model="playMode" 
          :options="modeOptions" 
          value-attribute="value" 
          option-attribute="label"
          class="w-28 sm:w-32 font-medium"
        >
          <template #leading>
            <UIcon name="i-heroicons-bars-arrow-up-16-solid" class="w-4 h-4 text-gray-500" />
          </template>
        </USelectMenu>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { MapDataLine } from './map-data'

const props = defineProps<{
  lines: MapDataLine[]
}>()

const mapContainer = shallowRef<HTMLElement | null>(null)
let map: maplibregl.Map | null = null

const isPlaying = ref(false)
const isPaused = ref(false)
const progress = ref(0) // 0 to 100

type PlayMode = 'parallel' | 'serial'
const playMode = ref<PlayMode>('parallel')
const modeOptions = [
  { label: '并行播放', value: 'parallel' },
  { label: '串行播放', value: 'serial' },
]

let animationFrameId: number | null = null
let currentStep = 0
let totalSteps = 0
const stepsPerFrame = 1 // 播放速度节奏

let maxLineLength = 0
let totalSerialLength = 0
let lineLengths: number[] = []

// 预设路径颜色（依次提取）
const colors = [
  '#3b82f6', // blue-500
  '#ef4444', // red-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#14b8a6', // teal-500
  '#f97316'  // orange-500
]

const setupData = () => {
  maxLineLength = 0
  totalSerialLength = 0
  lineLengths = []
  
  if (!props.lines || props.lines.length === 0) return

  for (const line of props.lines) {
     const len = line.list?.length || 0
     lineLengths.push(len)
     if (len > maxLineLength) maxLineLength = len
     totalSerialLength += len
  }
}

const clearMapLayers = () => {
  if (!map) return
  // 安全清理所有的线路渲染层
  for (let index = 0; index < 20; index++) {
    if (map.getLayer(`route-layer-${index}`)) map.removeLayer(`route-layer-${index}`)
    if (map.getSource(`route-${index}`)) map.removeSource(`route-${index}`)
  }
}

const initMapLayers = () => {
  if (!map || !map.loaded() || !props.lines) return
  
  clearMapLayers()

  const bounds = new maplibregl.LngLatBounds()

  props.lines.forEach((line, index) => {
    map!.addSource(`route-${index}`, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] }
    })
    
    map!.addLayer({
      id: `route-layer-${index}`,
      type: 'line',
      source: `route-${index}`,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': colors[index % colors.length],
        'line-width': 6,
        'line-opacity': 0.8
      }
    })
    
    line.list?.forEach(pt => {
      if(pt && pt.coordinate) {
         bounds.extend([pt.coordinate.lng, pt.coordinate.lat])
      }
    })
  })

  // 如果数据中存在有效坐标节点，那么缩放到最佳视野上
  if (!bounds.isEmpty()) {
     map.fitBounds(bounds, { padding: 80, duration: 1000 })
  }
}

const updateMap = () => {
  if (!mapContainer.value) return
  
  if (!map) {
    map = new maplibregl.Map({
      container: mapContainer.value,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json', // 通用的亮色风格地图底图
      center: [105, 35],
      zoom: 3,
      attributionControl: false
    })

    map.on('load', () => {
      initMapLayers()
      updateLines(0)
    })
  } else if (map.loaded()) {
    initMapLayers()
    updateLines(currentStep)
  }
}

const updateLines = (step: number) => {
  if (!map || !map.loaded()) return

  props.lines.forEach((line, index) => {
    const source = map?.getSource(`route-${index}`) as maplibregl.GeoJSONSource
    if (!source) return
    
    let drawPoints = 0
    if (playMode.value === 'parallel') {
      // 并行，每条线同时增加对应数量
      drawPoints = Math.min(step, line.list?.length || 0)
    } else {
      // 串行，依据当前 step 减去之前线的累计长度，判断此线该画多少个点
      let prevLengths = 0
      for (let i = 0; i < index; i++) {
        prevLengths += lineLengths[i]
      }
      if (step <= prevLengths) {
        drawPoints = 0
      } else if (step > prevLengths + lineLengths[index]) {
        drawPoints = lineLengths[index]
      } else {
        drawPoints = step - prevLengths
      }
    }

    const coords = line.list
        ?.slice(0, drawPoints)
        .map(p => [p.coordinate.lng, p.coordinate.lat]) || []
    
    source.setData(coords.length >= 2 ? {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    } : {
      type: 'FeatureCollection',
      features: []
    })
  })
}

const animate = () => {
  if (!isPlaying.value || isPaused.value) return

  totalSteps = playMode.value === 'parallel' ? maxLineLength : totalSerialLength
  currentStep += stepsPerFrame

  if (currentStep >= totalSteps) {
    currentStep = totalSteps
    isPlaying.value = false
  }

  progress.value = totalSteps === 0 ? 0 : (currentStep / totalSteps) * 100
  updateLines(currentStep)

  if (isPlaying.value) {
    animationFrameId = requestAnimationFrame(animate)
  }
}

const togglePlay = () => {
  if (isPlaying.value && !isPaused.value) {
    // 暂停
    isPaused.value = true
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  } else {
    // 恢复播放/新的播放
    totalSteps = playMode.value === 'parallel' ? maxLineLength : totalSerialLength
    if (!isPlaying.value) {
      if (currentStep >= totalSteps) {
        currentStep = 0 // 若进度早已达100%，则重置从头开始
      }
    }
    isPlaying.value = true
    isPaused.value = false
    animationFrameId = requestAnimationFrame(animate)
  }
}

const stop = () => {
  isPlaying.value = false
  isPaused.value = false
  currentStep = 0
  progress.value = 0
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  updateLines(0)
}

const onProgressChange = () => {
  totalSteps = playMode.value === 'parallel' ? maxLineLength : totalSerialLength
  currentStep = Math.floor((progress.value / 100) * totalSteps)
  updateLines(currentStep)
}

watch(() => props.lines, () => {
  stop() // 当传入的新地图轨迹集变更时重置
  setupData()
  updateMap()
}, { deep: true })

watch(playMode, () => {
  stop()
})

onMounted(() => {
  setupData()
  updateMap()
})

onUnmounted(() => {
  stop()
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
/* 为了让原生的输入框更贴近定制美感，隐藏原生滑块方块样式，交由上方的 primary 覆盖层去展现进度 */
input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 rounded-full bg-primary-600 hover:scale-110 active:scale-100 transition shadow-sm border-2 border-white;
  position: relative;
  z-index: 10;
}
input[type="range"]::-moz-range-thumb {
  @apply appearance-none w-4 h-4 rounded-full bg-primary-600 hover:scale-110 active:scale-100 transition shadow-sm border-2 border-white;
  position: relative;
  z-index: 10;
}
</style>
