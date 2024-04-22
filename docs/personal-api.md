## Запросы в бэк

## Получение профиля
С бэка получается профиль по ID пользователя (из связанной таблицы Пользователи - Профиль пользователя (пример /public/data/profile.json))
```
{
        "name": "Jhon",
        "email": "jhon@test.ru",
        "requests": 2101,
        "used_requests": 200,
        "type": "fiz",
        "userId": "bc681d6c-b160-483b-a7f4-bd241538e0a4",
        "key_days": 104,
        "key": "_rW2yhl-l7NgfAATMFw7l0HpwNP5rorJElBzKkMXSQY",
        "$id": "662242b1a8e874490b5e",
        "$createdAt": "2024-04-19T10:08:49.702+00:00",
        "$updatedAt": "2024-04-21T09:38:33.154+00:00",
        "$permissions": [],
        "tariff": {
            "name": "Pro",
            "desc": "3000 запросов в сутки",
            "price": 7500,
            "info": "Оставшихся 25 дней по тарифу Basic будут пересчитаны в 12 дней по тарифу Pro.",
            "price_year": 90000,
            "icon": "/img/plans/3.svg",
            "enabled": true,
            "tariff_level": 3,
            "$id": "6618122f22b193c136b6",
            "$createdAt": "2024-04-11T16:39:11.142+00:00",
            "$updatedAt": "2024-04-20T09:06:50.618+00:00",
            "$permissions": [],
            "$databaseId": "markets-base",
            "$collectionId": "tariffs"
        },
        "$databaseId": "markets-base",
        "$collectionId": "users"
    }
```
### Смена тарифа
Идет запрос на обновление данных в Профиле пользователя, вида:

tariffId - id Тарифа для смены, string
key_days - количество дней тарифа (уже с учетом текущих дней, сконвертированных по новому тарифу (Например: было 25 дней, стало 5  если купил Ultra + 30 дней нового тарифа))
```
const changeData = {tariff:tariffId, key_days:convertDays}
authStore.patchProfileData(changeData)
```
### Докупить запросы
Идет запрос на обновление данных в Профиле пользователя, вида:
requests - выбранное количество запросов в сутки + текущее количество запросов (used_requests)

```
const buyRequestsData = {requests:parseInt(selectedValue.value) + authStore.getRequestValue}
authStore.patchProfileData(buyRequestsData)
```
### Продлить тариф
Идет запрос на обновление данных в Профиле пользователя, вида:
key_days - количество дней для продления текущего тарифа, уже с учетом имеющихся дней
```
const prolongData = { key_days: daysVolume }
authStore.patchProfileData(prolongData)
```