import NextHead from "next/head";

export interface HeadProps {
    children: string;
};

export default function Head({ children }: HeadProps) {
    return (
        <NextHead>
            <title>{ children }</title>
                <meta name="description" content="DDD Code Base By Yusril Firza" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </NextHead>
    )
}