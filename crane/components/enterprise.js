const enterpriseTable = require('./enterprise-table')
module.exports = [
    {
        component: 'img',
        position: [48, 132],
        props: {
            src: '/gaoxinxiyuan/images/icon/times-circle.svg',
            $style: {
                width: '24px',
                height: '24px',
            }
        },
        events: {
            'click': {
                actions: ["setState('showState', !craneStates.showState)"]
            }
        },
    },
    {
        component: 'div',
        position: [88, 130],
        props: {
            $style: {
                width: '524px',
                height: '28px',
                color: '#fff',
                fontSize: '28px',
                lineHeight: '28px',
                fontWeight: '600',
            },
            'v-text': 'craneStates.currentCompany'
        }
    },
    enterpriseTable,
]
