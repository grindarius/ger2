create table transactions (
    id varchar(32) not null unique,
    user_id varchar(32) not null,
    price numeric(12, 3) not null,
    payment_status payment_status not null,
    transaction_type jsonb not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (id),
    foreign key (user_id) references users(id)
);

comment on column transactions.transaction_type is 'jsonb column of Rust enum defining what the action would be after the payment is done. This transaction table is aimed to store everything that needs payment to do after the transaction.';
