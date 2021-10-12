import { formatDate } from "../commons";
import { articlesEndpoint, baseBackendUrl } from "../config";
import * as SQLite from 'expo-sqlite';
import { actions, dispatch } from "../redux";

const mapArticle = (article) => ({
    uri: article.uri,
    title: article.title,
    cover: `${baseBackendUrl}/${article.cover.formats.large.url}`,
    timestamp: formatDate(article.published_at),
    excerpt: article.excerpt,
    content: article.content,
    tags: article.tags.map((tag) => tag.name)
});

const db = SQLite.openDatabase('data.db');

const save = (articles) => {
    db.transaction((tx) => {
        tx.executeSql('create table if not exists articles (id integer primary key autoincrement, uri text, title text, cover text, content text, excerpt text, timestamp text)');
        tx.executeSql('delete from articles');
        articles.forEach(article => {
            const parameters = [article.uri, article.title, article.cover, article.content, article.excerpt, article.timestamp];
            tx.executeSql('insert into articles (uri, title, cover, content, excerpt, timestamp) values (?,?,?,?,?,?)', parameters);
        });  
    }, (e) => console.log(e), () => console.log('Success'));
    return articles;
};

const refreshArticles = async () => {
    dispatch({type: actions.inProgress});
    const response = await fetch(articlesEndpoint);
    if (response.status === 200) {
        return await response.json()
            .then((articles) => articles.map(mapArticle))
            .then(save)
            .then((articles) => dispatch({type: actions.articlesRefreshed, articles}))
            .finally(() => dispatch({type: actions.idle}));
    } else {
        console.log(response.status);
    }
};

const getCachedArticles = () => {
    db.transaction((tx) => {
         tx.executeSql('select * from articles', [], (_, {rows: {_array}} ) => dispatch({type: actions.articlesRefreshed, articles: _array}));
    });
};

export {refreshArticles, getCachedArticles};
