FROM python:3.9

# Copy source code and custom CA certificate
COPY src /LibreLingo/app
COPY courses/ /LibreLingo/courses
COPY cert_custom.pem /usr/local/share/ca-certificates/cert_custom.pem

# Set working directory
WORKDIR /LibreLingo/app

# Environment variables for SSL/TLS
ENV PIP_TRUSTED_HOST="pypi.org files.pythonhosted.org" \
    PATH=$PATH:/root/.local/bin

# Update CA certificates
RUN update-ca-certificates && pip install --upgrade pip certifi && \
    cat /usr/local/share/ca-certificates/cert_custom.pem >> $(python3 -m certifi) && \
    export REQUESTS_CA_BUNDLE=$(python3 -m certifi) && PIP_CERT=$(python3 -m certifi) && \
    # Install pip, pipx, poetry, and dependencies
    pip3 install --upgrade pip && \
    pip install pipx pip-system-certs && \
    pipx install poetry && \
    poetry install --no-root --no-interaction --no-ansi && \

    # Install Python modules for LibreLingo
    # cd /LibreLingo/app/librelingo_yaml_loader && poetry install && \
    # cd /LibreLingo/app/librelingo_json_export && poetry install && \
    pip install librelingo-yaml-loader && \
    pip install librelingo-json-export && \
    pip install librelingo-audios

# Copy and make the start script executable
COPY start.sh /LibreLingo/start.sh
RUN chmod +x /LibreLingo/start.sh

# Default command
#CMD ["/LibreLingo/start.sh"]
