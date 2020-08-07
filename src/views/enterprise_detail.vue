<template>
  <div class="enterprise_detail">
    <img ref="background" src="/gaoxinxiyuan/images/dialo-bg.png" :style="{position: 'absolute', top: '0px', left: '0px'}" />
    <img src="/gaoxinxiyuan/images/icon/times-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '48px'}" />
    <div :style="{width: '524px', height: '28px', color: '#fff', fontSize: '28px', lineHeight: '28px', fontWeight: '600', position: 'absolute', top: '130px', left: '88px'}">
      成都泰美克晶体技术有限公司
    </div>
    <img src="/gaoxinxiyuan/images/icon/lightning-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '692px'}" />
    <div :style="{width: '498px', height: '26px', color: '#fff', fontSize: '26px', lineHeight: '26px', fontWeight: '400', position: 'absolute', top: '131px', left: '732px'}">
      应急救援情况（含应急方案图）
    </div>
    <img src="/gaoxinxiyuan/images/icon/flamethrower-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '1310px'}" />
    <div :style="{width: '498px', height: '20px', color: '#fa6400', fontSize: '20px', lineHeight: '20px', fontWeight: '400', position: 'absolute', top: '131px', left: '1350px'}">
      危化品平面位置摆放图（含应急出口）
    </div>
  </div>
</template>

<script>
import BuiltInMixin from '../mixins/built_in'

export const enterprise_detail = {
  mixins: [BuiltInMixin],

  components: {
  },

  data () {
    return {
      craneStates: {
        test: '',
      },
    }
  },
}
export default enterprise_detail
</script>