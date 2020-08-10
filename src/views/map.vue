<template>
  <div class="map">
    <div class="map-mask" :style="{position: 'absolute', top: '0px', left: '0px'}" />
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
        comprehensiveAreaStyle: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3},
        comprehensiveAreaHoverStyle: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3},
        currentBuilding: '',
        currentBuildingAddress: '',
        selectedArea: {},
        partyCoordinates: [{name: '新南商圈综合党委', point: [104.06346, 30.603481], labelMarker: true}, {name: '大鼎世纪楼宇综合党委', point: [104.075434, 30.602206], labelMarker: true}, {name: '中航城市楼宇综合党委', point: [104.063847, 30.593599], labelMarker: true}, {name: '特拉克斯楼宇综合党委', point: [104.075906, 30.593858], labelMarker: true}, {name: '中航国际楼宇综合党委', point: [104.064147, 30.585952], labelMarker: true}, {name: '银泰中心楼宇综合党委', point: [104.072902, 30.581888], labelMarker: true}, {name: '奥克斯-拉德方斯楼宇综合党委', point: [104.064147, 30.578895], labelMarker: true}, {name: '环球中心楼宇综合党委', point: [104.064319, 30.571727], labelMarker: true}, {name: '交子金融中心综合党委', point: [104.070971, 30.570545], labelMarker: true}, {name: '联治街区综合党委            （天府一、二街）', point: [104.062302, 30.555838], labelMarker: true}, {name: '会展片区楼宇综合党委', point: [104.074661, 30.555653], labelMarker: true}, {name: '联创街区综合党委（天府二、三街）', point: [104.063117, 30.549185], labelMarker: true}, {name: '联育街区综合党委（天府三、四街）', point: [104.063246, 30.544566], labelMarker: true}, {name: '联享街区综合党委（天府四、五街）', point: [104.062516, 30.538208], labelMarker: true}, {name: '软件园园区综合党委', point: [104.071614, 30.544713], labelMarker: true}, {name: '大源综合党委', point: [104.028141, 30.549481], labelMarker: true}],
        communityPartyCoordinates: [{name: '新南社区', point: [104.06646, 30.600481], labelMarker: true}, {name: '永安社区', point: [104.071906, 30.590858], labelMarker: true}, {name: '益州社区', point: [104.066147, 30.577095], labelMarker: true}, {name: '月牙湖社区', point: [104.068302, 30.553438], labelMarker: true}, {name: '吉泰社区', point: [104.068246, 30.540566], labelMarker: true}, {name: '昆华社区', point: [104.038541, 30.559481], labelMarker: true}, {name: '大源社区', point: [104.038641, 30.552481], labelMarker: true}, {name: '临江社区', point: [104.029941, 30.547481], labelMarker: true}, {name: '科创社区', point: [104.036941, 30.532481], labelMarker: true}, {name: '和平社区', point: [104.077434, 30.605206], labelMarker: true}, {name: '三瓦窑社区', point: [104.080974, 30.598906], labelMarker: true}, {name: '交子公园社区', point: [104.074902, 30.576688], labelMarker: true}, {name: '天华社区', point: [104.073614, 30.546713], labelMarker: true}],
        leftComprehensiveLabels: ['新南商圈综合党委', '中航城市楼宇综合党委', '中航国际楼宇综合党委', '奥克斯-拉德方斯楼宇综合党委', '环球中心楼宇综合党委', '联治街区综合党委            （天府一、二街）', '联创街区综合党委（天府二、三街）', '联育街区综合党委（天府三、四街）', '联享街区综合党委（天府四、五街）', '大源综合党委'],
        rightComprehensiveLabels: ['大鼎世纪楼宇综合党委', '特拉克斯楼宇综合党委', '银泰中心楼宇综合党委', '交子金融中心综合党委', '会展片区楼宇综合党委', '软件园园区综合党委'],
        leftCommunityLables: ['新南社区', '永安社区', '益州社区', '月牙湖社区', '吉泰社区', '昆华社区', '大源社区', '临江社区', '科创社区'],
        rightCommunityLables: ['和平社区', '三瓦窑社区', '交子公园社区', '天华社区'],
        fireFightingMarkers: [],
        dangerousChemicalMarkers: [],
        comprehensiveBuildingMarkerInitaled: false,
        communityBuildingMarkerInitaled: false,
        labelMarkerInitialed: true,
        leftLabelsConfig: {offset: [-2, 4], options: {anchor: 'middle-left'}},
        rightLabelsConfig: {offset: [-12, 4], options: {anchor: 'middle-left'}},
        mapOptions: '{mask: guixiGeojson.features[0].geometry.coordinates, zoom: 13, zooms: [12, 18], center: [104.07, 30.57]}',
        currentPartyItem: {},
        partyDetailData: '',
        communityPartyListData: '',
        minimize: false,
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
    this.requestFireFightingMarkers()
    this.requestCommunityMarkers()
  },

  methods: {
    requestFireFightingMarkers (){
      this.craneStates.leftComprehensiveLabels.concat(this.craneStates.rightComprehensiveLabels).forEach(party => {
        this.axios.get(`/v1/components/0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`)
          .then(({data: {data}}) => {
            if(data) {
              this.craneStates.fireFightingMarkers.push(
                ...data.map(item => (
                  {name: item[0], point: [item[1][1], item[1][0]], party: party, tag: 'fireFighting'}
                ))
              )
            }
          })
      })
    },
    requestCommunityMarkers () {
      this.craneStates.leftCommunityLables.concat(this.craneStates.rightCommunityLables).forEach(party => {
        this.axios.get(`/v1/components/0107dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`)
          .then(({data: {data}}) => {
            if(data) {
              this.craneStates.dangerousChemicalMarkers.push(
                ...data.map(item => (
                  {name: item[0], point: [item[1][1], item[1][0]], party: party, tag: 'dangerousChemical'}
                ))
              )
            }
          })
      })
    },
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
