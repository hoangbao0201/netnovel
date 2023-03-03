export interface ImageType {
    publicId: string
    url: string
}

export interface ChapterType {
    _id: string
    sourceName: string | undefined
    title: string
    chapterNumber: number
    content: string
    view: number
    createdAt: any
    updatedAt: any
}

export interface ChaptersType {
    _id: string
    novelName: string
    novelSlug: string
    chaptersList: ChapterType[]
    createdAt: Date
    updatedAt: Date
}

// Comic
export interface NovelType {
    _id: string
    slug: string
    title: string
    chapterCount: number
    description: string
    author: string
    category: string
    personality: string
    thumbnail: ImageType
    scene: string
    classify: string
    viewFrame: string
    postedBy: string
    createdAt: Date
    updatedAt: Date
    __v: number
}

// User
export interface UserType {
    _id: string
    name: string
    username: string
    description: string
    email: string
    password: string
    novels: NovelType[]
    avatar: ImageType
    followers: UserType[]
    createdAt: Date
    updatedAt: Date
}
