import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const Count = styled.span`
  color: var(--muted);
  font-size: 0.85rem;
`

export const Button = styled.button`
  padding: 0.4rem 0.85rem;
  border-radius: 0.5rem;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  border: 1px solid var(--text);
  background: var(--text);
  color: var(--bg);

  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }
`

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const Message = styled.p`
  margin: 0;
  padding: 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
`

export const ErrorMessage = styled(Message)`
  border-color: var(--danger-border);
  background: var(--danger-surface);
  color: var(--danger);
`
