module.exports = {
    route: {
        name: 'enterprise_detail',
        path: 'enterpriseDetail'
    },
    states: [
        {
            id: 'test',
            value: ''
        }
    ],
    components: [
        {
            id: 'background',
            component: 'img',
            position: [0, 0],
            props: {
                src: '/gaoxinxiyuan/images/dialo-bg.png'
            },
        },
        {
            component: 'img',
            position: [48, 132],
            props: {
                src: '/gaoxinxiyuan/images/icon/times-circle.svg',
                $style: {
                    width: '24px',
                    height: '24px',
                }
            }
        },
        {
            component: 'div',
            position: [88, 130],
            content: '成都泰美克晶体技术有限公司',
            props: {
                $style: {
                    width: '524px',
                    height: '28px',
                    color: '#fff',
                    fontSize: '28px',
                    lineHeight: '28px',
                    fontWeight: '600',
                }
            }
        },
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
                    height: '20px',
                    color: '#fa6400',
                    fontSize: '20px',
                    lineHeight: '20px',
                    fontWeight: '400',
                }
            }
        }
    ],
}