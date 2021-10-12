import { formatDate } from "../commons";
import { articlesEndpoint, baseBackendUrl } from "../config";

const mapArticle = (article) => ({
    uri: article.uri,
    title: article.title,
    cover: `${baseBackendUrl}/${article.cover.formats.large.url}`,
    timestamp: formatDate(article.published_at),
    excerpt: article.excerpt,
    content: article.content,
    tags: article.tags.map((tag) => tag.name)
});

export default getArticles = async () => {
    const response = await fetch(articlesEndpoint);
    if (response.status === 200) {
        return await response.json()
            .then((articles) => articles.map(mapArticle))
    } else {
        console.log(response.status);
    }
};