"""IT部署紹介ツール API — データは JSON のみ（DBなし）。"""
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

BASE = Path(__file__).resolve().parent
DATA_FILE = BASE / "data" / "department.json"

app = FastAPI(title="IT Org Explorer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:4173",
        "http://localhost:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _load_json():
    import json

    with DATA_FILE.open(encoding="utf-8") as f:
        return json.load(f)


@app.get("/department")
def get_department():
    """部署・グループ・チームの全階層を返す。"""
    return _load_json()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    """ブラウザの余計な404を避けるためのプレースホルダ。"""
    return FileResponse(BASE / "static" / "favicon.svg", media_type="image/svg+xml")
