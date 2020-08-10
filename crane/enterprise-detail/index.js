const enterprise = require('./enterprise')
const rescueSituation = require('./rescue-situation')
const hazardousChemicals = require('./hazardous-chemicals')
module.exports = {
    route: {
        name: 'enterprise_detail',
        path: 'enterpriseDetail'
    },
    states: [
        {
            id: 'tableHeader',
            value: [
                {
                    "field": "company_name",
                    "value": "企业名称",
                },
                {
                    "field": "registered_address",
                    "value": "注册地址",
                },
                {
                    "field": "actual_address",
                    "value": "实际地址",
                },
                {
                    "field": "industry",
                    "value": "行业领域",
                },
                {
                    "field": "main_business",
                    "value": "主营业务",
                },
                {
                    "field": "header_name",
                    "value": "单位负责人姓名",
                },
                {
                    "field": "header_phone",
                    "value": "单位负责人电话",
                },
                {
                    "field": "area",
                    "value": "场地总面积",
                },
                {
                    "field": "number",
                    "value": "从业人数（人）",
                },
                {
                    "field": "security_name",
                    "value": "安全负责人姓名",
                },
                {
                    "field": "sucurity_phone",
                    "value": "安全负责人电话",
                }
            ]
        },
        {
            id: 'enterpriseName',
            value: '成都中光电科技有限公司',
        },
        {
            id: 'safetyOfficerData',
            value: [
                {
                    id: '0047dd5e-d3ff-4c5f-9ab4-44d75afb40a1',
                    type: '安全总负责人',
                },
                {
                    id: '0057dd5e-d3ff-4c5f-9ab4-44d75afb40a1',
                    type: '安全第一负责人',
                },
                {
                    id: '0067dd5e-d3ff-4c5f-9ab4-44d75afb40a1',
                    type: '安全第二负责人',
                },
            ]
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
        ...enterprise,
        ...rescueSituation,
        ...hazardousChemicals,
    ],
}