module.exports = {
  component: '@byzanteam/vis-components/data-loader',
  position: [0, 0],
  props: {
    $style: {
      $transform: "`scale(${1/getMapScale()})`",
      width: "100%",
      height: "100%"
    },
  },
  children: [
    {
      component: '@byzanteam/map-ui/base-map',
      id: 'map',
      props: {
        $mapOptions: "craneStates.mapOptions",
        $satellite: true,
      },
      children: [
        // 显示消防重点的企业regions
        {
          component: 'div',
          props: {
            'v-if': "craneStates.currentCompanyTag === 'fireFighting'"
          },
          children: [
            {
              id: "fireFightingRegions",
              component: '@byzanteam/map-ui/regions',
              props: {
                $areas: "fireFightingCompany.features",
                $areaStyle: "craneStates.fireFightingAreaStyle",
                $areaHoverStyle: "craneStates.fireFightingAreaHoverStyle"
              },
              events: {
                'area-clicked': {
                  params: ["geoJSON", "area"],
                  // 1. 被选中的区域 2. 为了tab切换设置的Tag 3. 选中显示公司详情
                  actions: ["setState('selectedArea', area)",  "setState('showState', true)"],
                }
              }
            },
          ]
        },
        // 显示危化品企业regions
        {
          component: 'div',
          props: {
            'v-if': "craneStates.currentCompanyTag === 'dangerousChemical'"
          },
          children: [
            {
              id: "dangerousChemicalRegions",
              component: '@byzanteam/map-ui/regions',
              props: {
                $areas: "dangerousChemicalCompany.features",
                $areaStyle: "craneStates.dangerousChemicalAreaStyle",
                $areaHoverStyle: "craneStates.dangerousChemicalHoverStyle"
              },
              events: {
                'area-clicked': {
                  params: ["geoJSON", "area"],
                  actions: ["setState('selectedArea', area)", "setState('showState', true)"],
                }
              }
            },
          ]
        },
        // 重点消防建筑labelMarker点
        {
          component: '@byzanteam/vis-components/data-loader',
          props: {
            'v-if': 'fireFightingMarkerShow',
            $url: "`/v1/components/0007dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`",
            method: 'get',
            $data: "[['']]",
          },
          events: {
            requestDone: {
              params: ['param'],
              actions: ["setState('fireFightingCompanyBuildingData', param.results ? param.results.map(item => ({name: item[0], point: [item[1][1], item[1][0]], labelMarker: true, })) : [])"],
            },
          },
          children: [
            {
              component: '@byzanteam/map-ui/custom-marker',
              id: 'fireFightingBuildingMarker',
              vfor: {
                data: "craneStates.fireFightingCompanyBuildingData",
                exports: {item: 'marker', index: 'index'},
                key: 'index + marker.point[0] + marker.point[1] + marker.tag + marker.name'
              },
              events: {
                'marker-clicked': {
                  params: ['marker'],
                  actions: ["setMarkerZindex(marker, 200)", "setState('currentCompany', marker.target.getExtData().name)", "setState('showState', true)"]
                },
                'marker-mouseover': {
                  params: ["marker"],
                  actions: ["markerMouseoverFunc(marker)"]
                },
                'marker-mouseout': {
                  params: ["marker"],
                  actions: ["markerMouseoutFunc(marker)"]
                }
              },
              props: {
                $marker: "marker",
                $offset: 'craneStates.leftLabelsConfig.offset',
                $anchor: "craneStates.leftLabelsConfig.options.anchor",
                $content: "`<div style='display: flex; align-items: center;'><img style='height: 2px; margin-right: 10px' src='/zhyq/icon/line.svg'/><div class='label-marker'>${marker.name}</div></div>`"
              }
            },
          ]
        },
        // 危化品建筑名marker点
        {
          component: '@byzanteam/vis-components/data-loader',
          props: {
            'v-if': 'dangerousChemicalMarkerShow',
            $url: "`/v1/components/0107dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`",
            method: 'get',
            $data: "[['']]",
          },
          events: {
            requestDone: {
              params: ['param'],
              actions: ["setState('dangerousChemicalCompanyBuildingData', param.results ? param.results.map(item => ({name: item[0], point: [item[1][1], item[1][0]], labelMarker: true, })) : [])"],
            },
          },
          children: [
            {
              component: '@byzanteam/map-ui/custom-marker',
              id: 'dangerousChemicalBuildingMarker',
              vfor: {
                data: "craneStates.dangerousChemicalCompanyBuildingData",
                exports: {item: 'marker', index: 'index'},
                key: 'marker.point[0] + marker.point[1] + marker.tag + marker.name + index'
              },
              events: {
                'marker-clicked': {
                  params: ['marker'],
                  actions: ["setMarkerZindex(marker, 200)", "setState('currentCompany', marker.target.getExtData().name)", "setState('showState', true)"]
                },
                'marker-mouseover': {
                  params: ["marker"],
                  actions: ["markerMouseoverFunc(marker)"]
                },
                'marker-mouseout': {
                  params: ["marker"],
                  actions: ["markerMouseoutFunc(marker)"]
                }
              },
              props: {
                $marker: "marker",
                $offset: 'craneStates.leftLabelsConfig.offset',
                $anchor: "craneStates.leftLabelsConfig.options.anchor",
                $content: "`<div style='display: flex; align-items: center;'><img style='height: 2px; margin-right: 10px' src='/zhyq/icon/line.svg'/><div class='label-marker'>${marker.name}</div></div>`"
              }
            }
          ]
        }
      ]
    },
  ]
}
