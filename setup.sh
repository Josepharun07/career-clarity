#!/bin/bash

# Career Clarity - Complete Setup Script
# This script sets up the entire development environment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "=========================================="
echo "  Career Clarity - Setup Script"
echo "=========================================="
echo -e "${NC}"

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Detect docker compose command
DOCKER_COMPOSE_CMD=""
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    print_error "Neither 'docker-compose' nor 'docker compose' found!"
    exit 1
fi

print_info "Using: $DOCKER_COMPOSE_CMD"

# Check if Docker is installed
print_info "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed!"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi
print_success "Docker is installed"

# Check if Docker Compose is available
print_info "Checking Docker Compose installation..."
print_success "Docker Compose is available"

# Check if Node.js is installed
print_info "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    echo "Please install Node.js 20.9.0 or higher: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version must be 20.9.0 or higher. Current: $(node -v)"
    exit 1
fi
print_success "Node.js $(node -v) is installed"

# Stop and remove existing containers
print_info "Cleaning up existing containers..."
$DOCKER_COMPOSE_CMD down -v 2>/dev/null || true
print_success "Cleanup complete"

# Create .env.local if it doesn't exist
print_info "Setting up environment variables..."
if [ ! -f .env.local ]; then
    cat > .env.local << EOF
# MongoDB Connection
MONGODB_URI=mongodb://admin:careerclarity2024@localhost:27017/career_clarity?authSource=admin

# Application
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF
    print_success "Created .env.local"
else
    print_info ".env.local already exists, skipping..."
fi

# Install npm dependencies
print_info "Installing npm dependencies..."
npm install
print_success "Dependencies installed"

# Install additional required packages
print_info "Installing MongoDB and authentication packages..."
npm install mongodb mongoose bcryptjs
npm install -D @types/bcryptjs
print_success "MongoDB packages installed"

# Start Docker containers
print_info "Starting MongoDB container..."
$DOCKER_COMPOSE_CMD up -d
print_success "MongoDB container started"

# Wait for MongoDB to be ready
print_info "Waiting for MongoDB to be ready..."
max_attempts=30
attempt=0
while ! docker exec career-clarity-db mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        print_error "MongoDB failed to start after $max_attempts attempts"
        $DOCKER_COMPOSE_CMD logs mongodb
        exit 1
    fi
    echo -n "."
    sleep 1
done
echo ""
print_success "MongoDB is ready"

# Create required directories
print_info "Creating required directories..."
mkdir -p lib/models
mkdir -p app/api/auth/signup
mkdir -p app/api/auth/login
mkdir -p app/api/assessment/save
print_success "Directories created"

# Create global.d.ts if it doesn't exist
print_info "Creating TypeScript global declarations..."
if [ ! -f global.d.ts ]; then
    cat > global.d.ts << 'EOF'
declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}

export {};
EOF
    print_success "Created global.d.ts"
fi

# Display connection information
echo ""
echo -e "${GREEN}=========================================="
echo "  Setup Complete! 🎉"
echo -e "==========================================${NC}"
echo ""
echo -e "${BLUE}MongoDB Information:${NC}"
echo "  • Container: career-clarity-db"
echo "  • Host: localhost:27017"
echo "  • Database: career_clarity"
echo "  • Username: admin"
echo "  • Password: careerclarity2024"
echo ""
echo -e "${BLUE}Useful Commands:${NC}"
echo "  • Start dev server:    npm run dev"
echo "  • View MongoDB logs:   $DOCKER_COMPOSE_CMD logs -f mongodb"
echo "  • Stop MongoDB:        $DOCKER_COMPOSE_CMD down"
echo "  • Restart MongoDB:     $DOCKER_COMPOSE_CMD restart"
echo "  • MongoDB shell:       docker exec -it career-clarity-db mongosh"
echo ""
echo -e "${BLUE}Database Management:${NC}"
echo "  • View all users:      docker exec -it career-clarity-db mongosh -u admin -p careerclarity2024 --authenticationDatabase admin career_clarity --eval 'db.users.find().pretty()'"
echo "  • Drop database:       docker exec -it career-clarity-db mongosh -u admin -p careerclarity2024 --authenticationDatabase admin career_clarity --eval 'db.dropDatabase()'"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Run: npm run dev"
echo "  2. Open: http://192.168.1.50:3001"
echo "  3. Test the login and signup flow"
echo ""