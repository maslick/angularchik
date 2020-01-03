```zsh
docker build -t angularchik:test -f docker/Dockerfile.lite .
docker run -d \
   -e URL=maslick.ru \
   -e USER=test \
   -e KEY=12345 \
   -p 8082:8080 \
   maslick/angularchik:test
open http://`docker-machine ip`:8082
```
