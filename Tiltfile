load('ext://git_resource', 'git_checkout')
git_checkout('git@github.com:MiriConf/miriconf-backend.git#main', '../miriconf-backend')

include('../miriconf-backend/Tiltfile')

docker_build('miriconf-frontend', '.', dockerfile='dev-deploy/Dockerfile')
k8s_yaml('dev-deploy/deployment.yaml')
k8s_resource('miriconf-frontend', port_forwards=8080)