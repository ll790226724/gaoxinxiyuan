const safetyOfficer = require('./safety-officer')
module.exports = [
    {
        component: 'img',
        position: [692, 132],
        props: {
            src: '/zhyq/icon/lightning-circle.svg',
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
                color: '#fa6400',
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
            $url: "`/v1/components/${rescueImg}/data`",
            $params: {
                $name: 'craneStates.currentCompany'
            },
            $style: {
                width: '466px',
                height: '596px',
                overflowY: 'scroll',
            }
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
