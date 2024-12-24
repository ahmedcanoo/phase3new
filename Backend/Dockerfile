FROM golang:1.23
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .
EXPOSE 8001


ENV MONGO_URI="mongodb+srv://ahmedtarek123120:lWHFgRNiG82KGC2c@cluster0.49tbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

CMD ["./main"]
