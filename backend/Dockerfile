# backend/Dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# collectstatic / migrations can be run via entrypoint or docker-compose command
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
