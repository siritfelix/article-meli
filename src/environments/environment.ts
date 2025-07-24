const version = 'v1';
export const environment = {
    production: false,
    apiVersion: version,
    apiUrl: `http://localhost:8080/${version}`,
    article: "/article",
    getArticles: "Error al obtener la lista de artículos.",
    getArticleById: "Error al obtener el detalle del artículo."
};