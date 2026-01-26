from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[3]

MODELS_DIR = ROOT_DIR / "ml-letter" / "models"
DATA_DIR = ROOT_DIR / "data"

LLM_MODEL_PATH = MODELS_DIR / "qwen2.5-3b-instruct-q5_k_m.gguf"
POLICY_PDF_PATH = DATA_DIR / "RAG" / "codigo_etica_inbursa.pdf"

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"