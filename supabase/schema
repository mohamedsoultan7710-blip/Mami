-- ============================================================
-- Schéma Supabase — Révision Arabe (5e année bilingue, EBT Djibouti)
-- ============================================================
-- À exécuter une seule fois dans : Supabase → SQL Editor → New query
-- (copier-coller tout ce fichier, puis cliquer sur "Run").
--
-- La liste des élèves N'EST PAS stockée dans Supabase : elle vit dans
-- le fichier data/students.ts du projet (source officielle, fournie
-- par l'enseignante). Seuls les points de participation et les
-- résultats des devoirs sont stockés ici, reliés aux élèves par leur
-- identifiant texte (ex: "s01").

create extension if not exists pgcrypto;

-- Points de participation en classe
create table if not exists participation_scores (
  student_id text primary key,
  score integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Tentatives de devoir (2 maximum par élève, imposé côté serveur)
create table if not exists homework_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id text not null,
  attempt_number smallint not null check (attempt_number in (1, 2)),
  score integer not null,
  total integer not null,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (student_id, attempt_number)
);

-- Sécurité (RLS) : activée sur les deux tables, sans AUCUNE politique
-- pour le rôle "anon" (celui du navigateur). Résultat : par défaut,
-- personne ne peut lire ni écrire directement depuis le navigateur.
-- Toutes les lectures/écritures passent obligatoirement par les routes
-- /api/... de l'application, qui utilisent la clé secrète "service role"
-- (jamais exposée au navigateur) et appliquent leurs propres vérifications
-- (mot de passe admin pour la participation, limite de 2 tentatives pour
-- les devoirs, etc.)

alter table participation_scores enable row level security;
alter table homework_attempts enable row level security;
