CREATE TABLE bannedusers (
    uid bigint NOT NULL,
    reason text,
    "timestamp" bigint
);

ALTER TABLE bannedusers OWNER TO user;

CREATE TABLE messages (
    message_id bigint,
    internal_message_id bigint,
    user_id bigint,
    "timestamp" bigint
);

ALTER TABLE messages OWNER TO user;

ALTER TABLE ONLY bannedusers
    ADD CONSTRAINT bannedusers_pkey PRIMARY KEY (uid);
