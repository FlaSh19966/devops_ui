pipeline {
    agent any
    stages {
        stage('front-end') {
            steps {
                sh 'echo "hello inside ui"'
                sh 'sudo rmdir /home/vimalesh/Learning/devops_ui/dist'
                sh 'npm run build'
                sh 'sudo service nginx stop'
                sh 'sudo rmdir /var/www/html/chatbot-dist/dist'
                sh 'sudo cp /home/vimalesh/Learning/devops_ui/dist /var/www/html/chatbot-dist/dist'
                sh 'sudo service nginx start'
            }
        }
    }
}