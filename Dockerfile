# Dev-server image for TechTips.
# Runs the Vite dev server. content/ is bind-mounted at runtime (see
# docker-compose.yml), so tips/categories/articles edited in Obsidian — over
# the host's Samba share — hot-reload in the browser.
FROM node:22-slim

WORKDIR /app

# Install dependencies first so this layer is cached across source changes.
COPY package.json package-lock.json ./
RUN npm ci

# App source. The content/ copied here is just a fallback — the bind mount
# in docker-compose.yml overrides it with the host's live folder.
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
