# Запросы к backend
## Registration
/pages/registration.vue

Для регистрации в бэк отправляются:
payload:
- email,
- password,
- type Тип пользователя (string)


## Login
/pages/login.vue

Для входа в персональный кабинет, в бэк направляется:
payload:
- email
- password
```
await account.createEmailSession(emailRef.value, passwordRef.value);
const response = await account.get();
```

Ожидается
response:
- email
- name Имя пользователя,
- status boolean (Подтвержден email или нет)
- id пользователя

## Change Password
/pages/personal.vue

На сервер отправляется запрос, со старым и новым паролем, пользователь определяется по сессии
password - новый пароль
oldPassword - старый пароль
```

await account.updatePassword(password.value, oldPassword.value);
```

## Restore Password
В бэкенд отправляется запрос на восстановление пароля с email пользователя, для получения нового пароля
```
await account.restorePassword(userEmail.value)
```