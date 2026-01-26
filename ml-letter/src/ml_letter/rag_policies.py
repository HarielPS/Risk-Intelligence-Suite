from __future__ import annotations
from typing import List
import numpy as np
import fitz 
from sentence_transformers import SentenceTransformer

from .config import POLICY_PDF_PATH, EMBEDDING_MODEL_NAME

# 1. Cargar PDF y partirlo en chunks
def _load_policy_text() -> str:
    doc = fitz.open(str(POLICY_PDF_PATH))
    pages_text = []
    for page in doc:
        pages_text.append(page.get_text())
    return "\n".join(pages_text)

def _chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap
    return chunks

_full_text = _load_policy_text()
policy_chunks = _chunk_text(_full_text)

embed_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
policy_embeddings = embed_model.encode(policy_chunks, show_progress_bar=False)

def search_policy_context(query: str, top_k: int = 3) -> str:
    query_embedding = embed_model.encode([query])[0]
    scores = np.dot(policy_embeddings, query_embedding)
    top_indices = np.argsort(scores)[-top_k:][::-1]
    return "\n".join(policy_chunks[i] for i in top_indices)
