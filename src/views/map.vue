<template>
  <div class="map">
    <data-loader @requestDone="(param)=>[setState('companyBuildingData', param.results ? param.results.map(item => ({name: item[0], point: [item[1][1], item[1][0]], labelMarker: true, })) : [])]" :style="{transform: `scale(${1/getMapScale()})`, width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px'}" :url="`/v1/components/${labelMarkerRequestUrl}/data`" method="get" :data="[['']]">
      <base-map ref="map" :mapOptions="craneStates.mapOptions" :satellite="true">
        <div v-if="craneStates.currentCompanyTag === 'fireFighting'">
          <regions ref="fireFightingRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('showDetail', true), getName(geoJSON, area)]" :areas="fireFightingCompany.features" :areaStyle="craneStates.fireFightingAreaStyle" :areaHoverStyle="craneStates.fireFightingAreaHoverStyle" />
        </div>
        <div v-if="craneStates.currentCompanyTag === 'dangerousChemical'">
          <regions ref="fireFightingRegions" @area-clicked="(geoJSON, area)=>[setState('selectedArea', area), setState('showDetail', true)]" :areas="dangerousChemicalCompany.features" :areaStyle="craneStates.dangerousChemicalAreaStyle" :areaHoverStyle="craneStates.dangerousChemicalHoverStyle" />
        </div>
        <div v-if="fireFightingMarkerShow">
          <custom-marker ref="fireFightingBuildingMarker" v-for="(marker, index) in craneStates.companyBuildingData" :key="index + marker.point[0] + marker.point[1] + marker.tag + marker.name" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentBuilding', marker.target.getExtData().name), setState('showDetail', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" :offset="craneStates.leftLabelsConfig.offset" :anchor="craneStates.leftLabelsConfig.options.anchor" :content="`<div style='display: flex; align-items: center;'><img style='height: 10px;' src='https://slp-qiniu-beta.skylarkly.com/Fj3dfxguTdyghUKmWIHSMsVDpBiY'/><div class='label-marker'>${marker.name}</div></div>`" />
        </div>
        <div v-if="dangerousChemicalMarkerShow">
          <custom-marker ref="dangerousChemicalBuildingMarker" v-for="(marker, index) in craneStates.companyBuildingData" :key="marker.point[0] + marker.point[1] + marker.tag + marker.name + index" @marker-clicked="(marker)=>[setMarkerZindex(marker, 200), setState('currentBuilding', marker.target.getExtData().name), setState('showDetail', true)]" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-mouseout="(marker)=>[markerMouseoutFunc(marker)]" :marker="marker" :offset="craneStates.leftLabelsConfig.offset" :anchor="craneStates.leftLabelsConfig.options.anchor" :content="`<div style='display: flex; align-items: center;'><img style='height: 10px;' src='https://slp-qiniu-beta.skylarkly.com/Fj3dfxguTdyghUKmWIHSMsVDpBiY'/><div class='label-marker'>${marker.name}</div></div>`" />
        </div>
      </base-map>
    </data-loader>
    <data-loader ref="company_select" :style="{position: 'absolute', top: '32px', left: '32px'}">
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
        companyBuildingData: [],
      },
    }
  },

  computed: {
    fireFightingMarkerShow() {
      return this.craneStates.currentCompanyTag !== 'fireFighting'
    },
    dangerousChemicalMarkerShow() {
      return this.craneStates.currentCompanyTag !== 'dangerousChemical'
    },
    labelMarkerRequestUrl() {
      if(this.craneStates.currentCompanyTag === 'fireFighting') {
        return '0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1'
      } else if(this.craneStates.currentCompanyTag === 'dangerousChemical') {
        return '0107dd5e-d3ff-4c5f-9ab4-44d75afb40a1'
      }
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
    getName(geoJSON, area) {
      console.log(geoJSON)
      console.log(area)
    }
  },
}
export default map
</script>
