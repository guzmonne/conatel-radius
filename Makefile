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

remove:
	docker-compose rm -f

ps:
	docker-compose ps

logs:
	docker-compose logs -f