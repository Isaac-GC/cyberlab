CREATE TABLE api_user (
    id int primary key,
    username varchar(255),
    first_name varchar(255),
    last_name varchar(255),
    password varchar(255),
    email varchar(255),
    last_login int,
    is_admin int,
    is_active int,
    unique(username)
);