<template>
  <div class="map">
    <data-loader @requestDone="(param)=>[setState('companyBuildingData', param.results ? param.results.map(i => ({name: i[0], point: i[1], labelMarker: true})) : [])]" :style="{transform: `scale(${1/getMapScale()})`, width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px'}" :url="`/v1/components/${craneStates.currentCompanyTag === 'fireFighting' ? '0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1' : '0107dd5e-d3ff-4c5f-9ab4-44d75afb40a1'}/data`" method="get" :data="[['']]">
      <base-map ref="map" :mapOptions="craneStates.mapOptions" :satellite="true">
        <div v-if="craneStates.currentCompanyTag !== 'dangerousChemical'">
          <data-loader v-slot="{ results: results }" :url="`/v1/components/0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`" method="get" :data="[['']]" />
          <regions ref="fireFightingRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('currentCompanyTag', 'fireFighting'), setState('showDetail', true)]" :areas="fireFightingCompany.features" :areaStyle="craneStates.fireFightingAreaStyle" :areaHoverStyle="craneStates.fireFightingHoverStyle" />
        </div>
        <div v-if="craneStates.currentCompanyTag !== 'fireFighting'">
          <regions ref="fireFightingRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('currentCompanyTag', 'dangerousChemical'), setState('showDetail', true)]" :areas="dangerousChemicalCompany.features" :areaStyle="craneStates.dangerousChemicalAreaStyle" :areaHoverStyle="craneStates.dangerousChemicalHoverStyle" />
        </div>
        <div v-if="fireFightingMarkerShow">
          <custom-marker ref="fireFightingBuildingMarker" v-for="(marker, index) in craneStates.companyBuildingData" :key="index + marker.point[0] + marker.point[1] + marker.tag + marker.name" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentBuilding', marker.target.getExtData().name), setState('currentCompanyTag', marker.target.getExtData().tag), setState('currentParty', marker.target.getExtData().party), setState('departmentSelected', false), setState('showDetail', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" anchor="bottom-center" :zIndex="craneStates.currentBuilding === marker.name ? 300 : 100" :content="`<div style='display: flex; align-items: center; flex-direction: column; justify-content: center;'><div class='building-marker-label ${ craneStates.currentBuilding === marker.name ? 'selected' : ''}'>${marker.name ? marker.name : '未命名'}</div><img style='height: 32px; width: 32px;' src='https://slp-qiniu-beta.skylarkly.com/FhA38Er8OX2N384utu196Dph1mru'/></div>`" />
        </div>
        <div v-if="dangerousChemicalMarkerShow">
          <custom-marker ref="dangerousChemicalBuildingMarker" v-for="(marker, index) in craneStates.companyBuildingData" :key="marker.point[0] + marker.point[1] + marker.tag + marker.name + index" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentBuilding', marker.target.getExtData().name), setState('currentCompanyTag', marker.target.getExtData().tag), setState('currentParty', marker.target.getExtData().name === '天华社区' ? `中共成都高新技术产业开发区桂溪街道${marker.target.getExtData().party}第一支部委员会` : `中共成都高新技术产业开发区桂溪街道${marker.target.getExtData().party}委员会`), setState('departmentSelected', false), setState('showDetail', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" anchor="bottom-center" :zIndex="craneStates.currentBuilding === marker.name ? 300 : 100" :content="`<div style='display: flex; align-items: center; flex-direction: column; justify-content: center;'><div class='building-marker-label ${ craneStates.currentBuilding === marker.name ? 'selected' : ''}'>${marker.name ? marker.name : '未命名'}</div><img style='height: 32px; width: 32px;' src='https://slp-qiniu-beta.skylarkly.com/FmOXOMD2Kzjaoqu1t_dgKjfHNmwB'/></div>`" />
        </div>
      </base-map>
    </data-loader>
    <data-loader ref="company_select" :style="{position: 'absolute', top: '32px', left: '32px'}">
      {{craneStates.companyBuildingData}}
      <Select class="company-select" :filterable="true" :clearable="true" prefix="ios-search" :style="{width: '400px', height: '48px'}" v-model="craneStates.currentDepartment">
        <Option v-for="(item, key) in craneStates.selectOptions" :key="key" :value="item.index" :label="item.name">
          {{item.name}}
        </Option>
      </Select>
    </data-loader>
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
import dangerousChemicalGeoJson from '../../public/zhyq/geojson/fireFighting.json'
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
        partyListData: '',
        currentParty: '',
        currentPartyIntro: '',
        departmentSelected: false,
        showDetail: false,
        maskStyle: {strokeColor: 'transparent', strokeWeight: 1, fillColor: '#333333', fillOpacity: 0.2},
        outlineAreaStyle: {strokeColor: '#00b1ff', fillColor: 'transparent', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3},
        outlineAreaHoverStyle: {strokeColor: '#00b1ff', fillColor: 'transparent', fillOpacity: 0.2, strokeWeight: 3},
        dangerousChemicalAreaStyle: {strokeColor: '#16c3c1', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3},
        dangerousChemicalHoverStyle: {strokeColor: '#16c3c1', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3},
        fireFightingAreaStyle: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3},
        fireFightingAreaHoverStyle: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3},
        currentBuilding: '',
        currentCompanyTag: 'fireFighting',
        selectedArea: {},
        partyCoordinates: [{name: '百花潭公园', point: [104.028799, 30.657415], labelMarker: true}, {name: '鹭岛国际社区', point: [104.012319, 30.644419], labelMarker: true}, {name: '成都花园', point: [104.012319, 30.656529], labelMarker: true}, {name: '肖家河', point: [104.045278, 30.631274], labelMarker: true}, {name: '四川武侯中学', point: [104.010431, 30.603205], labelMarker: true}, {name: '四川大学望江校区', point: [104.083044, 30.629797], labelMarker: true}, {name: '万达广场', point: [103.999788, 30.620195], labelMarker: true}, {name: '伊藤洋华堂', point: [104.022104, 30.645896], labelMarker: true}],
        communityPartyCoordinates: [{name: '百花潭公园', point: [104.028799, 30.657415], labelMarker: true}, {name: '鹭岛国际社区', point: [104.012319, 30.644419], labelMarker: true}, {name: '成都花园', point: [104.012319, 30.656529], labelMarker: true}, {name: '肖家河', point: [104.045278, 30.631274], labelMarker: true}, {name: '四川武侯中学', point: [104.010431, 30.603205], labelMarker: true}, {name: '四川大学望江校区', point: [104.083044, 30.629797], labelMarker: true}, {name: '万达广场', point: [103.999788, 30.620195], labelMarker: true}, {name: '伊藤洋华堂', point: [104.022104, 30.645896], labelMarker: true}],
        leftComprehensiveLabels: ['百花潭公园', '鹭岛国际社区', '成都花园', '肖家河'],
        rightComprehensiveLabels: ['四川武侯中学', '四川大学望江校区', '万达广场', '伊藤洋华堂'],
        leftCommunityLables: ['四川武侯中学', '四川大学望江校区', '万达广场', '伊藤洋华堂'],
        rightCommunityLables: ['百花潭公园', '鹭岛国际社区', '成都花园', '肖家河'],
        fireFightingMarkers: [],
        dangerousChemicalMarkers: [],
        comprehensiveBuildingMarkerInitaled: false,
        communityBuildingMarkerInitaled: false,
        labelMarkerInitialed: true,
        leftLabelsConfig: {offset: [-2, 4], options: {anchor: 'middle-left'}},
        rightLabelsConfig: {offset: [-12, 4], options: {anchor: 'middle-left'}},
        mapOptions: {zoom: 14, zooms: [12, 18], center: [103.882541, 30.820226]},
        currentPartyItem: {},
        partyDetailData: '',
        communityPartyListData: '',
        minimize: false,
        companyBuildingData: []
      },
    }
  },

  computed: {
    fireFightingMarkerShow() {
      return this.craneStates.currentCompanyTag !== 'fireFighting'
    },
    dangerousChemicalMarkerShow() {
      return this.craneStates.currentCompanyTag !== 'dangerousChemical'
    }
  },

  created() {
    // this.requestFireFightingMarkers()
    // this.requestCommunityMarkers()
  },

  methods: {
    // requestFireFightingMarkers (){
    //   this.craneStates.leftComprehensiveLabels.concat(this.craneStates.rightComprehensiveLabels).forEach(party => {
    //     this.axios.get(`/v1/components/0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`)
    //       .then(({data: {data}}) => {
    //         if(data) {
    //           this.craneStates.fireFightingMarkers.push(
    //             ...data.map(item => (
    //               {name: item[0], point: [item[1][1], item[1][0]], party: party, tag: 'fireFighting'}
    //             ))
    //           )
    //         }
    //       })
    //   })
    // },
    // requestCommunityMarkers () {
    //   this.craneStates.leftCommunityLables.concat(this.craneStates.rightCommunityLables).forEach(party => {
    //     this.axios.get(`/v1/components/0107dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`)
    //       .then(({data: {data}}) => {
    //         if(data) {
    //           this.craneStates.dangerousChemicalMarkers.push(
    //             ...data.map(item => (
    //               {name: item[0], point: [item[1][1], item[1][0]], party: party, tag: 'dangerousChemical'}
    //             ))
    //           )
    //         }
    //       })
    //   })
    // },
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
      if(this.craneStates.currentBuilding !== marker.target.getExtData().name){
        this.setMarkerZindex(marker, 100)
      }
    },

    markerMouseoverFunc(marker) {
      if(this.craneStates.currentBuilding !== marker.target.getExtData().name){
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
