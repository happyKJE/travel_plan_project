create table users
(
    id          int auto_increment
        primary key,
    email       varchar(255)                        not null,
    password    varchar(255)                        not null,
    phoneNumber varchar(255)                        not null,
    name        varchar(255)                        null,
    created_at  timestamp default CURRENT_TIMESTAMP null,
    constraint email
        unique (email)
);

