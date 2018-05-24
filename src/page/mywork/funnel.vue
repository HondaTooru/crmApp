<template>
  <div id="myChart" style="width:100%;transform: translateX(-5%);" :style="{height: options.height}"></div>
</template>

<script>
import { SalesList } from '@/api/api'
import Highcharts from 'Highcharts'
import Funnel from 'highcharts/modules/funnel'
Funnel(Highcharts)

export default {
  name: 'funnel',
  props: {
    options: Object
  },
  data () {
    return {
      sale_funnel_data: '',
      params: {
        revisit_time_str: '',
        revisit_man_dep: '',
        revisit_man: ''
      }
    }
  },
  mounted () {
    this.getSaleFunnel()
  },
  methods: {
    getSaleFunnel () {
      let g = {
        time_str: this.options.type,
        revisit_man_dep: this.options.man_dep,
        revisit_man: this.options.revisit_man
      }
      SalesList(Object.assign({}, this.params, g)).then(res => {
        this.sale_funnel_data = res.data
        this.drawLine()
        this.$emit('cellData', res.header, res.data)
      })
    },
    drawLine () {
      let arrData = []
      this.sale_funnel_data.forEach(val => {
        if (val.scount === 0) {
          val.y = 2
        } else {
          val.y = val.scount + 2
        }
        arrData.push({
          name: val.sales_phase,
          y: val.y,
          x: val.sales_phase,
          calculate_sale_money: val.calculate_sale_money,
          expected_sales_amount: val.expected_sales_amount,
          scount: val.scount,
          sign_probability: val.sign_probability
        })
      })
// 图表配置
      var options = {
        credits: {
          enabled: false //  不显示LOGO
        },
        chart: {
          type: 'funnel',
          marginRight: 10
        },
        title: {
          text: this.options.title ? '销售漏斗' : '',
          x: 0,
          y: 25,
          style: {'fontSize': '16px'}
        },
        colors: ['#7dfe8b', '#3de4fe', '#ffaf6e', '#1ea6e0', '#69cd4b', '#da3610', '#ff6f34', '#8085e8', '#8d4653', '#91e8e1'],
        plotOptions: {
          series: {
            minPointLength: 200,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b> ({point.scount:,.0f})',
              formatter: function (a) {
                console.log(a)
              },
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor),
              softConnector: true,
              distance: 0
            },
            minSize: '80',
            neckWidth: '15%',
            neckHeight: '15%'
          }
        },
        tooltip: {
          borderRadius: 10, // 边框圆角
          borderWidth: 1, // 边框宽度
          shadow: true, // 是否显示阴影
          animation: true, // 是否启用动画效果x
          formatter: function (a) {
            return '<span style="color: ' + this.point.color + '">\u25CF</span> ' + this.point.name + '<br/><b>预计销售金额：</b>' + this.point.expected_sales_amount +
             '<br/><b>概率金额：</b>' + this.point.calculate_sale_money + '<br/><b>签单几率：</b>' + this.point.sign_probability + '<br/><b>商机数：</b>' + this.point.scount + '<br/>'
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: '销售漏斗',
          data: arrData
        }]
      }
      Highcharts.chart('myChart', options)
    }
  }
}
</script>

<style lang="less">
</style>
