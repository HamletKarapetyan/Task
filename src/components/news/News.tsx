import React, { useEffect, useState } from "react";
import './News.css'


interface NewsData {
    title: string;
    urlToImage: string;
    content: string;
}

const News: React.FC = () => {
    const [newsData, setNewsData] = useState<NewsData[]>([]);
    const [newsNumber, setNewsNumber] = useState<number>(0);
    const [currentNews, setCurrentNews] = useState<any>(newsData[newsNumber])

    useEffect(() => {
        fetch("https://newsapi.org/v2/everything?domains=wsj.com&apiKey=6b46c63652b84b0eae42245aec4cec73")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.articles) {
                    setNewsData(data.articles);
                }
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
            });
    }, []);

    const handleNextNews = () => {
        if (newsNumber < newsData.length - 1) {
            setNewsNumber(newsNumber + 1);
            setCurrentNews(newsData[newsNumber])
        }
    };

    const handlePreviousNews = () => {
        if (newsNumber > 0) {
            setNewsNumber(newsNumber - 1);
            setCurrentNews(newsData[newsNumber])

        }
    };


    return (
        <div className="news">
            {newsData.length === 0 ? (
                <p className="loading">Loading...</p>
            ) : (
                <div className="newsBox">
                    <div className="newsButtons">
                        <button onClick={handlePreviousNews} disabled={newsNumber === 0}>Previous</button>
                        <button onClick={handleNextNews} disabled={newsNumber === newsData.length - 1}>Next</button>
                    </div>
                    {currentNews && (
                        <div className="newsHolder">
                            <h3>{currentNews.title}</h3>
                            <p>{currentNews.content}</p>
                            <img src={currentNews.urlToImage} alt={currentNews.title} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default News;
