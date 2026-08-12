import logging

from sqlalchemy import func, select

from app.db import SessionLocal
from app.model import User

logger = logging.getLogger("app.seed")

USERS = [
    {"name": "mohmoud", "email": "mohmoud@gmail.com"},
    {"name": "Layan", "email": "layan@gmail.com"},
    {"name": "fares", "email": "fares@hotmail.com"},
    {"name": "mohammad", "email": "mohammad@gmail.com"},

]

def seed() -> None:
    with SessionLocal() as session:
        existing = session.scalar(select(func.count()).select_from(User)) or 0
        if existing:
            return
        session.add_all(User(**row) for row in USERS)
        session.commit()
        logger.info("users created")

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-8s %(name)s: %(message)s"
    )
    seed()