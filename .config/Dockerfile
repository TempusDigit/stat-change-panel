ARG GRAFANA_IMAGE
ARG GRAFANA_VERSION

FROM grafana/${GRAFANA_IMAGE}:${GRAFANA_VERSION}

ARG GRAFANA_PORT

# Make it as simple as possible to access the grafana instance for development purposes
# Do NOT enable these settings in a public facing / production grafana instance
ENV GF_AUTH_ANONYMOUS_ORG_ROLE=Admin \
    GF_AUTH_ANONYMOUS_ENABLED=true \
    GF_AUTH_BASIC_ENABLED=false \
    # Set development mode so plugins can be loaded without the need to sign
    GF_DEFAULT_APP_MODE=development \
    GF_SERVER_HTTP_PORT=${GRAFANA_PORT}

# Inject livereload script into grafana index.html
USER root
RUN sed -i 's/<\/body><\/html>/<script src=\"http:\/\/localhost:35729\/livereload.js\"><\/script><\/body><\/html>/g' \
      /usr/share/grafana/public/views/index.html