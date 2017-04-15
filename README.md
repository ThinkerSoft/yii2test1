# Yii2 REST API + ExtJS 6 + PostgreSQL (Тестовое задание)

Проект включает:
* Backend
    - Yii2 REST API
* Frontend
    - ExtJS 6

## Как использовать

Откройте консоль и выполните следующие команды.

```
$ git clone https://github.com/ThinkerSoft/yii2test1.git
$ cd yii2test1 
$ cd backend
$ composer install
```

Cоздайте новую базу данных, отредактируйте файл 'backend/config/db.php' и запустите миграции, выполнив в консоли:
```
$ ./yii migrate/up
``` 

Настройте сервер nginx. Создайте конфигурацию следующего содержания (отредактируйте такие параметры конфигурации, как listen, server_name, root, access_log, error_log и fastcgi_pass, так как необходимо вам):

```
server {
    charset utf-8;
    client_max_body_size 128M;

    listen 8393; ## здесь укажите порт, на который nginx будет принимать запросы 

    server_name yii2test1.local; ## укажите имя сервера
    root        /path/to/yii2test1/backend/web; ## здесь укажите путь до директории web проекта
    index       index.php;

    access_log  /var/log/nginx/yii2test1-access.log; ## настройте расположение лог-файлов
    error_log   /var/log/nginx/yii2test1-error.log;

    location / {
        # Redirect everything that isn't a real file to index.php
        try_files $uri $uri/ /index.php$is_args$args;
    }

    # deny accessing php files for the /assets directory
    location ~ ^/assets/.*\.php$ {
        deny all;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fastcgi_pass 127.0.0.1:9000;
        fastcgi_pass unix:/var/run/php7.0-fpm.sock;
        try_files $uri =404;
    }

    location ~* /\. {
        deny all;
    }
}
```

Не забудьте сделать симлинк на вашу конфигурацию и перезапутите nginx:
```
$ ln -s /etc/nginx/sites-available/yii2test1 /etc/nginx/sites-enabled/
$ /etc/init.d/nginx restart
```

Для доступа к приложению по имени сервера необходимо изменить файл `/etc/hosts`, добавив:
```
127.0.0.1       yii2test1.local
```

Откройте браузер и запустите приложение (при необходимости укажите свой порт):
[http://localhost:8393](http://localhost:8393) или [http://yii2test1.local:8393](http://yii2test1.local:8393)
