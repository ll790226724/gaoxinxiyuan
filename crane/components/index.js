const companySelect = require('./company_select')
const map = require('./map')
const typeTab = require('./company_type_tab')
const enterprise = require('./enterprise')
const rescueSituation = require('./rescue-situation')
const hazardousChemicals = require('./hazardous-chemicals')

module.exports = {
  route: {
    name: 'map',
    path: ''
  },
  title: '高新西园智慧园区',
  states: [
    {
      id: 'dangerousChemicalAreaStyle',
      value: {strokeColor: '#Fa6400', fillColor: '#Fa64004D', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'dangerousChemicalHoverStyle',
      value: {strokeColor: '#Fa6400', fillColor: '#Fa640066', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'fireFightingAreaStyle',
      value: {strokeColor: '#Fa6400', fillColor: '#Fa64004D', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3}
    },
    {
      id: 'fireFightingAreaHoverStyle',
      value: {strokeColor: '#Fa6400', fillColor: '#Fa640066', strokeStyle: 'dashed', fillOpacity: 0.2, strokeWeight: 3}
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
      value: "{zoom: 14, zooms: [14, 17], center: [103.902752,30.768677]}"
    },
    {
      id: 'fireFightingCompanyBuildingData',
      value: ''
    },
    {
      id: 'dangerousChemicalCompanyBuildingData',
      value: []
    },
    {
      id: 'selectAreaOptions',
      value: []
    },
    {
      id: 'currentCompany',
      value: ''
    },
    {
      id: 'showState',
      value: true,
    },
    {
      id: 'currentCompany',
      value: '成都中光电科技有限公司',
    },
    {
      id: 'selectCompany',
      value: '',
    },
    {
      id: 'tableHeader',
      value: [
        {
          "field": "company_name",
          "value": "企业名称",
        },
        {
          "field": "registered_address",
          "value": "注册地址",
        },
        {
          "field": "actual_address",
          "value": "实际地址",
        },
        {
          "field": "industry",
          "value": "行业领域",
        },
        {
          "field": "main_business",
          "value": "主营业务",
        },
        {
          "field": "header_name",
          "value": "单位负责人姓名",
        },
        {
          "field": "header_phone",
          "value": "单位负责人电话",
        },
        {
          "field": "area",
          "value": "场地总面积",
        },
        {
          "field": "number",
          "value": "从业人数（人）",
        },
        {
          "field": "security_name",
          "value": "安全负责人姓名",
        },
        {
          "field": "sucurity_phone",
          "value": "安全负责人电话",
        },
        {
          "field": "legal_name",
          "value": "法定代表人姓名",
        },
        {
          "field": "legal_phone",
          "value": "法定代表人电话",
        },
        {
          "field": "commercial_building",
          "value": "是否位于商务商业楼宇",
        },
        {
          "field": "fuel_gas",
          "value": "是否涉及使用燃气",
        },
        {
          "field": "gauge",
          "value": "是否为规上企业",
        },
        {
          "field": "hazardous_chemicals",
          "value": "是否涉及危险化学品",
        },
        {
          "field": "enterprise_classification",
          "value": "危化品企业分类",
        },
        {
          "field": "species",
          "value": "危化品种类",
        },
      ]
    },
    {
      id: 'safetyOfficerData',
      value: [
        {
          id: '0047dd5e-d3ff-4c5f-9ab4-44d75afb40a1',
          type: '安全总负责人',
        },
        {
          id: '0057dd5e-d3ff-4c5f-9ab4-44d75afb40a1',
          type: '安全第一负责人',
        },
        {
          id: '0067dd5e-d3ff-4c5f-9ab4-44d75afb40a1',
          type: '安全第二负责人',
        },
      ]
    },
  ],
  components: [
    map,
    companySelect,
    typeTab,
    {
      id: 'enterprise-detail',
      component: 'div',
      directive: {
        show: 'craneStates.showState',
      },
      children: [
        {
          id: 'background',
          component: 'img',
          position: [32, 84],
          props: {
            src: '/zhyq/images/dialo-bg.png',
            $style: {
              width: 'calc(100% - 64px)',
              height: 'auto',
            }
          },
        },
        ...enterprise,
        ...rescueSituation,
        ...hazardousChemicals,
      ]
    },
  ]
}
