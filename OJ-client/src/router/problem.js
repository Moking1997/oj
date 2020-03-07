import Home from '@/pages/home/index'
import Details from '@/pages/problem/details'
import Add from '@/pages/problem/add'
import Edit from '@/pages/problem/edit'
import Commonality from '@/pages/home/commonality'

const problem = {
    path: '/problem',
    component: Home,
    children: [
        { path: '', component: Commonality },
        { path: 'details', component: Details },
        { path: 'add', component: Add },
        { path: 'edit', component: Edit },
    ]
}

export default problem