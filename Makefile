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