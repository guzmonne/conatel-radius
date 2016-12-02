# Build docker image
build:
	docker-compose build

# Run docker compose
run:
	docker-compose up -d

# Stop docker-compose
stop:
	docker-compose stop

commit:
	cd ./app; npm run build
	docker-compose build app
	docker-compose up -d

rm:
	docker-compose rm -f

ps:
	docker-compose ps

logs:
	docker-compose logs -f

start:
	cd ./app; npm run start

serve:
	cd ./app; npm run serve

db:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up mysql

build-db:
	make rm
	make db
