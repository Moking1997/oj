import Admin from '@/pages/admin/index'
import User from '@/pages/admin/user'
import Knowledge from '@/pages/admin/knowledge'
import Type from '@/pages/admin/type'
import Tags from '@/pages/admin/tags'
import Course from '@/pages/admin/course'
import Problems from '@/pages/admin/problems'

import ProblemsIndex from '@/pages/admin/problems/index'
import Details from '@/pages/admin/problems/details'
import Add from '@/pages/admin/problems/add'
import Edit from '@/pages/admin/problems/edit'
const admin = {
    path: '/admin',
    component: Admin,
    children: [
        { path: '', component: User },
        { path: 'user', component: User },
        {
            path: 'problems', component: Problems,
            children: [
                { path: '', component: ProblemsIndex },
                { path: 'details', component: Details },
                { path: 'add', component: Add },
                { path: 'edit', component: Edit },
            ]
        },
        { path: 'knowledge', component: Knowledge },
        { path: 'type', component: Type },
        { path: 'tags', component: Tags },
        { path: 'course', component: Course },
        { path: 'details', component: Details },
        { path: 'add', component: Add },
        { path: 'edit', component: Edit },
    ]
}

export default admin