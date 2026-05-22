pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDS = 'docker-hub-creds'
        DOCKER_IMAGE = 'delvinjoseph07/career-clarity'
        SNYK_TOKEN = credentials('snyk-token')
        MONGODB_URI = 'mongodb://localhost:27017/career_clarity_build' 
    }

    tools {
        nodejs 'NodeJS_20'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Josepharun07/career-clarity.git'
            }
        }

        stage('2. Build Artifact') {
            steps {
                echo 'Building Next.js Application and Docker Image...'
                sh 'npm ci'
                sh 'npm run build'
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('3. Test') {
            steps {
                echo 'Running Advanced Jest Unit & Integration Tests with Coverage...'
                sh 'npm test -- --coverage'
            }
        }

        stage('4. Code Quality (SonarQube)') {
            steps {
                echo 'Running Code Quality Analysis...'
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('5. Security (Snyk)') {
            steps {
                echo 'Scanning dependencies for vulnerabilities...'
                sh 'npx snyk auth ${SNYK_TOKEN}'
                sh 'npx snyk test --all-projects --severity-threshold=high || true'
                sh 'npx snyk monitor --all-projects || true'
            }
        }

        stage('6. Deploy (Staging)') {
            steps {
                echo 'Deploying Next.js Application & MongoDB database using native Docker...'
                script {
                    sh 'docker network create career-clarity-network || true'
                    sh 'docker stop career-clarity-web career-clarity-db || true'
                    sh 'docker rm career-clarity-web career-clarity-db || true'
                    
                    sh '''
                        docker run -d --name career-clarity-db \
                        --network career-clarity-network \
                        -e MONGO_INITDB_ROOT_USERNAME=admin \
                        -e MONGO_INITDB_ROOT_PASSWORD=careerclarity2024 \
                        -e MONGO_INITDB_DATABASE=career_clarity \
                        -p 27017:27017 \
                        mongo:7.0
                    '''
                    
                    sh """
                        docker run -d --name career-clarity-web \
                        --network career-clarity-network \
                        -p 3000:3000 \
                        -e MONGODB_URI=mongodb://admin:careerclarity2024@career-clarity-db:27017/career_clarity?authSource=admin \
                        ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    """
                }
                echo "App is now running locally at http://localhost:3000!"
            }
        }

        stage('7. Release (Docker Hub)') {
            steps {
                echo 'Releasing Docker Image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                    sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('8. Monitoring & Health Check') {
            steps {
                echo 'Verifying deployment health and Prometheus monitoring via Docker...'
                script {
                    sleep time: 5, unit: 'SECONDS'
                    
                    sh '''
                        if [ "$(docker inspect -f '{{.State.Running}}' career-clarity-web)" = "true" ]; then 
                            echo "SUCCESS: Next.js application container is active and running!"
                        else 
                            echo "ERROR: Next.js container failed to start!" && exit 1
                        fi
                    '''
                    
                    sh '''
                        if [ "$(docker inspect -f '{{.State.Running}}' prometheus-server)" = "true" ]; then 
                            echo "SUCCESS: Prometheus monitoring server is active and running!"
                        else 
                            echo "WARNING: Prometheus container is not running!"
                        fi
                    '''
                }
            }
        }
    }
}