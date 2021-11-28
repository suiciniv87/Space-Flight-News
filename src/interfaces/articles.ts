interface IArticleID {
    id: number
}

interface ILimiteArticles {
    startIndex: number
    endIndex: number
}

interface IFillDb {
    data: string
    currentDate: Date
}

interface IPublishOneArticle {
    id: number
    title: string
    url?: string
    imageUrl?: string
    newsSite?: string
    summary?: string
    publishedAt: Date
    updatedAt: Date
    featured: boolean
    launches?: ArrayBuffer
    events?: ArrayBuffer
}

interface IUpdateOneArticle {
    id: number
    title?: string
    url?: string 
    imageUrl?: string 
    newsSite?: string
    summary?: string
    updatedAt: Date
    featured?: boolean 
    launches?: ArrayBuffer
    events?: ArrayBuffer
}

export { IArticleID, ILimiteArticles, IFillDb, IPublishOneArticle, IUpdateOneArticle }