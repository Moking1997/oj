import Home from '@/pages/home/index'
import Private from '@/pages/home/private'
import Commonality from '@/pages/home/commonality'

import CourseIndex from '@/pages/course/index'
import CourseAdd from '@/pages/course/add'
const home = {
    path: '/home',
    component: Home,
    children: [
        { path: '', component: Commonality },
        { path: 'commonality', component: Commonality },
        {
            path: 'private', component: Private,
            children: [
                { path: 'index', component: CourseIndex },
                { path: 'add', component: CourseAdd },
            ]
        },
    ]
}

export default home