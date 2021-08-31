FROM php:8-fpm

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version


RUN apt-get update && apt-get install -y \
    apt-transport-https \
    openssl \
    git \
    unzip \
    libzip-dev \
    libxml2-dev \
    gnupg \
    wget

RUN docker-php-ext-install pdo pdo_mysql opcache exif soap bcmath zip

RUN apt-get update && apt-get install -y \
    libmagickwand-dev --no-install-recommends \
    && pecl install imagick \
	&& docker-php-ext-enable imagick

RUN docker-php-ext-install gd

#WORKDIR /var/www/video-platform/backend
EXPOSE 9000

COPY init_script.sh init_script.sh
CMD ./init_script.sh
