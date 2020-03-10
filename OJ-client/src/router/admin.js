import Admin from '@/pages/admin/index'
import User from '@/pages/admin/user'
import Knowledge from '@/pages/admin/knowledge'
import Type from '@/pages/admin/type'
import Tags from '@/pages/admin/tags'
import Course from '@/pages/admin/course'

const admin = {
    path: '/admin',
    component: Admin,
    children: [
        { path: '', component: User },
        { path: 'user', component: User },
        { path: 'knowledge', component: Knowledge },
        { path: 'type', component: Type },
        { path: 'tags', component: Tags },
        { path: 'course', component: Course },
    ]
}

export default admin