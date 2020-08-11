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
      id: 'showDetail',
      value: false,
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
      id: 'currentCompanyTag',
      value: 'fireFighting'
    },
    {
      id: 'selectedArea',
      value: null
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
      id: 'fireFightingMarkers',
      value: []
    },
    {
      id: 'dangerousChemicalMarkers',
      value: []
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
      value: "{zoom: 16, zooms: [16, 18], center: [103.902752,30.768677]}"
    },
    {
      id: 'companyBuildingData',
      value: []
    }
  ],
  components: [
    map,
    companySelect,
  ]
}
