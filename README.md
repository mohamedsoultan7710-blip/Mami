# مراجعة اللغة العربية — Révision Arabe (5e année bilingue, EBT Djibouti)

Prototype fonctionnel avec 3 interfaces qui partagent les mêmes données :

- **`/classe`** — mode projeté, contrôlé par l'enseignante (aucune connexion requise)
- **`/participation`** — gestion des points de participation (protégée par mot de passe)
- **`/devoir`** — devoir à faire à la maison, 2 tentatives max par élève (public, chaque élève choisit son nom)
- **`/admin/devoir`** — suivi des devoirs pour l'enseignante (protégée par mot de passe)

Stack : Next.js 16 (App Router, TypeScript) + Tailwind CSS + Supabase + Vercel.

Ce document t'accompagne **étape par étape, du premier fichier jusqu'au site en ligne**. Ne saute aucune étape : chacune dépend de la précédente. Si une commande affiche une erreur, arrête-toi et relis le message avant de continuer.

---

## Ce dont tu as besoin avant de commencer

1. Un ordinateur avec **Node.js** installé (version 18 ou plus récente).
   - Pour vérifier : ouvre un terminal et tape `node -v`. Si tu vois une erreur "commande introuvable", installe Node.js depuis https://nodejs.org (bouton "LTS").
2. Un compte **Supabase** (gratuit) : https://supabase.com
3. Un compte **GitHub** (gratuit) : https://github.com
4. Un compte **Vercel** (gratuit) : https://vercel.com (tu peux te connecter directement avec ton compte GitHub, c'est le plus simple)

---

## ÉTAPE 1 — Installer le projet sur ton ordinateur

1. Dézippe le dossier `revision-arabe` que je t'ai envoyé, à l'endroit de ton choix (par exemple sur ton Bureau).
2. Ouvre un terminal.
3. Déplace-toi dans le dossier du projet. Exemple si tu l'as mis sur le Bureau :
   ```bash
   cd Desktop/revision-arabe
   ```
4. Installe les dépendances du projet (cette commande télécharge tout ce dont le site a besoin pour fonctionner) :
   ```bash
   npm install
   ```
   Attends que la commande se termine (30 secondes à 2 minutes selon ta connexion). Tu peux voir des avertissements ("warn"), ce n'est pas grave ; seul un message contenant "error" serait un problème.

---

## ÉTAPE 2 — Créer le projet Supabase (la base de données)

Supabase stocke uniquement deux choses : les points de participation et les résultats des devoirs. La liste des élèves, elle, est directement écrite dans le code (fichier `data/students.ts`).

1. Va sur https://supabase.com et connecte-toi (ou crée un compte).
2. Clique sur **"New project"**.
3. Choisis un nom (exemple : `revision-arabe`), un mot de passe pour la base de données (note-le quelque part, mais tu n'en auras pas besoin directement), et une région proche (par exemple Europe).
4. Clique sur **"Create new project"** et attends 1 à 2 minutes que Supabase prépare le projet.
5. Une fois le projet prêt, dans le menu de gauche, clique sur **"SQL Editor"**.
6. Clique sur **"New query"**.
7. Ouvre le fichier `supabase/schema.sql` du projet (avec un simple éditeur de texte), copie **tout son contenu**, colle-le dans l'éditeur SQL de Supabase.
8. Clique sur **"Run"** (ou "RUN" en bas à droite). Tu dois voir un message de succès ("Success. No rows returned").
9. Dans le menu de gauche, clique sur **"Project Settings"** (l'icône ⚙️ en bas), puis sur **"API"**.
10. Note (garde cette page ouverte, tu en as besoin à l'étape suivante) :
    - **Project URL** (ressemble à `https://xxxxxxxxxxx.supabase.co`)
    - **anon public** key (une longue chaîne de caractères)
    - **service_role** key (une autre longue chaîne — clique sur "Reveal" pour la voir). ⚠️ Cette clé est secrète, ne la partage avec personne et ne la publie jamais sur internet.

---

## ÉTAPE 3 — Configurer les variables d'environnement

1. Dans le dossier du projet, fais une copie du fichier `.env.example` et renomme cette copie en `.env.local` (exactement ce nom, avec le point au début).
   - Sur Mac/Linux, dans le terminal (toujours dans le dossier `revision-arabe`) :
     ```bash
     cp .env.example .env.local
     ```
   - Sur Windows (PowerShell) :
     ```powershell
     copy .env.example .env.local
     ```
2. Ouvre `.env.local` avec un éditeur de texte et remplis chaque ligne avec les valeurs de l'étape 2 :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=colle-ici-la-clé-anon-public
   SUPABASE_SERVICE_ROLE_KEY=colle-ici-la-clé-service_role
   ADMIN_PASSWORD=choisis-un-mot-de-passe-pour-la-maman
   ADMIN_SESSION_SECRET=une-suite-de-caractères-au-hasard-par-exemple-x7k9-mLp2-qR4t
   ```
   - `ADMIN_PASSWORD` : c'est le mot de passe que la maman tapera pour accéder à `/participation` et `/admin/devoir`. Choisis quelque chose de simple à retenir pour elle mais que les élèves ne devineront pas.
   - `ADMIN_SESSION_SECRET` : n'importe quelle suite de caractères, du moment qu'elle reste secrète (invente-la, aucune signification particulière).
3. Enregistre le fichier.

---

## ÉTAPE 4 — Tester le site sur ton ordinateur

1. Dans le terminal (dossier `revision-arabe`), lance :
   ```bash
   npm run dev
   ```
2. Attends de voir une ligne du type `- Local: http://localhost:3000`.
3. Ouvre ton navigateur à l'adresse : http://localhost:3000
4. Vérifie chaque interface :
   - **http://localhost:3000/classe** → clique sur "🚀 ابدأ المراجعة", choisis un niveau, réponds à une question.
   - **http://localhost:3000/devoir** → choisis un nom d'élève, fais le quiz jusqu'au bout, vérifie que le score s'affiche.
   - **http://localhost:3000/admin/login** → connecte-toi avec le mot de passe choisi à l'étape 3 → tu dois arriver sur `/admin/devoir` et voir le tableau avec le résultat du devoir que tu viens de faire.
   - **http://localhost:3000/participation** → clique sur quelques `+` puis sur "🏆 النتائج" pour voir le classement.
5. Pour arrêter le serveur de test : reviens dans le terminal et appuie sur `Ctrl + C`.

Si tout fonctionne, tu es prêt à mettre le site en ligne.

---

## ÉTAPE 5 — Mettre le code sur GitHub

1. Va sur https://github.com/new
2. Donne un nom au dépôt, par exemple `revision-arabe` (peu importe qu'il soit public ou privé — privé est plus prudent).
3. Ne coche **aucune** case (pas de README, pas de .gitignore, pas de licence) — le projet en a déjà.
4. Clique sur **"Create repository"**.
5. GitHub affiche des commandes. Dans ton terminal, toujours dans le dossier `revision-arabe`, tape (une ligne à la fois, en attendant que chacune se termine) :
   ```bash
   git init
   git add .
   git commit -m "Première version de la plateforme de révision arabe"
   git branch -M main
   git remote add origin https://github.com/TON-NOM-UTILISATEUR/revision-arabe.git
   git push -u origin main
   ```
   (remplace `TON-NOM-UTILISATEUR` par ton nom d'utilisateur GitHub — copie l'adresse exacte affichée sur la page GitHub après la création du dépôt, elle est déjà correcte).
6. Rafraîchis la page GitHub : tu dois voir tous les fichiers du projet (le fichier `.env.local` ne doit PAS apparaître — c'est normal et voulu, il contient tes clés secrètes).

---

## ÉTAPE 6 — Déployer sur Vercel

1. Va sur https://vercel.com et connecte-toi avec ton compte GitHub.
2. Clique sur **"Add New..."** → **"Project"**.
3. Trouve ton dépôt `revision-arabe` dans la liste et clique sur **"Import"**.
4. Dans la section **"Environment Variables"**, ajoute exactement les mêmes variables que dans ton fichier `.env.local` (une par une : nom à gauche, valeur à droite) :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
5. Clique sur **"Deploy"**.
6. Attends 1 à 2 minutes. Vercel affiche "Congratulations!" avec un lien du type `https://revision-arabe-xxxxx.vercel.app`.
7. Teste ce lien exactement comme à l'étape 4 (`/classe`, `/devoir`, `/admin/login`, `/participation`).

Ton site est maintenant en ligne, accessible à tout moment avec cette adresse.

---

## Pour usage le jour de la séance

Donne à la maman :

- Le lien `https://revision-arabe-xxxxx.vercel.app/classe` → à ouvrir sur le PC branché au vidéoprojecteur, pour animer la classe.
- Le lien `https://revision-arabe-xxxxx.vercel.app/participation` → pour suivre les points (lui demander de se connecter une fois avec le mot de passe choisi).
- Le lien `https://revision-arabe-xxxxx.vercel.app/devoir` → à donner aux élèves pour le devoir à la maison.
- Le lien `https://revision-arabe-xxxxx.vercel.app/admin/devoir` → pour suivre qui a fait le devoir.

Astuce : sur le PC de la classe, elle peut mettre `/classe` en plein écran (touche F11 sur la plupart des navigateurs) pour une meilleure lisibilité sur le vidéoprojecteur.

---

## Modifier le contenu plus tard

- **Ajouter/corriger un élève** : ouvre `data/students.ts`, modifie la liste, puis renvoie le code sur GitHub (`git add .`, `git commit -m "..."`, `git push`) — Vercel republie automatiquement le site à chaque envoi sur GitHub.
- **Modifier les phrases d'exercices ou le devoir** : tout est dans `data/exercises.ts`, un fichier de texte simple à lire même sans savoir programmer.
- **Changer le mot de passe de la maman** : modifie `ADMIN_PASSWORD` dans Vercel (Project → Settings → Environment Variables), puis clique sur "Redeploy" dans l'onglet "Deployments".
- **Remettre les points de participation à zéro** avant une nouvelle séance : bouton "🔄 بداية جلسة جديدة" directement sur la page `/participation` (pas besoin de toucher au code).

---

## En cas de problème

- **"npm: command not found"** → Node.js n'est pas installé, va sur https://nodejs.org.
- **Le site affiche une erreur liée à Supabase** (`fetch failed`, etc.) → vérifie que les 5 variables sont bien renseignées, sans espace ni guillemets, aussi bien dans `.env.local` (en local) que dans Vercel (en ligne).
- **Le mot de passe admin ne fonctionne pas** → vérifie qu'il correspond exactement à `ADMIN_PASSWORD`, et qu'après l'avoir changé dans Vercel tu as bien refait un "Redeploy".
- **Après un `git push`, le site en ligne ne change pas** → va dans l'onglet "Deployments" sur Vercel et vérifie qu'un nouveau déploiement est bien apparu ; sinon relance-le manuellement avec "Redeploy".

---

## Limites connues de ce prototype (à garder en tête)

- Les questions du devoir et leurs bonnes réponses font partie du code envoyé au navigateur de l'élève. Un élève très curieux et à l'aise avec les outils développeur du navigateur pourrait théoriquement les consulter. Le score envoyé est cependant toujours recalculé par le serveur (jamais fait confiance à un score envoyé par le navigateur), ce qui empêche la triche la plus simple. Pour un usage noté/formel plus strict, il faudrait une version plus avancée qui ne sert les questions qu'une par une depuis le serveur.
- Il n'y a pas encore de vraie authentification pour l'enseignante (juste un mot de passe partagé) — largement suffisant pour cet usage, mais à garder en tête si le projet grandit.
- Les points de participation ne se remettent pas à zéro automatiquement entre deux séances : utilise le bouton prévu à cet effet sur `/participation`.
