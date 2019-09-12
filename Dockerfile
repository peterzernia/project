FROM golang:1.13-alpine

WORKDIR /go/src/github.com/peterzernia/project

COPY go.mod /go/src/github.com/peterzernia/project
COPY go.sum /go/src/github.com/peterzernia/project

RUN go mod download

COPY . /go/src/github.com/peterzernia/project

# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build

EXPOSE 8001