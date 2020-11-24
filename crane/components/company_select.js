module.exports = {
  id: 'company_select',
  component: '@byzanteam/vis-components/data-loader',
  position: [32, 32],
  props: {
    $url: "`/v1/components/${companySelectData}/data`",
    method: 'get',
    $data: "[['']]",
  },
  events: {
    requestDone: {
      params: ['params'],
      actions: ["setState('selectAreaOptions', params.results ? params.results.map(item => ({name: item[0], address: item[1]})) : [])"],
    },
  },
  children: [
    {
      component: 'view-design/Select',
      props: {
        class: 'company-select',
        $filterable: true,
        $clearable: true,
        placement: 'top-start',
        $style: {
          width: '400px',
          height: '48px'
        },
        'v-model': 'craneStates.selectCompany'
      },
      children: [
        {
          id: 'search-icon',
          component: 'img',
          props: {
            $style: {
              paddingTop: '2px',
              height: '22px',
              width: '22px',
              marginLeft: '12px'
            },
            src: '/zhyq/icon/search.svg',
            slot: 'prefix',
          }
        },
        {
          component: 'view-design/Option',
          vfor: {
            data: "craneStates.selectAreaOptions",
            exports: {item: 'item', index: 'key'}
          },
          props: {
            $value: "item.name",
            $label: "item.name"
          },
          children: [
            {
              id: 'option-box',
              component: 'div',
              props: {
                $style: {
                  display: 'flex',
                }
              },
              children: [
                {
                  id: 'index-column',
                  component: 'div',
                  props: {
                    class: 'index-column',
                  },
                  content: "{{(key + 1) + '.'}}"
                },
                {
                  id: 'name-address-box',
                  component: 'div',
                  props: {
                    $style: {
                      display: 'flex',
                      width: '100%',
                      flexFlow: 'column',
                      paddingTop: '16px',
                      paddingRight: '12px',
                      paddingBottom: '16px',
                    }
                  },
                  children: [
                    {
                      id: 'company-name',
                      component: 'div',
                      props: {
                        class: 'company-name',
                      },
                      content: '{{item.name}}'
                    },
                    {
                      id: 'company-address',
                      component: 'div',
                      props: {
                        class: 'company-address'
                      },
                      children: [
                        {
                          id: 'company-address-icon',
                          component: 'img',
                          props: {
                            class: 'company-address-icon',
                            src: '/zhyq/icon/map-marker.svg'
                          }
                        },
                        {
                          component: 'span',
                          content: '{{item.address}}'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
          ]
        }
      ]
    }
  ]

}
