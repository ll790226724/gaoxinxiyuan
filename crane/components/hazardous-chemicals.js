module.exports = [
    {
        component: 'img',
        position: [1310, 132],
        props: {
            src: '/zhyq/icon/flamethrower-circle.svg',
            $style: {
                width: '24px',
                height: '24px',
            }
        }
    },
    {
        component: 'div',
        position: [1350, 131],
        content: '危化品平面位置摆放图（含应急出口）',
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
    {
        component: '@byzanteam/vis-components/data-loader',
        position: [1350, 204],
        exports: {
            results: 'results',
        },
        props: {
            $url: "`/v1/components/${chemicalsImg}/data`",
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
