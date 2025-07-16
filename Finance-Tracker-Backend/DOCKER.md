# Docker Setup for Finance Tracker Backend

This document provides instructions for running the Finance Tracker Backend using Docker.

## 🐳 Quick Start

### Production Setup
```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

### Development Setup
```bash
# Start development environment
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.dev.yml logs -f

# Stop development environment
docker compose -f docker-compose.dev.yml down
```

## 📁 Docker Files Overview

### `Dockerfile`
- Production-ready Docker image
- Multi-stage build for optimization
- Non-root user for security
- Health check included

### `Dockerfile.dev`
- Development environment
- Includes all dev dependencies
- Hot reload support
- Volume mounting for live code changes

### `docker-compose.yml`
- Production environment setup
- PostgreSQL database
- Redis cache (optional)
- Network isolation
- Volume persistence

### `docker-compose.dev.yml`
- Development environment setup
- Hot reload with volume mounting
- Development database
- Simplified for local development

## �� Usage Instructions

### 1. Production Deployment

```bash
# Clone the repository
git clone <repository-url>
cd Finance-Tracker-Backend

# Create environment file
cp .env.example .env
# Edit .env with your production values

# Build and start services
docker compose up -d --build

# Check service status
docker compose ps

# View logs
docker compose logs -f api
```

### 2. Development Environment

```bash
# Start development environment
docker compose -f docker-compose.dev.yml up -d

# Make code changes (they will be reflected automatically)
# View logs
docker compose -f docker-compose.dev.yml logs -f api
```

### 3. Database Management

```bash
# Access PostgreSQL shell
docker compose exec postgres psql -U postgres -d finance_tracker

# Run database migrations (if needed)
docker compose exec api npm run db:migrate

# Backup database
docker compose exec postgres pg_dump -U postgres finance_tracker > backup.sql
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres_password@postgres:5432/finance_tracker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Application
NODE_ENV=production
PORT=5000
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### Port Configuration

- **API**: `http://localhost:5000`
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379` (optional)

## 🐳 Docker Commands

### Build Images
```bash
# Build production image
docker build -t finance-tracker-api .

# Build development image
docker build -f Dockerfile.dev -t finance-tracker-api:dev .
```

### Run Individual Containers
```bash
# Run PostgreSQL only
docker run -d \
  --name postgres \
  -e POSTGRES_DB=finance_tracker \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres_password \
  -p 5432:5432 \
  postgres:15-alpine

# Run API with database connection
docker run -d \
  --name api \
  --link postgres \
  -e DATABASE_URL=postgresql://postgres:postgres_password@postgres:5432/finance_tracker \
  -p 5000:5000 \
  finance-tracker-api
```

### Management Commands
```bash
# View running containers
docker ps

# View container logs
docker logs finance_tracker_api

# Execute commands in container
docker exec -it finance_tracker_api sh

# Stop and remove containers
docker compose down -v

# Remove all images
docker compose down --rmi all
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :5000
   
   # Kill the process or change port in docker-compose.yml
   ```

2. **Database Connection Issues**
   ```bash
   # Check database container status
   docker compose ps postgres
   
   # Check database logs
   docker compose logs postgres
   
   # Test database connection
   docker compose exec postgres psql -U postgres -d finance_tracker
   ```

3. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   
   # Rebuild containers
   docker compose down
   docker compose up --build
   ```

### Health Checks

The application includes health checks to ensure services are running properly:

```bash
# Check API health
curl http://localhost:5000/api/health

# Check database health
docker compose exec postgres pg_isready -U postgres
```

## 📊 Monitoring

### Resource Usage
```bash
# View resource usage
docker stats

# View disk usage
docker system df
```

### Logs
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs api

# Follow logs in real-time
docker compose logs -f api postgres
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **Network Isolation**: Services communicate through Docker networks
3. **Non-root User**: Application runs as non-root user in production
4. **Secrets Management**: Use Docker secrets or external secret management for production

## 🚀 Production Deployment

For production deployment, consider:

1. **Load Balancer**: Use nginx or similar for load balancing
2. **SSL/TLS**: Configure HTTPS with proper certificates
3. **Monitoring**: Implement proper logging and monitoring
4. **Backup Strategy**: Regular database backups
5. **Scaling**: Use Docker Swarm or Kubernetes for scaling

## �� Additional Notes

- The development setup includes volume mounting for hot reload
- Production setup uses multi-stage builds for smaller images
- Health checks ensure service availability
- Database data is persisted using Docker volumes
- Redis is included for potential caching needs

## 🔧 Docker Compose Version Compatibility

**Note**: This project uses the newer `docker compose` command (without hyphen) which is available in Docker Desktop v20.10.13+ and Docker Compose v2.0+.

If you're using an older version, you may need to install Docker Compose separately or use the legacy `docker-compose` command.

### Check Your Docker Version
```bash
docker --version
docker compose version
```

### Install Docker Compose (if needed)
```bash
# For macOS (using Homebrew)
brew install docker-compose

# For Linux
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

For more information, refer to the main README.md file. 