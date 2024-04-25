# API docs
- Users
- Markets
- Response
- Tariffs
- Faq
- Prolong

Запросы к бэку идут из store

## DATA from Backend

### Get Markets
Пример json в /public/data/servers.json. В этом файле два маркета

#### Get Response
В файле /public/data/servers.json - объект response

### Get tariffs
Пример json в /public/data/tariffs.json. В этом файле 5 тарифов
Тариф содержит:
- id 
- name Наименование
- desc Описание
- price Цена в месяц
- price_year Цена за год
- info Доп.инфо
- icon Название иконки в /img/plans/
- request_a_day Количество запросов в день
- is_promo Включить параметр для вывода промо цен
- promo_price промо цена в месяц
- promo_price_year промо цена в год

### Get faq
Пример json в /public/data/faq.json. В этом файле 7 вопросов и ответов
Поддержка содержит:
- id
- title Вопрос
- text Ответ

## Таблицы
- Пользователь 
- Профиль (через userId пользователя) 
- Тарифы (через Id тарифа)
- Вопросы 


## Users
У пользователя есть id, name, email
У пользователя есть Профиль (пример в /public/data/profile.json) в котором указаны:
- id
- type Тип пользователя (юр, физ)
- ID Тарифа (из таблицы Тарифов)
- key Ключ
- key_days Срок действия ключа 
- requests Количество запросов
- used_requests Количество использованных запросов



