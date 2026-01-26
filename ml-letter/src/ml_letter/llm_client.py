from __future__ import annotations
from typing import Dict, Any

from llama_cpp import Llama
from .config import LLM_MODEL_PATH

# Instancia global del modelo LLM
llm = Llama(
    model_path=str(LLM_MODEL_PATH),
    n_ctx=8192,
    n_gpu_layers=20,
    n_batch=64,
    logits_all=False,
    n_threads=8,
    n_threads_batch=8,
    verbose=False,
)

def call_llm(system_prompt: str, user_prompt: str, max_tokens: int = 768) -> str:
    full_prompt = (
        f"<system>\n{system_prompt}\n</system>\n"
        f"<user>\n{user_prompt}\n</user>\n"
        f"<assistant>\n"
    )

    output = llm(
        full_prompt,
        max_tokens=max_tokens,
        temperature=0.2,
        top_p=0.9,
        stop=["</assistant>"],
    )

    return output["choices"][0]["text"]


def count_tokens(text: str) -> int:
    return len(llm.tokenize(text.encode("utf-8")))
