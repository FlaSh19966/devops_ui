pipeline {
    agent any
    stages {
        stage('front-end') {
            steps {
                sh 'echo "hello inside ui"'
                sh 'npm install'
                sh 'npm run build'
                sh 'sudo service nginx stop'
                sh 'sudo rm -r /var/www/html/chatbot-dist/dist'
                sh 'sudo cp /var/lib/jenkins/workspace/first_pipeline_vimalesh_ui_dev /var/www/html/chatbot-dist/dist'
                sh 'sudo service nginx start'
            }
        }
    }
}