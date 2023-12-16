create table transactions (
    id varchar(32) not null unique,
    account_id varchar(32) not null,
    payment_method varchar(255) not null,
    price numeric(12, 3) not null,
    payment_status payment_status not null,
    transaction_type jsonb not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
    primary key (id),
    foreign key (account_id) references accounts(id)
);

comment on column transactions.transaction_type is 'jsonb column of Rust enum defining what the action would be after the payment is done. This transaction table is aimed to store everything that needs payment to do after the transaction.';
