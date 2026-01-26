FROM nvidia/cuda:12.4.1-devel-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-venv python3-dev \
    build-essential cmake git wget \
    libopenblas-dev libssl-dev \
    && rm -rf /var/lib/apt/lists/*

RUN [ ! -e /usr/bin/python ] && ln -s /usr/bin/python3 /usr/bin/python || true
RUN [ ! -e /usr/bin/pip ] && ln -s /usr/bin/pip3 /usr/bin/pip || true

WORKDIR /app

RUN ln -s /usr/local/cuda/targets/x86_64-linux/lib /usr/local/cuda/lib64 || true

COPY ml-letter /app/ml-letter

RUN pip install --upgrade pip

RUN pip install --no-cache-dir "llama-cpp-python[cuda12]"

RUN pip install --no-cache-dir \
    "torch==2.3.0+cpu" --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir \
    "fastapi==0.110.0" \
    "uvicorn[standard]" \
    "pydantic==1.10.13" \
    python-dotenv \
    pymupdf \
    "sentence-transformers==3.0.1"

RUN pip install --no-cache-dir -e /app/ml-letter

RUN pip install --no-cache-dir "pydantic==1.10.13"

COPY services/letter-api /app/letter_api

ENV LETTER_MODEL_PATH=/models/Qwen2.5-3B-Instruct-Q4_K_M.gguf \
    LETTER_EMBEDDING_MODEL=all-MiniLM-L6-v2 \
    CUDA_VISIBLE_DEVICES=0 \
    PYTORCH_ENABLE_MPS_FALLBACK=1

EXPOSE 8001

CMD ["uvicorn", "letter_api.app.main:app", "--host", "0.0.0.0", "--port", "8001"]
