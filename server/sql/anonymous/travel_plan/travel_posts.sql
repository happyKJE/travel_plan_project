create table travel_posts
(
    id         int auto_increment
        primary key,
    user_id    int                                 not null,
    title      varchar(255)                        not null,
    content    longtext                            not null,
    created_at timestamp default CURRENT_TIMESTAMP null,
    updated_at timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    image_url  varchar(500)                        null,
    constraint travel_posts_ibfk_1
        foreign key (user_id) references users (id)
            on delete cascade
);

create index user_id
    on travel_posts (user_id);

