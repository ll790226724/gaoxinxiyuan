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
        ...enterprise,
        ...rescueSituation,
        ...hazardousChemicals,
    ],
}