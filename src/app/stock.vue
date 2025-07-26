<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import axios from 'axios'
// import VChart from 'vue-echarts'
// // 手动引入 ECharts 模块
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'

// // 注册 ECharts 组件及渲染器
// use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, TitleComponent])

// const chartOption = ref<Record<string, any>>({})

// // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=600104.SHH&outputsize=full&apikey=demo
// const apiKey = 'demo' //for demo purposes
// const symbol = 'AAPL'

// const fetchStockData = async () => {
//   // TODO: 从本地缓存获取数据


//   try {
//     const response = await axios.get(`https://www.alphavantage.co/query`, {
//       params: {
//         function: 'TIME_SERIES_DAILY',
//         symbol: symbol,
//         apikey: apiKey
//       }
//     })
//     const timeSeries = response.data['Time Series (Daily)']
//     if (!timeSeries) {
//       console.error('数据解析错误，请检查返回内容', response.data)
//       return
//     }
//     // 按日期升序排序
//     const dates = Object.keys(timeSeries).sort()
//     // 提取收盘价，转换为数字
//     const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']))
//     console.log('dates:', dates)
//     console.log('prices:', prices)
//     // 设置 ECharts 配置项
//     chartOption.value = {
//       title: {
//         text: `${symbol} 每日收盘价`
//       },
//       tooltip: {
//         trigger: 'axis'
//       },
//       xAxis: {
//         type: 'category',
//         data: dates
//       },
//       yAxis: {
//         type: 'value'
//       },
//       series: [{
//         name: '收盘价',
//         type: 'line',
//         data: prices,
//         smooth: true,
//         lineStyle: {
//           width: 2
//         }
//       }]
//     }
//   } catch (error) {
//     console.error('Error fetching stock data:', error)
//   }
// }

// onMounted(() => {
//   fetchStockData()
// })
</script>

<template>
  <div>Stock</div>
  <div>
    <!-- <v-chart :option="chartOption" autoresize style="width: 100%; height: 400px;" /> -->
  </div>
</template>

<style scoped></style>

<route lang="yaml">
name: Stock
meta:
  title: Stock
  icon: i-mdi-chart-finance
</route>
