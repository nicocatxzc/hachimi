import useWPGraphql from "../utils/useWPGraphql";
const GetPage = /* GraphQL */`
query GetPage($pageId: ID!) {
    page(id: $pageId, idType: DATABASE_ID) {
        author {
            node {
                nicename
                slug
                avatar {
                    url
                }
            }
        }
        content(format: RENDERED)
        featuredImage {
            node {
                sourceUrl
                altText
                caption
                description(format: RENDERED)
            }
        }
        hasPassword
        modifiedGmt
        commentStatus
        title(format: RENDERED)
    }
}
`
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    if (query.id) {
        let content = await useWPGraphql(GetPage,{pageId:query.id})
        return content.data;
    }
});
