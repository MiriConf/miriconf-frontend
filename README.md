# miriconf-frontend

The miriconf NodeJS frontend.


## Running a local dev environment with Tilt on Windows

Clone this repository as well as the [MiriConf Backend](https://github.com/MiriConf/miriconf-backend) repository, make sure they are both in the same folder like below:

```
Documents
|
--> miriconf
    |
    --> miriconf-frontend
    |
    --> miriconf-backend
```

Install dependencies:

- Install scoop by running the below commands in PowerShell:

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

```
irm get.scoop.sh | iex
```

- Install Tilt and Helm by running the below command:

```
scoop install tilt helm
```

- Install Docker - https://www.docker.com/products/docker-desktop/
- Make sure docker is started and enable kubernetes in docker settings and run the below in PowerShell:

```
kubectl config use-context docker-desktop
```

Once dependencies are met, open a Powershell terminal in the miriconf-frontend folder and run `tilt up -f tiltfile-frontend` then press space to open tilt in your browser. You should now have the following available to access on your computer:

- miriconf-frontend running at http://localhost:8080 

- miriconf-backend api running at http://localhost:8081/api/v1 
 
- mongo-db admin panel running at http://localhost:8083
 
- swagger api docs at http://localhost:8081/swagger/index.html.
