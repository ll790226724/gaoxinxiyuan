module.exports = {
  id: 'company-type-tab',
  component: 'div',
  position: [1528, 32],
  props: {
    $style: {
      display: 'flex',
    },
  },
  children: [
    {
      component: 'div',
      props: {
        $class: 'fireSelected',
        $style: {
          height: '48px',
          width: '180px',
          fontSize: '18px',
          lineHeight: '24px'
        }
      },
      events: {
        'click': {
          actions: ["setState('currentCompanyTag', 'fireFighting')"]
        }
      },
      children: [
        {
          component: 'img',
          props: {
            src: '/zhyq/icon/flamethrower-circle.svg'
          }
        },
        {
          component: 'span',
          content: '消防重点企业'
        }
      ]
    },
    {
      component: 'div',
      props: {
        $class: 'dangerousSelected',
        $style: {
          height: '48px',
          width: '180px',
          fontSize: '18px',
          lineHeight: '24px'
        }
      },
      events: {
        'click': {
          actions: ["setState('currentCompanyTag', 'dangerousChemical')"]
        }
      },
      children: [
        {
          component: 'img',
          props: {
            src: '/zhyq/icon/skeleton.svg'
          }
        },
        {
          component: 'span',
          content: '危化品企业'
        }
      ]
    }
  ]
}
