import { createRootRoute } from '@tanstack/react-router'

import { AppShell } from '../components/AppShell/AppShell'

export const Route = createRootRoute({
  component: AppShell,
})
