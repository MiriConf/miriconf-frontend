docker_build('miriconf-frontend', '.', dockerfile='dev-deploy/Dockerfile')
k8s_yaml('dev-deploy/deployment.yaml')
k8s_resource('miriconf-frontend', port_forwards=8080)