const companySelect = require('./company_select')
const map = require('./map')

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
      id: 'dangerousChemicalAreaStyle',
      value: {strokeColor: '#16c3c1', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'dangerousChemicalHoverStyle',
      value: {strokeColor: '#16c3c1', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'fireFightingAreaStyle',
      value: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'fireFightingAreaHoverStyle',
      value: {strokeColor: '#df2417', fillColor: '#32c5ff', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'currentBuilding',
      value: ''
    },
    {
      id: 'currentCompanyTag',
      value: 'fireFighting'
    },
    {
      id: 'selectedArea',
      value: null
    },
    {
      id: 'partyCoordinates',
      value: [
        {name: '百花潭公园', point: [104.028799, 30.657415], labelMarker: true},
        {name: '鹭岛国际社区', point: [104.012319, 30.644419], labelMarker: true},
        {name: '成都花园', point: [104.012319, 30.656529], labelMarker: true},
        {name: '肖家河', point: [104.045278, 30.631274], labelMarker: true},
        {name: '四川武侯中学', point: [104.010431, 30.603205], labelMarker: true},
        {name: '四川大学望江校区', point: [104.083044, 30.629797], labelMarker: true},
        {name: '万达广场', point: [103.999788, 30.620195], labelMarker: true},
        {name: '伊藤洋华堂', point: [104.022104, 30.645896], labelMarker: true},
      ]
    },
    {
      id: 'communityPartyCoordinates',
      value: [
        {name: '百花潭公园', point: [104.028799, 30.657415], labelMarker: true},
        {name: '鹭岛国际社区', point: [104.012319, 30.644419], labelMarker: true},
        {name: '成都花园', point: [104.012319, 30.656529], labelMarker: true},
        {name: '肖家河', point: [104.045278, 30.631274], labelMarker: true},
        {name: '四川武侯中学', point: [104.010431, 30.603205], labelMarker: true},
        {name: '四川大学望江校区', point: [104.083044, 30.629797], labelMarker: true},
        {name: '万达广场', point: [103.999788, 30.620195], labelMarker: true},
        {name: '伊藤洋华堂', point: [104.022104, 30.645896], labelMarker: true},
      ]
    },
    {
      id: 'leftComprehensiveLabels',
      value: ['百花潭公园', '鹭岛国际社区', '成都花园', '肖家河',]
    },
    {
      id: 'rightComprehensiveLabels',
      value: ['四川武侯中学', '四川大学望江校区', '万达广场', '伊藤洋华堂']
    },
    {
      id: 'leftCommunityLables',
      value: ['四川武侯中学', '四川大学望江校区', '万达广场', '伊藤洋华堂']
    },
    {
      id: 'rightCommunityLables',
      value: ['百花潭公园', '鹭岛国际社区', '成都花园', '肖家河',]
    },
    {
      id: 'fireFightingMarkers',
      value: []
    },
    {
      id: 'dangerousChemicalMarkers',
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
      value: "{zoom: 13, zooms: [12, 18], center: [103.882541, 30.820226]}"
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
    companySelect,
    map
  ]
}
