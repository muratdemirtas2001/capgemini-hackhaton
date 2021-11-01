drop table if exists sessions cascade;
drop table if exists users cascade;
drop table if exists modules cascade;
drop table if exists cohorts cascade;
drop table if exists clubs cascade;
drop table if exists skills cascade;
drop table if exists zoom cascade;
CREATE TABLE public.users (
    id uuid NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    cohort character varying,
    user_type character varying NOT NULL,
    html_css boolean,
    javascript boolean,
    react boolean,
    node boolean,
    postgresql boolean,
    mongodb boolean
);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TABLE public.cohorts (
    id integer NOT NULL,
    cohort character varying NOT NULL
);
CREATE SEQUENCE public.cohorts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
​ALTER SEQUENCE public.cohorts_id_seq OWNED BY public.cohorts.id;
​ALTER TABLE ONLY public.cohorts ALTER COLUMN id SET DEFAULT nextval('public.cohorts_id_seq'::regclass);
​ALTER TABLE ONLY public.cohorts
    ADD CONSTRAINT cohorts_pkey PRIMARY KEY (id);
​CREATE TABLE public.modules (
    id integer NOT NULL,
    module_name character varying NOT NULL,
    week integer,
    coursework_link character varying,
    module_subject character varying
);
​CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
​ALTER SEQUENCE public.subjects_id_seq OWNED BY public.modules.id;
​ALTER TABLE ONLY public.modules ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);
​ALTER TABLE ONLY public.modules
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);
​INSERT INTO users (id,firstname,lastname,email,password,user_type) VALUES ('f8ed3880-a212-470c-83b5-edae3e5e0643', 'Admin','Admin','admin@gmail.com','8f431f91fe3bca534b10287cc9db2dbed393d38946bc0cb8f9eb2898673dbe43','admin');
​CREATE TABLE public.clubs (
    id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    club_name character varying NOT NULL,
    cutoff_date timestamp without time zone NOT NULL
);
​CREATE SEQUENCE public.clubs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
​ALTER SEQUENCE public.clubs_id_seq OWNED BY public.clubs.id;
​ALTER TABLE ONLY public.clubs ALTER COLUMN id SET DEFAULT nextval('public.clubs_id_seq'::regclass);
​ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (id);
    
CREATE TABLE public.sessions (
    id integer NOT NULL,
    club_id integer NOT NULL,
    user_id uuid NOT NULL,
    booking_status boolean ,
    attendance_status boolean,
    free_note character varying,
    module_id integer
);
​CREATE SEQUENCE public.booked_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
​ALTER SEQUENCE public.booked_sessions_id_seq OWNED BY public.sessions.id;
​ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.booked_sessions_id_seq'::regclass);
​ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT booked_sessions_pkey PRIMARY KEY (id);
​ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_club_id_fkey FOREIGN KEY (club_id) REFERENCES public.clubs(id);
​ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id);
​ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id); 
    
CREATE TABLE public.skills (
    id integer NOT NULL,
    skill character varying NOT NULL
);
​CREATE SEQUENCE public.skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
​ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;
​ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);
​ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);
        
  CREATE TABLE public.zoom (
    id integer NOT NULL,
    zoom_link character varying NOT NULL
);
​CREATE SEQUENCE public.zoom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
​
ALTER SEQUENCE public.zoom_id_seq OWNED BY public.zoom.id;
​
ALTER TABLE ONLY public.zoom ALTER COLUMN id SET DEFAULT nextval('public.zoom_id_seq'::regclass);
​
ALTER TABLE ONLY public.zoom
    ADD CONSTRAINT zoom_pkey PRIMARY KEY (id);
    
    
 
 INSERT INTO clubs (start_date,end_date,club_name,cutoff_date) VALUES ('2021-10-13 18:00:00','2021-10-13 20:00:00','HWC-1','2021-10-08 18:00:00');                        
 INSERT INTO clubs (start_date,end_date,club_name,cutoff_date) VALUES ('2021-10-27 18:00:00','2021-10-27 20:00:00','HWC-2','2021-10-22 18:00:00');
 INSERT INTO clubs (start_date,end_date,club_name,cutoff_date) VALUES ('2021-11-10 18:00:00','2021-11-10 20:00:00','HWC-3','2021-11-05 18:00:00');                        
       
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('HTML-CSS',1,'https://syllabus.codeyourfuture.io/html-css/week-1/homework','html_css');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('HTML-CSS',2,'https://syllabus.codeyourfuture.io/html-css/week-2/homework','html_css');
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('HTML-CSS',3,'https://syllabus.codeyourfuture.io/html-css/week-3/homework','html_css');
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-1',1,'https://syllabus.codeyourfuture.io/js-core-1/week-1/homework','javascript') ;                       
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-1',2,'https://syllabus.codeyourfuture.io/js-core-1/week-2/homework','javascript')  ;                      
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-1',3,'https://syllabus.codeyourfuture.io/js-core-1/week-3/homework','javascript') ;                       
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-2',1,'https://syllabus.codeyourfuture.io/js-core-2/week-1/homework','javascript') ;                       
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-2',2,'https://syllabus.codeyourfuture.io/js-core-2/week-2/homework','javascript')   ;                     
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-2',3,'https://syllabus.codeyourfuture.io/js-core-2/week-3/homework','javascript')   ;                     
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-3',1,'https://syllabus.codeyourfuture.io/js-core-3/week-1/homework','javascript')  ;                      
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-3',2,'https://syllabus.codeyourfuture.io/js-core-3/week-2/homework','javascript') ;                       
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('JavaScript Core-3',3,'https://syllabus.codeyourfuture.io/js-core-3/week-3/homework','javascript');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('React',1,'https://syllabus.codeyourfuture.io/react/week-1/homework','react') ;                       
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('React',2,'https://syllabus.codeyourfuture.io/react/week-2/homework','react');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('React',3,'https://syllabus.codeyourfuture.io/react/week-3/homework','react');   
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('Node',1,'https://syllabus.codeyourfuture.io/node/week-1/homework','node');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('Node',2,'https://syllabus.codeyourfuture.io/node/week-2/homework','node');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('Node',3,'https://syllabus.codeyourfuture.io/node/week-3/homework','node');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('PostgreSQL',1,'https://syllabus.codeyourfuture.io/db/week-1/homework','postgresql');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('PostgreSQL',2,'https://syllabus.codeyourfuture.io/db/week-2/homework','postgresql');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('PostgreSQL',3,'https://syllabus.codeyourfuture.io/db/week-3/homework','postgresql');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('MongoDB',1,'https://syllabus.codeyourfuture.io/mongodb/week-1/homework','mongodb');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('MongoDB',2,'https://syllabus.codeyourfuture.io/mongodb/week-2/homework','mongodb');                        
 INSERT INTO modules (module_name,week,coursework_link,module_subject) VALUES ('MongoDB',3,'https://syllabus.codeyourfuture.io/mongodb/week-3/homework','mongodb');                        
​
​
​
  INSERT INTO cohorts (cohort) VALUES ('London-8');                        
  INSERT INTO cohorts (cohort) VALUES ('West Midland-3');                        
​
 
  INSERT INTO zoom (zoom_link) VALUES ('https://zoom.us/j/93139078501?pwd=MzhJQS9VRWIxRWVMZkZQZjZTTmFhZz09') ;                       
                          
  INSERT INTO skills (skill) VALUES ('Html-CSS');
  INSERT INTO skills (skill) VALUES ('Java Script');
  INSERT INTO skills (skill) VALUES ('React');
  INSERT INTO skills (skill) VALUES ('Node');
  INSERT INTO skills (skill) VALUES ('PostgreSQL');
  INSERT INTO skills (skill) VALUES ('MongoDB');