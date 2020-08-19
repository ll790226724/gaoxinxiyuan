module.exports = [
    {
        component: 'img',
        position: [712, 913],
        props: {
            src: '/zhyq/icon/user-circle.svg',
            $style: {
                width: '24px',
                height: '24px',
            }
        }
    },
    {
        component: 'img',
        position: [752, 865],
        props: {
            src: '/zhyq/images/line.png',
            $style: {
                width: '19px',
                height: '120px',
            }
        }
    },
    {
        component: 'div',
        position: [787, 850],
        children: [
            {
                component: 'div',
                vfor: {
                    data: 'craneStates.safetyOfficerData',
                    exports: { item: 'item', index: 'key' }
                },
                props: {
                    $style: {
                        marginBottom: '32px',
                    }
                },
                children: [
                    {
                        component: '@byzanteam/vis-components/data-loader',
                        props: {
                            url: `/v1/components/id/data`,
                            $params: {
                                $name: 'craneStates.currentCompany',
                            },
                            $style: {
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '20px',
                                fontWeight: '400',
                            },
                        },
                        exports: {
                            results: 'results',
                        },
                        children: [
                            {
                                component: 'div',
                                props: {
                                    'v-text': 'item.type',
                                    $style: {
                                        width: '144px',
                                        marginRight: '16px',
                                        color: '#fa6400',
                                    }
                                }
                            },
                            {
                                component: 'div',
                                props: {
                                    'v-text': 'results && results[0][0]',
                                    $style: {
                                        width: '80px',
                                        color: '#fff',
                                    }
                                }
                            },
                            {
                                component: 'div',
                                props: {
                                    $style: {
                                        width: '1px',
                                        height: '12px',
                                        backgroundColor: '#fff',
                                        margin: '0 12px',
                                    }
                                }
                            },
                            {
                                component: 'div',
                                props: {
                                    'v-text': 'results && results[0][1]',
                                    $style: {
                                        width: '180px',
                                        color: '#fff',
                                    }
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    },
]
