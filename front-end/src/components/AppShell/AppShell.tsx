import { Outlet } from '@tanstack/react-router'

import { Shell, Title } from './AppShell.styles'

export function AppShell() {
  return (
    <Shell>
      <header>
        <Title>Users</Title>
      </header>
      <main>
        <Outlet />
      </main>
    </Shell>
  )
}
