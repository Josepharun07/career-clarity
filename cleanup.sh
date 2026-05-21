#!/bin/bash

# Career Clarity - Cleanup Script

RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Detect docker compose command
DOCKER_COMPOSE_CMD=""
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    echo -e "${RED}Docker Compose not found!${NC}"
    exit 1
fi

echo -e "${YELLOW}Career Clarity - Cleanup${NC}"
echo "======================================"

read -p "This will stop and remove all containers and volumes. Continue? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Stopping containers..."
    $DOCKER_COMPOSE_CMD down -v
    
    echo "Removing node_modules..."
    rm -rf node_modules
    
    echo "Removing .next build..."
    rm -rf .next
    
    echo -e "${YELLOW}Cleanup complete!${NC}"
    echo "Run './setup.sh' to reinstall everything"
else
    echo "Cleanup cancelled"
fi