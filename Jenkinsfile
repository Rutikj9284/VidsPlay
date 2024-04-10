pipeline {
    agent any

    triggers {
        pollSCM('*/5 * * * *')
    }

    stages {
        stage('Build frontend') {
            steps {
                dir('frontend') {
                    script {
                        sh 'yarn install'
                        sh 'yarn build'
                    }
                }
            }
        }
        stage('Run frontend tests') {
            steps {
                dir('frontend') {
                    script {
                        sh 'yarn test'
                    }
                }
            }
        }
        stage('Deploy to Vercel') {
            steps {
                script {
                    //Vercel CLI installed on your Jenkins server
                    sh 'vercel https://vids-play-frontend.vercel.app/'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Application deployed to Vercel.'
        }
        failure {
            echo 'Pipeline failed! Application deployment to Vercel aborted.'
        }
    }
}
