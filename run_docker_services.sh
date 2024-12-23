echo "Creating Docker network"
docker network create my_app_network

echo "Starting MongoDB container"
docker run -d \
  --name mongodb \
  --network my_app_network \
  -v mongo_data:/data/db \
  -p 27017:27017 \
  mongo:6.0
sleep 5

echo "Building backend Docker image"
cd Backend
docker build -t go_backend .

echo "Starting backend container"
docker run -d \
  --name go_backendcano \
  --network my_app_network \
  -e MONGO_URI=mongodb://mongodb:27017 \
  -p 8001:8001 \
  go_backend
cd ..

echo "Waiting for backend to initialize"
sleep 5

echo "Building frontend Docker image"
docker build -t react_frontend .

echo "Starting frontend container"
docker run -d \
  --name react_frontend \
  --network my_app_network \
  -p 3000:3000 \
  react_frontend

echo "Setup complete! "
docker ps

