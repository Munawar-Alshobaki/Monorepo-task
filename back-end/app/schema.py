from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class EntityBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class UserBase(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str
    email: EmailStr


class UserCreate(UserBase):

    name: str = Field(min_length=1, max_length=121)
    email: EmailStr = Field(max_length=255)


class UserRead(UserBase, EntityBase):
    pass
