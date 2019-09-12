build:
	docker-compose build
.PHONY: build

up:
	docker-compose up
.PHONY: up

clean:
	docker-compose stop
	docker-compose rm -fv
.PHONY: clean

client:
	docker-compose run client yarn build
.PHONY: client