const safetyOfficer = require('./safety-officer')
module.exports = [
    {
        component: 'img',
        position: [692, 132],
        props: {
            src: '/gaoxinxiyuan/images/icon/lightning-circle.svg',
            $style: {
                width: '24px',
                height: '24px',
            }
        }
    },
    {
        component: 'div',
        position: [732, 131],
        content: '应急救援情况（含应急方案图）',
        props: {
            $style: {
                width: '498px',
                height: '26px',
                color: '#fff',
                fontSize: '26px',
                lineHeight: '26px',
                fontWeight: '400',
            }
        }
    },
    ...safetyOfficer,
    {
        component: '@byzanteam/vis-components/data-loader',
        position: [732, 204],
        exports: {
            results: 'results',
        },
        props: {
            url: `/v1/components/0137dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`,
            $params: {
                $name: 'craneStates.enterpriseName'
            },
        },
        children: [
            {
                component: '../../src/components/image-view',
                props: {
                    $imgs: 'results && results[0]'
                }
            }
        ]
    }
]