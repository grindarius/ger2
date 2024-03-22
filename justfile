set windows-shell := ["cmd.exe", "/c"]
set shell := ["/bin/sh", "-c"]

# Start local database server
docker-up:
  docker compose up -d

# Start local database server
docker-down:
  docker compose down

# Start Reset migrate seed function
rms:
  just reset && just migrate && just seed

# Copy type definitions generated from ts-rs to frontend
copy-server-types:
  cp -r ./packages/api/bindings/* ./packages/website/src/types/server

reset:
  cd packages/scripts && pnpm tsx ./src/reset.ts

migrate:
  refinery migrate -c ./packages/api/refinery.toml -p ./migrations

seed:
  cd packages/scripts && pnpm tsx ./src/seed2.ts

dev-api:
  cd packages/api && cargo watch -x run

dev-website:
  cd packages/website && pnpm dev
