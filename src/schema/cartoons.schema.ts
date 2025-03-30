export const typeDef = `{
    id: ID
    name: String
    description: String
    nb_of_episodes: Int
    nb_of_seasons: Int
    genres: [Genre]
    realisator: String
    author: String
    ft_diffusion: String
    personnages: [Personnage]
}`;

export const inputDef = `{
    name: String
    description: String
    nb_of_episodes: Int
    nb_of_seasons: Int
    genres: [GenreInput]
    realisator: String
    author: String
    ft_diffusion: String
    personnages: [PersonnageInput]
}`;
