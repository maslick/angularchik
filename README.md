# angular-chik
runtime-configurable static angular web-app

[![image size](https://img.shields.io/badge/image%20size-49MB-blue.svg)](https://hub.docker.com/r/maslick/angularchik)

## Docker multistage build
[Here](docker/Dockerfile) I'm using ``node:12`` image as build image and ``nginx:stable`` as runtime image. This reduces image size from ~500MB to 50MB (zipped).

* Build yourself:
```zsh
docker build -t angularchik -f docker/Dockerfile .
docker image prune --filter label=stage=intermediate -f
docker run -d \
   -e URL=maslick.io \
   -e USER=test \
   -e KEY=54321 \
   -p 8081:8080 \
   angularchik:latest
open http://`docker-machine ip`:8081
```

* Download from Dockerhub: 
```zsh
docker run -d \
   -e URL=maslick.ru \
   -e USER=test \
   -e KEY=12345 \
   -p 8082:8080 \
   maslick/angularchik:latest
open http://`docker-machine ip`:8082
```

## Kubernetes
```
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/ingress_dns.yaml
```

* Update environment settings:
```
k set env deployment/angularchik \
   URL=www.yandex.ru \
   USER=maslick \
   KEY=987654321
```
