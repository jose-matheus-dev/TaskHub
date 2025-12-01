FROM node:24.11.1-alpine AS base

ARG UID
ARG GID

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN if [ "$(id -u node)" != "$UID" ] || [ "$(id -g node)" != "$GID" ]; then \
  deluser node && addgroup -g $GID node && adduser -D -u $UID -G node node; \
  fi && mkdir -p $PNPM_HOME && chown node $PNPM_HOME && corepack enable

USER node

WORKDIR /taskhub

COPY --chown=node package.json pnpm-workspace.yaml pnpm-lock.yaml ./

WORKDIR /taskhub/apps/api-gateway

COPY --chown=node ./apps/api-gateway/package.json ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=$UID,gid=$GID pnpm fetch 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=$UID,gid=$GID pnpm i --offline --frozen-lockfile

FROM base AS development

COPY --chown=node ./apps/api-gateway/ .

CMD ["pnpm", "--filter=api-gateway", "dev"]
