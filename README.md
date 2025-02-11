# Apollo-GraphQL-TypeORM-Quests

Bienvenu dans ce repo pour la découverte des concepts clé d'Apollo serveur, GraphQL et TypeORM.
Celui-ci est lié à une série de quêtes, qui te permettront pas à pas, à prendre tes marques...

Commence par cloner le repo, puis suit les étapes, une à une....

## Etape 1 En route pour l'aventure, créeons ce premier serveur Apollo

## 2.1 Introduction

Pour commencer, clone ce [repo](https://github.com/WildCodeSchool/Apollo-GraphQL-TypeORM-Quests);
Dans cette quête, nous allons rapidement assembler les briques de code nécessaire au lancement d'un serveur Apollo - GraphQL.
Copie-colle le code rapidement, et atteint la dernière étape pour pouvoir lancer le serveur...
Nous reviendrons par la suite, sur les différentes parties, qui fera l'objet d'un focus (quête) particulier.

## 2.2 Les dépendances

A la racine du repo, nous allons configurer notre projet. Pour rappel, un des avantages forts de GraphQL - Apollo est son ancrage dans TypeScript. Configurons donc cet outil dés le début.

### Installation et configuration:

- typescript: permet le typage en JS
- @types/node: typage des élements natifs de node
- ts-node-dev: permet le hot-refresh

`npm install --save-dev typescript @types/node ts-node-dev`

Puis ajoutons notre configuration d'environnement à la racine. Certains opints sont paramétrer pour la suite, cela nous évitera un rajout de restructuration.

`touch tsconfig.json`

Et ajoute le contenu à l'intérieur

```json
{
  "compilerOptions": {
    /** Options du compilateur TS => JS */
    "target": "es2017", //Compilationv ers Ecmascript 2017
    "module": "CommonJS", //Format de module utilisé (import ou require)
    "lib": ["es6", "es2017"], // Pointage cvers les bibliothèque TS précise
    "sourceMap": true, // Améloire la gestion du debugging entre TS et JS
    "outDir": "./dist", //Dossier pour les dossiers compilés lors de la mise en production
    /** Options de résolutions sur les modules */
    "moduleResolution": "node", // Résoud les modules de manière identique à node
    "resolveJsonModule": true, // Permet l'import des fichiers json
    /** Optimisation et bonne pratique en compilation */
    "removeComments": true, // SUppression des commentaires
    "noImplicitAny": true, // Pas de type any
    "strictNullChecks": true, // Restriction sur les null ou undefined
    "strictFunctionTypes": true, // Vérification du typage de fonction
    "noImplicitThis": true, // Pas de this dans un context non défini
    "noUnusedLocals": true, // Pas de variable non utilisée
    "noUnusedParameters": true, // Pas de params non utilisé
    "noImplicitReturns": true, // Retour de valeur explicite dans les fonctions
    /** Compatibilité inter systeme */
    "allowSyntheticDefaultImports": true, // Permet d'importer les module s'ils n'ont pas de export default
    "esModuleInterop": true, // Compatibilité CommonJS <=> Es Module
    /** Décorateur et métadonnés (pour TypeORM) */
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  },
  "exclude": ["node_modules"], //Liste les fichiers et dossiers eclus de la compilation
  "include": ["./src/**/*.ts"] // Liste les fichiers à inclure obligatoirement dans la compilation
}
```

### Attaquons maintenant nos dépendances framework Apollo et GraphQL

`npm install @apollo/server graphql`

Puis complète ton _package.json_ avec ceci :

```json
  "scripts": {
    "compile": "tsc",// Pour générer la version compilée du code
    "start": "ts-node-dev ./src/index.ts"// Pour le mode développement
  }
```

### Et maintenant, le code... :rocket:

Commençons par mettre en place un dossier _.src_ et à l'intérieur de celui-ci un fichier _index.ts_.

Copie-colle le code ci dessous, base de notre serveur à l'intérieur :

```javascript
/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
```

A ce stade, notre serveur ne fonctionne pas et nous trouvons une erreur sur `server` (Cannot find name server). Prenons un instant pour regarder ce code en détail. Cela ressemble fortement au code à celui pour lancer un serveur **Express** : un PORT et un **server**.
Avec express, nous créons notre **app** de server grâce à `const app = express()`. Comment cela fonctionne t'il avec Apollo et GraphQL ?

Copie Colle ce code entre les imports et le lancement du serveur

```javascript
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

Génial, nous avons créer notre instance de serveur. Mais celle-ci semble dépendre, de nouveau de 2 variables.
En effet, pour fonctionner, GraphQL a besoin de 2 choses :

- les _resolvers_ que nous pouvons voir comme des _controlleurs_. Ce sont les fonctions de résolutions, là où l'on met notre logique métiers.
- les _définitions_, ce sont les schémas GraphQL composés des définitions de tous nos tyoes de données, de nos types de Querys et de Mutations. Nous reviendrons sur ces 2 points par la suite

Au dessus de la déclaration de ton serveur, ajoute une définition pré codée. Ne t'inquiète pas si tu ne comprends pas tout, comme je te l'ai dit, ceci fera partie d'une quête ou partie de quête spécifique.

```javascript
// A schema is a collection of type definitions (hence "typeDefs")

const typeDefs = `#graphql
  # This "Cartoon" type defines the queryable fields for every cartoon in our data source.
  type Cartoon {
    id: ID
    name: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries
  type Query {
    getCartoons: [Cartoon]
  }
`;
```

Puis celui pour les _resolvers_

```javascript
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getCartoons: () => cartoons,
  },
};
```

Un dernier point, notre data.

En haut du fichier, sous les imports, ajoute nos données simplifiées correspondant à notre _type Cartoon_

```javascript
const cartoons = [
  {
    id: 1,
    name: "Les Mystérieuses Cités d'Or",
    description:
      "Esteban, un jeune garçon orphelin, part à la recherche des légendaires Cités d'Or en Amérique du Sud accompagné de Zia et Tao.",
  },
  {
    id: 2,
    name: "Ulysse 31",
    description:
      "Ulysse se perd dans l'espace avec son équipage et cherche à rentrer sur Terre tout en affrontant les dieux de l'Olympe.",
  },
  {
    id: 3,
    name: "Dragon Ball SUPER COOL",
    description:
      "Son Goku, un jeune garçon doté d'une force incroyable, part à la recherche des Dragon Balls, des boules de cristal magiques.",
  },
];
```

Si tout se passe bien, tu dois pouvoir maintenant aller sur [http://localhost:4000](http://localhost:4000).
Yahoo, ton premier serveur Apollo - GraphQL :rocket:
