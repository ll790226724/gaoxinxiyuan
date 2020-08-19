module.exports = [
    {
        component: 'img',
        position: [1310, 132],
        props: {
            src: '/gaoxinxiyuan/images/icon/flamethrower-circle.svg',
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
                color: '#fff',
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
            url: `/v1/components/0177dd5e-d3ff-4c5f-9ab4-44d75afb40a1/data`,
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
