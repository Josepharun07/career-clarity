#!/bin/bash

# Career Clarity - Status Check Script

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Career Clarity - System Status${NC}"
echo "======================================"

# Check Docker
if docker ps | grep -q career-clarity-db; then
    echo -e "${GREEN}✓ MongoDB Container: Running${NC}"
    docker ps --filter "name=career-clarity-db" --format "  Port: {{.Ports}}"
else
    echo -e "${RED}✗ MongoDB Container: Not Running${NC}"
fi

# Check MongoDB connection
if docker exec career-clarity-db mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ MongoDB: Connected${NC}"
    
    # Get database stats
    DB_STATS=$(docker exec career-clarity-db mongosh -u admin -p careerclarity2024 --authenticationDatabase admin career_clarity --quiet --eval "JSON.stringify({users: db.users.countDocuments(), assessments: db.assessments.countDocuments()})" 2>/dev/null)
    
    if [ ! -z "$DB_STATS" ]; then
        echo "  $DB_STATS"
    fi
else
    echo -e "${RED}✗ MongoDB: Not Connected${NC}"
fi

# Check Node.js process
if pgrep -f "next dev" > /dev/null; then
    echo -e "${GREEN}✓ Next.js Dev Server: Running${NC}"
else
    echo -e "${YELLOW}○ Next.js Dev Server: Not Running${NC}"
    echo "  Run: npm run dev"
fi

echo "======================================"