export type Image = {
    id: string;
    alt_description: string;
    color: string;
    urls: {
        small: string
    };
    description: string;
    likes: number,
    user: {
        name: string
    }
}