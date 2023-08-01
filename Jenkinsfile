pipeline {
    agent any
    environment {
        IMAGE_NAME = 'bender'
        NAMESPACE = 'default'
        DEPLOYMENT_NAME = 'bender'
    }
    stages {
        stage('Package') {
            agent {
                docker {
                  image 'node:20'
                  args '-u root:root'
                }
            }
            steps {
                sh 'npm install'
                sh 'chown -R 108 node_modules/'
                stash name: 'dist', includes: "node_modules/**/*"
            }
        }
        stage('Build') {
            environment {
                GIT_COMMIT = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
            }
            steps {
                unstash 'dist'
                sh "docker build . -t gcr.io/green-talent-129607/${IMAGE_NAME}:${GIT_COMMIT}"
                sh "gcloud docker -- push gcr.io/green-talent-129607/${IMAGE_NAME}:${GIT_COMMIT}"
                sh "gcloud container images add-tag gcr.io/green-talent-129607/${IMAGE_NAME}:${GIT_COMMIT} gcr.io/green-talent-129607/${IMAGE_NAME}:latest"
            }
        }
        stage('Deploy to QA') {
            environment {
                GIT_COMMIT = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
            }
            steps {
                sh "gcloud container clusters get-credentials ${QA_CLUSTER_NAME} --zone us-central1-a --project green-talent-129607"
                sh "kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=gcr.io/green-talent-129607/${IMAGE_NAME}:${GIT_COMMIT} -n ${NAMESPACE}"
            }
        }
    }
}
