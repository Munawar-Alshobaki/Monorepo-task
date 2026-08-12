from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.model import User
from app.schema import UserCreate


class UserRepository:
    """The only place that builds queries against `users`."""

    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self, limit: int, offset: int) -> list[User]:
        users = self.db.scalars(
            select(User)
            .order_by(User.created_at.desc(), User.id.desc())
            .limit(limit)
            .offset(offset)
        ).all()
        return list(users)

    def count(self) -> int:
        return self.db.scalar(select(func.count()).select_from(User)) or 0

    def create(self, data: UserCreate) -> User:
        user = User(**data.model_dump())
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
