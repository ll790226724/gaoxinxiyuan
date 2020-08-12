module.exports = {
  id: 'company_select',
  component: '@byzanteam/vis-components/data-loader',
  position: [32, 32],
  props: {
    $url: "`/v1/components/0017dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`",
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
        prefix: 'ios-search',
        $style: {
          width: '400px',
          height: '48px'
        },
        'v-model': 'craneStates.currentDepartment'
      },
      children: [
        {
          component: 'view-design/Option',
          vfor: {
            data: "craneStates.selectOptions",
            exports: {item: 'item', index: 'key'}
          },
          props: {
            $value: "item.index",
            $label: "item.name"
          },
          content: '{{item.name}}',
        }
      ]
    }
  ]

}
