<template>
  <div class="map">
    <data-loader :style="{transform: `scale(${1/getMapScale()})`, width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px'}">
      <base-map ref="map" :mapOptions="craneStates.mapOptions" :satellite="true">
        <div v-if="craneStates.currentCompanyTag === 'fireFighting'">
          <regions ref="fireFightingRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('showState', true)]" :areas="fireFightingCompany.features" :areaStyle="craneStates.fireFightingAreaStyle" :areaHoverStyle="craneStates.fireFightingAreaHoverStyle" />
        </div>
        <div v-if="craneStates.currentCompanyTag === 'dangerousChemical'">
          <regions ref="dangerousChemicalRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('showState', true)]" :areas="dangerousChemicalCompany.features" :areaStyle="craneStates.dangerousChemicalAreaStyle" :areaHoverStyle="craneStates.dangerousChemicalHoverStyle" />
        </div>
        <data-loader @requestDone="(param)=>[setState('fireFightingCompanyBuildingData', param.results ? param.results.map(item => ({name: item[0], point: [item[1][1], item[1][0]], labelMarker: true, })) : [])]" v-if="fireFightingMarkerShow" :url="`/v1/components/0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`" method="get" :data="[['']]">
          <custom-marker ref="fireFightingBuildingMarker" v-for="(marker, index) in craneStates.fireFightingCompanyBuildingData" :key="index + marker.point[0] + marker.point[1] + marker.tag + marker.name" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentCompany', marker.target.getExtData().name), setState('showState', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" :offset="craneStates.leftLabelsConfig.offset" :anchor="craneStates.leftLabelsConfig.options.anchor" :content="`<div style='display: flex; align-items: center;'><img style='height: 2px; margin-right: 10px' src='/zhyq/icon/line.svg'/><div class='label-marker'>${marker.name}</div></div>`" />
        </data-loader>
        <data-loader @requestDone="(param)=>[setState('dangerousChemicalCompanyBuildingData', param.results ? param.results.map(item => ({name: item[0], point: [item[1][1], item[1][0]], labelMarker: true, })) : [])]" v-if="dangerousChemicalMarkerShow" :url="`/v1/components/0107dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`" method="get" :data="[['']]">
          <custom-marker ref="dangerousChemicalBuildingMarker" v-for="(marker, index) in craneStates.dangerousChemicalCompanyBuildingData" :key="marker.point[0] + marker.point[1] + marker.tag + marker.name + index" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentCompany', marker.target.getExtData().name), setState('showState', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" :offset="craneStates.leftLabelsConfig.offset" :anchor="craneStates.leftLabelsConfig.options.anchor" :content="`<div style='display: flex; align-items: center;'><img style='height: 2px; margin-right: 10px' src='/zhyq/icon/line.svg'/><div class='label-marker'>${marker.name}</div></div>`" />
        </data-loader>
      </base-map>
    </data-loader>
    <data-loader ref="company_select" @requestDone="(params)=>[setState('selectAreaOptions', params.results ? params.results.map(item => ({name: item[0], address: item[1]})) : [])]" :url="`/v1/components/${companySelectData}/data`" method="get" :data="[['']]" :style="{position: 'absolute', top: '32px', left: '32px'}">
      <Select class="company-select" :filterable="true" :clearable="true" :style="{width: '400px', height: '48px'}" v-model="craneStates.currentCompany">
        <img ref="search-icon" :style="{paddingTop: '2px', height: '22px', width: '22px', marginLeft: '12px'}" src="/zhyq/icon/search.svg" slot="prefix" />
        <Option v-for="(item, key) in craneStates.selectAreaOptions" :key="key" :value="item.name" :label="item.name">
          <div ref="option-box" :style="{display: 'flex'}">
            <div ref="index-column" class="index-column">
              {{(key + 1) + '.'}}
            </div>
            <div ref="name-address-box" :style="{display: 'flex', flexFlow: 'column', paddingTop: '16px', paddingRight: '12px', paddingBottom: '16px'}">
              <div ref="company-name" class="company-name">
                {{item.name}}
              </div>
              <div ref="company-address" class="company-address">
                <img ref="company-address-icon" class="company-address-icon" src="/zhyq/icon/map-marker.svg" />
                <span>
                  {{item.address}}
                </span>
              </div>
            </div>
          </div>
        </Option>
      </Select>
    </data-loader>
    <div ref="company-type-tab" :style="{display: 'flex', position: 'absolute', top: '32px', left: '1528px'}">
      <div @click="()=>[setState('currentCompanyTag', 'fireFighting'), setState('showState', false)]" :class="fireSelected" :style="{height: '48px', width: '180px', fontSize: '18px', lineHeight: '24px'}">
        <img src="/zhyq/icon/flamethrower.svg" />
        <span :style="{marginLeft: '4px'}">
          消防重点企业
        </span>
      </div>
      <div @click="()=>[setState('currentCompanyTag', 'dangerousChemical'), setState('showState', false)]" :class="dangerousSelected" :style="{height: '48px', width: '180px', fontSize: '18px', lineHeight: '24px'}">
        <img src="/zhyq/icon/skeleton.svg" />
        <span :style="{marginLeft: '4px'}">
          危化品企业
        </span>
      </div>
    </div>
    <div ref="enterprise-detail" v-show="craneStates.showState">
      <img ref="background" src="/gaoxinxiyuan/images/dialo-bg.png" :style="{width: 'calc(100% - 64px)', height: 'auto', position: 'absolute', top: '84px', left: '32px'}" />
      <img @click="()=>[setState('showState', !craneStates.showState)]" src="/gaoxinxiyuan/images/icon/times-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '48px'}" />
      <div :style="{width: '524px', height: '28px', color: '#fff', fontSize: '28px', lineHeight: '28px', fontWeight: '600', position: 'absolute', top: '130px', left: '88px'}" v-text="craneStates.currentCompany" />
      <data-loader ref="enterpriseData" v-slot="{ results: results }" url="/v1/components/0027dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data" :style="{width: '618px', height: '848px', border: '1px solid rgba(255, 255, 255, .1)', overflow: 'hidden', position: 'absolute', top: '204px', left: '32px'}" :params="{name: craneStates.currentCompany}">
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
      <img src="/gaoxinxiyuan/images/line.png" :style="{width: '19px', height: '120px', position: 'absolute', top: '865px', left: '752px'}" />
      <div :style="{position: 'absolute', top: '850px', left: '787px'}">
        <div v-for="(item, key) in craneStates.safetyOfficerData" :key="key" :style="{marginBottom: '32px'}">
          <data-loader v-slot="{ results: results }" :url="reqUrl(item.id)" :params="{name: craneStates.currentCompany}" :style="{display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: '400'}">
            <div v-text="item.type" :style="{width: '144px', marginRight: '16px', color: '#fa6400'}" />
            <div v-text="results && results[0][0]" :style="{width: '80px', color: '#fff'}" />
            <div :style="{width: '1px', height: '12px', backgroundColor: '#fff', margin: '0 12px'}" />
            <div v-text="results && results[0][1]" :style="{width: '180px', color: '#fff'}" />
          </data-loader>
        </div>
      </div>
      <data-loader v-slot="{ results: results }" url="/v1/components/0137dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data" :params="{name: craneStates.currentCompany}" :style="{width: '466px', height: '596px', overflowY: 'scroll', position: 'absolute', top: '204px', left: '732px'}">
        <image-view :imgs="results && results[0]" />
      </data-loader>
      <img src="/gaoxinxiyuan/images/icon/flamethrower-circle.svg" :style="{width: '24px', height: '24px', position: 'absolute', top: '132px', left: '1310px'}" />
      <div :style="{width: '498px', height: '26px', color: '#fff', fontSize: '26px', lineHeight: '26px', fontWeight: '400', position: 'absolute', top: '131px', left: '1350px'}">
        危化品平面位置摆放图（含应急出口）
      </div>
      <data-loader v-slot="{ results: results }" url="/v1/components/0177dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data" :params="{name: craneStates.currentCompany}" :style="{width: '466px', height: '596px', overflowY: 'scroll', position: 'absolute', top: '204px', left: '1350px'}">
        <image-view :imgs="results && results[0]" />
      </data-loader>
    </div>
  </div>
</template>

<script>
import BuiltInMixin from '../mixins/built_in'
import {
  DataLoader,
} from '@byzanteam/vis-components'
import {
  Select,
  Option,
} from 'view-design'
import {
  BaseMap,
  Regions,
  CustomMarker,
} from '@byzanteam/map-ui'

import ImageView from '../components/image-view'

import fireFightingGeoJson from '../../public/zhyq/geojson/fireFighting.json'
import dangerousChemicalGeoJson from '../../public/zhyq/geojson/dangerousChemical.json'
import gcoord from 'gcoord'

export const map = {
  mixins: [BuiltInMixin],

  components: {
    DataLoader,
    Select,
    Option,
    BaseMap,
    Regions,
    CustomMarker,
    ImageView
  },

  data () {
    return {
      fireFightingCompany: gcoord.transform(fireFightingGeoJson, gcoord.WGS84, gcoord.GCJ02),
      dangerousChemicalCompany: gcoord.transform(dangerousChemicalGeoJson, gcoord.WGS84, gcoord.GCJ02),
      craneStates: {
        dangerousChemicalAreaStyle: {strokeColor: '#Fa6400', fillColor: '#Fa64004D', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        dangerousChemicalHoverStyle: {strokeColor: '#Fa6400', fillColor: '#Fa640066', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        fireFightingAreaStyle: {strokeColor: '#Fa6400', fillColor: '#Fa64004D', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        fireFightingAreaHoverStyle: {strokeColor: '#Fa6400', fillColor: '#Fa640066', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        currentCompanyTag: 'fireFighting',
        selectedArea: {},
        fireFightingMarkers: [],
        dangerousChemicalMarkers: [],
        labelMarkerInitialed: true,
        leftLabelsConfig: {offset: [-2, 4], options: {anchor: 'middle-left'}},
        rightLabelsConfig: {offset: [-12, 4], options: {anchor: 'middle-left'}},
        mapOptions: {zoom: 14, zooms: [14, 17], center: [103.902752,30.768677]},
        fireFightingCompanyBuildingData: [],
        dangerousChemicalCompanyBuildingData: [],
        selectAreaOptions: [],
        currentCompany: '',
        showState: false,
        tableHeader: [{field: 'company_name', value: '企业名称'}, {field: 'registered_address', value: '注册地址'}, {field: 'actual_address', value: '实际地址'}, {field: 'industry', value: '行业领域'}, {field: 'main_business', value: '主营业务'}, {field: 'header_name', value: '单位负责人姓名'}, {field: 'header_phone', value: '单位负责人电话'}, {field: 'area', value: '场地总面积'}, {field: 'number', value: '从业人数（人）'}, {field: 'security_name', value: '安全负责人姓名'}, {field: 'sucurity_phone', value: '安全负责人电话'}],
        safetyOfficerData: [{id: '0047dd5e-d3ff-4c5f-9ab4-44d75afb40a1', type: '安全总负责人'}, {id: '0057dd5e-d3ff-4c5f-9ab4-44d75afb40a1', type: '安全第一负责人'}, {id: '0067dd5e-d3ff-4c5f-9ab4-44d75afb40a1', type: '安全第二负责人'}],
      },
    }
  },

  watch: {
    'craneStates.selectedArea' (value) {
      const [geojson] = value.toGeoJSON()
      this.craneStates.currentCompany = geojson.properties.name
      this.resizeMap(16, geojson.properties.coordinate)
    },
    'craneStates.currentCompany' (row) {
      if (this.craneStates.currentCompanyTag === 'dangerousChemical') {
        let point = _.find(this.craneStates.dangerousChemicalCompanyBuildingData, item => (item.name === row))
        if(point) {
          this.resizeMap(16, point.point)
        }
      }
      if (this.craneStates.currentCompanyTag === 'fireFighting') {
        let point = _.find(this.craneStates.fireFightingCompanyBuildingData, item => (item.name === row))
        if(point) {
          this.resizeMap(16, point.point)
        }
      }
    },
    'craneStates.currentCompanyTag'() {
      const { map } = this.$refs.map
      // 隐藏region
      const overlays = map.getAllOverlays()
      overlays.forEach(overlay => {
        overlay.hide()
      })
      this.craneStates.currentCompany = ''
    },
  },

  computed: {
    fireFightingMarkerShow() {
      return this.craneStates.currentCompanyTag === 'fireFighting'
    },
    dangerousChemicalMarkerShow() {
      return this.craneStates.currentCompanyTag === 'dangerousChemical'
    },
    fireSelected() {
      if(this.craneStates.currentCompanyTag === 'fireFighting') {
        return 'tab--active'
      }
      return 'tab--default'
    },
    dangerousSelected() {
      if(this.craneStates.currentCompanyTag === 'dangerousChemical') {
        return 'tab--active'
      }
      return 'tab--default'
    },
    reqUrl(id){
      return function(id){
        return `/v1/components/${id}/data`
      }
    },
    companySelectData() {
      if(this.craneStates.currentCompanyTag === 'fireFighting') {
        return '0017dd5e-d3ff-4c5f-9ab4-44d75afb40a1'
      }
      if(this.craneStates.currentCompanyTag === 'dangerousChemical') {
        return '0117dd5e-d3ff-4c5f-9ab4-44d75afb40a1'
      }
    }
  },

  created() {},

  methods: {
    resizeMap(zoom, center) {
      this.$refs.map.map.setZoomAndCenter(zoom, center)
    },

    markerMouseoutFunc(marker) {
      if(this.craneStates.currentCompany !== marker.target.getExtData().name){
        this.setMarkerZindex(marker, 100)
      }
    },

    markerMouseoverFunc(marker) {
      if(this.craneStates.currentCompany !== marker.target.getExtData().name){
        this.setMarkerZindex(marker, 300)
      }
    },

    setMarkerZindex(marker, zindex) {
      marker.target.setzIndex(zindex)
    },
  },
}
export default map
</script>
<style lang="scss">
</style>
