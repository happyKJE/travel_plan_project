create table travel_plans
(
    id          int auto_increment
        primary key,
    user_id     int                                 not null,
    title       varchar(255)                        not null,
    date        varchar(50)                         null,
    description text                                null,
    created_at  timestamp default CURRENT_TIMESTAMP null,
    constraint travel_plans_ibfk_1
        foreign key (user_id) references users (id)
            on delete cascade
);

