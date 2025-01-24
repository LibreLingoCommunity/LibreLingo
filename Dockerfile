FROM python:3.9

# Copy source code and custom CA certificate
COPY src /LibreLingo/app
COPY courses/ /LibreLingo/courses

# Set working directory
WORKDIR /LibreLingo/app

# Environment variables for SSL/TLS
ENV PIP_TRUSTED_HOST="pypi.org files.pythonhosted.org" \
    PATH=$PATH:/root/.local/bin

# disable update check
ENV PDM_CHECK_UPDATE=false

# Update CA certificates
RUN update-ca-certificates && pip install --upgrade pip certifi && \
    # Install pip, pipx, poetry, and dependencies
    pip3 install --upgrade pip && \
    pip install pipx pip-system-certs && \
    pipx install poetry && \
    poetry install --no-root --no-interaction --no-ansi && \
    pip install -U pdm && \
    # Install Python modules for LibreLingo
    pip install librelingo-yaml-loader && \
    pip install librelingo-json-export && \
    pip install librelingo-audios