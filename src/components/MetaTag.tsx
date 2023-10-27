import { Helmet } from "react-helmet-async";

type MetaTagProps = {
    title: string;
    description: string;
    keywords: string;
    imgSrc: string;
};

export default function MetaTag({
    title,
    description,
    keywords,
    imgSrc,
}: MetaTagProps) {
    return (
        <Helmet>
            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imgSrc} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imgSrc} />
        </Helmet>
    );
}
