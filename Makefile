build:
	docker build -t myts .
.PHONY: build

test: up
	docker-compose exec ${DOCKER_OPTIONS} app npm run test

test-ci: up
	DOCKER_OPTIONS="-T" $(MAKE) test

test-watch: up
	docker-compose exec ${DOCKER_OPTIONS} app npm run test:watch

up:
	docker-compose up -d

init: up install-dependencies

bash: up
	docker-compose exec app bash

install-dependencies: up
	docker-compose exec app sh -c "npm install"

down:
	docker-compose down
