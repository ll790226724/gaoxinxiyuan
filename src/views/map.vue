<template>
  <div class="map">
    <data-loader :style="{transform: `scale(${1/getMapScale()})`, width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px'}">
      <base-map ref="map" :mapOptions="craneStates.mapOptions" :satellite="true">
        <div v-if="craneStates.currentCompanyTag === 'fireFighting'">
          <regions ref="fireFightingRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('showDetail', true)]" :areas="fireFightingCompany.features" :areaStyle="craneStates.fireFightingAreaStyle" :areaHoverStyle="craneStates.fireFightingAreaHoverStyle" />
        </div>
        <div v-if="craneStates.currentCompanyTag === 'dangerousChemical'">
          <regions ref="dangerousChemicalRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('showDetail', true)]" :areas="dangerousChemicalCompany.features" :areaStyle="craneStates.dangerousChemicalAreaStyle" :areaHoverStyle="craneStates.dangerousChemicalHoverStyle" />
        </div>
        <data-loader @requestDone="(param)=>[setState('fireFightingCompanyBuildingData', param.results ? param.results.map(item => ({name: item[0], point: [item[1][1], item[1][0]], labelMarker: true, })) : [])]" v-if="fireFightingMarkerShow" :url="`/v1/components/0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`" method="get" :data="[['']]">
          <custom-marker ref="fireFightingBuildingMarker" v-for="(marker, index) in craneStates.fireFightingCompanyBuildingData" :key="index + marker.point[0] + marker.point[1] + marker.tag + marker.name" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentCompany', marker.target.getExtData().name), setState('showDetail', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" :offset="craneStates.leftLabelsConfig.offset" :anchor="craneStates.leftLabelsConfig.options.anchor" :content="`<div style='display: flex; align-items: center;'><img style='height: 10px;' src='https://slp-qiniu-beta.skylarkly.com/Fj3dfxguTdyghUKmWIHSMsVDpBiY'/><div class='label-marker'>${marker.name}</div></div>`" />
        </data-loader>
        <data-loader @requestDone="(param)=>[setState('dangerousChemicalCompanyBuildingData', param.results ? param.results.map(item => ({name: item[0], point: [item[1][1], item[1][0]], labelMarker: true, })) : [])]" v-if="dangerousChemicalMarkerShow" :url="`/v1/components/0107dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`" method="get" :data="[['']]">
          <custom-marker ref="dangerousChemicalBuildingMarker" v-for="(marker, index) in craneStates.dangerousChemicalCompanyBuildingData" :key="marker.point[0] + marker.point[1] + marker.tag + marker.name + index" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentCompany', marker.target.getExtData().name), setState('showDetail', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" :offset="craneStates.leftLabelsConfig.offset" :anchor="craneStates.leftLabelsConfig.options.anchor" :content="`<div style='display: flex; align-items: center;'><img style='height: 10px;' src='https://slp-qiniu-beta.skylarkly.com/Fj3dfxguTdyghUKmWIHSMsVDpBiY'/><div class='label-marker'>${marker.name}</div></div>`" />
        </data-loader>
      </base-map>
    </data-loader>
    <data-loader ref="company_select" @requestDone="(params)=>[setState('selectAreaOptions', params.results ? params.results.map(item => ({name: item[0], address: item[1]})) : [])]" :url="`/v1/components/0017dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`" method="get" :data="[['']]" :style="{position: 'absolute', top: '32px', left: '32px'}">
      <Select class="company-select" :filterable="true" :clearable="true" prefix="ios-search" :style="{width: '400px', height: '48px'}" v-model="craneStates.currentCompany">
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
      <div @click="()=>[setState('currentCompanyTag', 'fireFighting')]" :class="fireSelected" :style="{height: '48px', width: '180px', fontSize: '18px', lineHeight: '24px'}">
        <img src="/zhyq/icon/flamethrower-circle.svg" />
        <span>
          消防重点企业
        </span>
      </div>
      <div @click="()=>[setState('currentCompanyTag', 'dangerousChemical')]" :class="dangerousSelected" :style="{height: '48px', width: '180px', fontSize: '18px', lineHeight: '24px'}">
        <img src="/zhyq/icon/skeleton.svg" />
        <span>
          危化品企业
        </span>
      </div>
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

import fireFightingGeoJson from '../../public/zhyq/geojson/fireFighting.json'
import dangerousChemicalGeoJson from '../../public/zhyq/geojson/dangerousChemical.json'
import gcoord from 'gcoord'
import { transform, WGS84, GCJ02 } from 'gcoord'

export const map = {
  mixins: [BuiltInMixin],

  components: {
    DataLoader,
    Select,
    Option,
    BaseMap,
    Regions,
    CustomMarker,
  },

  data () {
    return {
      fireFightingCompany: gcoord.transform(fireFightingGeoJson, gcoord.WGS84, gcoord.GCJ02),
      dangerousChemicalCompany: gcoord.transform(dangerousChemicalGeoJson, gcoord.WGS84, gcoord.GCJ02),
      craneStates: {
        tabNavs: 'TAB_NAVS',
        tabCurrent: 'all',
        showDetail: false,
        dangerousChemicalAreaStyle: {strokeColor: '#Fa6400', fillColor: '#Fa64004D', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        dangerousChemicalHoverStyle: {strokeColor: '#Fa6400', fillColor: '#Fa640066', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        fireFightingAreaStyle: {strokeColor: '#Fa6400', fillColor: '#Fa64004D', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        fireFightingAreaHoverStyle: {strokeColor: '#Fa6400', fillColor: '#Fa640066', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        currentCompanyTag: 'fireFighting',
        selectedArea: {},
        leftComprehensiveLabels: ['百花潭公园', '鹭岛国际社区', '成都花园', '肖家河'],
        rightComprehensiveLabels: ['四川武侯中学', '四川大学望江校区', '万达广场', '伊藤洋华堂'],
        fireFightingMarkers: [],
        dangerousChemicalMarkers: [],
        labelMarkerInitialed: true,
        leftLabelsConfig: {offset: [-2, 4], options: {anchor: 'middle-left'}},
        rightLabelsConfig: {offset: [-12, 4], options: {anchor: 'middle-left'}},
        mapOptions: {zoom: 16, zooms: [16, 18], center: [103.902752,30.768677]},
        fireFightingCompanyBuildingData: [],
        dangerousChemicalCompanyBuildingData: [],
        selectAreaOptions: [],
        currentCompany: ''
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
        if(!point) {
          this.resizeMap(16, this.craneStates.mapOptions.center)
        } else {
          this.resizeMap(16, point.point)
        }
      }
      if (this.craneStates.currentCompanyTag === 'fireFighting') {
        let point = _.find(this.craneStates.fireFightingCompanyBuildingData, item => (item.name === row))
        if(!point) {
          this.resizeMap(16, this.craneStates.mapOptions.center)
        } else {
          this.resizeMap(16, point.point)
        }
      }
    },
    'craneStates.currentCompanyTag'(value) {
      this.$nextTick(() => {
        console.log('里', this.$refs)
      })
      const { map } = this.$refs.map
      // 隐藏region
      const overlays = map.getAllOverlays()
      overlays.forEach(overlay => {
        overlay.hide()
      })

      if(value === 'fireFighting') {
        this.$nextTick(() => {
          // const {
          //   communityRegions = [],
          //   communityBuildingMarker = [],
          // } = this.$refs
          // console.log(this.$refs)
          // communityRegions.geoJSONAreas.forEach(region => {
          //   region.shape.show();
          // })
          // communityPartyFlagMarker.concat(communityPartylabelMarker, communityBuildingMarker).forEach(marker => {
          //   marker.instance.show()
          // })
        })
      }
    },
    'labelMarkerRequestUrl'(value) {
      console.log(value)
      console.log('外', this.$refs)
      this.$nextTick(() => {
        console.log('里', this.$refs)
      })
    }
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
    }
  },

  created() {},

  methods: {
    mapResizeFunc () {
      const { map } = this.$refs.map
      const zoom = map.getZoom()
      const markers = map.getAllOverlays('marker')
      if(this.mapZoom === zoom) return
      this.mapZoom = zoom
      const {
        partyFlagMarker,
        labelMarker
      } = this.$refs

      if (zoom >=16) {
        this.hideMarkers(markers, this.craneStates.tabCurrent)
      } else {
        markers.forEach(marker => {
          const exdata = marker.getExtData()
          if(!exdata.labelMarker) {
            marker.hide()
          }
        })
        labelMarker.concat(partyFlagMarker).forEach(marker => {
          marker.instance.show()
        })
      }
    },

    hideMarkers(markers, tab) {
      markers.forEach(marker => {
        marker.hide()
      })
    },

    resizeMap(zoom, center) {
      this.$refs.map.map.setZoomAndCenter(zoom, center)
    },

    markerRenderFunc(marker) {
      if (this.$refs.map.map.getZoom() >=16) {
        this.$refs.map.map.remove(marker);
      }
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
