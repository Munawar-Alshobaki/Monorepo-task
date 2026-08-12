import { useQuery } from '@tanstack/react-query'

import { fetchUsers } from '../../lib/api'
import { UserCard } from '../UserCard/UserCard'
import {
  Button,
  Count,
  ErrorMessage,
  List,
  Message,
  Toolbar,
  Wrapper,
} from './UserList.styles'

export function UserList() {
  const { data: users, isFetching, isError, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: false,
  })

  function content() {
    if (isFetching) return <Message>Loading users…</Message>
    if (isError) return <ErrorMessage>Could not load users: {error?.message}</ErrorMessage>
    if (!users) return <Message>Nothing fetched yet</Message>
    if (users.length === 0) return <Message>No users yet.</Message>

    return (
      <List>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </List>
    )
  }

  return (
    <Wrapper>
      <Toolbar>
        <Count>
          {users
            ? `${users.length} ${users.length === 1 ? 'user' : 'users'}`
            : 'Not loaded yet'}
        </Count>
        <Button type="button" onClick={() => void refetch()} disabled={isFetching}>
          {isFetching ? 'Loading…' : users ? 'Refresh' : 'Load users'}
        </Button>
      </Toolbar>
      {content()}
    </Wrapper>
  )
}
