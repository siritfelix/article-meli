const version = 'v1';
export const environment = {
    production: false,
    apiVersion: version,
    apiUrl: `http://localhost:8080/${version}`,
    article: "/article",
    getArticlesError: "Error al obtener la lista de artículos.",
    getArticleByIdError: "Error al obtener el detalle del artículo."
};