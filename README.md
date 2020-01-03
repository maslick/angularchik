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

## Use in your projects
* Add env variable names to variables.ini, e.g.:
```zsh
$ cat docker/variables.ini
URL
USER
KEY
```

* Add this code snippet to your main index.html (put in to ``<header></header>``):
```html
<script>
  window.ENV = {
      backendUrl: "${URL}",
      user: "${USER}",
      key: "${KEY}"
  };
</script>
``` 

* Add an environment file:
```zsh
$ cat src/environments/runtimeEnvironment.ts
declare var ENV;

export const runtimeEnvironment = {
  backendUrl: ENV.backendUrl === '${URL}' ? 'www.google.com' : ENV.backendUrl,
  user: ENV.user === '${USER}' ? 'user' : ENV.user,
  key: ENV.key === '${KEY}' ? '12345' : ENV.key
};
```

* Use the injected env vars in your code (see [settings.component.ts](src/app/settings/settings.component.ts) for a complete example):
```typescript
import { runtimeEnvironment } from '@env/environment.runtime';
console.log(runtimeEnvironment.backendUrl);
```
