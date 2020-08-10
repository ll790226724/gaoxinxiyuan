const enterprise = require('./enterprise')
const rescueSituation = require('./rescue-situation')
const hazardousChemicals = require('./ hazardous-chemicals')
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
            value: '成都天马微电子有限公司',
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