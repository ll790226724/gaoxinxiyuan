module.exports = {
  id: 'company_select',
  component: '@byzanteam/vis-components/data-loader',
  position: [32, 32],
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
