set windows-shell := ["cmd.exe", "/c"]
set shel := ["/Users/grindarius/.cargo/bin/nu", "-c"]

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
  cd packages/scripts && node --loader ts-node/esm ./src/reset.ts

migrate:
  refinery migrate -c ./packages/api/refinery.toml -p ./migrations

seed:
  cd packages/scripts && node --loader ts-node/esm ./src/seed.ts

dev-api:
  cd packages/api && cargo watch -x run

dev-website:
  cd packages/website && pnpm dev
