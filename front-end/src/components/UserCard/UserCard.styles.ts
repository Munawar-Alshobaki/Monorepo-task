import styled from 'styled-components'

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
`

export const Name = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
`

export const Email = styled.span`
  color: var(--muted);
  font-size: 0.85rem;
`

export const Joined = styled.span`
  color: var(--muted);
  font-size: 0.75rem;
`
