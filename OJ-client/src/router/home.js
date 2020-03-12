import Home from '@/pages/home/index'
import Private from '@/pages/home/private'
import Commonality from '@/pages/home/commonality'
import Setting from '@/pages/home/setting'
import OpenCourse from '@/pages/home/openCourse'
import Help from '@/pages/home/help'

import CourseIndex from '@/pages/course/index'
import CourseAdd from '@/pages/course/add'
import CourseSet from '@/pages/course/set'
const home = {
    path: '/home',
    component: Home,
    children: [
        { path: '', component: Commonality },
        { path: 'commonality', component: Commonality },
        { path: 'setting', component: Setting },
        { path: 'openCourse', component: OpenCourse },
        { path: 'help', component: Help },
        {
            path: 'private', component: Private,
            children: [
                { path: '', component: CourseIndex },
                { path: 'index', component: CourseIndex },
                { path: 'add', component: CourseAdd },
                { path: 'set', component: CourseSet },
            ]
        },
    ]
}

export default home