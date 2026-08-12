import logging

from app.db import SessionLocal
from app.repository import UserRepository
from app.schema import UserCreate

logger = logging.getLogger("app.seed")

USERS = [
    {"name": "mohmoud", "email": "mohmoud@gmail.com"},
    {"name": "Layan", "email": "layan@gmail.com"},
    {"name": "fares", "email": "fares@hotmail.com"},
    {"name": "mohammad", "email": "mohammad@gmail.com"},

]

def seed() -> None:
    with SessionLocal() as session:
        users = UserRepository(session)
        if users.count():
            return
        for row in USERS:
            users.create(UserCreate(**row))
        logger.info("users created")

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-8s %(name)s: %(message)s"
    )
    seed()