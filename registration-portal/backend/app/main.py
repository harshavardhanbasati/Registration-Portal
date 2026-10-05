from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

# Allow React to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    name: str
    email: str
    password: str
    confirmPassword: str


@app.get("/")
def home():
    return {"message": "Backend is working"}


@app.post("/register")
def register(user: User):

    file = "users.json"

    if not os.path.exists(file):
        with open(file, "w") as f:
            json.dump([], f)

    with open(file, "r") as f:
        users = json.load(f)

    users.append({
        "name": user.name,
        "email": user.email,
        "password": user.password
    })

    with open(file, "w") as f:
        json.dump(users, f, indent=4)

    return {
        "success": True,
        "message": "Registration successful"
    }