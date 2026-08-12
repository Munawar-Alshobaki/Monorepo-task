import type { User } from '../../lib/api'
import { Email, Item, Joined, Name } from './UserCard.styles'

export function UserCard({ user }: { user: User }) {
  return (
    <Item>
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <Joined>
        Joined {new Date(user.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
      </Joined>
    </Item>
  )
}
