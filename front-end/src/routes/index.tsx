import { createFileRoute } from '@tanstack/react-router'

import { UserList } from '../components/UserList/UserList'

export const Route = createFileRoute('/')({
  component: UserList,
})
