module.exports = {
  id: 'enterpriseData',
  component: '@byzanteam/vis-components/data-loader',
  position: [32, 204],
  exports: {
    results: 'results',
  },
  props: {
    $url: "`/v1/components/${tableData}/data`",
    $style: {
      width: '618px',
      height: '848px',
      border: '1px solid rgba(255, 255, 255, .1)',
      overflow: 'hidden',
    },
    $params: {
      $name: 'craneStates.currentCompany'
    },
  },
  children: [
    {
      id: 'enterpriseTable',
      component: 'ul',
      props: {
        $style: {
          height: '100%',
          overflowY: 'scroll',
        },
        class: 'enterprise-table',
      },
      children: [
        {
          component: 'li',
          vfor: {
            data: 'craneStates.tableHeader',
            exports: { item: 'item', index: 'key' }
          },
          props: {
            $style: {
              display: 'flex',
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '30px',
            }
          },
          children: [
            {
              component: 'div',
              props: {
                'v-text': 'item.value',
                $style: {
                  width: '182px',
                  flexShrink: '0',
                  verticalAlign: 'top',
                  color: '#acb2c4',
                  borderRight: '1px solid rgba(255, 255, 255, .1)',
                  padding: '24px 16px',
                }
              },
            },
            {
              component: 'div',
              props: {
                'v-text': 'results&&results[0][key]',
                $style: {
                  flex: '1',
                  color: '#fff',
                  flexShrink: '0',
                  verticalAlign: 'top',
                  padding: '24px 16px',
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
