# services/credit-api/Dockerfile

FROM python:3.10-slim

# Evitar bytecode y buffering en logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Crear carpeta de trabajo
WORKDIR /app

# Copiar módulo ml-credit
COPY ml-credit ./ml-credit

# Instalar ml-credit y sus dependencias desde pyproject.toml
RUN pip install --no-cache-dir -e ./ml-credit

# Copiar servicio credit-api
COPY services/credit-api/requirements.txt ./services/credit-api/requirements.txt
RUN pip install --no-cache-dir -r ./services/credit-api/requirements.txt

# Copia el código del servicio
COPY services/credit-api/app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
