const companySelect = require('./company_select')

module.exports = {
  route: {
    name: 'map',
    path: ''
  },
  title: '高新西园智慧园区',
  states: [
    {
      id: 'tabNavs',
      value: 'TAB_NAVS'
    },
    {
      id: 'tabCurrent',
      value: 'all'
    },
    {
      id: 'partyListData',
      value: ''
    },
    {
      id: 'currentParty',
      value: '',
    },
    {
      id: 'currentPartyIntro',
      value: '',
    },
    {
      id: 'departmentSelected',
      value: false,
    },
    {
      id: 'showDetail',
      value: false,
    },
    {
      id: 'maskStyle',
      value: {strokeColor: 'transparent', strokeWeight: 1, fillColor: '#333333', fillOpacity: 0.2}
    },
    {
      id: 'outlineAreaStyle',
      value: {strokeColor: '#00b1ff', fillColor: 'transparent', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'outlineAreaHoverStyle',
      value: {strokeColor: '#00b1ff', fillColor: 'transparent', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'communityAreaStyle',
      value: {strokeColor: '#16c3c1', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'communityAreaHoverStyle',
      value: {strokeColor: '#16c3c1', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'comprehensiveAreaStyle',
      value: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'comprehensiveAreaHoverStyle',
      value: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'currentBuilding',
      value: ''
    },
    {
      id: 'currentPartyTag',
      value: 'all'
    },
    {
      id: 'currentPartyRequestTag',
      value: ''
    },
    {
      id: 'currentBuildingAddress',
      value: ''
    },
    {
      id: 'selectedArea',
      value: null
    },
    {
      id: 'partyCoordinates',
      value: [
        {name: '新南商圈综合党委', point: [104.06346, 30.603481], labelMarker: true},
        {name: '大鼎世纪楼宇综合党委', point: [104.075434, 30.602206], labelMarker: true},
        {name: '中航城市楼宇综合党委', point: [104.063847, 30.593599], labelMarker: true},
        {name: '特拉克斯楼宇综合党委', point: [104.075906, 30.593858], labelMarker: true},
        {name: '中航国际楼宇综合党委', point: [104.064147, 30.585952], labelMarker: true},
        {name: '银泰中心楼宇综合党委', point: [104.072902, 30.581888], labelMarker: true},
        {name: '奥克斯-拉德方斯楼宇综合党委', point: [104.064147, 30.578895], labelMarker: true},
        {name: '环球中心楼宇综合党委', point: [104.064319, 30.571727], labelMarker: true},
        {name: '交子金融中心综合党委', point: [104.070971, 30.570545], labelMarker: true},
        {name: '联治街区综合党委            （天府一、二街）', point: [104.062302, 30.555838], labelMarker: true},
        {name: '会展片区楼宇综合党委', point: [104.074661, 30.555653], labelMarker: true},
        {name: '联创街区综合党委（天府二、三街）', point: [104.063117, 30.549185], labelMarker: true},
        {name: '联育街区综合党委（天府三、四街）', point: [104.063246, 30.544566], labelMarker: true},
        {name: '联享街区综合党委（天府四、五街）', point: [104.062516, 30.538208], labelMarker: true},
        {name: '软件园园区综合党委', point: [104.071614, 30.544713], labelMarker: true},
        {name: '大源综合党委', point: [104.028141, 30.549481], labelMarker: true},
      ]
    },
    {
      id: 'communityPartyCoordinates',
      value: [
        {name: '新南社区', point: [104.06646, 30.600481], labelMarker: true},
        {name: '永安社区', point: [104.071906, 30.590858], labelMarker: true},
        {name: '益州社区', point: [104.066147, 30.577095], labelMarker: true},
        {name: '月牙湖社区', point: [104.068302, 30.553438], labelMarker: true},
        {name: '吉泰社区', point: [104.068246, 30.540566], labelMarker: true},
        {name: '昆华社区', point: [104.038541, 30.559481], labelMarker: true},
        {name: '大源社区', point: [104.038641, 30.552481], labelMarker: true},
        {name: '临江社区', point: [104.029941, 30.547481], labelMarker: true},
        {name: '科创社区', point: [104.036941, 30.532481], labelMarker: true},
        {name: '和平社区', point: [104.077434, 30.605206], labelMarker: true},
        {name: '三瓦窑社区', point: [104.080974, 30.598906], labelMarker: true},
        {name: '交子公园社区', point: [104.074902, 30.576688], labelMarker: true},
        {name: '天华社区', point: [104.073614, 30.546713], labelMarker: true}
      ]
    },
    {
      id: 'leftComprehensiveLabels',
      value: ['新南商圈综合党委', '中航城市楼宇综合党委', '中航国际楼宇综合党委', '奥克斯-拉德方斯楼宇综合党委', '环球中心楼宇综合党委', '联治街区综合党委            （天府一、二街）', '联创街区综合党委（天府二、三街）', '联育街区综合党委（天府三、四街）', '联享街区综合党委（天府四、五街）', '大源综合党委']
    },
    {
      id: 'rightComprehensiveLabels',
      value: ['大鼎世纪楼宇综合党委', '特拉克斯楼宇综合党委', '银泰中心楼宇综合党委', '交子金融中心综合党委', '会展片区楼宇综合党委', '软件园园区综合党委']
    },
    {
      id: 'leftCommunityLables',
      value: ['新南社区', '永安社区', '益州社区', '月牙湖社区', '吉泰社区', '昆华社区', '大源社区', '临江社区', '科创社区']
    },
    {
      id: 'rightCommunityLables',
      value: ['和平社区', '三瓦窑社区', '交子公园社区', '天华社区']
    },
    {
      id: 'comprehensiveBuildingMarkers',
      value: []
    },
    {
      id: 'communityBuildingMarkers',
      value: []
    },
    {
      id: 'comprehensiveBuildingMarkerInitaled',
      value: false
    },
    {
      id: 'communityBuildingMarkerInitaled',
      value: false
    },
    {
      id: 'labelMarkerInitialed',
      value: true,
    },
    {
      id: 'leftLabelsConfig',
      value: {
        offset: [-2, 4],
        options: {anchor: 'middle-left'}
      },
    },
    {
      id: 'rightLabelsConfig',
      value: {
        offset: [-12, 4],
        options: {anchor: 'middle-left'}
      },
    },
    {
      id: 'mapOptions',
      value: "{mask: guixiGeojson.features[0].geometry.coordinates, zoom: 13, zooms: [12, 18], center: [104.07, 30.57]}"
    },
    {
      id: 'currentPartyItem',
      value: {}
    },
    {
      id: 'partyDetailData',
      value: ''
    },
    {
      id: 'communityPartyListData',
      value: ''
    },
    {
      id: 'minimize',
      value: false
    }
  ],
  components: [
    {
      component: 'div',
      position: [0, 0],
      props: {
        class: 'map-mask'
      }
    },
    companySelect
  ]
}
