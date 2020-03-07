import Home from '@/pages/home/index'
import Private from '@/pages/home/private'
import Commonality from '@/pages/home/commonality'

const home = {
    path: '/home',
    component: Home,
    children: [
        { path: '', component: Commonality },
        { path: 'commonality', component: Commonality },
        { path: 'private', component: Private },
    ]
}

export default home