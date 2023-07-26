CREATE DATABASE farm
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


BEGIN;


DROP TABLE IF EXISTS public.transaction;
DROP TABLE IF EXISTS public."milkProduction";
DROP TABLE IF EXISTS public.cow;
DROP TABLE IF EXISTS public.cattleman;
DROP TABLE IF EXISTS public.owner;

CREATE TABLE IF NOT EXISTS public.owner
(
    id bigserial NOT NULL,
    name character varying(50),
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS public.cattleman
(
    id bigserial NOT NULL,
    "createdBy" bigint NOT NULL,
    name character varying(50),
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS public.cow
(
    id bigserial NOT NULL,
    "createdBy" bigint NOT NULL,
    "updatedBy" bigint NOT NULL,
    name character varying(50),
    birthday date,
    deadday date,
    weight double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS public."milkProduction"
(
    id bigserial NOT NULL,
    "producedBy" bigint NOT NULL,
    "inputtedBy" bigint NOT NULL,
    "inputDate" timestamp with time zone NOT NULL,
    volume double precision NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS public.transaction
(
    id bigserial NOT NULL,
    "inputtedBy" bigint NOT NULL,
    volume double precision NOT NULL,
    buyer character varying(50),
    price double precision NOT NULL,
    date timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.cattleman
    ADD CONSTRAINT "createdBy" FOREIGN KEY ("createdBy")
    REFERENCES public.owner (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.cow
    ADD CONSTRAINT "createdBy" FOREIGN KEY ("createdBy")
    REFERENCES public.cattleman (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.cow
    ADD CONSTRAINT "updatedBy" FOREIGN KEY ("updatedBy")
    REFERENCES public.cattleman (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."milkProduction"
    ADD CONSTRAINT "producedBy" FOREIGN KEY ("producedBy")
    REFERENCES public.cow (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."milkProduction"
    ADD CONSTRAINT "inputtedBy" FOREIGN KEY ("inputtedBy")
    REFERENCES public.cattleman (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.transaction
    ADD CONSTRAINT "inputtedBy" FOREIGN KEY ("inputtedBy")
    REFERENCES public.cattleman (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;