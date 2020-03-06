import Home from '@/pages/home/index'
import Private from '@/pages/home/private'
import Commonality from '@/pages/home/commonality'

const index = {
    path: '/home',
    component: Home,
    children: [
        { path: '', component: Commonality },
        { path: 'commonality', component: Commonality },
        { path: 'private', component: Private },
    ]
}
const home = {
    index
}
export default home