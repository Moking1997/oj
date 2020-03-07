import Admin from '@/pages/admin/index'
import User from '@/pages/admin/user'
import Knowledge from '@/pages/admin/knowledge'

const admin = {
    path: '/admin',
    component: Admin,
    children: [
        { path: '', component: User },
        { path: 'user', component: User },
        { path: 'knowledge', component: Knowledge },
    ]
}

export default admin