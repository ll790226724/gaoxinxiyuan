<template>
  <div class="enterprise_detail">
    <img ref="background" src="/gaoxinxiyuan/images/dialo-bg.png" :style="{position: 'absolute', top: '0px', left: '0px'}" />
    <img src="/gaoxinxiyuan/images/icon/times-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '48px'}" />
    <div :style="{width: '524px', height: '28px', color: '#fff', fontSize: '28px', lineHeight: '28px', fontWeight: '600', position: 'absolute', top: '130px', left: '88px'}" v-text="craneStates.enterpriseName" />
    <data-loader ref="enterpriseData" v-slot="{ results: results }" url="/v1/components/0027dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data" :style="{width: '618px', height: '848px', border: '1px solid rgba(255, 255, 255, .1)', overflow: 'hidden', position: 'absolute', top: '204px', left: '32px'}" :params="{name: craneStates.enterpriseName}">
      <ul ref="enterpriseTable" :style="{height: '100%', overflowY: 'scroll'}" class="enterprise-table">
        <li v-for="(item, key) in craneStates.tableHeader" :key="key" :style="{display: 'flex', fontSize: '20px', fontWeight: '500', lineHeight: '30px'}">
          <div v-text="item.value" :style="{width: '182px', flexShrink: '0', verticalAlign: 'top', color: '#acb2c4', borderRight: '1px solid rgba(255, 255, 255, .1)', padding: '24px 16px'}" />
          <div v-text="results&&results[0][key]" :style="{flex: '1', color: '#fff', flexShrink: '0', verticalAlign: 'top', padding: '24px 16px'}" />
        </li>
      </ul>
    </data-loader>
    <img src="/gaoxinxiyuan/images/icon/lightning-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '692px'}" />
    <div :style="{width: '498px', height: '26px', color: '#fff', fontSize: '26px', lineHeight: '26px', fontWeight: '400', position: 'absolute', top: '131px', left: '732px'}">
      应急救援情况（含应急方案图）
    </div>
    <img src="/gaoxinxiyuan/images/icon/user-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '913px', left: '712px'}" />
    <img src="/gaoxinxiyuan/images/line.png" :style="{width: '19px', height: '120px', position: 'absolute', top: '860px', left: '757px'}" />
    <div :style="{position: 'absolute', top: '850px', left: '787px'}">
      <div v-for="(item, key) in craneStates.safetyOfficerData" :key="key" :style="{marginBottom: '40px'}">
        <data-loader v-slot="{ results: results }" :url="reqUrl(item.id)" :params="{name: craneStates.enterpriseName}">
          <div :style="{display: 'flex', height: '20px', alignItems: 'center', marginBottom: '40px', fontSize: '20px', lineHeight: '20px', fontWeight: '400'}">
            <div v-text="item.type" :style="{width: '144px', marginRight: '16px', color: '#fa6400'}" />
            <div v-text="results && results[0][0]" :style="{width: '80px', color: '#fff'}" />
            <div :style="{width: '1px', height: '12px', backgroundColor: '#fff'}" />
            <div v-text="results && results[0][1]" :style="{width: '80px', color: '#fff'}" />
          </div>
        </data-loader>
      </div>
    </div>
    <data-loader v-slot="{ results: results }" url="/v1/components/0137dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data" :params="{name: craneStates.enterpriseName}" :style="{width: '466px', height: '596px', overflowY: 'scroll', position: 'absolute', top: '204px', left: '732px'}">
      <image-view :imgs="results && results[0]" />
    </data-loader>
    <img src="/gaoxinxiyuan/images/icon/flamethrower-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '1310px'}" />
    <div :style="{width: '498px', height: '26px', color: '#fff', fontSize: '26px', lineHeight: '26px', fontWeight: '400', position: 'absolute', top: '131px', left: '1350px'}">
      危化品平面位置摆放图（含应急出口）
    </div>
    <data-loader v-slot="{ results: results }" url="/v1/components/0177dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data" :params="{name: craneStates.enterpriseName}" :style="{width: '466px', height: '596px', overflowY: 'scroll', position: 'absolute', top: '204px', left: '1350px'}">
      <image-view :imgs="results && results[0]" />
    </data-loader>
  </div>
</template>

<script>
import BuiltInMixin from '../mixins/built_in'
import {
  DataLoader,
} from '@byzanteam/vis-components'
import ImageView from '../components/image-view'

export const enterprise_detail = {
  mixins: [BuiltInMixin],

  components: {
    DataLoader,
    ImageView,
  },

  data () {
    return {
      craneStates: {
        tableHeader: [{field: 'company_name', value: '企业名称'}, {field: 'registered_address', value: '注册地址'}, {field: 'actual_address', value: '实际地址'}, {field: 'industry', value: '行业领域'}, {field: 'main_business', value: '主营业务'}, {field: 'header_name', value: '单位负责人姓名'}, {field: 'header_phone', value: '单位负责人电话'}, {field: 'area', value: '场地总面积'}, {field: 'number', value: '从业人数（人）'}, {field: 'security_name', value: '安全负责人姓名'}, {field: 'sucurity_phone', value: '安全负责人电话'}],
        enterpriseName: '成都中光电科技有限公司',
        safetyOfficerData: [{id: '0047dd5e-d3ff-4c5f-9ab4-44d75afb40a1', type: '安全总负责人'}, {id: '0057dd5e-d3ff-4c5f-9ab4-44d75afb40a1', type: '安全第一负责人'}, {id: '0067dd5e-d3ff-4c5f-9ab4-44d75afb40a1', type: '安全第二负责人'}],
      },
    }
  },

  computed: {
    reqUrl(id){
      return function(id){
        return `/v1/components/${id}/data`
      }
    }
  },
}
export default enterprise_detail
</script>